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

    const { data: existingMessage, error: loadError } = await supabaseAdmin
      .from("board_messages")
      .select("*")
      .eq("id", id)
      .single();

    if (loadError) throw loadError;

    const existingReplies = String(existingMessage.reply_body || "").trim();

    const newReplyEntry = [
      `REPLY FROM ${replied_by || "Management"}`,
      `Date: ${new Date(now).toLocaleString("en-US")}`,
      "",
      String(reply_body).trim(),
    ].join("\n");

    const updatedReplyBody = existingReplies
      ? `${existingReplies}\n\n---\n\n${newReplyEntry}`
      : newReplyEntry;

    const { data, error } = await supabaseAdmin
      .from("board_messages")
      .update({
        reply_body: updatedReplyBody,
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
