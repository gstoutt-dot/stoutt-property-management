import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

        const { id, association_id, associationId } = req.query || {};
    const finalAssociationId = association_id || associationId || "";

    if (!id) {
      return res.status(400).json({ success: false, message: "Message ID is required." });
    }

    if (!finalAssociationId) {
      return res.status(400).json({ success: false, message: "Association ID is required." });
    }

    const { error } = await supabaseAdmin
      .from("board_messages")
      .delete()
      .eq("id", id)
      .eq("association_id", finalAssociationId);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete board message error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete board message.",
    });
  }
}
