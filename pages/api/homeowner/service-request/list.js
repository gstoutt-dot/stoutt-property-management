import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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
      ownerUserId,
      owner_user_id,
      unitNumber,
      unit_number,
    } = req.query || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const resolvedOwnerUserId = String(
      ownerUserId || owner_user_id || ""
    ).trim();

    const resolvedUnitNumber = String(
      unitNumber || unit_number || ""
    ).trim();

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Association ID is required.",
      });
    }

    let query = supabaseAdmin
      .from("homeowner_service_requests")
      .select("*")
      .eq("association_id", resolvedAssociationId)
      .order("created_at", { ascending: false });

    if (resolvedOwnerUserId) {
      query = query.eq("owner_user_id", resolvedOwnerUserId);
    }

    if (resolvedUnitNumber) {
      query = query.eq("unit_number", resolvedUnitNumber);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      requests: data || [],
    });
  } catch (error) {
    console.error("List homeowner service requests failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load homeowner service requests.",
    });
  }
}
