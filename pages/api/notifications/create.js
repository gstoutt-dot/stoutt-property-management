import { createNotification } from "../../../lib/notificationRouter"; 

function resolveNotificationPayload(body = {}) {
  const {
    associationId,
    recipientUserId = null,
    recipientRole = "manager",
    notificationType = "general",
    title,
    message,
    relatedEntityType = null,
    relatedEntityId = null,
    priority = "normal",
    deliveryChannel = "in_app",
    deliveryStatus = "created",
    createdByUserId = null,

    // Backward-compatible support for existing BOS action event calls
    action = null,
    eventType = null,
  } = body;

  if (action && eventType) {
    const actionTitle = action.title || action.category || "BOS action update";
    const unitLabel = action.unit ? `Unit ${action.unit}` : "Association item";

    return {
      associationId: action.association_id || associationId,
      recipientUserId: null,
      recipientRole:
        eventType === "board_review_requested"
          ? "board"
          : eventType === "vendor_dispatched"
          ? "vendor"
          : eventType === "owner_update"
          ? "owner"
          : "manager",
      notificationType: eventType,
      title:
        eventType === "board_review_requested"
          ? "Board review requested"
          : eventType === "vendor_dispatched"
          ? "Vendor dispatch update"
          : eventType === "owner_update"
          ? "Request status updated"
          : "Workflow update",
      message: `${unitLabel}: ${actionTitle}`,
      relatedEntityType: "bos_action",
      relatedEntityId: action.id,
      priority: action.priority || priority || "normal",
      deliveryChannel,
      deliveryStatus,
      createdByUserId,
    };
  }

  return {
    associationId,
    recipientUserId,
    recipientRole,
    notificationType,
    title,
    message,
    relatedEntityType,
    relatedEntityId,
    priority,
    deliveryChannel,
    deliveryStatus,
    createdByUserId,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const payload = resolveNotificationPayload(req.body || {});

    if (!payload.associationId) {
  payload.associationId = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
}

    const result = await createNotification(payload);

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || "Unexpected notification creation error.",
      stack: error?.stack || null,
    });
  }
}
