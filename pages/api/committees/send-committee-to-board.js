import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { committee } = req.body || {};

if (!committee?.association_id) {
  return res.status(400).json({
    success: false,
    message: "Association ID is required.",
  });
}

if (!committee?.id) {
  return res.status(400).json({
        success: false,
        message: "Committee is required.",
      });
    }

    const title = `${committee.committee_name || "Committee"} Review`;

    const description = [
      `Committee: ${committee.committee_name || "Committee"}`,
      "",
      `Committee Type: ${committee.committee_type || "general"}`,
      `Chairperson: ${committee.chair_name || "Not assigned"}`,
      `Status: ${committee.status || "active"}`,
      "",
      "Committee Purpose:",
      committee.purpose || "No committee purpose provided.",
    ].join("\n");

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
association_id: String(committee.association_id).trim(),
        created_by: "Admin",
        created_by_role: "admin",
        request_type: "committee_review",
        title,
        description,
        priority: "normal",
        status: "board_review",
        assigned_to: "board",
        board_review_required: true,
        owner_visible: false,
        vendor_visible: false,
        source_module: "committee_members_center",
        routing_target: "board_approval_queue",
        recommended_action: "Committee item submitted for board review.",
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      record: data,
    });
  } catch (error) {
    console.error("Send committee to board error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to send committee to board.",
    });
  }
}
