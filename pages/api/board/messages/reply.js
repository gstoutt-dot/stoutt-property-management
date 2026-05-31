import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { id, reply_body, replied_by } = req.body || {};

    if (!id || !reply_body) {
      return res.status(400).json({
        success: false,
        message: "Message ID and reply are required.",
      });
    }

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("board_messages")
      .update({
        reply_body: String(reply_body).trim(),
        replied_by: replied_by || "Management",
        replied_at: now,
        status: "replied",
        updated_at: now,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.error("Reply to board message error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to reply to board message.",
    });
  }
}
