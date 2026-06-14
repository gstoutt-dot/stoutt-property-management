// /pages/api/accounting/quickbooks/board-report-snapshot.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
        const associationId =
      clean(req.query.association_id) || clean(req.query.associationId);

    const reportKey = clean(req.query.report_key || req.query.reportKey);

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    if (!reportKey) {
      return res.status(400).json({
        success: false,
        error: "Missing required report_key.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("board_accounting_report_snapshots")
      .select("*")
      .eq("association_id", associationId)
      .eq("report_key", reportKey)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        error: "Unable to load board accounting report snapshot.",
        details: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        error: "No saved board accounting report snapshot found.",
      });
    }

    return res.status(200).json({
      success: true,
      association_id: data.association_id,
      report_key: data.report_key,
      report_name: data.report_name,
      report_basis: data.report_basis,
      start_period: data.start_period,
      end_period: data.end_period,
      currency: data.currency,
      columns: data.columns || [],
      rows: data.rows || [],
      sync_status: data.sync_status,
      synced_at: data.synced_at,
      generated_at: data.updated_at,
    });
  } catch (error) {
    console.error("board-report-snapshot error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to load board accounting report snapshot.",
      details: error.message,
    });
  }
}
