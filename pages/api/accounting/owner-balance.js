import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { associationId, ownerUserId, unitNumber } = req.query || {};

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    let query = supabase
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", associationId)
      .limit(1);

    if (ownerUserId) {
      query = query.eq("owner_user_id", ownerUserId);
    } else if (unitNumber) {
      query = query.eq("unit_number", unitNumber);
    } else {
      return res.status(400).json({
        success: false,
        error: "Missing ownerUserId or unitNumber.",
      });
    }

    const { data, error } = await query.single();

    if (error) {
      return res.status(404).json({
        success: false,
        error: "Owner balance not found.",
      });
    }

    return res.status(200).json({
      success: true,
      balance: {
        owner_name: data.owner_name,
        unit_number: data.unit_number,
        current_balance: data.current_balance,
        monthly_assessment: data.monthly_assessment,
        last_payment_date: data.last_payment_date,
        payment_status: data.payment_status,
        payment_link: data.payment_link,
        synced_at: data.synced_at,
      },
    });
  } catch (error) {
    console.error("Owner balance API failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected owner balance error.",
    });
  }
}
