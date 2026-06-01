// /pages/api/accounting/quickbooks/sync-live-balances.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getValidQuickBooksConnection } from "../../../../lib/quickbooksTokenManager";

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

function sanitizeOwnerBalanceRecord(record) {
  return {
    association_id: record.association_id,
    owner_user_id: record.owner_user_id || null,
    owner_name: record.owner_name || "",
    unit_number: record.unit_number || record.account_number || "",
    account_number: record.account_number || "",

    current_balance: Number(record.current_balance || 0),
    monthly_assessment: Number(record.monthly_assessment || 0),

    last_payment_date: record.last_payment_date || null,
    payment_status: record.payment_status || "current",
    delinquency_level: record.delinquency_level || "current",
    account_health: record.account_health || "healthy",
    payment_link: record.payment_link || "",

    synced_at: new Date().toISOString(),
  };
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

        const now = new Date().toISOString();

    const connection = await getValidQuickBooksConnection(association_id);

    if (!connection?.realm_id || !connection?.access_token) {
      return res.status(404).json({
        success: false,
        error: "No valid QuickBooks connection found for this association.",
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
      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(qbData),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(502).json({
        success: false,
        error: "Unable to pull QuickBooks live balances.",
        details: qbData,
      });
    }

    const customers = qbData?.QueryResponse?.Customer || [];

    const balanceRecords = customers.map((customer) =>
      sanitizeOwnerBalanceRecord(
        buildOwnerBalanceRecordFromQuickBooksCustomer({
          associationId: association_id,
          quickbooksCustomerId: customer.Id,
          customerName: customer.DisplayName,
          currentBalance: Number(customer.Balance || 0),
        })
      )
    );

    let savedCount = 0;
    const saveErrors = [];

    for (const record of balanceRecords) {
  const { data: existingRecord, error: existingError } =
    await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", record.association_id)
      .eq("unit_number", record.unit_number)
      .maybeSingle();

  if (existingError) {
    saveErrors.push({
      unit_number: record.unit_number,
      owner_name: record.owner_name,
      error: existingError.message,
    });

    continue;
  }

  if (existingRecord?.id) {
    const safeUpdatedRecord = {
      current_balance: Number(record.current_balance || 0),
      monthly_assessment: Number(record.monthly_assessment || 0),
      payment_status: record.payment_status || existingRecord.payment_status,
      delinquency_level:
        record.delinquency_level || existingRecord.delinquency_level,
      account_health: record.account_health || existingRecord.account_health,
      last_payment_date:
        record.last_payment_date || existingRecord.last_payment_date,
      synced_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabaseAdmin
      .from("owner_account_balances")
      .update(safeUpdatedRecord)
      .eq("id", existingRecord.id);

    if (updateError) {
      saveErrors.push({
        unit_number: record.unit_number,
        owner_name: record.owner_name,
        error: updateError.message,
      });

      continue;
    }

    savedCount += 1;
  } else {
    const { error: insertError } = await supabaseAdmin
      .from("owner_account_balances")
      .insert(record);

    if (insertError) {
      saveErrors.push({
        unit_number: record.unit_number,
        owner_name: record.owner_name,
        error: insertError.message,
      });

      continue;
    }

    savedCount += 1;
  }
}

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_customer_sync_at: now,
        sync_error: saveErrors.length > 0 ? JSON.stringify(saveErrors) : null,
        updated_at: now,
      })
      .eq("association_id", association_id);

    const boardSummary = buildBoardFinancialSummary(balanceRecords);

    return res.status(saveErrors.length > 0 ? 207 : 200).json({
      success: saveErrors.length === 0,
      message:
        saveErrors.length === 0
          ? "Live QuickBooks balances synchronized successfully."
          : "Live QuickBooks balances synchronized with some save warnings.",
      association_id,
      realm_id: realmId,
      token_status: "valid",
      access_token_expires_at: connection.access_token_expires_at || null,
      last_token_refresh_at:
        connection.last_token_refresh_at ||
        connection.last_refresh_at ||
        null,
      pulled_accounts: balanceRecords.length,
      saved_accounts: savedCount,
      failed_accounts: saveErrors.length,
      save_errors: saveErrors,
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
