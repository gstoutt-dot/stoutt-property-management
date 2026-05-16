import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed.",
    });
  }

  try {
    const {
      notificationId,
      notification_id,
    } = req.body || {};

    const resolvedNotificationId = String(
      notificationId || notification_id || ""
    ).trim();

    if (!resolvedNotificationId) {
      return res.status(400).json({
        success: false,
        error: "Missing notificationId.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("homeowner_notifications")
      .update({
  read_status: true,
})
      .eq("id", resolvedNotificationId)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      notification: data,
    });
  } catch (error) {
    console.error("mark-read error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  }
}
