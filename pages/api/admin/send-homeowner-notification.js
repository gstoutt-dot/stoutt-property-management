import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { sendHomeownerNotificationEmailAlert } from "../../../lib/emailDelivery";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { associationId, association_id } = req.query || {};

      const resolvedAssociationId = String(
        associationId || association_id || ""
      ).trim();

      if (!resolvedAssociationId) {
        return res.status(400).json({
          success: false,
          error: "Missing associationId.",
        });
      }

      const { data, error } = await supabaseAdmin
        .from("homeowner_notifications")
        .select("*")
        .eq("association_id", resolvedAssociationId)
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        notifications: data || [],
      });
    }

    if (req.method === "POST") {
      const {
        associationId,
        association_id,
        sendTo,
        category,
        priority,
        title,
        message,
        unitNumber,
        unit_number,
        ownerUserId,
        owner_user_id,
      } = req.body || {};

      const resolvedAssociationId = String(
        associationId || association_id || ""
      ).trim();

      const resolvedSendTo = String(sendTo || "Entire Association").trim();
      const resolvedCategory = String(
        category || "Association Announcements"
      ).trim();
      const resolvedPriority = String(priority || "Normal").trim();
      const resolvedTitle = String(title || "").trim();
      const resolvedMessage = String(message || "").trim();

      const resolvedUnitNumber = String(unitNumber || unit_number || "").trim();
      const resolvedOwnerUserId = String(
        ownerUserId || owner_user_id || ""
      ).trim();

      if (!resolvedAssociationId) {
        return res.status(400).json({
          success: false,
          error: "Missing associationId.",
        });
      }

      if (!resolvedTitle) {
        return res.status(400).json({
          success: false,
          error: "Notification title is required.",
        });
      }

      if (!resolvedMessage) {
        return res.status(400).json({
          success: false,
          error: "Notification message is required.",
        });
      }

      let targetUnitNumber = null;
      let targetOwnerUserId = null;

      if (resolvedSendTo === "Specific Unit") {
        if (!resolvedUnitNumber) {
          return res.status(400).json({
            success: false,
            error: "Unit number is required for a unit-specific notification.",
          });
        }

        targetUnitNumber = resolvedUnitNumber;
      }

      if (resolvedSendTo === "Specific Owner") {
        if (!resolvedOwnerUserId) {
          return res.status(400).json({
            success: false,
            error: "Owner user ID is required for an owner-specific notification.",
          });
        }

        targetOwnerUserId = resolvedOwnerUserId;
      }

      const insertPayload = {
        association_id: resolvedAssociationId,
        owner_user_id: targetOwnerUserId,
        unit_number: targetUnitNumber,
        category: resolvedCategory,
        priority: resolvedPriority,
        title: resolvedTitle,
        message: resolvedMessage,
        read_status: false,
      };

      const { data: notification, error: notificationError } =
        await supabaseAdmin
          .from("homeowner_notifications")
          .insert(insertPayload)
          .select("*")
          .single();

      if (notificationError) throw notificationError;

      let ownerQuery = supabaseAdmin
        .from("owner_account_balances")
        .select("owner_name, owner_email, unit_number, owner_user_id")
        .eq("association_id", resolvedAssociationId);

      if (resolvedSendTo === "Specific Unit" && targetUnitNumber) {
        ownerQuery = ownerQuery.eq("unit_number", targetUnitNumber);
      }

      if (resolvedSendTo === "Specific Owner" && targetOwnerUserId) {
        ownerQuery = ownerQuery.eq("owner_user_id", targetOwnerUserId);
      }

      const { data: ownerRecipients, error: ownerRecipientError } =
        await ownerQuery;

      if (ownerRecipientError) throw ownerRecipientError;

      const emailResults = [];

      for (const owner of ownerRecipients || []) {
        if (!owner.owner_email) continue;

        const emailResult = await sendHomeownerNotificationEmailAlert({
          to: owner.owner_email,
          recipientName: owner.owner_name || "Homeowner",
          subject: `New homeowner notice: ${resolvedTitle}`,
          notificationTitle: resolvedTitle,
          messageBody: resolvedMessage,
        });

        emailResults.push({
          unit_number: owner.unit_number,
          owner_name: owner.owner_name,
          owner_email: owner.owner_email,
          success: emailResult.success,
          skipped: emailResult.skipped,
          error: emailResult.error,
        });

        await supabaseAdmin.from("notifications").insert({
          association_id: resolvedAssociationId,
          user_id: null,
          request_id: null,
          title: `New homeowner notice: ${resolvedTitle}`,
          message:
            "Management has sent a homeowner notice. Please log in to SPM to review your homeowner message center.",
          channel: "email",
          status: emailResult.success
            ? "sent"
            : emailResult.skipped
            ? "skipped_pending_configuration"
            : "failed",
        });
      }

      return res.status(200).json({
        success: true,
        notification,
        email_results: emailResults,
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed.",
    });
  } catch (error) {
    console.error("send-homeowner-notification error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  }
}
