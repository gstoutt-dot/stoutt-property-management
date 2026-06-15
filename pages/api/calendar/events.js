import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}
export default async function handler(req, res) {
  try {
        if (req.method === "GET") {
      const associationId =
        clean(req.query.association_id) || clean(req.query.associationId);

      if (!associationId) {
        return res.status(400).json({
          success: false,
          message: "Association ID is required.",
        });
      }
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
        associationId,
        title,
        description,
        event_type,
        start_time,
        end_time,
        location,
        priority,
        status,
      } = req.body || {};

      const finalAssociationId = clean(association_id) || clean(associationId);

            if (!finalAssociationId) {
        return res.status(400).json({
          success: false,
          message: "Association ID is required.",
        });
      }

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
          association_id: finalAssociationId,
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
      const { id, association_id, associationId, updates } = req.body || {};
      const finalAssociationId = clean(association_id) || clean(associationId);

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Calendar event ID is required.",
        });
      }

      if (!finalAssociationId) {
        return res.status(400).json({
          success: false,
          message: "Association ID is required.",
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
        .eq("association_id", finalAssociationId)
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
