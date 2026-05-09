import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { buildOwnerBalanceRecord } from "../../../lib/accountingMirrorEngine";
import { createNotification } from "../../../lib/notificationRouter";

const SUNSET_QB_COMPANY_NAME = "Sunset Condominium Association";
const DEFAULT_MONTHLY_ASSESSMENT = 425;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { associationId } = req.body || {};
    const cleanAssociationId = String(associationId || "").trim();

    if (!cleanAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    const { data: owners, error: ownersError } = await supabaseAdmin
      .from("user_profiles")
      .select("*")
      .eq("association_id", cleanAssociationId)
      .ilike("role", "owner")
      .eq("status", "active")
      .order("unit_number", { ascending: true });

    if (ownersError) {
      return res.status(500).json({
        success: false,
        error: ownersError.message || "Unable to load owners.",
      });
    }

    if (!owners || owners.length === 0) {
      return res.status(404).json({
        success: false,
        error:
          "No active owners found for this association. Add owner profiles before running the accounting mirror.",
      });
    }

    const records = owners.map((owner, index) => {
      const unitNumber = owner.unit_number || `UNKNOWN-${index + 1}`;
      const ownerName =
        owner.full_name ||
        owner.name ||
        `Unit ${unitNumber} Owner`;

      const isCurrent = index === 0;

      return buildOwnerBalanceRecord({
        associationId: cleanAssociationId,
        ownerUserId: owner.id,
        ownerName,
        unitNumber,
        accountNumber: `SUNSET-QB-${unitNumber}`,
        currentBalance: isCurrent ? 0 : 250 + index * 75,
        monthlyAssessment: DEFAULT_MONTHLY_ASSESSMENT,
        lastPaymentDate: isCurrent ? "2026-05-01" : "2026-04-15",
        paymentStatus: isCurrent ? "current" : "balance_due",
        paymentLink: "https://stouttmgmt.com/payments",
      });
    });

    const { data, error } = await supabaseAdmin
      .from("owner_account_balances")
      .upsert(records, {
        onConflict: "association_id,owner_user_id,unit_number",
      })
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error:
          error.message ||
          "Unable to mirror Sunset accounting records.",
      });
    }

    await createNotification({
      associationId: cleanAssociationId,
      recipientRole: "manager",
      notificationType: "accounting_mirror_sync",
      title: "Sunset accounting mirror sync completed",
      message: `${data?.length || 0} owner balance records from ${SUNSET_QB_COMPANY_NAME} were mirrored successfully.`,
      relatedEntityType: "accounting_mirror",
      priority: "normal",
    });

    return res.status(200).json({
      success: true,
      source: "quickbooks_accountant_mirror",
      company: SUNSET_QB_COMPANY_NAME,
      mirrored: data || [],
    });
  } catch (error) {
    console.error("Sunset accounting mirror API failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unexpected Sunset accounting mirror error.",
      stack: error?.stack || null,
    });
  }
}
