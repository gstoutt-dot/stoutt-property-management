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
      limit,
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

    const resolvedLimit = Number(limit || 25);

    let query = supabaseAdmin
      .from("homeowner_notifications")
      .select("*")
      .eq("association_id", resolvedAssociationId)
      .order("created_at", { ascending: false })
      .limit(resolvedLimit);

    if (resolvedOwnerUserId && resolvedUnitNumber) {
      query = query.or(
        `owner_user_id.eq.${resolvedOwnerUserId},unit_number.eq.${resolvedUnitNumber},owner_user_id.is.null`
      );
    } else if (resolvedOwnerUserId) {
      query = query.or(
        `owner_user_id.eq.${resolvedOwnerUserId},owner_user_id.is.null`
      );
    } else if (resolvedUnitNumber) {
      query = query.or(
        `unit_number.eq.${resolvedUnitNumber},owner_user_id.is.null`
      );
    } else {
      query = query.is("owner_user_id", null);
    }

    const { data, error } = await query;

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
