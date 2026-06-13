import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value) {
  return String(value || "").trim();
}

async function deleteFromTable(tableName, associationId) {
  const { error } = await supabaseAdmin
    .from(tableName)
    .delete()
    .eq("association_id", associationId);

  if (error) {
    console.warn(`Delete warning for ${tableName}:`, error.message);
  }

  return error ? 0 : 1;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const associationId = cleanText(req.query?.association_id || req.query?.id);
    const confirm = cleanText(req.query?.confirm);

    if (!associationId) {
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

    const { data: association, error: associationLookupError } =
      await supabaseAdmin
        .from("associations")
        .select("id, name")
        .eq("id", associationId)
        .maybeSingle();

    if (associationLookupError) {
      throw associationLookupError;
    }

    if (!association) {
      return res.status(404).json({
        success: false,
        message: "Association not found.",
      });
    }

    const deleteResults = {};

    const tablesToDeleteByAssociationId = [
      "portal_access_approvals",
      "association_onboarding_profiles",
      "owner_access_provisioning_records",
      "owner_identity_mapping_records",
      "accounting_identity_links",
      "owner_account_balances",
      "owner_account_ledger_entries",
      "association_ava_knowledge_chunks",
      "association_ava_knowledge_files",
    ];

    for (const tableName of tablesToDeleteByAssociationId) {
      deleteResults[tableName] = await deleteFromTable(tableName, associationId);
    }

    const { error: associationDeleteError } = await supabaseAdmin
      .from("associations")
      .delete()
      .eq("id", associationId);

    if (associationDeleteError) {
      throw associationDeleteError;
    }

    return res.status(200).json({
      success: true,
      message: "Association deleted.",
      association_id: associationId,
      association_name: association.name,
      deleted_tables_checked: deleteResults,
    });
  } catch (error) {
    console.error("Association delete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete association.",
    });
  }
}
