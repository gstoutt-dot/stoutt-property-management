import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const { association_id, packet } = req.body || {};

    if (!association_id || !packet?.id) {
      return res.status(400).json({
        success: false,
        message: "Missing association_id or packet.",
      });
    }

    const now = new Date().toISOString();

    const { error: recordError } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
        association_id,
        created_by: "Meeting Packet Workspace",
        created_by_role: "Admin",
        request_type: "board_meeting_packet",
        title: packet.title || "Board Meeting Packet",
        description: `
A meeting packet has been sent to the board for review.

Packet ID:
${packet.id}

Agenda:
${packet.agenda_text || "No agenda provided."}

Packet Notes:
${packet.packet_notes || "No packet notes provided."}

Attachments:
${
  Array.isArray(packet.attachments) && packet.attachments.length > 0
    ? packet.attachments
        .map((file) => `- ${file.file_name || "Attachment"}: ${file.file_url}`)
        .join("\n")
    : "No attachments uploaded."
}
        `,
        priority: "Normal",
        status: "Submitted",
        assigned_to: "Board",
        board_review_required: true,
        owner_visible: false,
        vendor_visible: false,
        source_module: "Meeting Packets",
        routing_target: "Board Approval Queue",
        recommended_action:
          "Review the meeting packet, open attachments, acknowledge receipt, or request more information.",
        created_at: now,
        updated_at: now,
      });

    if (recordError) {
      throw recordError;
    }

    return res.status(200).json({
      success: true,
      message: "Meeting packet routed to board.",
    });
  } catch (error) {
    console.error("send-to-board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send packet to board.",
    });
  }
}
