import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      associationId,
      ownerUserId,
      unitNumber,
    } = req.query || {};

    const cleanAssociationId = String(
      associationId || ""
    ).trim();

    const cleanOwnerUserId = String(
      ownerUserId || ""
    ).trim();

    const cleanUnitNumber = String(
      unitNumber || ""
    ).trim();

    if (!cleanAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    if (!cleanOwnerUserId && !cleanUnitNumber) {
      return res.status(400).json({
        success: false,
        error:
          "Missing ownerUserId or unitNumber.",
      });
    }

    let balance = null;
    let balanceError = null;

    if (cleanOwnerUserId) {
      const result = await supabaseAdmin
        .from("owner_account_balances")
        .select("*")
        .eq("association_id", cleanAssociationId)
        .eq("owner_user_id", cleanOwnerUserId)
        .maybeSingle();

      balance = result.data;
      balanceError = result.error;
    }

    if (!balance && cleanUnitNumber) {
      const result = await supabaseAdmin
        .from("owner_account_balances")
        .select("*")
        .eq("association_id", cleanAssociationId)
        .eq("unit_number", cleanUnitNumber)
        .maybeSingle();

      balance = result.data;
      balanceError = result.error;
    }

    if (balanceError || !balance) {
      return res.status(404).json({
        success: false,
        error: "Owner balance not found.",
        details: balanceError || null,
      });
    }

        const { data: identity } =
      await supabaseAdmin
        .from("accounting_identity_links")
        .select("*")
        .eq("association_id", cleanAssociationId)
        .eq("unit_number", balance.unit_number)
        .maybeSingle();

    let resolvedCurrentBalance = balance.current_balance;

    const { data: ledgerEntries, error: ledgerError } =
      await supabaseAdmin
        .from("owner_account_ledger_entries")
        .select("charge_amount,payment_amount,credit_amount")
        .eq("association_id", cleanAssociationId)
        .eq("unit_number", balance.unit_number);

    if (!ledgerError && Array.isArray(ledgerEntries) && ledgerEntries.length > 0) {
      const totalCharges = ledgerEntries.reduce(
        (sum, entry) => sum + Number(entry.charge_amount || 0),
        0
      );

      const totalPayments = ledgerEntries.reduce(
        (sum, entry) => sum + Number(entry.payment_amount || 0),
        0
      );

      const totalCredits = ledgerEntries.reduce(
        (sum, entry) => sum + Number(entry.credit_amount || 0),
        0
      );

      resolvedCurrentBalance = totalCharges - totalPayments - totalCredits;
    }

    return res.status(200).json({
      success: true,
      balance: {
        association_id: balance.association_id,
        owner_user_id: balance.owner_user_id,

        owner_name: balance.owner_name,
        unit_number: balance.unit_number,
        account_number: balance.account_number,

                current_balance:
          resolvedCurrentBalance,

        monthly_assessment:
          balance.monthly_assessment,

        payment_status:
          balance.payment_status,

        delinquency_level:
          balance.delinquency_level,

        account_health:
          balance.account_health,

        last_payment_date:
          balance.last_payment_date,

        payment_link:
          balance.payment_link,

        synced_at:
          balance.synced_at,

        accounting_identity: identity
          ? {
              quickbooks_company_name:
                identity.quickbooks_company_name,

              quickbooks_customer_id:
                identity.quickbooks_customer_id,

              quickbooks_customer_display_name:
                identity.quickbooks_customer_display_name,

              last_invoice_id:
                identity.last_invoice_id,

              last_payment_id:
                identity.last_payment_id,

              sync_status:
                identity.sync_status,

              last_synced_at:
                identity.last_synced_at,
            }
          : null,
      },
    });
  } catch (error) {
    console.error(
      "Owner balance API failed:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unexpected owner balance error.",
      stack: error?.stack || null,
    });
  }
}
