import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

function formatCategory(value = "") {
  return String(value || "general")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const { recommendation } = req.body || {};

    if (!recommendation?.id) {
      return res.status(400).json({
        success: false,
        message: "Recommendation is required.",
      });
    }

    const title =
      recommendation.recommendation_title ||
      "Committee Recommendation";

    const description = [
      `Committee Recommendation`,
      "",
      `Category: ${formatCategory(
        recommendation.recommendation_category
      )}`,
      `Priority: ${formatCategory(
        recommendation.priority
      )}`,
      `Submitted By: ${
        recommendation.submitted_by || "Committee"
      }`,
      "",
      "Recommendation Summary:",
      recommendation.recommendation_summary ||
        "No recommendation summary provided.",
    ].join("\n");

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .insert({
        association_id:
          recommendation.association_id ||
          DEFAULT_ASSOCIATION_ID,

        created_by:
          recommendation.submitted_by || "Committee",

        created_by_role: "committee",

        request_type: "committee_recommendation",

        title,
        description,

        priority:
          recommendation.priority || "normal",

        status: "board_review",

        assigned_to: "board",

        board_review_required: true,

        owner_visible: false,
        vendor_visible: false,

        source_module:
          "committee_members_center",

        routing_target:
          "board_approval_queue",

        recommended_action:
          "Committee recommendation submitted for board review.",

        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    await supabaseAdmin
      .from(
        "association_committee_recommendations"
      )
      .update({
        status: "sent_to_board",
        sent_to_board_at: now,
        updated_at: now,
      })
      .eq("id", recommendation.id);

    return res.status(200).json({
      success: true,
      record: data,
    });
  } catch (error) {
    console.error(
      "Committee send-to-board error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to send recommendation to board.",
    });
  }
}
