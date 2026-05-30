import { supabaseAdmin } from "../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    const associationId = req.query.association_id || DEFAULT_ASSOCIATION_ID;

    const { data, error } = await supabaseAdmin
      .from("board_messages")
      .select("*")
      .eq("association_id", associationId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      messages: data || [],
    });
  } catch (error) {
    console.error("List board messages error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load board messages.",
    });
  }
}
