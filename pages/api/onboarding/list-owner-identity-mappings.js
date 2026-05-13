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

    const quickbooksCustomerId = String(
      req.query.quickbooksCustomerId || ""
    ).trim();

    let query = supabaseAdmin
      .from("owner_identity_mapping_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (unitNumber) {
      query = query.eq("unit_number", unitNumber);
    }

    if (ownerEmail) {
      query = query.eq("owner_email", ownerEmail);
    }

    if (quickbooksCustomerId) {
      query = query.eq(
        "quickbooks_customer_id",
        quickbooksCustomerId
      );
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const mappings = data || [];

    const summary = {
      total: mappings.length,

      matched: mappings.filter(
        (mapping) =>
          String(mapping.match_status || "").toLowerCase() ===
          "matched"
      ).length,

      pending: mappings.filter(
        (mapping) =>
          String(mapping.match_status || "").toLowerCase() ===
          "pending"
      ).length,

      loginEnabled: mappings.filter(
        (mapping) =>
          String(mapping.login_status || "").toLowerCase() ===
          "enabled"
      ).length,

      financialVisible: mappings.filter(
        (mapping) =>
          String(
            mapping.financial_visibility_status || ""
          ).toLowerCase() === "enabled"
      ).length,
    };

    return res.status(200).json({
      success: true,
      summary,
      mappings,
    });
  } catch (error) {
    console.error("List owner identity mappings failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to load owner identity mappings.",
    });
  }
}
