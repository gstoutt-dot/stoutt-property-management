import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { id } = req.query || {};

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Report ID is required.",
      });
    }

    const { error } = await supabaseAdmin
      .from("association_reports")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Association report delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete association report.",
    });
  }
}
