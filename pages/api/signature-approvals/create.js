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
      .insert({
        association_id: payload.association_id,
        title: payload.title,
        approval_category: payload.approval_category,
        required_signer: payload.required_signer,
        linked_workflow: payload.linked_workflow,
        certification_record: payload.certification_record,
        priority: payload.priority,
        status: payload.status,
        due_date: payload.due_date,
        created_at: payload.created_at,
        updated_at: payload.updated_at,
      })
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
