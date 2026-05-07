import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use GET.",
    });
  }

  try {
    const {
      associationId,
      recipientRole,
      recipientUserId,
    } = req.query || {};

    const safeAssociationId = cleanText(associationId);
    const safeRecipientRole = cleanText(recipientRole).toLowerCase();
    const safeRecipientUserId = cleanText(recipientUserId);

    if (!safeAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    let query = supabaseAdmin
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("association_id", safeAssociationId)
      .eq("is_read", false);

    if (safeRecipientRole) {
      query = query.eq("recipient_role", safeRecipientRole);
    }

    if (safeRecipientUserId) {
      query = query.eq("recipient_user_id", safeRecipientUserId);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Notification unread-count failed:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Unable to load unread notification count.",
        count: 0,
      });
    }

    return res.status(200).json({
      success: true,
      count: count || 0,
    });
  } catch (error) {
    console.error("Notification unread-count API failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unexpected notification unread-count error.",
      stack: error?.stack || null,
      count: 0,
    });
  }
}
