import { supabase } from "./supabaseClient";

/*
  Temporary presentation fallback.

  This remains in place until full production
  Supabase Auth owner authentication is enabled.
*/

const DEMO_OWNER_EMAIL = "unit101@sunsetcondo.com";

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

/*
  PRODUCTION-READY OWNER PROFILE RESOLUTION

  Current phase:
  - demo-compatible
  - onboarding-compatible
  - owner-access compatible
  - future-auth compatible

  Future phase:
  Replace demo email resolution with authenticated
  Supabase session identity.
*/

export async function loadDemoOwnerProfile() {
  /*
    Step 1:
    Resolve provisioned owner access record.
  */

  let { data: accessRecord, error: accessError } = await supabase
    .from("owner_access_provisioning_records")
    .select("*")
    .eq("owner_email", DEMO_OWNER_EMAIL)
    .maybeSingle();

  if (accessError) {
    console.error(
      "Owner access provisioning lookup failed:",
      accessError
    );
  }

  /*
    Step 2:
    Fallback to owner_profiles legacy architecture
    for backward compatibility.
  */

  if (!accessRecord) {
    const fallback = await supabase
      .from("owner_profiles")
      .select("*")
      .eq("user_email", DEMO_OWNER_EMAIL)
      .maybeSingle();

    accessRecord = fallback.data;

    if (fallback.error) {
      console.error(
        "Legacy owner profile fallback failed:",
        fallback.error
      );
    }
  }

  /*
    Step 3:
    Final fallback for presentation continuity.
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
      email: DEMO_OWNER_EMAIL,
      association_id:
        "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",
      unitNumber: "101",
    };
  }

  /*
    Step 4:
    Normalize owner profile structure.
  */

  return {
    associationName:
      clean(accessRecord.association_name) ||
      "Sunset Condominium Association",

    ownerName:
      clean(accessRecord.owner_name) ||
      "Owner",

    streetAddress:
      clean(accessRecord.street_address) ||
      "Property Address",

    city:
      clean(accessRecord.city) ||
      "Hollywood",

    state:
      clean(accessRecord.state) ||
      "FL",

    zip:
      clean(accessRecord.zip) ||
      "33021",

    phone:
      clean(accessRecord.owner_phone) ||
      "",

    email:
      clean(
        accessRecord.owner_email ||
        accessRecord.user_email
      ) || DEMO_OWNER_EMAIL,

    association_id:
      clean(accessRecord.association_id) || null,

    owner_user_id:
      clean(accessRecord.owner_user_id) || null,

    unitNumber:
      clean(accessRecord.unit_number) || "",
  };
}
