import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
  id,
  association_id,
  associationId,
  status,
  board_event_type,
  board_message,
  board_note,
} = req.body || {};

const finalAssociationId =
  association_id || associationId || "";

    if (!id) {
  return res.status(400).json({
    success: false,
    message: "Record ID is required.",
  });
}

if (!finalAssociationId) {
  return res.status(400).json({
    success: false,
    message: "Association ID is required.",
  });
}

    const cleanNote = String(board_note || "").trim();

    const finalBoardMessage = cleanNote
      ? `${board_message}\n\nBoard Note:\n${cleanNote}`
      : board_message;

    const updatePayload = {
      status,
      board_last_action: board_event_type,
      board_last_message: finalBoardMessage,
      board_updated_at: new Date().toISOString(),
    };

  const { data, error } = await supabaseAdmin
  .from("admin_operational_records")
  .update(updatePayload)
  .eq("id", id)
  .eq("association_id", finalAssociationId)
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
