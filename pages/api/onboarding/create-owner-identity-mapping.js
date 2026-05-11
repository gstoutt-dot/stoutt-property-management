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
      ownerUnitRecordId,
      associationName,
      unitNumber,
      ownerName,
      ownerEmail,
      quickbooksCustomerName,
      quickbooksCustomerId,
      ownerUserId,
      matchStatus,
      loginStatus,
      financialVisibilityStatus,
    } = req.body || {};

    if (!unitNumber || !ownerName) {
      return res.status(400).json({
        success: false,
        error: "Unit number and owner name are required.",
      });
    }

    const payload = {
      owner_unit_record_id: ownerUnitRecordId || null,
      association_name: associationName || null,
      unit_number: unitNumber,
      owner_name: ownerName,
      owner_email: ownerEmail || null,
      quickbooks_customer_name: quickbooksCustomerName || null,
      quickbooks_customer_id: quickbooksCustomerId || null,
      owner_user_id: ownerUserId || null,
      match_status: matchStatus || "Pending",
      login_status: loginStatus || "Pending",
      financial_visibility_status: financialVisibilityStatus || "Pending",
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("owner_identity_mapping_records")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      mapping: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner identity mapping.",
    });
  }
}
