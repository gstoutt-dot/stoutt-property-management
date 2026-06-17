import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const closedStatuses = ["completed", "archived", "closed"];

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeBosStatus(status) {
  const value = String(status || "").toLowerCase();

  if (value === "completed") return "completed";
  if (value === "board_review" || value === "board review") return "board_review";
  if (value === "manager_review" || value === "manager review") return "manager_review";
  if (value === "needs_clarification" || value === "needs clarification") return "needs_clarification";
  if (value === "dispatched") return "dispatched";

  return "open";
}

function normalizeBosCategory(requestType) {
  return cleanText(requestType || "owner_request")
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function normalizeBosPriority(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical" || value === "high") return "high";
  if (value === "low") return "low";

  return "medium";
}

function buildDestinationPath(requestType) {
  const type = String(requestType || "").toLowerCase().trim();

  const routeMap = {
    "insurance & risk": "/board/insurance-risk",
    insurance_risk: "/board/insurance-risk",
    "legal review": "/board/legal-review",
    legal_review: "/board/legal-review",
    meetings: "/portal/board/meetings",
    "financial review": "/board/financial-review",
    financial_review: "/board/financial-review",
    compliance: "/board/compliance-dashboard",
  };

  return routeMap[type] || "/admin";
}

function buildBosDescription(payload, insertedRecord) {
  const destinationPath = buildDestinationPath(payload.request_type);

  const lines = [];

  lines.push(payload.description || "Admin created an operational record requiring review.");
  lines.push("");
  lines.push(`Created By: ${payload.created_by || "SPM Admin"}`);
  lines.push(`Request Type: ${payload.request_type || "Operational Request"}`);
  lines.push(`Priority: ${payload.priority || "Normal"}`);
  lines.push(`Routing Target: ${payload.routing_target || "Admin Dashboard"}`);
  lines.push(`Destination Path: ${destinationPath}`);

  if (payload.recommended_action) {
    lines.push("");
    lines.push(`Recommended Action: ${payload.recommended_action}`);
  }

  lines.push("");
  lines.push(`Admin Operational Record ID: ${insertedRecord.id}`);

  return lines.join("\n");
}

async function mirrorIntoBos(payload, insertedRecord) {
  const bosDescription = buildBosDescription(payload, insertedRecord);

  const existingBos = await supabaseAdmin
    .from("bos_actions")
    .select("id")
    .ilike("board_comment", `%Admin Operational Record ID: ${insertedRecord.id}%`)
    .maybeSingle();

  if (existingBos?.data?.id) {
    return {
      success: true,
      existing: true,
      bosActionId: existingBos.data.id,
    };
  }

  const bosCategory = normalizeBosCategory(payload.request_type);

  const bosPayload = {
    title: payload.title,
    description: bosDescription,
    request_type: bosCategory,
    category: bosCategory,
    priority: normalizeBosPriority(payload.priority),
    status: payload.board_review_required
      ? "board_review"
      : normalizeBosStatus(payload.status),

    association_id: payload.association_id,
    association_name:
    payload.association_name_for_bos || "Selected Association",
    owner_name: payload.created_by || "SPM Admin",
    owner_phone: "",
    owner_email: "",
    property_address: payload.routing_target || "Admin Operations",
    best_contact_time: "Normal business hours",
    source: payload.source_module || "Admin Operations Intake",

    board_comment: bosDescription,
    board_response: payload.board_review_required
      ? "admin_record_requires_board_review"
      : "admin_operational_record_created",
    board_acknowledged: false,
    board_reviewed: false,
    board_last_interaction_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from("bos_actions")
    .insert(bosPayload)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    bosAction: data,
  };
}

async function syncBosStatusFromAdmin(recordId, status) {
  const { error } = await supabaseAdmin
    .from("bos_actions")
    .update({
      status: normalizeBosStatus(status),
    })
    .ilike("board_comment", `%Admin Operational Record ID: ${recordId}%`);

  if (error) {
    console.warn("BOS status sync warning:", error);
  }
}

async function deleteBosMirror(recordId) {
  const { error } = await supabaseAdmin
    .from("bos_actions")
    .delete()
    .ilike("board_comment", `%Admin Operational Record ID: ${recordId}%`);

  if (error) {
    console.warn("BOS mirror delete warning:", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body || {};

      const payload = {
        association_id: cleanText(body.association_id || body.associationId),
        created_by: body.created_by || "SPM Admin",
        created_by_role: body.created_by_role || "Admin",
        request_type: body.request_type || "Special Project",
        title: cleanText(body.title),
        description: cleanText(body.description),
        priority: body.priority || "Normal",
        status: body.status || "Submitted",
        assigned_to: body.assigned_to || null,
        board_review_required:
          Boolean(body.board_review_required) ||
          String(body.routing_target || "").toLowerCase() ===
            "board approval queue",
        owner_visible: Boolean(body.owner_visible),
        vendor_visible: Boolean(body.vendor_visible),
        due_date: body.due_date || null,
        source_module: body.source_module || "Admin Operations Intake",
        routing_target: body.routing_target || "Admin Dashboard",
        recommended_action: body.recommended_action || null,
      };

      const associationNameForBos =
        cleanText(body.association_name || body.associationName) ||
        "Selected Association";

            if (!payload.association_id) {
        return res.status(400).json({
          success: false,
          message: "Association ID is required.",
        });
      }

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

            const bosResult = await mirrorIntoBos(
        {
          ...payload,
          association_name_for_bos: associationNameForBos,
        },
        insertedRecord
      );

      if (!bosResult.success) {
        console.error("BOS mirror insert failed:", bosResult.error);

        return res.status(500).json({
          success: false,
          record: insertedRecord,
          message: "Admin record created but BOS mirror failed.",
          bosError: bosResult.error?.message,
        });
      }

      return res.status(200).json({
        success: true,
        record: insertedRecord,
        bosAction: bosResult.bosAction || null,
        message: "Operational record submitted successfully and mirrored to BOS.",
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
            const recordId = cleanText(body.id);
      const associationId = cleanText(body.association_id || body.associationId);

      if (!recordId) {
        return res.status(400).json({
          success: false,
          message: "Record ID is required.",
        });
      }

      if (!associationId) {
        return res.status(400).json({
          success: false,
          message: "Association ID is required.",
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
        .eq("association_id", associationId)
        .select()
        .single();

      if (error) throw error;

      await syncBosStatusFromAdmin(recordId, status);

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
            const recordId = cleanText(req.query.id);
      const associationId = cleanText(req.query.association_id || req.query.associationId);

      if (!recordId) {
        return res.status(400).json({
          success: false,
          message: "Record ID is required.",
        });
      }

      if (!associationId) {
        return res.status(400).json({
          success: false,
          message: "Association ID is required.",
        });
      }

      await deleteBosMirror(recordId);

      const { error } = await supabaseAdmin
        .from("admin_operational_records")
        .delete()
        .eq("id", recordId)
        .eq("association_id", associationId);

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
        const associationId = cleanText(req.query.association_id || req.query.associationId);

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

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
          (record) => String(record.priority || "").toLowerCase() === "critical"
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
