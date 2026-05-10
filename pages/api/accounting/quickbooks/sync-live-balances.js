// /pages/api/accounting/quickbooks/sync-live-balances.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

import {
  buildOwnerBalanceRecordFromQuickBooksCustomer,
  buildBoardFinancialSummary,
} from "../../../../lib/accountingMirrorEngine";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  const environment = process.env.QUICKBOOKS_ENVIRONMENT || "development";

  return environment === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const association_id =
      req.method === "GET" ? req.query.association_id : req.body.association_id;

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

    const query = "select * from Customer startPosition 1 maxResults 1000";

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
      return res.status(502).json({
        success: false,
        error: "Unable to pull QuickBooks live balances.",
        details: qbData,
      });
    }

    const customers = qbData?.QueryResponse?.Customer || [];

    const balanceRecords = customers.map((customer) =>
      buildOwnerBalanceRecordFromQuickBooksCustomer({
        associationId: association_id,
        quickbooksCustomerId: customer.Id,
        customerName: customer.DisplayName,
        currentBalance: Number(customer.Balance || 0),
      })
    );

    if (balanceRecords.length > 0) {
      const { error: upsertError } = await supabaseAdmin
        .from("owner_account_balances")
        .upsert(balanceRecords, {
          onConflict: "association_id,account_number",
        });

      if (upsertError) {
        return res.status(500).json({
          success: false,
          error: "Unable to save live owner balances.",
          details: upsertError.message,
        });
      }
    }

    const now = new Date().toISOString();

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_customer_sync_at: now,
        sync_error: null,
        updated_at: now,
      })
      .eq("association_id", association_id);

    const boardSummary = buildBoardFinancialSummary(balanceRecords);

    return res.status(200).json({
      success: true,
      message: "Live QuickBooks balances synchronized successfully.",
      association_id,
      realm_id: realmId,
      synced_accounts: balanceRecords.length,
      board_summary: boardSummary,
      balances: balanceRecords,
    });
  } catch (error) {
    console.error("sync-live-balances error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize live balances.",
      details: error.message,
    });
  }
}
