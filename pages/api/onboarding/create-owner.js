import { randomUUID } from "crypto";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function getBaseUrl(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  return `${protocol}://${host}`;
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data?.success === false) {
    throw new Error(data?.error || `Request failed: ${url}`);
  }

  return data;
}

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
      associationName,
      unitNumber,
      ownerName,
      ownerEmail,
      ownerPhone,
      accountNumber,
      openingBalance,
      quickbooksCustomerName,
      quickbooksCustomerId,
    } = req.body || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const normalizedUnitNumber = String(unitNumber || "").trim();
    const normalizedOwnerName = String(ownerName || "").trim();
    const normalizedOwnerEmail = String(ownerEmail || "")
      .toLowerCase()
      .trim();

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Association ID is required.",
      });
    }

    if (!normalizedUnitNumber || !normalizedOwnerName || !normalizedOwnerEmail) {
      return res.status(400).json({
        success: false,
        error: "Unit number, owner name, and owner email are required.",
      });
    }

    let ownerUserId = randomUUID();

    const { data: existingAccessRecord, error: lookupError } =
      await supabaseAdmin
        .from("owner_access_provisioning_records")
        .select("owner_user_id")
        .eq("association_id", resolvedAssociationId)
        .eq("unit_number", normalizedUnitNumber)
        .eq("owner_email", normalizedOwnerEmail)
        .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existingAccessRecord?.owner_user_id) {
      ownerUserId = existingAccessRecord.owner_user_id;
    }

    const baseUrl = getBaseUrl(req);

    const ownerUnitResult = await postJson(
      `${baseUrl}/api/onboarding/create-owner-unit`,
      {
        associationId: resolvedAssociationId,
        associationName,
        unitNumber: normalizedUnitNumber,
        ownerName: normalizedOwnerName,
        ownerEmail: normalizedOwnerEmail,
        ownerPhone,
        accountNumber,
        openingBalance,
        importStatus: "Ready",
        mappingStatus: "Mapped",
      }
    );

    const identityMappingResult = await postJson(
      `${baseUrl}/api/onboarding/create-owner-identity-mapping`,
      {
        associationId: resolvedAssociationId,
        associationName,
        ownerUnitRecordId: ownerUnitResult?.ownerUnit?.id || null,
        unitNumber: normalizedUnitNumber,
        ownerName: normalizedOwnerName,
        ownerEmail: normalizedOwnerEmail,
        quickbooksCustomerName,
        quickbooksCustomerId,
        ownerUserId,
        matchStatus: quickbooksCustomerId ? "Matched" : "Pending",
        loginStatus: "Active",
        financialVisibilityStatus: "Enabled",
      }
    );

    const accessResult = await postJson(
      `${baseUrl}/api/onboarding/create-owner-access`,
      {
        associationId: resolvedAssociationId,
        associationName,
        unitNumber: normalizedUnitNumber,
        ownerName: normalizedOwnerName,
        ownerEmail: normalizedOwnerEmail,
        ownerPhone,
        ownerUserId,
        portalRole: "Owner",
        accessStatus: "Active",
        financialAccessStatus: "Enabled",
        inviteStatus: "Accepted",
      }
    );

    return res.status(200).json({
      success: true,
      ownerUserId,
      ownerUnit: ownerUnitResult.ownerUnit,
      identityMapping: identityMappingResult.mapping,
      accessRecord: accessResult.accessRecord,
    });
  } catch (error) {
    console.error("Create owner orchestration failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner onboarding record.",
    });
  }
}
