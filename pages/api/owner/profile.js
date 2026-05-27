import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return clean(value).toLowerCase();
}

function normalizeOwnerProfile(record, fallbackEmail = "") {
  return {
    associationName:
      clean(record?.association_name) || "Association",

    ownerName:
      clean(record?.owner_name) || "Homeowner",

    streetAddress:
      clean(record?.street_address) || "",

    city:
      clean(record?.city) || "",

    state:
      clean(record?.state) || "",

    zip:
      clean(record?.zip) || "",

    phone:
      clean(record?.owner_phone) || "",

    email:
      clean(record?.owner_email || record?.user_email) || fallbackEmail,

    association_id:
      clean(record?.association_id) || null,

    id:
      clean(record?.owner_user_id) ||
      clean(record?.auth_user_id) ||
      null,

    owner_user_id:
      clean(record?.owner_user_id) || null,

    auth_user_id:
      clean(record?.auth_user_id) || null,

    unitNumber:
      clean(record?.unit_number) || "",
  };
}

async function findOwnerAccessRecord({ ownerEmail, authUserId }) {
  const normalizedEmail = normalizeEmail(ownerEmail);
  const normalizedAuthUserId = clean(authUserId);

  if (normalizedAuthUserId) {
    const { data, error } = await supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("auth_user_id", normalizedAuthUserId)
      .maybeSingle();

    if (error) {
      console.error("Owner profile auth_user_id lookup failed:", error);
    }

    if (data) {
      return data;
    }
  }

  if (normalizedEmail) {
    const { data, error } = await supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("owner_email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error("Owner profile owner_email lookup failed:", error);
    }

    if (data) {
      return data;
    }
  }

  if (normalizedEmail) {
    const { data, error } = await supabaseAdmin
      .from("owner_profiles")
      .select("*")
      .eq("user_email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error("Legacy owner_profiles lookup failed:", error);
    }

    if (data) {
      return data;
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

    if (!ownerEmail && !authUserId) {
      return res.status(400).json({
        success: false,
        error: "Missing ownerEmail or authUserId.",
      });
    }

    const accessRecord = await findOwnerAccessRecord({
      ownerEmail,
      authUserId,
    });

    if (!accessRecord) {
      return res.status(404).json({
        success: false,
        error:
          "No homeowner profile is linked to this login. Please confirm owner onboarding and access provisioning.",
        ownerProfile: null,
      });
    }

    const ownerProfile = normalizeOwnerProfile(accessRecord, ownerEmail);

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
