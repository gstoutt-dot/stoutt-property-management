import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    const associationId = String(
      req.query.association_id || ""
    ).trim();

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "association_id required",
      });
    }

    const { data: identityLinks } = await supabaseAdmin
      .from("accounting_identity_links")
      .select("*")
      .eq("association_id", associationId);

    const { data: ownerBalances } = await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", associationId);

    return res.status(200).json({
      success: true,
      identity_links: identityLinks || [],
      owner_balances: ownerBalances || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
