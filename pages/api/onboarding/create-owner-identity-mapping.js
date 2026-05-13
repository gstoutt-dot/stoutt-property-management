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
      ownerUnitRecordId,
      associationName,
      unitNumber,
      ownerName,
      ownerEmail,
      quickbooksCustomerName,
      quickbooksCustomerId,
      ownerUserId,
      owner_user_id,
      matchStatus,
      loginStatus,
      financialVisibilityStatus,
    } = req.body || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const normalizedUnitNumber = String(unitNumber || "").trim();

    const normalizedOwnerName = String(ownerName || "").trim();

    const normalizedOwnerEmail = String(ownerEmail || "")
      .toLowerCase()
      .trim();

    const resolvedOwnerUserId = String(
      ownerUserId || owner_user_id || ""
    ).trim();

    const normalizedQuickBooksCustomerId = String(
      quickbooksCustomerId || ""
    ).trim();

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

    const now = new Date().toISOString();

    const payload = {
      association_id: resolvedAssociationId,
      owner_unit_record_id: ownerUnitRecordId || null,
      association_name: associationName || null,

      unit_number: normalizedUnitNumber,
      owner_name: normalizedOwnerName,
      owner_email: normalizedOwnerEmail || null,

      quickbooks_customer_name: quickbooksCustomerName || null,
      quickbooks_customer_id: normalizedQuickBooksCustomerId || null,

      owner_user_id: resolvedOwnerUserId || null,

      match_status: matchStatus || "Pending",
      login_status: loginStatus || "Pending",
      financial_visibility_status: financialVisibilityStatus || "Pending",

      updated_at: now,
    };

    /*
      Production-safe idempotency:
      Identity mappings should not duplicate every time onboarding or sync is run.

      Preferred lookup:
      association_id + quickbooks_customer_id

      Fallback lookup:
      association_id + unit_number + owner_email
    */

    let existingRecord = null;

    if (normalizedQuickBooksCustomerId) {
      const { data, error } = await supabaseAdmin
        .from("owner_identity_mapping_records")
        .select("*")
        .eq("association_id", resolvedAssociationId)
        .eq("quickbooks_customer_id", normalizedQuickBooksCustomerId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      existingRecord = data;
    }

    if (!existingRecord && normalizedOwnerEmail) {
      const { data, error } = await supabaseAdmin
        .from("owner_identity_mapping_records")
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

    if (existingRecord?.id) {
      const { data: updatedRecord, error: updateError } = await supabaseAdmin
        .from("owner_identity_mapping_records")
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
        mapping: updatedRecord,
      });
    }

    const { data: createdRecord, error: insertError } = await supabaseAdmin
      .from("owner_identity_mapping_records")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return res.status(200).json({
      success: true,
      mode: "created",
      mapping: createdRecord,
    });
  } catch (error) {
    console.error("Create owner identity mapping failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner identity mapping.",
    });
  }
}
