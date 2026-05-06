import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { notificationId } = req.body || {};

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        error: "Missing notificationId.",
      });
    }

    const { data, error } = await supabase
      .from("bos_notifications")
      .update({
        status: "read",
        read_at: new Date().toISOString(),
      })
      .eq("id", notificationId)
      .select()
      .single();

    if (error) {
      console.error("Notification mark-read failed:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Unable to mark notification as read.",
      });
    }

    return res.status(200).json({
      success: true,
      notification: data,
    });
  } catch (error) {
    console.error("Notification mark-read API failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected notification mark-read error.",
    });
  }
}
