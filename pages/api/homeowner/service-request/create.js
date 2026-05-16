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

        const { data: homeownerRequest, error: homeownerError } =
      await supabaseAdmin
        .from("homeowner_service_requests")
        .insert(insertPayload)
        .select()
        .single();

    if (homeownerError) {
      throw homeownerError;
    }

    const bosPayload = {
      association_id: resolvedAssociationId,
      association_name: "Sunset Condominium Association",

      owner_user_id: resolvedOwnerUserId,
      owner_name: normalizedOwnerName,
      owner_email: normalizedOwnerEmail,
      unit: normalizedUnitNumber,
      unit_number: normalizedUnitNumber,

      request_type: "maintenance",
      title: normalizedTitle,
      description: normalizedDescription,
      priority: normalizedPriority.toLowerCase(),

      property_address: normalizedLocation || `Unit ${normalizedUnitNumber}`,
      best_contact_time: "",
      amenity_selected: "",
      amenity_date: null,

      status: "open",
      source: "Homeowner Dashboard",
      };

    const { data: bosAction, error: bosError } = await supabaseAdmin
      .from("bos_actions")
      .insert([bosPayload])
      .select("*")
      .single();

    if (bosError) {
      throw bosError;
    }

    await fetch(`${req.headers.origin || ""}/api/notifications/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        associationId: resolvedAssociationId,
        recipientRole: "manager",
        notificationType: "owner_request_submitted",
        title: "New homeowner service request submitted",
        message: `${normalizedOwnerName || "A homeowner"} submitted a new service request.`,
        priority: normalizedPriority.toLowerCase(),
      }),
    }).catch((notificationError) => {
      console.error(
        "Homeowner service request notification failed:",
        notificationError
      );
    });

    return res.status(200).json({
      success: true,
      request: homeownerRequest,
      bosAction,
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
