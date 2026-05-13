import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const unitNumber = String(
      req.query.unitNumber || ""
    ).trim();

    const ownerEmail = String(
      req.query.ownerEmail || ""
    )
      .toLowerCase()
      .trim();

    const accountNumber = String(
      req.query.accountNumber || ""
    ).trim();

    let query = supabaseAdmin
      .from("owner_unit_import_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (unitNumber) {
      query = query.eq("unit_number", unitNumber);
    }

    if (ownerEmail) {
      query = query.eq("owner_email", ownerEmail);
    }

    if (accountNumber) {
      query = query.eq("account_number", accountNumber);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const ownerUnits = data || [];

    const summary = {
      total: ownerUnits.length,

      ready: ownerUnits.filter(
        (unit) =>
          String(unit.import_status || "").toLowerCase() ===
          "ready"
      ).length,

      pending: ownerUnits.filter(
        (unit) =>
          String(unit.mapping_status || "").toLowerCase() ===
          "pending"
      ).length,

      mapped: ownerUnits.filter(
        (unit) =>
          String(unit.mapping_status || "").toLowerCase() ===
          "mapped"
      ).length,

      withBalances: ownerUnits.filter(
        (unit) =>
          Number(unit.opening_balance || 0) !== 0
      ).length,
    };

    return res.status(200).json({
      success: true,
      summary,
      ownerUnits,
    });
  } catch (error) {
    console.error("List owner/unit records failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load owner/unit records.",
    });
  }
}
