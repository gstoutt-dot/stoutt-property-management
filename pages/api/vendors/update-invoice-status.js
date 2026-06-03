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
      action,
      actor_name,
      authorized_board_role,
      returned_to_vendor_note,
      payment_reference,
    } = req.body || {};

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Invoice id and status are required.",
      });
    }

    const now = new Date().toISOString();

    const updatePayload = {
      status,
      manager_note: manager_note || "",
      board_note: board_note || "",
      payment_readiness: payment_readiness || "Locked",
      updated_at: now,
    };

    if (action === "manager_approval") {
      updatePayload.manager_approved_at = now;
      updatePayload.manager_approved_by = actor_name || "Manager";
      updatePayload.payment_readiness = "Manager Approved";
    }

    if (action === "board_approval") {
      updatePayload.board_approved_at = now;
      updatePayload.board_approved_by = actor_name || "Board Treasurer";
      updatePayload.authorized_board_role =
        authorized_board_role || "Treasurer";
      updatePayload.payment_readiness = "Board Approved";
    }

    if (action === "return_to_vendor") {
      updatePayload.returned_to_vendor_at = now;
      updatePayload.returned_to_vendor_note =
        returned_to_vendor_note || manager_note || "";
      updatePayload.payment_readiness = "Locked";
    }

    if (action === "pay_now") {
      updatePayload.paid_at = now;
      updatePayload.paid_by = actor_name || "Manager";
      updatePayload.payment_status = "Paid";
      updatePayload.payment_reference = payment_reference || "";
      updatePayload.payment_readiness = "Paid";
    }

    const { data, error } = await supabaseAdmin
      .from("association_vendor_invoices")
      .update(updatePayload)
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
