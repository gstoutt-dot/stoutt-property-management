import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

    const {
      association_id,
      committee_id,
      recommendation_title,
      recommendation_summary,
      recommendation_category,
      priority,
      status,
      submitted_by,
    } = req.body || {};

    if (!recommendation_title) {
      return res.status(400).json({
        success: false,
        message: "Recommendation title is required.",
      });
    }

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("association_committee_recommendations")
      .insert({
        association_id: association_id || DEFAULT_ASSOCIATION_ID,
        committee_id: committee_id || null,
        recommendation_title: String(recommendation_title).trim(),
        recommendation_summary: recommendation_summary || "",
        recommendation_category: recommendation_category || "general",
        priority: priority || "normal",
        status: status || "draft",
        submitted_by: submitted_by || "Committee",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      recommendation: data,
    });
  } catch (error) {
    console.error("Committee recommendation create error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create committee recommendation.",
    });
  }
}
