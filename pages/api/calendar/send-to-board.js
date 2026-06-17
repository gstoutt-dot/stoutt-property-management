import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const FALLBACK_ASSOCIATION_ID = "79893883-6141-4dcc-ba1a-034d70a0dc96";

function cleanText(value) {
  return String(value || "").trim();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { event, attachment } = req.body || {};

    const associationId =
      cleanText(req.body?.association_id || req.body?.associationId) ||
      cleanText(event?.association_id || event?.associationId) ||
      FALLBACK_ASSOCIATION_ID;

    if (!event?.id) {
      return res.status(400).json({
        success: false,
        message: "Calendar event is required.",
      });
    }

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    const title = event.title || "Calendar Event Review";

    const attachmentBlock = attachment?.url
      ? [
          "",
          "CALENDAR_ATTACHMENT_METADATA_START",
          JSON.stringify({
            name: attachment.name || "Calendar Attachment",
            type: attachment.type || "application/octet-stream",
            category: attachment.category || "other",
            url: attachment.url,
          }),
          "CALENDAR_ATTACHMENT_METADATA_END",
        ].join("\n")
      : "";

    const description = [
      `Calendar Event: ${title}`,
      "",
      `Event Type: ${event.event_type || "general"}`,
      `Status: ${event.status || "scheduled"}`,
      `Priority: ${event.priority || "normal"}`,
      `Start: ${event.start_time || "Not specified"}`,
      `End: ${event.end_time || "Not specified"}`,
      `Location: ${event.location || "Not specified"}`,
      "",
      "Calendar Details:",
      event.description || "No description provided.",
      attachmentBlock,
    ].join("\n");

    const now = new Date().toISOString();

    const adminPayload = {
      association_id: associationId,
      created_by: "Admin",
      created_by_role: "admin",
      request_type: "calendar_event",
      title,
      description,
      priority: event.priority || "normal",
      status: "board_review",
      assigned_to: "board",
      board_review_required: true,
      owner_visible: false,
      vendor_visible: false,
      source_module: "association_calendar",
      routing_target: "board_approval_queue",
      recommended_action: "Board review requested for association calendar item.",
      created_at: now,
      updated_at: now,
    };

    const { data: adminRecord, error: adminError } = await supabaseAdmin
      .from("admin_operational_records")
      .insert(adminPayload)
      .select("*")
      .single();

    if (adminError) throw adminError;

    const bosDescription = [
      description,
      "",
      "Recommended Action:",
      "Board review requested for association calendar item.",
      "",
      `Admin Operational Record ID: ${adminRecord.id}`,
    ].join("\n");

    const { data: bosAction, error: bosError } = await supabaseAdmin
      .from("bos_actions")
      .insert({
        title,
        description: bosDescription,
        request_type: "calendar_event",
        category: "calendar_event",
        priority: event.priority || "normal",
        status: "board_review",

        association_id: associationId,
        association_name: "Selected Association",
        owner_name: "Admin",
        owner_phone: "",
        owner_email: "",
        property_address: "Association Calendar",
        best_contact_time: "Normal business hours",
        source: "association_calendar",

        board_comment: bosDescription,
        board_response: "calendar_event_requires_board_review",
        board_acknowledged: false,
        board_reviewed: false,
        board_last_interaction_at: now,
      })
      .select("*")
      .single();

    if (bosError) {
      console.error("Calendar BOS mirror failed:", bosError);

      return res.status(500).json({
        success: false,
        record: adminRecord,
        message: "Calendar item was sent, but Board Approval Queue mirror failed.",
        bosError: bosError.message,
      });
    }

    return res.status(200).json({
      success: true,
      record: adminRecord,
      bosAction,
      message: "Calendar item sent to the Board Approval Queue.",
    });
  } catch (error) {
    console.error("Calendar send-to-board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send calendar event to board.",
    });
  }
}
