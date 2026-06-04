import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("spm_prospect_pipeline")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      prospects: data || [],
    });
  } catch (error) {
    console.error("Prospect list error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load prospects.",
    });
  }
}
