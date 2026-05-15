import { randomUUID } from "crypto";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
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
      ownerName,
      ownerEmail,
      requestType,
      priority,
      title,
      description,
      location,
    } = req.body || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const resolvedOwnerUserId = String(
      ownerUserId || owner_user_id || randomUUID()
    ).trim();

    const normalizedUnitNumber = String(unitNumber || "").trim();

    const normalizedOwnerName = String(ownerName || "").trim();

    const normalizedOwnerEmail = String(ownerEmail || "")
      .trim()
      .toLowerCase();

    const normalizedRequestType = String(requestType || "").trim();

    const normalizedPriority = String(priority || "Normal").trim();

    const normalizedTitle = String(title || "").trim();

    const normalizedDescription = String(description || "").trim();

    const normalizedLocation = String(location || "").trim();

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Association ID is required.",
      });
    }

    if (!normalizedUnitNumber) {
      return res.status(400).json({
        success: false,
        error: "Unit number is required.",
      });
    }

    if (!normalizedRequestType) {
      return res.status(400).json({
        success: false,
        error: "Request type is required.",
      });
    }

    if (!normalizedTitle) {
      return res.status(400).json({
        success: false,
        error: "Request title is required.",
      });
    }

    if (!normalizedDescription) {
      return res.status(400).json({
        success: false,
        error: "Request description is required.",
      });
    }

    const insertPayload = {
      association_id: resolvedAssociationId,
      owner_user_id: resolvedOwnerUserId,
      unit_number: normalizedUnitNumber,
      owner_name: normalizedOwnerName,
      owner_email: normalizedOwnerEmail,
      request_type: normalizedRequestType,
      priority: normalizedPriority,
      title: normalizedTitle,
      description: normalizedDescription,
      location: normalizedLocation,
      status: "Received",
      workflow_stage: "Owner Submitted",
    };

    const { data, error } = await supabaseAdmin
      .from("homeowner_service_requests")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      request: data,
    });
  } catch (error) {
    console.error("Create homeowner service request failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to create homeowner service request.",
    });
  }
}
