import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value) {
  return String(value || "").trim();
}

async function safeDelete(tableName, columnName, value) {
  if (!value) return;

  const { error } = await supabaseAdmin
    .from(tableName)
    .delete()
    .eq(columnName, value);

  if (error) {
    console.warn(`Delete warning: ${tableName}.${columnName}`, error.message);
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const incomingId = cleanText(req.query?.association_id || req.query?.id);
    const confirm = cleanText(req.query?.confirm);

    if (!incomingId) {
      return res.status(400).json({
        success: false,
        message: "Association id is required.",
      });
    }

    if (confirm !== "DELETE") {
      return res.status(400).json({
        success: false,
        message: "Confirmation is required. Use confirm=DELETE.",
      });
    }

    const { data: association } = await supabaseAdmin
      .from("associations")
      .select("id, name")
      .eq("id", incomingId)
      .maybeSingle();

    const { data: onboardingProfile } = await supabaseAdmin
      .from("association_onboarding_profiles")
      .select("id, association_id, association_name")
      .or(`association_id.eq.${incomingId},id.eq.${incomingId}`)
      .maybeSingle();

    const associationId =
      association?.id || onboardingProfile?.association_id || incomingId;

    const associationName =
      association?.name ||
      onboardingProfile?.association_name ||
      "Association record";

    await safeDelete("portal_access_approvals", "association_id", associationId);
    await safeDelete("owner_access_provisioning_records", "association_id", associationId);
    await safeDelete("owner_identity_mapping_records", "association_id", associationId);
    await safeDelete("accounting_identity_links", "association_id", associationId);
    await safeDelete("owner_account_balances", "association_id", associationId);
    await safeDelete("owner_account_ledger_entries", "association_id", associationId);
    await safeDelete("association_ava_knowledge_chunks", "association_id", associationId);
    await safeDelete("association_ava_knowledge_files", "association_id", associationId);

    await safeDelete("association_onboarding_profiles", "association_id", associationId);
    await safeDelete("association_onboarding_profiles", "id", incomingId);

    await safeDelete("associations", "id", associationId);

    return res.status(200).json({
      success: true,
      message: `${associationName} deleted.`,
      association_id: associationId,
    });
  } catch (error) {
    console.error("Association delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete association.",
    });
  }
}
