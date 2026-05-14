import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId = String(req.query.associationId || "").trim();
    const ownerUserId = String(req.query.ownerUserId || "").trim();
    const unitNumber = String(req.query.unitNumber || "").trim();

    if (!associationId || (!ownerUserId && !unitNumber)) {
      return res.status(400).json({
        success: false,
        error: "Association ID and owner identity are required.",
      });
    }

    let query = supabaseAdmin
      .from("owner_account_ledger_entries")
      .select("*")
      .eq("association_id", associationId)
      .order("transaction_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (ownerUserId) {
      query = query.eq("owner_user_id", ownerUserId);
    } else {
      query = query.eq("unit_number", unitNumber);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const totalCharges = (data || []).reduce(
      (sum, entry) => sum + Number(entry.charge_amount || 0),
      0
    );

    const totalPayments = (data || []).reduce(
      (sum, entry) => sum + Number(entry.payment_amount || 0),
      0
    );

    const totalCredits = (data || []).reduce(
      (sum, entry) => sum + Number(entry.credit_amount || 0),
      0
    );

    return res.status(200).json({
      success: true,
      associationId,
      ownerUserId,
      unitNumber,
      entryCount: data?.length || 0,
      summary: {
        totalCharges,
        totalPayments,
        totalCredits,
        netActivity: totalCharges - totalPayments - totalCredits,
      },
      entries: data || [],
    });
  } catch (error) {
    console.error("Owner account ledger lookup failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load owner account ledger.",
    });
  }
}
