import { supabase } from "./supabaseClient";

export async function loadDemoOwnerProfile() {
  const { data, error } = await supabase
    .from("owner_profiles")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Owner profile load error:", error);
    return null;
  }

  return {
    associationName: data.association_name || "Not available",
    ownerName: data.owner_name || "Not available",
    streetAddress: data.street_address || "Not available",
    city: data.city || "Not available",
    state: data.state || "Not available",
    zip: data.zip || "Not available",
    phone: data.phone || "Not available",
    email: data.email || "Not available",
    unitNumber: data.unit_number || "Not available",
  };
}
