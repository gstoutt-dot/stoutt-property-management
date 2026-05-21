import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body || {};

      const payload = {
        association_id: body.association_id || DEFAULT_ASSOCIATION_ID,
        created_by: body.created_by || "SPM Admin",
        created_by_role: body.created_by_role || "Admin",
        request_type: body.request_type || "Special Project",
        title: String(body.title || "").trim(),
        description: String(body.description || "").trim(),
        priority: body.priority || "Normal",
        status: body.status || "Submitted",
        assigned_to: body.assigned_to || null,
        board_review_required: Boolean(body.board_review_required),
        owner_visible: Boolean(body.owner_visible),
        vendor_visible: Boolean(body.vendor_visible),
        due_date: body.due_date || null,
        source_module: body.source_module || "Admin Operations Intake",
        routing_target: body.routing_target || "Admin Dashboard",
        recommended_action: body.recommended_action || null,
      };

      if (!payload.title) {
        return res.status(400).json({
          success: false,
          message: "Title is required.",
        });
      }

      const { data: insertedRecord, error } = await supabaseAdmin
        .from("admin_operational_records")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      if (
        payload.routing_target === "Board Approval Queue" ||
        payload.board_review_required
      ) {
        const { data: boardAction, error: actionError } = await supabaseAdmin
          .from("bos_actions")
          .insert([
            {
              association_id: payload.association_id,
              title: payload.title,
              description: payload.description,
              category: payload.request_type,
              request_type: payload.request_type,
              priority: payload.priority,
              status: "open",
              source: "Admin Operations Intake",
              assigned_to: "Board Approval Queue",
              recommended_action:
                payload.recommended_action ||
                "Review and process this board approval item.",
            },
          ])
          .select()
          .single();

        if (actionError) throw actionError;

        await supabaseAdmin.from("bos_events").insert([
          {
            action_id: boardAction.id,
            event_type: "board_approval_requested",
            message:
              payload.recommended_action ||
              `${payload.request_type} routed for board approval.`,
            module: "Board Approval Queue",
          },
        ]);
      }

      return res.status(200).json({
        success: true,
        record: insertedRecord,
        message: "Operational record submitted successfully.",
      });
    } catch (error) {
      console.error("Admin operational records POST error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Unable to submit admin operational record.",
      });
    }
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const associationId = req.query.association_id || DEFAULT_ASSOCIATION_ID;

    const { data, error } = await supabaseAdmin
      .from("admin_operational_records")
      .select("*")
      .eq("association_id", associationId)
      .order("created_at", { ascending: false })
      .limit(25);

    if (error) throw error;

    const records = data || [];

    const openRecords = records.filter(
      (record) =>
        !closedStatuses.includes(String(record.status || "").toLowerCase())
    );

    return res.status(200).json({
      success: true,
      records,
      openRecords,
      counts: {
        total: records.length,
        open: openRecords.length,
        critical: openRecords.filter(
          (record) =>
            String(record.priority || "").toLowerCase() === "critical"
        ).length,
        high: openRecords.filter(
          (record) => String(record.priority || "").toLowerCase() === "high"
        ).length,
        boardReview: openRecords.filter((record) =>
          Boolean(record.board_review_required)
        ).length,
      },
    });
  } catch (error) {
    console.error("Admin operational records API error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to load admin operational records.",
    });
  }
}
