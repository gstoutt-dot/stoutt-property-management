// /pages/api/accounting/quickbooks/ap-aging.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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
        extracted.push({ type: "header", depth, name: header, columns: [] });
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
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { association_id, report_date } = req.query;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const reportDate = report_date || new Date().toISOString().slice(0, 10);

    const { data: connection, error: connectionError } = await supabaseAdmin
      .from("quickbooks_connections")
      .select("*")
      .eq("association_id", association_id)
      .eq("connection_status", "connected")
      .maybeSingle();

    if (connectionError) {
      return res.status(500).json({
        success: false,
        error: "Unable to load QuickBooks connection.",
        details: connectionError.message,
      });
    }

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: "No active QuickBooks connection found for this association.",
      });
    }

    const realmId = connection.realm_id;
    const accessToken =
      connection.access_token ||
      connection.quickbooks_access_token ||
      connection.qbo_access_token;

    if (!realmId || !accessToken) {
      return res.status(400).json({
        success: false,
        error: "QuickBooks connection is missing realm_id or access token.",
      });
    }

    const params = new URLSearchParams({
      minorversion: QUICKBOOKS_MINOR_VERSION,
      report_date: reportDate,
    });

    const quickBooksUrl = `${getQuickBooksBaseUrl()}/v3/company/${realmId}/reports/AgedPayables?${params.toString()}`;

    const quickBooksResponse = await fetch(quickBooksUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const reportJson = await quickBooksResponse.json();

    if (!quickBooksResponse.ok) {
      return res.status(quickBooksResponse.status).json({
        success: false,
        error: "QuickBooks A/P Aging request failed.",
        details: reportJson,
      });
    }

    const columns =
      reportJson?.Columns?.Column?.map((column) => ({
        title: column?.ColTitle || "",
        type: column?.ColType || "",
      })) || [];

    return res.status(200).json({
      success: true,
      association_id,
      report_name: "A/P Aging",
      report_period: reportJson?.Header?.ReportName || "A/P Aging",
      report_basis: reportJson?.Header?.ReportBasis || "Accrual",
      start_period: reportJson?.Header?.StartPeriod || null,
      end_period: reportJson?.Header?.EndPeriod || reportDate,
      currency: reportJson?.Header?.Currency || "USD",
      columns,
      rows: extractRows(reportJson?.Rows?.Row || []),
      raw_report: reportJson,
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("ap-aging report error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to generate QuickBooks A/P Aging report.",
      details: error.message,
    });
  }
}
