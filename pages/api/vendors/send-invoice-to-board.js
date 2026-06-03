import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const {
      association_id,
      invoice,
      manager_note,
      compliance_status,
      missing_documents,
    } = req.body || {};

    if (!invoice?.id) {
      return res.status(400).json({
        success: false,
        message: "Invoice record is required.",
      });
    }

    const associationId = association_id || DEFAULT_ASSOCIATION_ID;
    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
        association_id: associationId,
        title: `${invoice.vendor_name || "Vendor"} Invoice Approval - ${
          invoice.invoice_number || "Invoice"
        }`,
        description: [
          `Vendor: ${invoice.vendor_name || "Vendor"}`,
          `Invoice Number: ${invoice.invoice_number || "N/A"}`,
          `Amount: $${Number(invoice.amount || 0).toLocaleString()}`,
          `Invoice Date: ${invoice.invoice_date || "Not Provided"}`,
          `Due Date: ${invoice.due_date || "Not Provided"}`,
          "",
          `Compliance Status: ${compliance_status || "Not Verified"}`,
          missing_documents?.length
            ? `Missing Documents: ${missing_documents.join(", ")}`
            : "Missing Documents: None",
          "",
          `Manager Note: ${manager_note || "No manager note provided."}`,
          "",
          invoice.file_url
            ? `Invoice File: ${invoice.file_url}`
            : "Invoice File: Not Available",
          "",
          "Board/Treasurer approval requested before payment execution.",
        ].join("\n"),
        request_type: "vendor_invoice_approval",
        priority: "Normal",
        status: "Submitted",
        routing_target: "board_approval_queue",
        source_module: "vendor_invoice_processing",
        recommended_action:
          "Board Treasurer should review the vendor invoice, verify the amount and supporting documentation, and approve or request more information before payment.",
        created_by: "Manager",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    await supabaseAdmin
      .from("association_vendor_invoices")
      .update({
        status: "Ready for Board",
        payment_readiness: "Board Review Pending",
        board_note: "Sent to Board Approval Queue for Treasurer review.",
        updated_at: now,
      })
      .eq("id", invoice.id);

    return res.status(200).json({
      success: true,
      record: data,
    });
  } catch (error) {
    console.error("Send vendor invoice to board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send invoice to board.",
    });
  }
}
