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
      unreadOnly,
      limit,
    } = req.query || {};

    const safeAssociationId = cleanText(associationId);
    const safeRecipientRole = cleanText(recipientRole).toLowerCase();
    const safeRecipientUserId = cleanText(recipientUserId);
    const safeUnreadOnly =
      cleanText(unreadOnly).toLowerCase() === "true";

    if (!safeAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    let query = supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("association_id", safeAssociationId)
      .order("created_at", { ascending: false })
      .limit(Number(limit) || 50);

    if (safeRecipientRole) {
      query = query.eq("recipient_role", safeRecipientRole);
    }

    if (safeRecipientUserId) {
      query = query.eq("recipient_user_id", safeRecipientUserId);
    }

    if (safeUnreadOnly) {
      query = query.eq("is_read", false);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Notification list failed:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Unable to load notifications.",
        notifications: [],
      });
    }

    return res.status(200).json({
      success: true,
      notifications: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Notification list API failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unexpected notification list error.",
      stack: error?.stack || null,
      notifications: [],
    });
  }
}
