import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const notificationId = req.query.id;

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "Notification ID is required.",
      });
    }

    if (String(notificationId).startsWith("action-")) {
      const actionId = String(notificationId).replace("action-", "");

      const { error } = await supabaseAdmin
        .from("bos_actions")
        .delete()
        .eq("id", actionId);

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
