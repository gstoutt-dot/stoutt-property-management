// /pages/api/accounting/owner-ledger.js

import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  const environment = process.env.QUICKBOOKS_ENVIRONMENT || "development";
  return environment === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}

function formatLedgerDate(value) {
  if (!value) return null;
  return value;
}

function normalizeInvoice(invoice) {
  return {
    quickbooks_id: invoice.Id,
    date: formatLedgerDate(invoice.TxnDate),
    due_date: formatLedgerDate(invoice.DueDate),
    type: "Invoice",
    description: invoice.DocNumber
      ? `Invoice ${invoice.DocNumber}`
      : "Assessment invoice",
    amount: Number(invoice.TotalAmt || 0),
    open_balance: Number(invoice.Balance || 0),
    status:
      Number(invoice.Balance || 0) <= 0
        ? "Paid"
        : invoice.DueDate && new Date(invoice.DueDate) < new Date()
        ? "Overdue"
        : "Open",
  };
}

function normalizePayment(payment) {
  return {
    quickbooks_id: payment.Id,
    date: formatLedgerDate(payment.TxnDate),
    due_date: null,
    type: "Payment",
    description: payment.PaymentRefNum
      ? `Payment ${payment.PaymentRefNum}`
      : "Payment received",
    amount: -Math.abs(Number(payment.TotalAmt || 0)),
    open_balance: 0,
    status: "Posted",
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { association_id, owner_user_id, unit_number } = req.query;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    if (!owner_user_id || typeof owner_user_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required owner_user_id.",
      });
    }

        let identityQuery = supabaseAdmin
      .from("accounting_identity_links")
      .select("*")
      .eq("association_id", association_id);

    if (owner_user_id) {
      identityQuery = identityQuery.eq("owner_user_id", owner_user_id);
    }

    let { data: identityLink, error: identityError } =
      await identityQuery.maybeSingle();

    if (!identityLink && unit_number) {
      const fallbackResult = await supabaseAdmin
        .from("accounting_identity_links")
        .select("*")
        .eq("association_id", association_id)
        .eq("unit_number", unit_number)
        .maybeSingle();

      identityLink = fallbackResult.data;
      identityError = fallbackResult.error;
    }

    if (identityError || !identityLink) {
      return res.status(404).json({
        success: false,
        error: "No QuickBooks customer mapping found for this owner.",
        details: identityError?.message || null,
      });
    }

    if (
      unit_number &&
      identityLink.unit_number &&
      String(identityLink.unit_number) !== String(unit_number)
    ) {
      return res.status(403).json({
        success: false,
        error: "Owner unit does not match the accounting identity record.",
      });
    }

    const quickBooksCustomerId = identityLink.quickbooks_customer_id;

    if (!quickBooksCustomerId) {
      return res.status(404).json({
        success: false,
        error: "This owner does not have a QuickBooks customer ID mapped yet.",
      });
    }

    const { data: connection, error: connectionError } = await supabaseAdmin
      .from("quickbooks_connections")
      .select("*")
      .eq("association_id", association_id)
      .eq("connection_status", "connected")
      .single();

    if (connectionError || !connection) {
      return res.status(404).json({
        success: false,
        error: "No active QuickBooks connection found for this association.",
        details: connectionError?.message || null,
      });
    }

    const realmId = connection.realm_id;
    const accessToken = connection.access_token;

    const invoiceQuery = `select * from Invoice where CustomerRef = '${quickBooksCustomerId}' startPosition 1 maxResults 1000`;
    const paymentQuery = `select * from Payment where CustomerRef = '${quickBooksCustomerId}' startPosition 1 maxResults 1000`;

    async function runQuickBooksQuery(query) {
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

    const [invoiceData, paymentData] = await Promise.all([
      runQuickBooksQuery(invoiceQuery),
      runQuickBooksQuery(paymentQuery),
    ]);

    const invoices = invoiceData?.QueryResponse?.Invoice || [];
    const payments = paymentData?.QueryResponse?.Payment || [];

    const ledger = [
      ...invoices.map(normalizeInvoice),
      ...payments.map(normalizePayment),
    ].sort((a, b) => {
      const dateA = new Date(a.date || "1900-01-01").getTime();
      const dateB = new Date(b.date || "1900-01-01").getTime();
      return dateB - dateA;
    });

    return res.status(200).json({
      success: true,
      association_id,
      owner_user_id,
      unit_number: identityLink.unit_number || unit_number || null,
      quickbooks_customer_id: quickBooksCustomerId,
      quickbooks_customer_name: identityLink.quickbooks_customer_display_name,
      transaction_count: ledger.length,
      ledger,
    });
  } catch (error) {
    console.error("Owner ledger pull failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load owner ledger from QuickBooks.",
      details: error.message,
    });
  }
}
