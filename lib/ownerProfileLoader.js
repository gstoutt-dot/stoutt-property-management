import { supabase } from "./supabaseClient";

const DEMO_OWNER_EMAIL = "demo.owner1@stouttpm.com";

export async function loadDemoOwnerProfile() {
  const { data, error } = await supabase
    .from("owner_profiles")
    .select("*")
    .eq("user_email", DEMO_OWNER_EMAIL)
    .single();

  if (error) {
    console.error("Owner profile load error:", error);
    return null;
  }

  return {
    associationName: data.association_name || "Not available",
    ownerName: data.owner_name || "Not available",
    streetAddress: data.property_address || "Not available",
    city: data.city || "Not available",
    state: data.state || "Not available",
    zip: data.zip_code || "Not available",
    phone: data.owner_phone || "Not available",
    email: data.user_email || "Not available",
    unitNumber: null, // not in your schema
  };
}
