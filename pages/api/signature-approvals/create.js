import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const payload = req.body || {};

    if (!payload.title) {
      return res.status(400).json({
        success: false,
        message: "Approval title is required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("association_signature_approvals")
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      approval: data,
      message: "Signature approval created successfully.",
    });
  } catch (error) {
    console.error("Create signature approval error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create signature approval.",
    });
  }
}
