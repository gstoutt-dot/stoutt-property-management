import { supabaseAdmin } from "./supabaseAdmin";

function cleanText(value) {
  return String(value || "").toLowerCase().trim();
}

function isBoardCommittee(committee) {
  const name = cleanText(committee.committee_name);
  const type = cleanText(committee.committee_type);

  return (
    name.includes("board") ||
    name.includes("directors") ||
    type.includes("board") ||
    type.includes("governance")
  );
}

export async function getBoardNotificationRecipients(associationId) {
  const safeAssociationId = String(associationId || "").trim();

  if (!safeAssociationId) {
    return {
      success: false,
      recipients: [],
      error: "Missing associationId.",
    };
  }

  const { data, error } = await supabaseAdmin
    .from("association_committees")
    .select(`
      *,
      members:association_committee_members(*)
    `)
    .eq("association_id", safeAssociationId);

  if (error) {
    return {
      success: false,
      recipients: [],
      error: error.message,
    };
  }

  const boardCommittees = (data || []).filter(isBoardCommittee);

  const recipients = boardCommittees
    .flatMap((committee) => committee.members || [])
    .filter((member) => String(member.status || "active").toLowerCase() === "active")
    .map((member) => ({
      member_id: member.id,
      name: member.member_name || "",
      role: member.member_role || "Board Member",
      email: member.email || "",
      phone: member.phone || "",
      committee_id: member.committee_id,
    }))
    .filter((member) => member.email || member.phone);

  return {
    success: true,
    recipients,
    error: null,
  };
}
