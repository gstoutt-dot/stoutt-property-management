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

      if (error) throw error;

      accessRecord = data;
    }

    if (!accessRecord && ownerEmail) {
      const { data, error } = await supabaseAdmin
        .from("owner_access_provisioning_records")
        .select("*")
        .eq("owner_email", ownerEmail)
        .maybeSingle();

      if (error) throw error;

      accessRecord = data;
    }

    if (!accessRecord) {
      return res.status(404).json({
        success: false,
        error: "Owner access profile not found.",
      });
    }

    const accessStatus = String(accessRecord.access_status || "")
      .toLowerCase()
      .trim();

    const financialAccessStatus = String(
      accessRecord.financial_access_status || ""
    )
      .toLowerCase()
      .trim();

    if (accessStatus && accessStatus !== "active") {
      return res.status(403).json({
        success: false,
        error: "Owner portal access is not active.",
      });
    }

    if (
      financialAccessStatus &&
      financialAccessStatus !== "enabled"
    ) {
      return res.status(403).json({
        success: false,
        error: "Owner financial access is not enabled.",
      });
    }

    const updatePayload = {
      last_login_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (authUserId && !accessRecord.auth_user_id) {
      updatePayload.auth_user_id = authUserId;
    }

    const { data: updatedRecord, error: updateError } =
      await supabaseAdmin
        .from("owner_access_provisioning_records")
        .update(updatePayload)
        .eq("id", accessRecord.id)
        .select("*")
        .single();

    if (updateError) throw updateError;

    const record = updatedRecord || accessRecord;

    return res.status(200).json({
      success: true,
      ownerProfile: {
        associationName: record.association_name,
        ownerName: record.owner_name,
        streetAddress: record.street_address,
        city: record.city,
        state: record.state,
        zip: record.zip,
        phone: record.owner_phone,
        email: record.owner_email,
        association_id: record.association_id,
        id: record.owner_user_id,
        owner_user_id: record.owner_user_id,
        auth_user_id: record.auth_user_id,
        unitNumber: record.unit_number,
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
