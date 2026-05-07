import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { associationId, ownerUserId, unitNumber } =
      req.query || {};

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    let query = supabaseAdmin
      .from("owner_account_balances")
      .select("*");

    query = query.eq(
      "association_id",
      associationId.trim()
    );

    if (ownerUserId) {
      query = query.eq(
        "owner_user_id",
        ownerUserId.trim()
      );
    }

    if (unitNumber) {
      query = query.eq(
        "unit_number",
        unitNumber.trim()
      );
    }

    const { data, error } = await query.single();

    if (error) {
      return res.status(404).json({
        success: false,
        error: "Owner balance not found.",
        details: error,
      });
    }

    return res.status(200).json({
      success: true,
      balance: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unexpected owner balance error.",
      stack: error?.stack || null,
    });
  }
}
