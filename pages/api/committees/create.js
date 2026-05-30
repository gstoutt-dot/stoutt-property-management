import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

    const {
      association_id,
      committee_name,
      committee_type,
      purpose,
      chair_name,
      status,
    } = req.body || {};

    if (!committee_name) {
      return res.status(400).json({
        success: false,
        message: "Committee name is required.",
      });
    }

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("association_committees")
      .insert({
        association_id: association_id || DEFAULT_ASSOCIATION_ID,
        committee_name: String(committee_name).trim(),
        committee_type: committee_type || "general",
        purpose: purpose || "",
        chair_name: chair_name || "",
        status: status || "active",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      committee: data,
    });
  } catch (error) {
    console.error("Committee create error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create committee.",
    });
  }
}
