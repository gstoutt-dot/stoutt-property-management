import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const associationId = req.query.association_id || DEFAULT_ASSOCIATION_ID;

      const { data, error } = await supabaseAdmin
        .from("association_calendar_events")
        .select("*")
        .eq("association_id", associationId)
        .order("start_time", { ascending: true });

      if (error) throw error;

      return res.status(200).json({
        success: true,
        events: data || [],
      });
    }

    if (req.method === "POST") {
      const {
        association_id,
        title,
        description,
        event_type,
        start_time,
        end_time,
        location,
        priority,
        status,
      } = req.body || {};

      if (!title || !start_time) {
        return res.status(400).json({
          success: false,
          message: "Title and start time are required.",
        });
      }

      const now = new Date().toISOString();

      const { data, error } = await supabaseAdmin
        .from("association_calendar_events")
        .insert({
          association_id: association_id || DEFAULT_ASSOCIATION_ID,
          title: String(title).trim(),
          description: description || "",
          event_type: event_type || "general",
          start_time,
          end_time: end_time || null,
          location: location || "",
          priority: priority || "normal",
          status: status || "scheduled",
          created_at: now,
          updated_at: now,
        })
        .select("*")
        .single();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        event: data,
      });
    }

    if (req.method === "PATCH") {
      const { id, updates } = req.body || {};

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Calendar event ID is required.",
        });
      }

      const allowedUpdates = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabaseAdmin
        .from("association_calendar_events")
        .update(allowedUpdates)
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        event: data,
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  } catch (error) {
    console.error("Calendar events API error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Calendar operation failed.",
    });
  }
}
