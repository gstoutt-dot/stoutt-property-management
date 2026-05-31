import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
        const { id, status, certification_record, signed_at, signed_by } = req.body || {};
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Signature approval ID is required.",
      });
    }

    const updatePayload = {
      status,
      updated_at: new Date().toISOString(),
    };

        if (certification_record !== undefined) {
      updatePayload.certification_record = certification_record;
    }

    if (signed_at !== undefined) {
      updatePayload.signed_at = signed_at;
    }

    if (signed_by !== undefined) {
      updatePayload.signed_by = signed_by;
    }

    const { data, error } = await supabaseAdmin
      .from("association_signature_approvals")
      .update(updatePayload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      approval: data,
      message: "Signature approval updated successfully.",
    });
  } catch (error) {
    console.error("Update signature approval error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update signature approval.",
    });
  }
}
