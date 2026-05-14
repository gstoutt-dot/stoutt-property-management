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
      ownerUserId,
      owner_user_id,
      ownerName,
      ownerEmail,
      ownerPhone,
      streetAddress,
      city,
      state,
      zip,
      portalRole,
      accessStatus,
      financialAccessStatus,
      inviteStatus,
    } = req.body || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    const resolvedOwnerUserId = String(
      ownerUserId || owner_user_id || ""
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

        const now = new Date().toISOString();

    let resolvedAuthUserId = null;

    const { data: authUsersData, error: authUsersError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (authUsersError) {
      throw authUsersError;
    }

    const existingAuthUser = authUsersData?.users?.find(
      (user) => user.email?.toLowerCase() === normalizedOwnerEmail
    );

            if (existingAuthUser?.id) {
      resolvedAuthUserId = existingAuthUser.id;

      const { error: updatePasswordError } =
        await supabaseAdmin.auth.admin.updateUserById(resolvedAuthUserId, {
          password: "Owner123456!",
        });

      if (updatePasswordError) {
        throw updatePasswordError;
      }
    } else {
                  const { data: createdAuthUser, error: createAuthError } =
        await supabaseAdmin.auth.admin.createUser({
          email: normalizedOwnerEmail,
          password: "Owner123456!",
          email_confirm: true
        });

      if (createAuthError) {
        console.error("AUTH CREATE ERROR:", createAuthError);
        throw createAuthError;
      }

      resolvedAuthUserId = createdAuthUser.user.id;
    }

      const payload = {
      association_id: resolvedAssociationId,
      association_name: associationName || null,

      unit_number: normalizedUnitNumber,

      owner_user_id: resolvedOwnerUserId || null,
      auth_user_id: resolvedAuthUserId,
      owner_name: normalizedOwnerName,
      owner_email: normalizedOwnerEmail,
         
      portal_role: portalRole || "Owner",
      access_status: accessStatus || "Pending",
      financial_access_status: financialAccessStatus || "Pending",
      invite_status: inviteStatus || "Not Sent",

      invitation_sent_at:
        inviteStatus === "Sent" ? now : null,

      updated_at: now,
    };

    /*
      Production-safe idempotency:
      Before creating a new access record, check whether this association/unit/email
      already has one. This prevents duplicate portal access records when onboarding
      or QuickBooks sync is run more than once.
    */

    const { data: existingRecord, error: lookupError } = await supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("association_id", resolvedAssociationId)
      .eq("unit_number", normalizedUnitNumber)
      .eq("owner_email", normalizedOwnerEmail)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existingRecord?.id) {
      const { data: updatedRecord, error: updateError } = await supabaseAdmin
        .from("owner_access_provisioning_records")
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
        accessRecord: updatedRecord,
      });
    }

    const { data: createdRecord, error: insertError } = await supabaseAdmin
      .from("owner_access_provisioning_records")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return res.status(200).json({
      success: true,
      mode: "created",
      accessRecord: createdRecord,
    });
    } catch (error) {
    console.error("Create owner access record failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to create owner access record.",
      details: JSON.stringify(error, null, 2),
    });
  }
}
