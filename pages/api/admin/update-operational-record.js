import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { id, status, board_event_type, board_message } = req.body || {};

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Record ID is required.",
      });
    }

    const updatePayload = {
      status,
      board_last_action: board_event_type,
      board_last_message: board_message,
      board_updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      record: data,
      message: "Operational record updated successfully.",
    });
  } catch (error) {
    console.error("Update operational record error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update operational record.",
    });
  }
}
