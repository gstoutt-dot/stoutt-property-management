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
      associationId,
      association_id,
      associationName,
      unitNumber,
      ownerName,
      ownerEmail,
      ownerPhone,
      accountNumber,
      openingBalance,
      importStatus,
      mappingStatus,
    } = req.body || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const normalizedUnitNumber = String(unitNumber || "").trim();

    const normalizedOwnerName = String(ownerName || "").trim();

    const normalizedOwnerEmail = String(ownerEmail || "")
      .toLowerCase()
      .trim();

    const normalizedAccountNumber = String(accountNumber || "").trim();

    const parsedOpeningBalance =
      openingBalance === null ||
      openingBalance === undefined ||
      openingBalance === ""
        ? 0
        : Number(openingBalance);

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Association ID is required.",
      });
    }

    if (!normalizedUnitNumber || !normalizedOwnerName) {
      return res.status(400).json({
        success: false,
        error: "Unit number and owner name are required.",
      });
    }

    if (Number.isNaN(parsedOpeningBalance)) {
      return res.status(400).json({
        success: false,
        error: "Opening balance must be a valid number.",
      });
    }

    const now = new Date().toISOString();

    const payload = {
      association_id: resolvedAssociationId,
      association_name: associationName || null,

      unit_number: normalizedUnitNumber,
      owner_name: normalizedOwnerName,
      owner_email: normalizedOwnerEmail || null,
      owner_phone: ownerPhone || null,

      account_number: normalizedAccountNumber || null,
      opening_balance: parsedOpeningBalance,

      import_status: importStatus || "Ready",
      mapping_status: mappingStatus || "Pending",

      updated_at: now,
    };

    /*
      Production-safe idempotency:
      Owner/unit import records should not duplicate when an association is
      re-imported, re-synced, or corrected during onboarding.

      Preferred lookup:
      association_id + unit_number + owner_email

      Fallback lookup:
      association_id + unit_number + account_number
    */

    let existingRecord = null;

    if (normalizedOwnerEmail) {
      const { data, error } = await supabaseAdmin
        .from("owner_unit_import_records")
        .select("*")
        .eq("association_id", resolvedAssociationId)
        .eq("unit_number", normalizedUnitNumber)
        .eq("owner_email", normalizedOwnerEmail)
        .maybeSingle();

      if (error) {
        throw error;
      }

      existingRecord = data;
    }

    if (!existingRecord && normalizedAccountNumber) {
      const { data, error } = await supabaseAdmin
        .from("owner_unit_import_records")
        .select("*")
        .eq("association_id", resolvedAssociationId)
        .eq("unit_number", normalizedUnitNumber)
        .eq("account_number", normalizedAccountNumber)
        .maybeSingle();

      if (error) {
        throw error;
      }

      existingRecord = data;
    }

    if (existingRecord?.id) {
      const { data: updatedRecord, error: updateError } = await supabaseAdmin
        .from("owner_unit_import_records")
        .update(payload)
        .eq("id", existingRecord.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return res.status(200).json({
        success: true,
        mode: "updated",
        ownerUnit: updatedRecord,
      });
    }

    const { data: createdRecord, error: insertError } = await supabaseAdmin
      .from("owner_unit_import_records")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return res.status(200).json({
      success: true,
      mode: "created",
      ownerUnit: createdRecord,
    });
  } catch (error) {
    console.error("Create owner/unit import record failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner/unit record.",
    });
  }
}
