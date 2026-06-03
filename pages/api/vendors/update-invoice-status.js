import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const {
      id,
      status,
      manager_note,
      board_note,
      payment_readiness,
    } = req.body || {};

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Invoice id and status are required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("association_vendor_invoices")
      .update({
        status,
        manager_note: manager_note || "",
        board_note: board_note || "",
        payment_readiness: payment_readiness || "Locked",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      invoice: data,
    });
  } catch (error) {
    console.error("Vendor invoice status update error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update vendor invoice.",
    });
  }
}
