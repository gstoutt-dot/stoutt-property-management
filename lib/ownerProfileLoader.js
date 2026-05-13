import { supabase } from "./supabaseClient";

/*
  OWNER PROFILE RESOLUTION

  Production path:
  Supabase Auth session → authenticated user email/id → owner access record

  Safe fallback:
  Demo owner remains available during transition so the live owner portal
  does not break while owner invitations/auth onboarding are completed.
*/

const FALLBACK_OWNER_EMAIL = "unit101@sunsetcondo.com";

function clean(value) {
  if (!value) return "";

  const text = String(value).trim();

  if (
    text.toLowerCase() === "unknown" ||
    text.toLowerCase() === "not available" ||
    text.toLowerCase() === "n/a"
  ) {
    return "";
  }

  return text;
}

function normalizeOwnerProfile(record, fallbackEmail) {
  return {
    associationName:
      clean(record?.association_name) ||
      "Sunset Condominium Association",

    ownerName:
      clean(record?.owner_name) ||
      "Owner",

    streetAddress:
      clean(record?.street_address) ||
      "Sunset Condominium Association",

    city:
      clean(record?.city) ||
      "Hollywood",

    state:
      clean(record?.state) ||
      "FL",

    zip:
      clean(record?.zip) ||
      "33021",

    phone:
      clean(record?.owner_phone) ||
      "",

    email:
      clean(record?.owner_email || record?.user_email) ||
      fallbackEmail,

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

export async function loadDemoOwnerProfile() {
  let resolvedEmail = FALLBACK_OWNER_EMAIL;
  let resolvedAuthUserId = null;

  /*
    Step 1:
    Try real Supabase Auth session first.
  */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Supabase auth user lookup failed:", userError);
  }

  if (user?.email) {
    resolvedEmail = String(user.email).toLowerCase().trim();
    resolvedAuthUserId = user.id || null;
  }

  /*
    Step 2:
    Look up owner access by auth_user_id first when available.
  */

  let accessRecord = null;

  if (resolvedAuthUserId) {
    const { data, error } = await supabase
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("auth_user_id", resolvedAuthUserId)
      .maybeSingle();

    if (error) {
      console.error("Owner access auth_user_id lookup failed:", error);
    }

    accessRecord = data;
  }

  /*
    Step 3:
    Fallback lookup by owner email.
  */

  if (!accessRecord && resolvedEmail) {
    const { data, error } = await supabase
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("owner_email", resolvedEmail)
      .maybeSingle();

    if (error) {
      console.error("Owner access email lookup failed:", error);
    }

    accessRecord = data;
  }

  /*
    Step 4:
    Backward-compatible legacy owner_profiles fallback.
  */

  if (!accessRecord && resolvedEmail) {
    const { data, error } = await supabase
      .from("owner_profiles")
      .select("*")
      .eq("user_email", resolvedEmail)
      .maybeSingle();

    if (error) {
      console.error("Legacy owner profile fallback failed:", error);
    }

    accessRecord = data;
  }

  /*
    Step 5:
    Final safe presentation fallback.
  */

  if (!accessRecord) {
    return {
      associationName: "Sunset Condominium Association",
      ownerName: "Robert Mitchell",
      streetAddress: "Sunset Condominium Association",
      city: "Hollywood",
      state: "FL",
      zip: "33021",
      phone: "(954) 555-0101",
      email: FALLBACK_OWNER_EMAIL,
      association_id: "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",
      id: "2576c2a8-e49e-4009-9d07-10aba3c63090",
      owner_user_id: "2576c2a8-e49e-4009-9d07-10aba3c63090",
      auth_user_id: resolvedAuthUserId,
      unitNumber: "101",
    };
  }

  return normalizeOwnerProfile(accessRecord, resolvedEmail);
}
