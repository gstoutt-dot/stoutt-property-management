import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { refreshQuickBooksAccessToken } from "../../../../lib/quickbooksTokenManager";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  const environment = process.env.QUICKBOOKS_ENVIRONMENT || "development";

  return environment === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}

async function fetchQuickBooksQuery({ realmId, accessToken, query }) {
  const quickBooksUrl = new URL(
    `${getQuickBooksBaseUrl()}/v3/company/${realmId}/query`
  );

  quickBooksUrl.searchParams.set("query", query);
  quickBooksUrl.searchParams.set("minorversion", QUICKBOOKS_MINOR_VERSION);

  const qbResponse = await fetch(quickBooksUrl.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const qbData = await qbResponse.json();

  if (!qbResponse.ok) {
    throw new Error(JSON.stringify(qbData));
  }

  return qbData;
}

function cleanText(value) {
  return String(value || "").trim();
}

function parseUnitNumber(displayName = "") {
  const match = String(displayName || "").match(/unit\s*([A-Za-z0-9-]+)/i);
  return match ? match[1] : null;
}

function classifyChargeCategory(itemName = "", description = "", memo = "") {
  const text = `${itemName} ${description} ${memo}`.toLowerCase();

  if (text.includes("late")) return "late_fee";

  if (
    text.includes("violation") ||
    text.includes("fine") ||
    text.includes("compliance")
  ) {
    return "violation_fee";
  }

  if (
    text.includes("special assessment") ||
    text.includes("special")
  ) {
    return "special_assessment";
  }

  if (
    text.includes("assessment") ||
    text.includes("monthly") ||
    text.includes("dues")
  ) {
    return "monthly_assessment";
  }

  if (
    text.includes("interest") ||
    text.includes("finance charge")
  ) {
    return "interest_charge";
  }

  if (
    text.includes("collection") ||
    text.includes("attorney") ||
    text.includes("legal")
  ) {
    return "collections_or_legal_fee";
  }

  if (
    text.includes("credit") ||
    text.includes("adjustment")
  ) {
    return "credit_or_adjustment";
  }

  return "other_charge";
}

function formatCategoryLabel(category) {
  const labels = {
    late_fee: "Late Fee",
    violation_fee: "Violation Fee",
    special_assessment: "Special Assessment",
    monthly_assessment: "Monthly Assessment",
    interest_charge: "Interest Charge",
    collections_or_legal_fee: "Collections / Legal Fee",
    credit_or_adjustment: "Credit / Adjustment",
    other_charge: "Other Charge",
  };

  return labels[category] || "Other Charge";
}

function getOwnerIdentityByCustomerId(ownerBalances, customerId, customerName) {
  if (!customerId && !customerName) return null;

  const normalizedCustomerId = String(customerId || "").trim();
  const normalizedCustomerName = String(customerName || "").toLowerCase().trim();
  const parsedUnitNumber = parseUnitNumber(customerName);

  const directIdMatch = ownerBalances.find(
    (owner) =>
      String(owner.quickbooks_customer_id || "").trim() === normalizedCustomerId
  );

  if (directIdMatch?.unit_number || directIdMatch?.owner_user_id) {
    return directIdMatch;
  }

  const displayNameMatch = ownerBalances.find((owner) => {
    const ownerDisplayName = String(
      owner.quickbooks_customer_display_name || ""
    )
      .toLowerCase()
      .trim();

    return ownerDisplayName && ownerDisplayName === normalizedCustomerName;
  });

  if (displayNameMatch?.unit_number || displayNameMatch?.owner_user_id) {
    return displayNameMatch;
  }

  const unitMatch = ownerBalances.find((owner) => {
    return (
      parsedUnitNumber &&
      String(owner.unit_number || "").trim() === String(parsedUnitNumber).trim()
    );
  });

  if (unitMatch) {
    return unitMatch;
  }

  return directIdMatch || displayNameMatch || null;
}

function getInvoiceDescription(invoice) {
  if (invoice.DocNumber) {
    return `Invoice #${invoice.DocNumber}`;
  }

  return "Owner invoice";
}

function getPaymentDescription(payment) {
  if (payment.PaymentRefNum) {
    return `Payment #${payment.PaymentRefNum}`;
  }

  return "Owner payment";
}

function buildInvoiceSummaryEntry({
  associationId,
  invoice,
  ownerIdentity,
  customerRef,
  now,
}) {
  return {
    association_id: associationId,
    owner_user_id: ownerIdentity.owner_user_id || null,
    auth_user_id: ownerIdentity.auth_user_id || null,
    unit_number: ownerIdentity.unit_number || null,
    owner_name: ownerIdentity.owner_name || customerRef.name || null,
    owner_email: ownerIdentity.owner_email || null,

    quickbooks_customer_id: customerRef.value || null,
    quickbooks_transaction_id: invoice.Id,
    quickbooks_transaction_type: "Invoice",

    transaction_type: "invoice",
    transaction_date: invoice.TxnDate || null,
    due_date: invoice.DueDate || null,

    description: getInvoiceDescription(invoice),
    memo:
      invoice.PrivateNote ||
      invoice.CustomerMemo?.value ||
      invoice.Line?.[0]?.Description ||
      null,

    charge_amount: Number(invoice.TotalAmt || 0),
    payment_amount: 0,
    credit_amount: 0,
    open_balance: Number(invoice.Balance || 0),

    status:
      Number(invoice.Balance || 0) <= 0
        ? "paid"
        : invoice.DueDate && new Date(invoice.DueDate) < new Date()
        ? "overdue"
        : "open",

    source: "QuickBooks",
    synced_at: now,
    updated_at: now,
  };
}

function buildInvoiceLineEntries({
  associationId,
  invoice,
  ownerIdentity,
  customerRef,
  now,
}) {
  const invoiceNumber = invoice.DocNumber || invoice.Id;
  const invoiceBalance = Number(invoice.Balance || 0);
  const invoiceStatus =
    invoiceBalance <= 0
      ? "paid"
      : invoice.DueDate && new Date(invoice.DueDate) < new Date()
      ? "overdue"
      : "open";

  const lines = Array.isArray(invoice.Line) ? invoice.Line : [];

  return lines
    .filter((line) => {
      const amount = Number(line?.Amount || 0);
      const hasDetail = Boolean(line?.SalesItemLineDetail);
      const hasDescription = Boolean(cleanText(line?.Description));

      return amount !== 0 && (hasDetail || hasDescription);
    })
    .map((line, index) => {
      const detail = line?.SalesItemLineDetail || {};
      const itemName =
        cleanText(detail?.ItemRef?.name) ||
        cleanText(line?.Description) ||
        "QuickBooks Charge";

      const lineDescription =
        cleanText(line?.Description) ||
        itemName;

      const feeCategory = classifyChargeCategory(
        itemName,
        lineDescription,
        invoice.PrivateNote || invoice.CustomerMemo?.value || ""
      );

      const categoryLabel = formatCategoryLabel(feeCategory);
      const lineId = String(line?.Id || index + 1);

      return {
        association_id: associationId,
        owner_user_id: ownerIdentity.owner_user_id || null,
        auth_user_id: ownerIdentity.auth_user_id || null,
        unit_number: ownerIdentity.unit_number || null,
        owner_name: ownerIdentity.owner_name || customerRef.name || null,
        owner_email: ownerIdentity.owner_email || null,

        quickbooks_customer_id: customerRef.value || null,
        quickbooks_transaction_id: `${invoice.Id}-LINE-${lineId}`,
        quickbooks_transaction_type: "InvoiceLine",

        transaction_type: "invoice_line",
        transaction_date: invoice.TxnDate || null,
        due_date: invoice.DueDate || null,

        description: `${categoryLabel}: ${itemName}`,
        memo: [
          `Invoice #${invoiceNumber}`,
          `Fee Category: ${feeCategory}`,
          lineDescription,
        ]
          .filter(Boolean)
          .join(" | "),

        charge_amount: Number(line?.Amount || 0),
        payment_amount: 0,
        credit_amount: feeCategory === "credit_or_adjustment"
          ? Math.abs(Number(line?.Amount || 0))
          : 0,
        open_balance: invoiceBalance,

        status: invoiceStatus,

        source: "QuickBooks Line Item",
        synced_at: now,
        updated_at: now,
      };
    });
}

function buildPaymentEntry({
  associationId,
  payment,
  ownerIdentity,
  customerRef,
  now,
}) {
  return {
    association_id: associationId,
    owner_user_id: ownerIdentity.owner_user_id || null,
    auth_user_id: ownerIdentity.auth_user_id || null,
    unit_number: ownerIdentity.unit_number || null,
    owner_name: ownerIdentity.owner_name || customerRef.name || null,
    owner_email: ownerIdentity.owner_email || null,

    quickbooks_customer_id: customerRef.value || null,
    quickbooks_transaction_id: payment.Id,
    quickbooks_transaction_type: "Payment",

    transaction_type: "payment",
    transaction_date: payment.TxnDate || null,
    due_date: null,

    description: getPaymentDescription(payment),
    memo:
      payment.PrivateNote ||
      payment.PaymentMethodRef?.name ||
      payment.PaymentMethodRef?.value ||
      null,

    charge_amount: 0,
    payment_amount: Number(payment.TotalAmt || 0),
    credit_amount: 0,
    open_balance: Number(payment.UnappliedAmt || 0),

    status: Number(payment.UnappliedAmt || 0) > 0 ? "partially_applied" : "posted",

    source: "QuickBooks",
    synced_at: now,
    updated_at: now,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId = String(
      req.query.association_id || req.body?.association_id || ""
    ).trim();

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const { data: connection, error: connectionError } = await supabaseAdmin
      .from("quickbooks_connections")
      .select("*")
      .eq("association_id", associationId)
      .eq("connection_status", "connected")
      .single();

    if (connectionError || !connection) {
      return res.status(404).json({
        success: false,
        error: "No active QuickBooks connection found for this association.",
        details: connectionError?.message || null,
      });
    }

    const { data: ownerBalances, error: ownerBalanceError } =
      await supabaseAdmin
        .from("owner_account_balances")
        .select("*")
        .eq("association_id", associationId);

    if (ownerBalanceError) {
      throw ownerBalanceError;
    }

    const { data: identityLinks, error: identityLinkError } =
      await supabaseAdmin
        .from("accounting_identity_links")
        .select("*")
        .eq("association_id", associationId);

    if (identityLinkError) {
      throw identityLinkError;
    }

    const ownerIdentityRecords = (ownerBalances || []).map((balance) => {
      const matchingLink = (identityLinks || []).find((link) => {
        return (
          String(link.unit_number || "").trim() ===
            String(balance.unit_number || "").trim() ||
          String(link.owner_user_id || "").trim() ===
            String(balance.owner_user_id || "").trim()
        );
      });

      return {
        ...balance,
        auth_user_id:
          balance.auth_user_id ||
          matchingLink?.auth_user_id ||
          null,
        quickbooks_customer_id:
          balance.quickbooks_customer_id ||
          matchingLink?.quickbooks_customer_id ||
          balance.account_number ||
          null,
        quickbooks_customer_display_name:
          matchingLink?.quickbooks_customer_display_name ||
          balance.owner_name ||
          null,
        owner_user_id:
          balance.owner_user_id ||
          matchingLink?.owner_user_id ||
          null,
      };
    });

    const realmId = connection.realm_id;
    let accessToken = connection.access_token;

    try {
      const tokenExpiresAt = connection.access_token_expires_at
        ? new Date(connection.access_token_expires_at)
        : null;

      const tokenExpired = !tokenExpiresAt || tokenExpiresAt <= new Date();

      if (tokenExpired) {
        console.log("QuickBooks access token expired. Refreshing token...");

        const refreshResult = await refreshQuickBooksAccessToken(associationId);

        accessToken = refreshResult.access_token;

        console.log("QuickBooks access token refreshed successfully.");
      }
    } catch (refreshError) {
      console.error("QuickBooks token refresh failed:", refreshError);
      throw refreshError;
    }

    const now = new Date().toISOString();

    const invoiceData = await fetchQuickBooksQuery({
      realmId,
      accessToken,
      query: "select * from Invoice startPosition 1 maxResults 1000",
    });

    const paymentData = await fetchQuickBooksQuery({
      realmId,
      accessToken,
      query: "select * from Payment startPosition 1 maxResults 1000",
    });

    const invoices = invoiceData?.QueryResponse?.Invoice || [];
    const payments = paymentData?.QueryResponse?.Payment || [];

    const ledgerEntries = [];
    let invoiceLineEntryCount = 0;
    let skippedInvoiceCount = 0;
    let skippedPaymentCount = 0;

    for (const invoice of invoices) {
      const customerRef = invoice.CustomerRef || {};

      const ownerIdentity = getOwnerIdentityByCustomerId(
        ownerIdentityRecords || [],
        customerRef.value,
        customerRef.name
      );

      if (!ownerIdentity) {
        skippedInvoiceCount += 1;
        continue;
      }

      ledgerEntries.push(
        buildInvoiceSummaryEntry({
          associationId,
          invoice,
          ownerIdentity,
          customerRef,
          now,
        })
      );

      const lineEntries = buildInvoiceLineEntries({
        associationId,
        invoice,
        ownerIdentity,
        customerRef,
        now,
      });

      invoiceLineEntryCount += lineEntries.length;
      ledgerEntries.push(...lineEntries);
    }

    for (const payment of payments) {
      const customerRef = payment.CustomerRef || {};

      const ownerIdentity = getOwnerIdentityByCustomerId(
        ownerIdentityRecords || [],
        customerRef.value,
        customerRef.name
      );

      if (!ownerIdentity) {
        skippedPaymentCount += 1;
        continue;
      }

      ledgerEntries.push(
        buildPaymentEntry({
          associationId,
          payment,
          ownerIdentity,
          customerRef,
          now,
        })
      );
    }

    if (ledgerEntries.length > 0) {
      const { error: upsertError } = await supabaseAdmin
        .from("owner_account_ledger_entries")
        .upsert(ledgerEntries, {
          onConflict:
            "association_id,quickbooks_transaction_id,quickbooks_transaction_type",
        });

      if (upsertError) {
        throw upsertError;
      }
    }

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        sync_error: null,
        updated_at: now,
      })
      .eq("association_id", associationId);

    return res.status(200).json({
      success: true,
      message: "Owner account ledger synced successfully with invoice line intelligence.",
      association_id: associationId,
      realm_id: realmId,
      invoice_count: invoices.length,
      payment_count: payments.length,
      invoice_line_entry_count: invoiceLineEntryCount,
      ledger_entry_count: ledgerEntries.length,
      skipped_invoice_count: skippedInvoiceCount,
      skipped_payment_count: skippedPaymentCount,
      skipped_transaction_count: skippedInvoiceCount + skippedPaymentCount,
      synced_at: now,
    });
  } catch (error) {
    console.error("Owner ledger sync failed:", error);

    const associationId = String(
      req.query.association_id || req.body?.association_id || ""
    ).trim();

    if (associationId) {
      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: error.message || "Owner ledger sync failed.",
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", associationId);
    }

    return res.status(500).json({
      success: false,
      error: "Unable to sync owner account ledger.",
      details: error.message,
    });
  }
}
