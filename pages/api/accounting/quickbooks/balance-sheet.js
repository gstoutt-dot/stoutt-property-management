// /pages/api/accounting/quickbooks/balance-sheet.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getValidQuickBooksConnection } from "../../../../lib/quickbooksTokenManager";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  return process.env.QUICKBOOKS_ENVIRONMENT === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
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
          amount: null,
        });
      }

      if (colData.length > 0) {
        extracted.push({
          type: "row",
          depth,
          name: colData[0]?.value || "",
          amount: colData[1]?.value || "",
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
          amount: row.Summary?.ColData?.[1]?.value || "",
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

    const reportEndDate =
      end_date || new Date().toISOString().slice(0, 10);

    const params = new URLSearchParams({
  minorversion: QUICKBOOKS_MINOR_VERSION,
  accounting_method,
  end_date: reportEndDate,
  });

    if (start_date) {
      params.set("start_date", start_date);
    }

    const quickBooksUrl =
      `${getQuickBooksBaseUrl()}/v3/company/${realmId}/reports/BalanceSheet?${params.toString()}`;

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
        error: "QuickBooks Balance Sheet request failed.",
        details: reportJson,
      });
    }

    const normalizedRows = extractRows(reportJson?.Rows?.Row || []);

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
      report_name: "Balance Sheet",
      report_period:
        reportJson?.Header?.ReportName || "Balance Sheet",
      report_basis:
        reportJson?.Header?.ReportBasis || accounting_method,
      start_period:
        reportJson?.Header?.StartPeriod || start_date || null,
      end_period:
        reportJson?.Header?.EndPeriod || reportEndDate,
      currency: reportJson?.Header?.Currency || "USD",
      rows: normalizedRows,
      raw_report: reportJson,
quickbooks_modernized_response: modernizedResponse,
generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("balance-sheet report error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to generate QuickBooks Balance Sheet report.",
      details: error.message,
    });
  }
}
