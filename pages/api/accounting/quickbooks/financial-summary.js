// /pages/api/accounting/quickbooks/financial-summary.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

import {
  buildBoardFinancialSummary,
  calculateAssociationBalanceTotals,
} from "../../../../lib/accountingMirrorEngine";

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

    const { data: connection } = await supabaseAdmin
      .from("quickbooks_connections")
      .select(
        "association_id, realm_id, connection_status, connected_at, access_token_expires_at, refresh_token_expires_at, last_token_refresh_at, last_refresh_at, last_refresh_status, last_refresh_error, last_customer_sync_at, last_invoice_sync_at, last_payment_sync_at, updated_at"
      )
      .eq("association_id", association_id)
      .maybeSingle();

    const { data: balances, error: balanceError } = await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", association_id)
      .order("unit_number", { ascending: true });

    if (balanceError) {
      return res.status(500).json({
        success: false,
        error: "Unable to load owner accounting balances.",
        details: balanceError.message,
      });
    }

    const records = balances || [];

    const totals = calculateAssociationBalanceTotals(records);
    const boardSummary = buildBoardFinancialSummary(records);

    const accountsNeedingAttention = records
      .filter((record) =>
        ["attention", "elevated", "severe"].includes(
          String(record.delinquency_level || "").toLowerCase()
        )
      )
      .map((record) => ({
        owner_name: record.owner_name,
        unit_number: record.unit_number,
        account_number: record.account_number,
        current_balance: Number(record.current_balance || 0),
        monthly_assessment: Number(record.monthly_assessment || 0),
        payment_status: record.payment_status,
        delinquency_level: record.delinquency_level,
        account_health: record.account_health,
        last_payment_date: record.last_payment_date,
      }));

    return res.status(200).json({
      success: true,
      message: "SPM accounting financial summary generated successfully.",
      association_id,
      quickbooks_connection: connection || null,
      token_status: connection?.connection_status || "unknown",
      access_token_expires_at: connection?.access_token_expires_at || null,
      refresh_token_expires_at: connection?.refresh_token_expires_at || null,
      last_token_refresh_at:
        connection?.last_token_refresh_at ||
        connection?.last_refresh_at ||
        null,
      last_refresh_status: connection?.last_refresh_status || null,
      totals,
      board_summary: boardSummary,
      accounts_needing_attention_count: accountsNeedingAttention.length,
      accounts_needing_attention: accountsNeedingAttention,
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("financial-summary error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to generate accounting financial summary.",
      details: error.message,
    });
  }
}
