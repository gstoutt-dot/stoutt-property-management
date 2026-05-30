import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const associationId =
      req.query.association_id || req.query.associationId || DEFAULT_ASSOCIATION_ID;

    const { data, error } = await supabaseAdmin
      .from("association_committee_members")
      .select("*")
      .eq("association_id", associationId)
      .order("member_name", { ascending: true });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      members: data || [],
    });
  } catch (error) {
    console.error("Committee members list error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load committee members.",
    });
  }
}
