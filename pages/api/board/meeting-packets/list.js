import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const associationId = String(req.query.association_id || "").trim();

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("board_meeting_packets")
      .select("*")
      .eq("association_id", associationId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      packets: data || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load meeting packets.",
    });
  }
}
