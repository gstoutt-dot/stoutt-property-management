import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value) {
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
    const notificationId = cleanText(req.query.id);
    const associationId = cleanText(
      req.query.association_id || req.query.associationId
    );

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "Notification ID is required.",
      });
    }

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    if (notificationId.startsWith("action-")) {
      const actionId = notificationId.replace("action-", "");

      const { error } = await supabaseAdmin
        .from("bos_actions")
        .delete()
        .eq("id", actionId)
        .eq("association_id", associationId);

      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("bos_events")
        .delete()
        .eq("id", notificationId);

      if (error) throw error;
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.error("Delete board notification error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete notification.",
    });
  }
}
