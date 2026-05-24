import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { sourceTable, id } = req.query;

    if (!id || !sourceTable) {
      return res.status(400).json({
        success: false,
        message: "Missing sourceTable or id.",
      });
    }

    const allowedTables = ["bos_actions", "admin_operational_records"];

    if (!allowedTables.includes(sourceTable)) {
      return res.status(400).json({
        success: false,
        message: "Invalid source table.",
      });
    }

    const { error } = await supabaseAdmin
      .from(sourceTable)
      .delete()
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Queue item deleted successfully.",
    });
  } catch (error) {
    console.error("Manager delete queue item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete queue item.",
    });
  }
}
