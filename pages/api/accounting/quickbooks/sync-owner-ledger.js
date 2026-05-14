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

function getOwnerIdentityByCustomerId(ownerBalances, customerId) {
  if (!customerId) return null;

  return ownerBalances.find(
    (owner) =>
      String(owner.quickbooks_customer_id || "").trim() ===
      String(customerId || "").trim()
  );
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

    const realmId = connection.realm_id;

let accessToken = connection.access_token;

try {
  const tokenExpiresAt = connection.access_token_expires_at
    ? new Date(connection.access_token_expires_at)
    : null;

  const tokenExpired =
    !tokenExpiresAt || tokenExpiresAt <= new Date();

  if (tokenExpired) {
    console.log(
      "QuickBooks access token expired. Refreshing token..."
    );

    const refreshResult =
      await refreshQuickBooksAccessToken(
        associationId
      );

    accessToken = refreshResult.access_token;

    console.log(
      "QuickBooks access token refreshed successfully."
    );
  }
} catch (refreshError) {
  console.error(
    "QuickBooks token refresh failed:",
    refreshError
  );

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

    for (const invoice of invoices) {
      const customerRef = invoice.CustomerRef || {};
      const ownerIdentity = getOwnerIdentityByCustomerId(
        ownerBalances || [],
        customerRef.value
      );

      if (!ownerIdentity) continue;

      ledgerEntries.push({
        association_id: associationId,
        owner_user_id: ownerIdentity.owner_user_id || null,
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
      });
    }

    for (const payment of payments) {
      const customerRef = payment.CustomerRef || {};
      const ownerIdentity = getOwnerIdentityByCustomerId(
        ownerBalances || [],
        customerRef.value
      );

      if (!ownerIdentity) continue;

      ledgerEntries.push({
        association_id: associationId,
        owner_user_id: ownerIdentity.owner_user_id || null,
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

        status:
          Number(payment.UnappliedAmt || 0) > 0 ? "partially_applied" : "posted",

        source: "QuickBooks",
        synced_at: now,
        updated_at: now,
      });
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
      message: "Owner account ledger synced successfully.",
      association_id: associationId,
      realm_id: realmId,
      invoice_count: invoices.length,
      payment_count: payments.length,
      ledger_entry_count: ledgerEntries.length,
      skipped_transaction_count:
        invoices.length + payments.length - ledgerEntries.length,
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
