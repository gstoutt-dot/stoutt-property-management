import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("association_onboarding_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      associations: data || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load association records.",
    });
  }
}
