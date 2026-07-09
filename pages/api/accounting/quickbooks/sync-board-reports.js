// /pages/api/accounting/quickbooks/sync-board-reports.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

const REPORTS = [
  {
    key: "balance-sheet",
    name: "Balance Sheet",
    endpoint: "/api/accounting/quickbooks/balance-sheet",
  },
  {
    key: "profit-loss",
    name: "Profit & Loss",
    endpoint: "/api/accounting/quickbooks/profit-and-loss",
  },
  {
    key: "budget-vs-actual",
    name: "Budget vs Actual",
    endpoint: "/api/accounting/quickbooks/budget-vs-actual",
  },
  {
    key: "ar-aging",
    name: "A/R Aging",
    endpoint: "/api/accounting/quickbooks/ar-aging",
  },
  {
    key: "ap-aging",
    name: "A/P Aging",
    endpoint: "/api/accounting/quickbooks/ap-aging",
  },
  {
    key: "transaction-report",
    name: "Transaction Report",
    endpoint: "/api/accounting/quickbooks/transaction-report",
  },
];

function getBaseUrl(req) {
  const host = req.headers.host;
  const protocol = host?.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId =
      clean(req.query.association_id) ||
      clean(req.query.associationId) ||
      clean(req.body?.association_id) ||
      clean(req.body?.associationId);

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const baseUrl = getBaseUrl(req);
    const results = [];

    for (const report of REPORTS) {
      const params = new URLSearchParams({
        association_id: associationId,
        refresh: String(Date.now()),
      });

      const reportUrl = `${baseUrl}${report.endpoint}?${params.toString()}`;

      try {
        const response = await fetch(reportUrl, {
          cache: "no-store",
        });

        const json = await response.json();

        if (!json.success) {
          results.push({
            report_key: report.key,
            report_name: report.name,
            success: false,
            error: json.error || "Report sync failed.",
          });

          continue;
        }

        const { data, error } = await supabaseAdmin
          .from("board_accounting_report_snapshots")
          .upsert(
            {
              association_id: associationId,
              report_key: report.key,
              report_name: json.report_name || report.name,
              report_basis: json.report_basis || "Accrual",
              start_period: json.start_period || null,
              end_period: json.end_period || null,
              currency: json.currency || "USD",
              columns: json.columns || [],
              rows: json.rows || [],
              raw_report: json.raw_report || {},
              sync_status: "synced",
              synced_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: "association_id,report_key",
            }
          )
          .select("*")
          .single();

        if (error) {
          results.push({
            report_key: report.key,
            report_name: report.name,
            success: false,
            error: error.message,
          });

          continue;
        }

        results.push({
          report_key: report.key,
          report_name: report.name,
          success: true,
          modernized_response: Boolean(json.quickbooks_modernized_response),
          synced_at: data.synced_at,
        });
      } catch (reportError) {
        results.push({
          report_key: report.key,
          report_name: report.name,
          success: false,
          error: reportError.message,
        });
      }
    }

    return res.status(200).json({
      success: true,
      association_id: associationId,
      message: "Board accounting reports sync completed.",
      results,
      synced_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("sync-board-reports error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to sync board accounting reports.",
      details: error.message,
    });
  }
}
