import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE" && req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const memberId = String(
      req.query.id || req.query.member_id || req.body?.id || req.body?.member_id || ""
    ).trim();

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("association_committee_members")
      .delete()
      .eq("id", memberId)
      .select("id");

    if (error) throw error;

    return res.status(200).json({
      success: true,
      deleted: data || [],
    });
  } catch (error) {
    console.error("Delete committee member error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete committee member.",
    });
  }
}
