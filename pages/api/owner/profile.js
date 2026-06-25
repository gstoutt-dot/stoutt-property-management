import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return clean(value).toLowerCase();
}

function extractUnitFromEmail(email) {
  const normalized = normalizeEmail(email);
  const match = normalized.match(/^unit(\d+)@/i);
  return match?.[1] || "";
}

function cleanOwnerName(value) {
  return clean(value).replace(/^Unit\s+\d+\s*-\s*/i, "");
}

function normalizeOwnerProfile(record, fallbackEmail = "", fallbackAssociationId = "") {
  const unitNumber = clean(record?.unit_number || record?.unitNumber);
  const associationId =
    clean(record?.association_id) || clean(fallbackAssociationId);

  return {
    associationName:
      clean(record?.association_name) ||
      clean(record?.associationName) ||
      "Community Association",

    ownerName:
      cleanOwnerName(record?.owner_name) ||
      cleanOwnerName(record?.quickbooks_customer_display_name) ||
      cleanOwnerName(record?.quickbooks_customer_name) ||
      "Homeowner",

    streetAddress: clean(record?.street_address) || "",
    city: clean(record?.city) || "",
    state: clean(record?.state) || "",
    zip: clean(record?.zip) || "",
    phone: clean(record?.owner_phone) || "",

    email:
      normalizeEmail(record?.owner_email || record?.user_email) ||
      normalizeEmail(fallbackEmail),

    association_id: associationId,

    id:
      clean(record?.owner_user_id) ||
      clean(record?.auth_user_id) ||
      clean(record?.id) ||
      `${associationId}-${unitNumber}`,

    owner_user_id: clean(record?.owner_user_id) || null,
    auth_user_id: clean(record?.auth_user_id) || null,

    unitNumber,
  };
}

async function findOwnerAccessRecord({ ownerEmail, authUserId, associationId }) {
  const normalizedEmail = normalizeEmail(ownerEmail);
  const normalizedAuthUserId = clean(authUserId);
  const normalizedAssociationId = clean(associationId);
  const unitFromEmail = extractUnitFromEmail(normalizedEmail);

  if (normalizedAuthUserId) {
    let query = supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("auth_user_id", normalizedAuthUserId);

    if (normalizedAssociationId) {
      query = query.eq("association_id", normalizedAssociationId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Owner profile auth_user_id lookup failed:", error);
    }

    if (data) return data;
  }

  if (normalizedEmail) {
    let query = supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("owner_email", normalizedEmail);

    if (normalizedAssociationId) {
      query = query.eq("association_id", normalizedAssociationId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Owner profile owner_email lookup failed:", error);
    }

    if (data) return data;
  }

  if (normalizedAssociationId && unitFromEmail) {
    const { data, error } = await supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("association_id", normalizedAssociationId)
      .eq("unit_number", unitFromEmail)
      .maybeSingle();

    if (error) {
      console.error("Owner access unit lookup failed:", error);
    }

    if (data) return data;
  }

  if (normalizedEmail) {
    let query = supabaseAdmin
      .from("owner_identity_mapping_records")
      .select("*")
      .eq("owner_email", normalizedEmail);

    if (normalizedAssociationId) {
      query = query.eq("association_id", normalizedAssociationId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Owner identity email lookup failed:", error);
    }

    if (data) return data;
  }

  if (normalizedAssociationId && unitFromEmail) {
    const { data, error } = await supabaseAdmin
      .from("owner_identity_mapping_records")
      .select("*")
      .eq("association_id", normalizedAssociationId)
      .eq("unit_number", unitFromEmail)
      .maybeSingle();

    if (error) {
      console.error("Owner identity unit lookup failed:", error);
    }

    if (data) return data;
  }

  if (normalizedEmail) {
    let query = supabaseAdmin
      .from("owner_profiles")
      .select("*")
      .eq("user_email", normalizedEmail);

    if (normalizedAssociationId) {
      query = query.eq("association_id", normalizedAssociationId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Legacy owner_profiles lookup failed:", error);
    }

    if (data) return data;
  }

  if (normalizedAssociationId && unitFromEmail) {
    const { data, error } = await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", normalizedAssociationId)
      .eq("unit_number", unitFromEmail)
      .maybeSingle();

    if (error) {
      console.error("Owner account balance unit fallback failed:", error);
    }

    if (data) {
      return {
        ...data,
        owner_email: normalizedEmail,
      };
    }
  }

  return null;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const ownerEmail = normalizeEmail(req.query.ownerEmail);
    const authUserId = clean(req.query.authUserId);
    const associationId = clean(req.query.associationId);

    if (!ownerEmail && !authUserId) {
      return res.status(400).json({
        success: false,
        error: "Missing ownerEmail or authUserId.",
      });
    }

    const accessRecord = await findOwnerAccessRecord({
      ownerEmail,
      authUserId,
      associationId,
    });

    if (!accessRecord) {
      return res.status(404).json({
        success: false,
        error:
          "No homeowner profile is linked to this login. Please confirm owner onboarding and access provisioning.",
        ownerProfile: null,
      });
    }

    const ownerProfile = normalizeOwnerProfile(
      accessRecord,
      ownerEmail,
      associationId
    );

    if (!ownerProfile.association_id) {
      return res.status(404).json({
        success: false,
        error:
          "Homeowner profile was found, but no association was linked to this login.",
        ownerProfile: null,
      });
    }

    if (!ownerProfile.unitNumber) {
      return res.status(404).json({
        success: false,
        error:
          "Homeowner profile was found, but no unit number was linked to this login.",
        ownerProfile: null,
      });
    }

    return res.status(200).json({
      success: true,
      ownerProfile,
    });
  } catch (error) {
    console.error("Owner profile API failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unable to load owner profile.",
      ownerProfile: null,
    });
  }
}
