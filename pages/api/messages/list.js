import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      associationId,
      association_id,
      limit,
    } = req.query || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Association ID is required.",
      });
    }

    const resolvedLimit = Number(limit || 25);

    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("association_id", resolvedAssociationId)
      .order("created_at", { ascending: false })
      .limit(resolvedLimit);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      messages: data || [],
    });
  } catch (error) {
    console.error("List homeowner messages failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load homeowner messages.",
    });
  }
}
