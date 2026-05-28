import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      association_id,
      title,
      agenda_text,
      packet_notes,
    } = req.body || {};

    if (!title || !String(title).trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting packet title is required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("board_meeting_packets")
      .insert({
        association_id,
        title: String(title).trim(),
        agenda_text: agenda_text || "",
        packet_notes: packet_notes || "",
        status: "Draft",
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      packet: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create meeting packet.",
    });
  }
}
