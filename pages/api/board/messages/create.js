import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { createBoardNotification } from "../../../../lib/notificationRouter";
import { getBoardNotificationRecipients } from "../../../../lib/boardNotificationRecipients";
import { sendBoardMessageEmailAlert } from "../../../../lib/emailDelivery";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

        const {
      association_id,
      subject,
      message_body,
      sent_by_name,
      sent_by_role,
      sent_to_role,
      message_type,
      priority,
    } = req.body || {};

    if (!subject || !message_body) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required.",
      });
    }

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("board_messages")
      .insert({
        association_id: association_id || DEFAULT_ASSOCIATION_ID,
        subject: String(subject).trim(),
        message_body: String(message_body).trim(),
        sent_by_name: sent_by_name || "Admin",
        sent_by_role: sent_by_role || "admin",
        sent_to_role: sent_to_role || "board",
        message_type: message_type || "general",
        status: "sent",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

        if (error) throw error;

        if ((sent_to_role || "").toLowerCase() === "board") {
      const boardRecipientsResult = await getBoardNotificationRecipients(
        association_id || DEFAULT_ASSOCIATION_ID
      );

      await createBoardNotification({
        associationId: association_id || DEFAULT_ASSOCIATION_ID,
        notificationType: "board_message",
        title: `New board message: ${String(subject).trim()}`,
        message:
          "Management has sent a new board message. Please log in to SPM to review and respond.",
        relatedEntityType: "board_message",
        relatedEntityId: data.id,
        priority: priority || message_type || "normal",
      });

            const emailResults = [];

      for (const recipient of boardRecipientsResult.recipients || []) {
        const emailResult = await sendBoardMessageEmailAlert({
          to: recipient.email,
          recipientName: recipient.name || "Board Member",
          subject: `New board message: ${String(subject).trim()}`,
          messageTitle: String(subject).trim(),
        });

        emailResults.push({
          recipient_email: recipient.email,
          success: emailResult.success,
          skipped: emailResult.skipped,
          error: emailResult.error,
        });

        await supabaseAdmin.from("notifications").insert({
          association_id: association_id || DEFAULT_ASSOCIATION_ID,
          recipient_user_id: null,
          recipient_role: "board",
          notification_type: "board_message_email_alert",
          title: `New board message: ${String(subject).trim()}`,
          message:
            "Management has sent a new board message. Please log in to SPM to review and respond.",
          related_entity_type: "board_message",
          related_entity_id: data.id,
          priority: priority || "normal",
          delivery_channel: "email",
          delivery_status: emailResult.success
            ? "sent"
            : emailResult.skipped
            ? "skipped_pending_configuration"
            : "failed",
          created_by_user_id: null,
          is_read: false,
        });
      }
    }


    if ((sent_by_role || "").toLowerCase() === "board") {
      const { error: recordError } = await supabaseAdmin
        .from("admin_operational_records")
        .insert({
          association_id: association_id || DEFAULT_ASSOCIATION_ID,
          created_by: sent_by_name || "Board Member",
          created_by_role: "board",
          request_type: "board_message",
          title: `Board Message: ${String(subject).trim()}`,
          description: [
            `Message Type: ${message_type || "general"}`,
            `Priority: ${priority || "normal"}`,
            "",
            "Board Message:",
            String(message_body).trim(),
          ].join("\n"),
          priority: priority || "normal",
          status: "open",
          assigned_to: "manager",
          board_review_required: false,
          owner_visible: false,
          vendor_visible: false,
          source_module: "board_message_inbox",
          routing_target: "manager_command_center",
          recommended_action: "Management response requested by board.",
          created_at: now,
          updated_at: now,
        });

      if (recordError) throw recordError;
    }

    return res.status(200).json({ success: true, message: data });
  } catch (error) {
    console.error("Create board message error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create board message.",
    });
  }
}
