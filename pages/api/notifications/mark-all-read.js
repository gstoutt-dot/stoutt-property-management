import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const {
      associationId,
      recipientRole,
      recipientUserId,
    } = req.body || {};

    const safeAssociationId = cleanText(associationId);
    const safeRecipientRole = cleanText(recipientRole).toLowerCase();
    const safeRecipientUserId = cleanText(recipientUserId);

    const resolvedAssociationId =
  safeAssociationId || "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

    let query = supabaseAdmin
      .from("notifications")
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq("association_id", resolvedAssociationId)
      .eq("is_read", false);

    if (safeRecipientRole) {
      query = query.eq("recipient_role", safeRecipientRole);
    }

    if (safeRecipientUserId) {
      query = query.eq("recipient_user_id", safeRecipientUserId);
    }

    const { data, error } = await query.select("*");

    if (error) {
      console.error("Notification mark-all-read failed:", error);

      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Unable to mark notifications as read.",
      });
    }

    return res.status(200).json({
      success: true,
      updated: data?.length || 0,
      notifications: data || [],
    });
  } catch (error) {
    console.error("Notification mark-all-read API failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unexpected notification mark-all-read error.",
      stack: error?.stack || null,
    });
  }
}
