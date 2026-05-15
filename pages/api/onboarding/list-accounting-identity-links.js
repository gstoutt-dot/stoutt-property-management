import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId = String(
      req.query.associationId || req.query.association_id || ""
    ).trim();

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Association ID is required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("accounting_identity_links")
      .select("*")
      .eq("association_id", associationId)
      .order("unit_number", { ascending: true });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      associationId,
      total: data?.length || 0,
      links: data || [],
    });
  } catch (error) {
    console.error("List accounting identity links failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load accounting identity links.",
    });
  }
}
