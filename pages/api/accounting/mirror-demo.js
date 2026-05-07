import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { buildOwnerBalanceRecord } from "../../../lib/accountingMirrorEngine";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { associationId } = req.body || {};

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    const { data: owners, error: ownersError } =
      await supabaseAdmin
        .from("user_profiles")
        .select("*")
        .eq("association_id", associationId.trim())
        .ilike("role", "owner")
        .eq("status", "active")
        .order("unit_number", { ascending: true });

    if (ownersError) {
      return res.status(500).json({
        success: false,
        error: ownersError.message || "Unable to load owners.",
      });
    }

    const records = (owners || []).map((owner, index) =>
      buildOwnerBalanceRecord({
        associationId: associationId.trim(),
        ownerUserId: owner.id,
        ownerName: owner.full_name,
        unitNumber: owner.unit_number,
        accountNumber: `QB-DEMO-${owner.unit_number || index + 1}`,
        currentBalance: index === 0 ? 0 : 250 + index * 75,
        monthlyAssessment: 425,
        lastPaymentDate:
          index === 0 ? "2026-05-01" : "2026-04-15",
        paymentStatus:
          index === 0 ? "current" : "balance_due",
        paymentLink: "https://stouttmgmt.com/payments",
      })
    );

    const { data, error } = await supabaseAdmin
      .from("owner_account_balances")
      .upsert(records, {
        onConflict:
          "association_id,owner_user_id,unit_number",
      })
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Unable to mirror demo accounting records.",
      });
    }

    return res.status(200).json({
      success: true,
      mirrored: data || [],
    });
  } catch (error) {
    console.error("Accounting mirror demo API failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unexpected accounting mirror error.",
      stack: error?.stack || null,
    });
  }
}
