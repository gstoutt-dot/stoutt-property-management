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

    const { vendor, documents = [], association_id } = req.body || {};

    if (!vendor?.id) {
      return res.status(400).json({
        success: false,
        message: "Vendor record is required.",
      });
    }

    const associationId = association_id || DEFAULT_ASSOCIATION_ID;

    const vendorName =
      vendor.vendor_name ||
      vendor.vendor_display_name ||
      vendor.company_name ||
      "Association Vendor";

    const documentSummary =
      documents.length > 0
        ? documents
            .map((document) => {
              return `- ${document.document_category || "Document"}: ${
                document.document_name || document.file_name || "Vendor Document"
              }`;
            })
            .join("\n")
        : "No vendor documents have been uploaded yet.";

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
        association_id: associationId,
        title: `${vendorName} Vendor Authorization Review`,
        description: [
          `Vendor: ${vendorName}`,
          `Email: ${vendor.email || vendor.primary_email || "Not Provided"}`,
          `Phone: ${vendor.phone || vendor.primary_phone || "Not Provided"}`,
          `Address: ${vendor.address || "Not Provided"}`,
          "",
          "Vendor Documents:",
          documentSummary,
          "",
          "Board review requested for association approved vendor authorization.",
        ].join("\n"),
        request_type: "vendor_authorization",
        priority: "Normal",
        status: "Submitted",
        routing_target: "board_approval_queue",
        source_module: "association_approved_vendors",
        recommended_action:
          "Board should review the vendor legal file and authorize whether this vendor should be treated as an association approved vendor.",
        created_by: "Admin",
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
    console.error("Send vendor to board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send vendor to board.",
    });
  }
}
