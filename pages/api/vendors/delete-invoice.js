import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const STORAGE_BUCKET = "meeting-packets";

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { id } = req.query || {};

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invoice id is required.",
      });
    }

    const { data: invoice, error: findError } = await supabaseAdmin
      .from("association_vendor_invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (findError) throw findError;

    if (invoice?.file_path) {
      const { error: storageError } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .remove([invoice.file_path]);

      if (storageError) {
        console.error("Vendor invoice storage delete warning:", storageError);
      }
    }

    const expectedTitle = `${invoice.vendor_name || "Vendor"} Invoice Approval - ${
      invoice.invoice_number || "Invoice"
    }`;

    const { error: boardDeleteError } = await supabaseAdmin
      .from("admin_operational_records")
      .delete()
      .eq("association_id", invoice.association_id)
      .eq("source_module", "vendor_invoice_processing")
      .eq("request_type", "vendor_invoice_approval")
      .eq("title", expectedTitle);

    if (boardDeleteError) {
      console.error("Vendor invoice board queue delete warning:", boardDeleteError);
    }

    const { error: deleteError } = await supabaseAdmin
      .from("association_vendor_invoices")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return res.status(200).json({
      success: true,
      message: "Vendor invoice and matching board queue record deleted.",
    });
  } catch (error) {
    console.error("Vendor invoice delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete vendor invoice.",
    });
  }
}
