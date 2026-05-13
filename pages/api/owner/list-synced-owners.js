import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const SUNSET_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId = String(
      req.query.associationId || SUNSET_ASSOCIATION_ID
    ).trim();

    const { data, error } = await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", associationId)
      .order("unit_number", { ascending: true });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      associationId,
      ownerCount: data?.length || 0,
      owners: data || [],
    });
  } catch (error) {
    console.error("Synced owner list lookup failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load synced owners.",
    });
  }
}
