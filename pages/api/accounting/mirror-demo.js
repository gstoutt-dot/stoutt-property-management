import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { buildOwnerBalanceRecord } from "../../../lib/accountingMirrorEngine";
import { createNotification } from "../../../lib/notificationRouter";

const SUNSET_QB_COMPANY_NAME = "Sunset Condominium Association";
const DEFAULT_MONTHLY_ASSESSMENT = 425;

const SUNSET_QB_CUSTOMERS = [
  {
    unitNumber: "101",
    ownerName: "Robert Mitchell",
    currentBalance: 375,
    lastPaymentDate: "2026-04-15",
  },
  {
    unitNumber: "102",
    ownerName: "Angela Brooks",
    currentBalance: 750,
    lastPaymentDate: "2026-04-10",
  },
  {
    unitNumber: "103",
    ownerName: "Carlos Hernandez",
    currentBalance: 0,
    lastPaymentDate: "2026-05-01",
  },
  {
    unitNumber: "104",
    ownerName: "Lisa Morgan",
    currentBalance: 1850,
    lastPaymentDate: "2026-03-20",
  },
  {
    unitNumber: "204",
    ownerName: "Michael Turner",
    currentBalance: 650,
    lastPaymentDate: "2026-04-05",
  },
  {
    unitNumber: "305",
    ownerName: "Sarah Collins",
    currentBalance: 412.5,
    lastPaymentDate: "2026-04-18",
  },
  {
    unitNumber: "408",
    ownerName: "David Ramirez",
    currentBalance: 1125,
    lastPaymentDate: "2026-03-28",
  },
  {
    unitNumber: "512",
    ownerName: "Jennifer Lee",
    currentBalance: 0,
    lastPaymentDate: "2026-05-01",
  },
  {
    unitNumber: "601",
    ownerName: "Thomas Walker",
    currentBalance: 525,
    lastPaymentDate: "2026-04-12",
  },
  {
    unitNumber: "702",
    ownerName: "Emily Foster",
    currentBalance: 2400,
    lastPaymentDate: "2026-03-15",
  },
];

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

    const balanceRecords = SUNSET_QB_CUSTOMERS.map((customer) =>
      buildOwnerBalanceRecord({
        associationId: cleanAssociationId,
        ownerUserId: null,
        ownerName: customer.ownerName,
        unitNumber: customer.unitNumber,
        accountNumber: `SUNSET-QB-${customer.unitNumber}`,
        currentBalance: customer.currentBalance,
        monthlyAssessment: DEFAULT_MONTHLY_ASSESSMENT,
        lastPaymentDate: customer.lastPaymentDate,
        paymentStatus:
          Number(customer.currentBalance || 0) > 0
            ? "balance_due"
            : "current",
        paymentLink: "https://stouttmgmt.com/payments",
      })
    );

    const identityRecords = SUNSET_QB_CUSTOMERS.map((customer) => ({
      association_id: cleanAssociationId,
      unit_number: customer.unitNumber,
      owner_user_id: null,
      quickbooks_company_name: SUNSET_QB_COMPANY_NAME,
      quickbooks_customer_id: `QB-CUSTOMER-${customer.unitNumber}`,
      quickbooks_customer_display_name: `Unit ${customer.unitNumber} - ${customer.ownerName}`,
      last_invoice_id: `QB-INVOICE-${customer.unitNumber}`,
      last_payment_id:
        Number(customer.currentBalance || 0) > 0
          ? null
          : `QB-PAYMENT-${customer.unitNumber}`,
      current_balance: Number(customer.currentBalance || 0),
      monthly_assessment: DEFAULT_MONTHLY_ASSESSMENT,
      sync_status: "mirror_ready",
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { error: deleteBalanceError } = await supabaseAdmin
      .from("owner_account_balances")
      .delete()
      .eq("association_id", cleanAssociationId);

    if (deleteBalanceError) {
      return res.status(500).json({
        success: false,
        error:
          deleteBalanceError.message ||
          "Unable to clear previous owner balance mirror records.",
      });
    }

    const { data: balanceData, error: balanceError } =
      await supabaseAdmin
        .from("owner_account_balances")
        .insert(balanceRecords)
        .select();

    if (balanceError) {
      return res.status(500).json({
        success: false,
        error:
          balanceError.message ||
          "Unable to mirror Sunset owner balance records.",
      });
    }

    const { data: identityData, error: identityError } =
      await supabaseAdmin
        .from("accounting_identity_links")
        .upsert(identityRecords, {
          onConflict: "association_id,unit_number",
        })
        .select();

    if (identityError) {
      return res.status(500).json({
        success: false,
        error:
          identityError.message ||
          "Unable to update QuickBooks identity links.",
      });
    }

    await createNotification({
      associationId: cleanAssociationId,
      recipientRole: "manager",
      notificationType: "accounting_mirror_sync",
      title: "Sunset accounting mirror sync completed",
      message: `${balanceData?.length || 0} owner balances and ${
        identityData?.length || 0
      } QuickBooks identity links were synchronized.`,
      relatedEntityType: "accounting_mirror",
      priority: "normal",
    });

    return res.status(200).json({
      success: true,
      source: "quickbooks_accountant_mirror",
      company: SUNSET_QB_COMPANY_NAME,
      mirrored: balanceData || [],
      identityLinks: identityData || [],
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
