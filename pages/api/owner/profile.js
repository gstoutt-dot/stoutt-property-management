import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const ownerEmail = String(req.query.ownerEmail || "")
      .toLowerCase()
      .trim();

    const authUserId = String(req.query.authUserId || "").trim();

    if (!ownerEmail && !authUserId) {
      return res.status(400).json({
        success: false,
        error: "Owner email or auth user ID is required.",
      });
    }

    let accessRecord = null;

    if (authUserId) {
      const { data, error } = await supabaseAdmin
        .from("owner_access_provisioning_records")
        .select("*")
        .eq("auth_user_id", authUserId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      accessRecord = data;
    }

    if (!accessRecord && ownerEmail) {
      const { data, error } = await supabaseAdmin
        .from("owner_access_provisioning_records")
        .select("*")
        .eq("owner_email", ownerEmail)
        .maybeSingle();

      if (error) {
        throw error;
      }

      accessRecord = data;
    }

    if (!accessRecord) {
      return res.status(404).json({
        success: false,
        error: "Owner access profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      ownerProfile: {
        associationName: accessRecord.association_name,
        ownerName: accessRecord.owner_name,
        streetAddress: accessRecord.street_address,
        city: accessRecord.city,
        state: accessRecord.state,
        zip: accessRecord.zip,
        phone: accessRecord.owner_phone,
        email: accessRecord.owner_email,
        association_id: accessRecord.association_id,
        id: accessRecord.owner_user_id,
        owner_user_id: accessRecord.owner_user_id,
        auth_user_id: accessRecord.auth_user_id,
        unitNumber: accessRecord.unit_number,
      },
    });
  } catch (error) {
    console.error("Owner profile API failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load owner profile.",
    });
  }
}
