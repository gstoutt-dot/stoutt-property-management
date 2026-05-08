import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { createNotification } from "../../../lib/notificationRouter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationPayload = {
      name: "Royal Palm Villas HOA",
      legal_name: "Royal Palm Villas Homeowners Association, Inc.",
      property_address: "1842 Palm Ridge Drive",
      city: "Hollywood",
      state: "FL",
      zip: "33021",
      status: "active",
    };

    const { data: association, error: associationError } = await supabaseAdmin
      .from("associations")
      .insert([associationPayload])
      .select()
      .single();

    if (associationError) {
      return res.status(500).json({
        success: false,
        stage: "association_insert",
        error: associationError.message,
        details: associationError,
      });
    }

    const demoProfiles = [
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
        role: "owner",
        full_name: "Michael Bennett",
        email: "owner1@royalpalmvillas.com",
        association_id: association.id,
        property_address: "1842 Palm Ridge Drive Unit 101",
        unit_number: "101",
        status: "active",
      },
    ];

    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("user_profiles")
      .insert(demoProfiles)
      .select();

    if (profilesError) {
      return res.status(500).json({
        success: false,
        stage: "profiles_insert",
        error: profilesError.message,
        details: profilesError,
        association,
      });
    }

   await createNotification({
  associationId: association.id,
  recipientRole: "manager",
  notificationType: "association_seeded",
  title: "Demo association foundation created",
  message: `${association.name} was seeded with ${profiles?.length || 0} active demo profiles.`,
  relatedEntityType: "association",
  relatedEntityId: association.id,
  priority: "normal",
});

return res.status(200).json({
  success: true,
  association,
  profiles,
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      stage: "unexpected_catch",
      error: error?.message || "Unexpected secure seed error.",
      stack: error?.stack || null,
    });
  }
}
