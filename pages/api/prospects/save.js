import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const prospect = req.body || {};

    if (!prospect.association_name) {
      return res.status(400).json({
        success: false,
        message: "Association name is required.",
      });
    }

    const now = new Date().toISOString();

    const payload = {
      ...prospect,
      units: prospect.units ? Number(prospect.units) : null,
      self_managed: !!prospect.self_managed,
      internal_staff: !!prospect.internal_staff,
      updated_at: now,
    };

    let query;

    if (prospect.id) {
      query = supabaseAdmin
        .from("spm_prospect_pipeline")
        .update(payload)
        .eq("id", prospect.id)
        .select("*")
        .single();
    } else {
      query = supabaseAdmin
        .from("spm_prospect_pipeline")
        .insert({
          ...payload,
          created_at: now,
          updated_at: now,
        })
        .select("*")
        .single();
    }

    const { data, error } = await query;

    if (error) throw error;

    return res.status(200).json({
      success: true,
      prospect: data,
    });
  } catch (error) {
    console.error("Prospect save error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to save prospect.",
    });
  }
}
