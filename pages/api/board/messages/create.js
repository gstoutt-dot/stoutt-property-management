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
    const resolvedAssociationId = association_id || DEFAULT_ASSOCIATION_ID;
    const resolvedSentToRole = sent_to_role || "board";

    const { data, error } = await supabaseAdmin
      .from("board_messages")
      .insert({
        association_id: resolvedAssociationId,
        subject: String(subject).trim(),
        message_body: String(message_body).trim(),
        sent_by_name: sent_by_name || "Admin",
        sent_by_role: sent_by_role || "admin",
        sent_to_role: resolvedSentToRole,
        message_type: message_type || "general",
        status: "sent",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

        if (error) throw error;

            if (String(resolvedSentToRole || "").toLowerCase() === "board") {
      const notificationTitle = `New board message: ${String(subject).trim()}`;
      const notificationMessage =
        "Management has sent a new board message. Please log in to SPM to review and respond.";

      await supabaseAdmin.from("notifications").insert({
        association_id: resolvedAssociationId,
        user_id: null,
        request_id: null,
        title: notificationTitle,
        message: notificationMessage,
        channel: "portal",
        status: "unread",
      });

      const boardRecipientsResult = await getBoardNotificationRecipients(
        resolvedAssociationId
      );

      for (const recipient of boardRecipientsResult.recipients || []) {
        const emailResult = await sendBoardMessageEmailAlert({
          to: recipient.email,
          recipientName: recipient.name || "Board Member",
          subject: notificationTitle,
          messageTitle: String(subject).trim(),
        });

        await supabaseAdmin.from("notifications").insert({
          association_id: resolvedAssociationId,
          user_id: null,
          request_id: null,
          title: notificationTitle,
          message: notificationMessage,
          channel: "email",
          status: emailResult.success
            ? "sent"
            : emailResult.skipped
            ? "skipped_pending_configuration"
            : "failed",
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
