import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed.",
    });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("owner_profiles")
      .select("*")
      .limit(5);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      sampleRows: data || [],
    });
  } catch (error) {
    console.error("homeowner-notification-targets discovery error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  }
}
