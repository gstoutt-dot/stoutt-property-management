import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

    const {
      association_id,
      subject,
      message_body,
      sent_by_name,
      sent_by_role,
      sent_to_role,
      message_type,
    } = req.body || {};

    if (!subject || !message_body) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required.",
      });
    }

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("board_messages")
      .insert({
        association_id: association_id || DEFAULT_ASSOCIATION_ID,
        subject: String(subject).trim(),
        message_body: String(message_body).trim(),
        sent_by_name: sent_by_name || "Admin",
        sent_by_role: sent_by_role || "admin",
        sent_to_role: sent_to_role || "board",
        message_type: message_type || "general",
        status: "sent",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({ success: true, message: data });
  } catch (error) {
    console.error("Create board message error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create board message.",
    });
  }
}
