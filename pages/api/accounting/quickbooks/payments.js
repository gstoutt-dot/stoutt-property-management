// /pages/api/accounting/quickbooks/payments.js

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

    const query = "select * from Payment startPosition 1 maxResults 1000";

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
      console.error("QuickBooks payment pull failed:", qbData);

      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(qbData),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(502).json({
        success: false,
        error: "QuickBooks payment pull failed.",
        details: qbData,
      });
    }

    const payments = qbData?.QueryResponse?.Payment || [];
    const now = new Date().toISOString();

    const normalizedPayments = payments.map((payment) => {
      const customerRef = payment.CustomerRef || {};

      return {
        association_id,
        quickbooks_payment_id: payment.Id,
        quickbooks_customer_id: customerRef.value || null,
        quickbooks_customer_name: customerRef.name || null,
        payment_date: payment.TxnDate || null,
        total_amount: Number(payment.TotalAmt || 0),
        unapplied_amount: Number(payment.UnappliedAmt || 0),
        payment_method:
          payment.PaymentMethodRef?.name ||
          payment.PaymentMethodRef?.value ||
          null,
        deposit_account:
          payment.DepositToAccountRef?.name ||
          payment.DepositToAccountRef?.value ||
          null,
        linked_transactions: payment.Line || [],
        raw_quickbooks_payload: payment,
        synced_at: now,
        updated_at: now,
      };
    });

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_payment_sync_at: now,
        sync_error: null,
        updated_at: now,
      })
      .eq("association_id", association_id);

    return res.status(200).json({
      success: true,
      message: "QuickBooks payments pulled successfully.",
      association_id,
      realm_id: realmId,
      payment_count: payments.length,
      payments: normalizedPayments,
    });
  } catch (error) {
    console.error("QuickBooks payments sync error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize QuickBooks payments.",
      details: error.message,
    });
  }
}
