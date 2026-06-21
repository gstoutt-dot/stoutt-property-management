import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function formatCategory(value = "") {
  return String(value || "other")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { report } = req.body || {};

    if (!report?.id) {
      return res.status(400).json({
        success: false,
        message: "Report is required.",
      });
    }

    const associationId = String(report.association_id || "").trim();

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    const title = report.report_name || "Association Report Review";

    const description = [
      `Association Report: ${title}`,
      "",
      `Report Category: ${formatCategory(report.report_category)}`,
      `Uploaded By: ${report.uploaded_by || "Admin"}`,
      `Uploaded At: ${report.uploaded_at || "Not specified"}`,
      "",
      "Report Summary:",
      report.description || "No description provided.",
      "",
      "REPORT_ATTACHMENT_METADATA_START",
      JSON.stringify({
        name: report.report_file_name || title,
        type: report.report_type || "application/octet-stream",
        category: report.report_category || "other",
        url: report.report_url || "",
      }),
      "REPORT_ATTACHMENT_METADATA_END",
    ].join("\n");

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
        association_id: associationId,
        created_by: "Admin",
        created_by_role: "admin",
        request_type: "association_report",
        title,
        description,
        priority: "normal",
        status: "board_review",
        assigned_to: "board",
        board_review_required: true,
        owner_visible: false,
        vendor_visible: false,
        source_module: "association_reporting_center",
        routing_target: "board_approval_queue",
        recommended_action: "Board review requested for association report.",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      record: data,
    });
  } catch (error) {
    console.error("Association report send-to-board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send report to board.",
    });
  }
}
