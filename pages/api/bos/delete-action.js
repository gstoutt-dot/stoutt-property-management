import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
        const actionId = clean(req.query.id);
    const associationId =
      clean(req.query.association_id) || clean(req.query.associationId);

    if (!actionId) {
      return res.status(400).json({
        success: false,
        message: "Action ID is required.",
      });
    }

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    // Delete related notification events first
        const { error: eventError } = await supabaseAdmin
      .from("notification_events")
      .delete()
      .eq("action_id", actionId)
      .eq("association_id", associationId);

    if (eventError) {
      console.warn("Notification cleanup warning:", eventError);
    }

    // Delete BOS action
        const { error } = await supabaseAdmin
      .from("bos_actions")
      .delete()
      .eq("id", actionId)
      .eq("association_id", associationId);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "BOS action deleted successfully.",
    });
  } catch (error) {
    console.error("BOS delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete BOS action.",
    });
  }
}
