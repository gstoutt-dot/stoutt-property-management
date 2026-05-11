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
      associationName,
      unitNumber,
      ownerName,
      ownerEmail,
      ownerPhone,
      accountNumber,
      openingBalance,
      importStatus,
    } = req.body || {};

    if (!unitNumber || !ownerName) {
      return res.status(400).json({
        success: false,
        error: "Unit number and owner name are required.",
      });
    }

    const payload = {
      association_id: associationId || null,
      association_name: associationName || null,
      unit_number: unitNumber,
      owner_name: ownerName,
      owner_email: ownerEmail || null,
      owner_phone: ownerPhone || null,
      account_number: accountNumber || null,
      opening_balance: openingBalance ? Number(openingBalance) : 0,
      import_status: importStatus || "Ready",
      mapping_status: "Pending",
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("owner_unit_import_records")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      ownerUnit: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner/unit record.",
    });
  }
}
