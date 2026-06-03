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

    const { error: deleteError } = await supabaseAdmin
      .from("association_vendor_invoices")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return res.status(200).json({
      success: true,
      message: "Vendor invoice deleted.",
    });
  } catch (error) {
    console.error("Vendor invoice delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete vendor invoice.",
    });
  }
}
