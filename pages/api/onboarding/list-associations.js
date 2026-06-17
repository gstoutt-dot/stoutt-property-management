import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("associations")
      .select("id, name, status, city, county, type, created_at")
      .order("name", { ascending: true });

    if (error) {
      throw error;
    }

    const associations = (data || []).map((association) => ({
      id: association.id,
      association_id: association.id,
      name: association.name,
      association_name: association.name,
      status: association.status,
      city: association.city,
      county: association.county,
      property_type: association.type,
      created_at: association.created_at,
    }));

    return res.status(200).json({
      success: true,
      associations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load association records.",
    });
  }
}
