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
      unitNumber,
      ownerName,
      ownerEmail,
      portalRole,
      accessStatus,
      financialAccessStatus,
      inviteStatus,
    } = req.body || {};

    if (!unitNumber || !ownerName || !ownerEmail) {
      return res.status(400).json({
        success: false,
        error: "Unit number, owner name, and owner email are required.",
      });
    }

    const payload = {
      association_name: associationName || null,
      unit_number: unitNumber,
      owner_name: ownerName,
      owner_email: ownerEmail,
      portal_role: portalRole || "Owner",
      access_status: accessStatus || "Pending",
      financial_access_status: financialAccessStatus || "Pending",
      invite_status: inviteStatus || "Not Sent",
      invitation_sent_at:
        inviteStatus === "Sent" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("owner_access_provisioning_records")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      accessRecord: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner access record.",
    });
  }
}
