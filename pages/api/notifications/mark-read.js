import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const { notificationId, associationId } = req.body || {};

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        error: "Missing notificationId.",
      });
    }

   const resolvedAssociationId =
  associationId || "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

    const { data, error } = await supabaseAdmin
      .from("notifications")
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", notificationId)
     .eq("association_id", resolvedAssociationId)
      .select("*")
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
      error: error?.message || "Unexpected notification mark-read error.",
      stack: error?.stack || null,
    });
  }
}
