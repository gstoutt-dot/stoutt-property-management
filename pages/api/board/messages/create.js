import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
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

    const resolvedAssociationId = String(association_id || "").trim();

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    if (!subject || !message_body) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required.",
      });
    }

    const now = new Date().toISOString();
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
        priority: priority || "normal",
        status: "sent",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    await supabaseAdmin.from("notifications").insert({
      association_id: resolvedAssociationId,
      user_id: null,
      request_id: null,
      title: `New board message: ${String(subject).trim()}`,
      message:
        "Management has sent a new board message. Please log in to BOSai to review and respond.",
      channel: "portal",
      status: "unread",
      created_at: now,
    });

    if (String(sent_by_role || "").toLowerCase() === "board") {
      const { error: recordError } = await supabaseAdmin
        .from("admin_operational_records")
        .insert({
          association_id: resolvedAssociationId,
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

    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.error("Create board message error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create board message.",
    });
  }
}
