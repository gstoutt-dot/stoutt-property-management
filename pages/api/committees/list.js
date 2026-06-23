import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    const associationId = String(
  req.query.association_id || req.query.associationId || ""
).trim();

if (!associationId) {
  return res.status(400).json({
    success: false,
    message: "Association ID is required.",
  });
}

    const { data, error } = await supabaseAdmin
      .from("association_committees")
      .select(`
        *,
        members:association_committee_members(*),
        recommendations:association_committee_recommendations(*)
      `)
      .eq("association_id", associationId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      committees: data || [],
    });
  } catch (error) {
    console.error("Committee list error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load committees.",
    });
  }
}
