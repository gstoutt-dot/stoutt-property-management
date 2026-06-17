import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return cleanText(value).toLowerCase();
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
      associationName,
      propertyType,
      city,
      county,
      state,
      totalUnits,
      boardPresident,
      boardEmail,
      spmManagerEmail,
      camEmail,
      managementContact,
      quickbooksStatus,
      onboardingStage,
    } = req.body || {};

    const cleanAssociationName = cleanText(associationName);

    if (!cleanAssociationName) {
      return res.status(400).json({
        success: false,
        error: "Association name is required.",
      });
    }

    const { data: associationRecord, error: associationError } =
      await supabaseAdmin
        .from("associations")
        .insert({
          name: cleanAssociationName,
          type: cleanText(propertyType) || null,
          city: cleanText(city) || null,
          county: cleanText(county) || null,
          state: cleanText(state) || null,
          status: "active",
        })
        .select("*")
        .single();

    if (associationError) {
      throw associationError;
    }

    const { data: onboardingProfile, error: onboardingError } =
      await supabaseAdmin
        .from("association_onboarding_profiles")
        .insert({
          association_id: associationRecord.id,
          association_name: cleanAssociationName,
          property_type: cleanText(propertyType) || null,
          city: cleanText(city) || null,
          county: cleanText(county) || null,
          state: cleanText(state) || null,
          total_units: totalUnits ? Number(totalUnits) : null,
          board_president: cleanText(boardPresident) || null,
          board_email: cleanEmail(boardEmail) || null,
          management_contact: cleanText(managementContact) || null,
          quickbooks_status: cleanText(quickbooksStatus) || "Not Connected",
          onboarding_stage: cleanText(onboardingStage) || "Association Intake",
        })
        .select("*")
        .single();

        if (onboardingError) {
      throw onboardingError;
    }

    const accessRows = [];

    if (cleanEmail(boardEmail)) {
      accessRows.push({
        association_id: associationRecord.id,
        association_name: cleanAssociationName,
        email: cleanEmail(boardEmail),
        role: "board",
        status: "approved",
        approved_by: "Association Onboarding",
        approved_at: new Date().toISOString(),
      });
    }

    if (cleanEmail(spmManagerEmail)) {
      accessRows.push({
        association_id: associationRecord.id,
        association_name: cleanAssociationName,
        email: cleanEmail(spmManagerEmail),
        role: "manager",
        status: "approved",
        approved_by: "Association Onboarding",
        approved_at: new Date().toISOString(),
      });
    }

    if (cleanEmail(camEmail)) {
      accessRows.push({
        association_id: associationRecord.id,
        association_name: cleanAssociationName,
        email: cleanEmail(camEmail),
        role: "manager",
        status: "approved",
        approved_by: "Association Onboarding",
        approved_at: new Date().toISOString(),
      });
    }

    if (accessRows.length > 0) {
      const { error: accessError } = await supabaseAdmin
        .from("portal_access_approvals")
        .upsert(accessRows, {
          onConflict: "association_id,email,role",
        });

      if (accessError) {
        throw accessError;
      }
    }

    return res.status(201).json({
      success: true,
      association: associationRecord,
      onboarding_profile: onboardingProfile,
      association_id: associationRecord.id,
    });
  } catch (error) {
    console.error("Create association onboarding failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create association record.",
    });
  }
}
