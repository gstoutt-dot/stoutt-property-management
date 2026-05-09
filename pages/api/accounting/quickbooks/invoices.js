// /pages/api/accounting/quickbooks/invoices.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  const environment = process.env.QUICKBOOKS_ENVIRONMENT || "development";
  return environment === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { association_id } = req.query;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
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

    const query =
      "select * from Invoice startPosition 1 maxResults 1000";

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
      console.error("QuickBooks invoice pull failed:", qbData);

      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(qbData),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(502).json({
        success: false,
        error: "QuickBooks invoice pull failed.",
        details: qbData,
      });
    }

    const invoices = qbData?.QueryResponse?.Invoice || [];
    const now = new Date().toISOString();

    const normalizedInvoices = invoices.map((invoice) => {
      const customerRef = invoice.CustomerRef || {};

      return {
        association_id,
        quickbooks_invoice_id: invoice.Id,
        quickbooks_customer_id: customerRef.value || null,
        quickbooks_customer_name: customerRef.name || null,
        invoice_number: invoice.DocNumber || null,
        invoice_date: invoice.TxnDate || null,
        due_date: invoice.DueDate || null,
        total_amount: Number(invoice.TotalAmt || 0),
        balance: Number(invoice.Balance || 0),
        status:
          Number(invoice.Balance || 0) <= 0
            ? "paid"
            : invoice.DueDate && new Date(invoice.DueDate) < new Date()
            ? "overdue"
            : "open",
        raw_quickbooks_payload: invoice,
        synced_at: now,
        updated_at: now,
      };
    });

    return res.status(200).json({
      success: true,
      message: "QuickBooks invoices pulled successfully.",
      association_id,
      realm_id: realmId,
      invoice_count: invoices.length,
      invoices: normalizedInvoices,
    });
  } catch (error) {
    console.error("QuickBooks invoices sync error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize QuickBooks invoices.",
      details: error.message,
    });
  }
}
