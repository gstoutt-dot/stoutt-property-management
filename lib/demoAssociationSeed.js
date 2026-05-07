import { supabase } from "./supabaseClient";

export async function seedDemoAssociation() {
  const associationPayload = {
    name: "Royal Palm Villas HOA",
    legal_name: "Royal Palm Villas Homeowners Association, Inc.",
    property_address: "1842 Palm Ridge Drive",
    city: "Hollywood",
    state: "FL",
    zip: "33021",
    status: "active",
  };

  const { data: association, error: associationError } = await supabase
    .from("associations")
    .insert([associationPayload])
    .select()
    .single();

  if (associationError) {
    console.error("Association seed failed:", associationError);

    return {
      success: false,
      error: associationError,
    };
  }

  const demoUsers = [
    {
      role: "manager",
      full_name: "Glenn Stoutt",
      email: "manager@royalpalmvillas.com",
      association_id: association.id,
      property_address: association.property_address,
      status: "active",
    },
    {
      role: "board",
      full_name: "Sarah Mitchell",
      email: "board1@royalpalmvillas.com",
      association_id: association.id,
      property_address: association.property_address,
      status: "active",
    },
    {
      role: "board",
      full_name: "David Keller",
      email: "board2@royalpalmvillas.com",
      association_id: association.id,
      property_address: association.property_address,
      status: "active",
    },
    {
      role: "owner",
      full_name: "Michael Bennett",
      email: "owner1@royalpalmvillas.com",
      unit_number: "101",
      association_id: association.id,
      property_address: "1842 Palm Ridge Drive Unit 101",
      status: "active",
    },
    {
      role: "owner",
      full_name: "Jessica Turner",
      email: "owner2@royalpalmvillas.com",
      unit_number: "102",
      association_id: association.id,
      property_address: "1842 Palm Ridge Drive Unit 102",
      status: "active",
    },
  ];

  const { data: profiles, error: profileError } = await supabase
    .from("user_profiles")
    .insert(demoUsers)
    .select();

  if (profileError) {
    console.error("Profile seed failed:", profileError);

    return {
      success: false,
      error: profileError,
    };
  }

  return {
    success: true,
    association,
    profiles,
  };
}
