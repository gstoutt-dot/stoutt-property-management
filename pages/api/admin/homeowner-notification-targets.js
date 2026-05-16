import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed.",
    });
  }

  try {
    const { associationId, association_id } = req.query || {};

    const resolvedAssociationId = String(
      associationId || association_id || ""
    ).trim();

    if (!resolvedAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("owner_account_balances")
      .select(
        "association_id, owner_user_id, owner_name, unit_number"
      )
      .eq("association_id", resolvedAssociationId)
      .order("unit_number", { ascending: true });

    if (error) {
      throw error;
    }

    const owners = data || [];

    const units = Array.from(
      new Set(
        owners
          .map((owner) => owner.unit_number)
          .filter(Boolean)
          .map((unit) => String(unit))
      )
    );

    return res.status(200).json({
      success: true,
      owners,
      units,
    });
  } catch (error) {
    console.error("homeowner-notification-targets error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  }
}
