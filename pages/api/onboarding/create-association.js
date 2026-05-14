import { supabaseAdmin } from "../../../lib/supabaseAdmin";

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
      managementContact,
      quickbooksStatus,
      onboardingStage,
    } = req.body || {};

    const cleanAssociationName = String(associationName || "").trim();

    if (!cleanAssociationName) {
      return res.status(400).json({
        success: false,
        error: "Association name is required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("association_onboarding_profiles")
      .insert({
        association_name: cleanAssociationName,
        property_type: String(propertyType || "").trim() || null,
        city: String(city || "").trim() || null,
        county: String(county || "").trim() || null,
        state: String(state || "").trim() || null,
        total_units: totalUnits ? Number(totalUnits) : null,
        board_president: String(boardPresident || "").trim() || null,
        board_email: String(boardEmail || "").toLowerCase().trim() || null,
        management_contact: String(managementContact || "").trim() || null,
        quickbooks_status: String(quickbooksStatus || "Not Connected").trim(),
        onboarding_stage: String(onboardingStage || "Association Intake").trim(),
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      association: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create association record.",
    });
  }
}
