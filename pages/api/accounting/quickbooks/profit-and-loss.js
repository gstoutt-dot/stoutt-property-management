// /pages/api/accounting/quickbooks/profit-and-loss.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getValidQuickBooksConnection } from "../../../../lib/quickbooksTokenManager";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  return process.env.QUICKBOOKS_ENVIRONMENT === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}

function getCurrentMonthRange() {
  const now = new Date();

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: firstDay.toISOString().slice(0, 10),
    endDate: lastDay.toISOString().slice(0, 10),
  };
}

function extractRows(rows = []) {
  const extracted = [];

  function walk(rowList, depth = 0) {
    rowList.forEach((row) => {
      const header = row.Header?.ColData?.[0]?.value;
      const summary = row.Summary?.ColData?.[0]?.value;
      const colData = row.ColData || [];

      if (header) {
        extracted.push({
          type: "header",
          depth,
          name: header,
          columns: [],
        });
      }

      if (colData.length > 0) {
        extracted.push({
          type: "row",
          depth,
          name: colData[0]?.value || "",
          columns: colData.slice(1).map((col) => col?.value || ""),
        });
      }

      if (row.Rows?.Row?.length) {
        walk(row.Rows.Row, depth + 1);
      }

      if (summary) {
        extracted.push({
          type: "summary",
          depth,
          name: summary,
          columns:
            row.Summary?.ColData?.slice(1).map((col) => col?.value || "") || [],
        });
      }
    });
  }

  walk(rows);
  return extracted;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      association_id,
      start_date,
      end_date,
      accounting_method = "Accrual",
    } = req.query;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const { startDate, endDate } = getCurrentMonthRange();

    const reportStartDate = start_date || startDate;
    const reportEndDate = end_date || endDate;

    const connection = await getValidQuickBooksConnection(association_id);

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: "No active QuickBooks connection found for this association.",
      });
    }

    const realmId = connection.realm_id;
    const accessToken = connection.access_token;

    if (!realmId || !accessToken) {
      return res.status(400).json({
        success: false,
        error: "QuickBooks connection is missing realm_id or access token.",
      });
    }

    const params = new URLSearchParams({
  minorversion: QUICKBOOKS_MINOR_VERSION,
  accounting_method,
  start_date: reportStartDate,
  end_date: reportEndDate,
  testing_migration: "true",
});

    const quickBooksUrl =
      `${getQuickBooksBaseUrl()}/v3/company/${realmId}/reports/ProfitAndLoss?${params.toString()}`;

    const quickBooksResponse = await fetch(quickBooksUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

const reportJson = await quickBooksResponse.json();

const modernizedResponse =
  quickBooksResponse.headers.get("v3modernResponse") === "true";
    if (!quickBooksResponse.ok) {
      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(reportJson),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(quickBooksResponse.status).json({
        success: false,
        error: "QuickBooks Profit and Loss request failed.",
        details: reportJson,
      });
    }

    const normalizedRows = extractRows(reportJson?.Rows?.Row || []);

    const columns =
      reportJson?.Columns?.Column?.map((column) => ({
        title: column?.ColTitle || "",
        type: column?.ColType || "",
      })) || [];

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        sync_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq("association_id", association_id);

    return res.status(200).json({
      success: true,
      association_id,
      token_status: "valid",
      access_token_expires_at:
        connection.access_token_expires_at || null,
      last_token_refresh_at:
        connection.last_token_refresh_at ||
        connection.last_refresh_at ||
        null,
      report_name: "Profit and Loss",
      report_period:
        reportJson?.Header?.ReportName || "Profit and Loss",
      report_basis:
        reportJson?.Header?.ReportBasis || accounting_method,
      start_period:
        reportJson?.Header?.StartPeriod || reportStartDate,
      end_period:
        reportJson?.Header?.EndPeriod || reportEndDate,
      currency: reportJson?.Header?.Currency || "USD",
      columns,
      rows: normalizedRows,
      raw_report: reportJson,
quickbooks_modernized_response: modernizedResponse,
testing_migration: true,
generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("profit-and-loss report error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to generate QuickBooks Profit and Loss report.",
      details: error.message,
    });
  }
}
