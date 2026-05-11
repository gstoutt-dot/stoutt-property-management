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
      .from("owner_unit_import_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      ownerUnits: data || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load owner/unit records.",
    });
  }
}
