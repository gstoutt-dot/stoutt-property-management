import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

    const {
      association_id,
      committee_id,
      member_name,
      member_role,
      email,
      phone,
      status,
    } = req.body || {};

    if (!association_id) {
  return res.status(400).json({
    success: false,
    message: "Association ID is required.",
  });
}

if (!committee_id || !member_name) {
      return res.status(400).json({
        success: false,
        message: "Committee and member name are required.",
      });
    }

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("association_committee_members")
      .insert({
association_id: String(association_id).trim(),
        committee_id,
        member_name: String(member_name).trim(),
        member_role: member_role || "member",
        email: email || "",
        phone: phone || "",
        status: status || "active",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      member: data,
    });
  } catch (error) {
    console.error("Committee member add error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to add committee member.",
    });
  }
}
