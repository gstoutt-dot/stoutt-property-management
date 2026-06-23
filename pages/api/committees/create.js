import { supabaseAdmin } from "../../../lib/supabaseAdmin";

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

    if (!association_id) {
  return res.status(400).json({
    success: false,
    message: "Association ID is required.",
  });
}

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
        association_id: String(association_id).trim(),
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
