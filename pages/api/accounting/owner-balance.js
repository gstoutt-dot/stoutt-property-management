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

    if (!cleanAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    let query = supabaseAdmin
      .from("owner_account_balances")
      .select(`
        *,
        accounting_identity_links (
          quickbooks_company_name,
          quickbooks_customer_id,
          quickbooks_customer_display_name,
          last_invoice_id,
          last_payment_id,
          sync_status,
          last_synced_at
        )
      `)
      .eq("association_id", cleanAssociationId);

    if (ownerUserId) {
      query = query.eq(
        "owner_user_id",
        String(ownerUserId).trim()
      );
    }

    if (unitNumber) {
      query = query.eq(
        "unit_number",
        String(unitNumber).trim()
      );
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        error: "Owner balance not found.",
        details: error || null,
      });
    }

    const identity =
      data.accounting_identity_links || null;

    return res.status(200).json({
      success: true,

      balance: {
        association_id: data.association_id,
        owner_user_id: data.owner_user_id,

        owner_name: data.owner_name,
        unit_number: data.unit_number,

        account_number: data.account_number,

        current_balance: data.current_balance,
        monthly_assessment:
          data.monthly_assessment,

        payment_status: data.payment_status,

        delinquency_level:
          data.delinquency_level,

        account_health:
          data.account_health,

        last_payment_date:
          data.last_payment_date,

        payment_link: data.payment_link,

        synced_at: data.synced_at,

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
