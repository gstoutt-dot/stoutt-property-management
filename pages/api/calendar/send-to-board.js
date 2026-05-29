import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { event } = req.body || {};

    if (!event?.id) {
      return res.status(400).json({
        success: false,
        message: "Calendar event is required.",
      });
    }

    const title = event.title || "Calendar Event Review";

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
    ].join("\n");

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
        association_id: event.association_id || DEFAULT_ASSOCIATION_ID,
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
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      record: data,
    });
  } catch (error) {
    console.error("Calendar send-to-board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send calendar event to board.",
    });
  }
}
