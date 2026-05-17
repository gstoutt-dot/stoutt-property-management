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
      associationId,
      association_id,
      ownerUserId,
      owner_user_id,
      unitNumber,
      unit_number,
    } = req.body || {};

    const resolvedNotificationId = String(
      notificationId || notification_id || ""
    ).trim();

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const resolvedOwnerUserId = String(
      ownerUserId || owner_user_id || ""
    ).trim();

    const resolvedUnitNumber = String(
      unitNumber || unit_number || ""
    ).trim();

    if (!resolvedNotificationId) {
      return res.status(400).json({
        success: false,
        error: "Missing notificationId.",
      });
    }

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    if (!resolvedOwnerUserId) {
      return res.status(400).json({
        success: false,
        error: "Missing ownerUserId.",
      });
    }

    const readPayload = {
      notification_id: resolvedNotificationId,
      association_id: resolvedAssociationId,
      owner_user_id: resolvedOwnerUserId,
      unit_number: resolvedUnitNumber || null,
      read_status: true,
      read_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("homeowner_notification_reads")
      .upsert(readPayload, {
        onConflict: "notification_id,owner_user_id",
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      readRecord: data,
    });
  } catch (error) {
    console.error("mark-read error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  }
}
