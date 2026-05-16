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

        const { data: homeownerRequests, error } = await query;

    if (error) {
      throw error;
    }

    const { data: bosActions, error: bosError } = await supabaseAdmin
      .from("bos_actions")
      .select("*")
      .eq("association_id", resolvedAssociationId)
      .order("created_at", { ascending: false });

    if (bosError) {
      throw bosError;
    }

    const matchedRequests = (homeownerRequests || []).map((request) => {
      const matchingBosAction = (bosActions || []).find((action) => {
        const sameOwner =
          String(action.owner_user_id || "").trim() ===
          String(request.owner_user_id || "").trim();

        const sameUnit =
          String(action.unit_number || action.unit || "").trim() ===
          String(request.unit_number || "").trim();

        const sameTitle =
          String(action.title || "").trim().toLowerCase() ===
          String(request.title || "").trim().toLowerCase();

        return sameOwner && sameUnit && sameTitle;
      });

      if (!matchingBosAction) {
        return request;
      }

      return {
        ...request,
        status: matchingBosAction.status || request.status,
        workflow_stage:
          matchingBosAction.vendor_status ||
          matchingBosAction.status ||
          request.workflow_stage,
        bos_action_id: matchingBosAction.id,
        owner_notified:
          matchingBosAction.owner_notified || request.owner_notified || false,
      };
    });

    return res.status(200).json({
      success: true,
      requests: matchedRequests,
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
