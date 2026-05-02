import { supabase } from "./supabaseClient";

const DEMO_OWNER_EMAIL = "demo.owner1@stouttpm.com";

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

export async function loadDemoOwnerProfile() {
  let { data, error } = await supabase
    .from("owner_profiles")
    .select("*")
    .eq("user_email", DEMO_OWNER_EMAIL)
    .maybeSingle();

  if (error) {
    console.error("Owner profile email lookup error:", error);
  }

  if (!data) {
    const fallback = await supabase
      .from("owner_profiles")
      .select("*")
      .limit(1)
      .maybeSingle();

    data = fallback.data;
    error = fallback.error;
  }

  if (error || !data) {
    console.error("Owner profile load error:", error);
    return null;
  }

  return {
    associationName: clean(data.association_name) || "Royal Palm Villas HOA",
    ownerName: clean(data.owner_name) || "Michael Bennett",
    streetAddress: clean(data.property_address) || "1842 Palm Ridge Drive",
    city: clean(data.city) || "Hollywood",
    state: clean(data.state) || "FL",
    zip: clean(data.zip_code) || "33021",
    phone: clean(data.owner_phone) || "(954) 555-0148",
    email: clean(data.user_email) || DEMO_OWNER_EMAIL,
  };
}
