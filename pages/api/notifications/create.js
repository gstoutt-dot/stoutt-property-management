import { supabase } from "../../../lib/supabaseClient";
import { buildNotificationEvent } from "../../../lib/notificationEngine";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { action, eventType } = req.body || {};

    if (!action?.id || !eventType) {
      return res.status(400).json({
        success: false,
        error: "Missing action or eventType.",
      });
    }

    const notification = buildNotificationEvent(action, eventType);

    const { data, error } = await supabase
      .from("bos_notifications")
      .insert([notification])
      .select()
      .single();

    if (error) {
      console.error("Notification API insert failed:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Unable to create notification.",
      });
    }

    return res.status(200).json({
      success: true,
      notification: data,
    });
  } catch (error) {
    console.error("Notification API failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected notification error.",
    });
  }
}
