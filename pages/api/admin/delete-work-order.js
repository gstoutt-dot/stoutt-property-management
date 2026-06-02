import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing work order id.",
      });
    }

    const workOrderId = String(id).trim();

    const { error: bosDeleteError } = await supabaseAdmin
      .from("bos_actions")
      .delete()
      .ilike("source", `%homeowner_request:${workOrderId}%`);

    if (bosDeleteError) {
      throw bosDeleteError;
    }

    const { error: requestDeleteError } = await supabaseAdmin
      .from("homeowner_service_requests")
      .delete()
      .eq("id", workOrderId);

    if (requestDeleteError) {
      throw requestDeleteError;
    }

    return res.status(200).json({
      success: true,
      message: "Work order and linked BOS action deleted successfully.",
    });
  } catch (error) {
    console.error("Admin delete work order error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete work order.",
    });
  }
}
