//import { createNotification } from "./notificationRouter";

export function buildNotificationEvent(action, eventType) {
  const now = new Date().toISOString();

  return {
    action_id: action.id,
    event_type: eventType,
    title: getNotificationTitle(action, eventType),
    message: getNotificationMessage(action, eventType),
    audience: getNotificationAudience(eventType),
    status: "pending",
    delivery_channel: "internal",
    created_at: now,
  };
}

export async function createNotificationEvent(supabase, action, eventType) {
  if (!supabase || !action?.id || !eventType) {
    return {
      success: false,
      error: "Missing notification requirements.",
    };
  }

  const notification = buildNotificationEvent(action, eventType);

  const { data, error } = await supabase
    .from("bos_notifications")
    .insert([notification])
    .select()
    .single();

  if (error) {
    console.error("Notification creation failed:", error);

    return {
      success: false,
      error,
    };
  }
/*
    await createNotification({
    associationId:
      action.association_id ||
      "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",

    recipientRole: getNotificationAudience(eventType),

    notificationType: eventType,

    title: getNotificationTitle(action, eventType),

    message: getNotificationMessage(action, eventType),

    relatedEntityType: "bos_action",

    relatedEntityId: action.id,

    priority:
      String(action.priority || "").toLowerCase() === "high"
        ? "high"
        : "normal",
  });

  return {
    success: true,
    data,
  };
  */
}

function getNotificationAudience(eventType) {
  const map = {
    manager_review: "manager",
    board_review: "board",
    board_approved: "manager",
    vendor_dispatched: "vendor",
    vendor_accepted: "manager",
    vendor_in_progress: "manager",
    completed: "owner",
    owner_notified: "owner",
  };

  return map[eventType] || "manager";
}

function getNotificationTitle(action, eventType) {
  const requestTitle = action.title || "Community Request";

  const map = {
    manager_review: "New Request Ready for Manager Review",
    board_review: "Request Ready for Board Review",
    board_approved: "Board Approval Completed",
    vendor_dispatched: "Vendor Dispatch Created",
    vendor_accepted: "Vendor Accepted Assignment",
    vendor_in_progress: "Vendor Work In Progress",
    completed: "Request Completed",
    owner_notified: "Owner Update Sent",
  };

  return map[eventType] || requestTitle;
}

function getNotificationMessage(action, eventType) {
  const title = action.title || "this community request";
  const association = action.association_name || "the community";

  const map = {
    manager_review: `${title} has been received and is ready for management review at ${association}.`,
    board_review: `${title} has been moved to board review for calm oversight and decision-making.`,
    board_approved: `${title} has been approved by the board and is ready for the next operational step.`,
    vendor_dispatched: `${title} has been dispatched to vendor coordination.`,
    vendor_accepted: `The vendor has accepted the assignment for ${title}.`,
    vendor_in_progress: `Vendor work is now in progress for ${title}.`,
    completed: `${title} has been completed.`,
    owner_notified: `The owner has been updated regarding ${title}.`,
  };

  return map[eventType] || `${title} has a new operational update.`;
}
