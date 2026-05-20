import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const associationId =
      req.query.association_id || DEFAULT_ASSOCIATION_ID;

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .select("*")
      .eq("association_id", associationId)
      .order("created_at", { ascending: false })
      .limit(25);

    if (error) throw error;

    const records = data || [];

    const openRecords = records.filter(
      (record) =>
        !closedStatuses.includes(String(record.status || "").toLowerCase())
    );

    return res.status(200).json({
      success: true,
      records,
      openRecords,
      counts: {
        total: records.length,
        open: openRecords.length,
        critical: openRecords.filter(
          (record) =>
            String(record.priority || "").toLowerCase() === "critical"
        ).length,
        high: openRecords.filter(
          (record) => String(record.priority || "").toLowerCase() === "high"
        ).length,
        boardReview: openRecords.filter((record) =>
          Boolean(record.board_review_required)
        ).length,
      },
    });
  } catch (error) {
    console.error("Admin operational records API error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load admin operational records.",
    });
  }
}
