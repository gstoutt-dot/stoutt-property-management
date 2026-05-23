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

      // =========================================
      // CREATE ADMIN OPERATIONAL RECORD
      // =========================================

      const { data: insertedRecord, error } = await supabaseAdmin
        .from("admin_operational_records")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      // =========================================
      // MIRROR RECORD INTO BOS ACTIONS
      // =========================================

      const bosPayload = {
        association_id: payload.association_id,

        title: payload.title,

        description: payload.description,

        request_type: payload.request_type,

        priority: payload.priority,

        status: payload.status,

        created_by: payload.created_by,

        created_by_role: payload.created_by_role,

        assigned_to: payload.assigned_to,

        board_review_required: payload.board_review_required,

        owner_visible: payload.owner_visible,

        vendor_visible: payload.vendor_visible,

        due_date: payload.due_date,

        source_module: payload.source_module,

        routing_target: payload.routing_target,

        recommended_action: payload.recommended_action,

        admin_operational_record_id: insertedRecord.id,

        workflow_stage: "Submitted",

        lifecycle_status: "Open",

        manager_verified: false,

        board_action_required: Boolean(
          payload.board_review_required
        ),

        timeline: [
          {
            event: "Operational Record Created",
            status: payload.status,
            created_at: new Date().toISOString(),
            created_by: payload.created_by,
          },
        ],
      };

      const { error: bosError } = await supabaseAdmin
        .from("bos_actions")
        .insert(bosPayload);

      if (bosError) {
        console.error("BOS mirror insert failed:", bosError);
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

  if (req.method === "PATCH") {
    try {
      const body = req.body || {};
      const recordId = body.id;

      if (!recordId) {
        return res.status(400).json({
          success: false,
          message: "Record ID is required.",
        });
      }

      const status = body.status || "archived";

      const { data, error } = await supabaseAdmin
        .from("admin_operational_records")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", recordId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        record: data,
        message: "Operational record updated successfully.",
      });
    } catch (error) {
      console.error("Admin operational records PATCH error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Unable to update operational record.",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const recordId = req.query.id;

      if (!recordId) {
        return res.status(400).json({
          success: false,
          message: "Record ID is required.",
        });
      }

      const { error } = await supabaseAdmin
        .from("admin_operational_records")
        .delete()
        .eq("id", recordId);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: "Operational record deleted successfully.",
      });
    } catch (error) {
      console.error("Admin operational records DELETE error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Unable to delete operational record.",
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
