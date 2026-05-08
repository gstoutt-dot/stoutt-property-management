import { supabaseAdmin } from "./supabaseAdmin";

const VALID_ROLES = ["owner", "board", "manager", "vendor", "admin"];
const VALID_PRIORITIES = ["low", "normal", "medium", "high", "urgent"];

function cleanText(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function normalizeRole(role) {
  const cleaned = cleanText(role).toLowerCase();
  return VALID_ROLES.includes(cleaned) ? cleaned : "manager";
}

function normalizePriority(priority) {
  const cleaned = cleanText(priority, "normal").toLowerCase();

  if (cleaned === "medium") {
    return "normal";
  }

  return VALID_PRIORITIES.includes(cleaned) ? cleaned : "normal";
}

export async function createNotification({
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
}) {
  const safeAssociationId = cleanText(associationId);

  if (!safeAssociationId) {
    return {
      success: false,
      error: "Missing associationId.",
      notification: null,
    };
  }

  const safeTitle = cleanText(title, "New notification");
  const safeMessage = cleanText(message, "A new update is available.");
  const safeRecipientRole = normalizeRole(recipientRole);
  const safePriority = normalizePriority(priority);

  const payload = {
    association_id: safeAssociationId,
    recipient_user_id: recipientUserId || null,
    recipient_role: safeRecipientRole,
    notification_type: cleanText(notificationType, "general"),
    title: safeTitle,
    message: safeMessage,
    related_entity_type: relatedEntityType || null,
    related_entity_id: relatedEntityId || null,
    priority: safePriority,
    delivery_channel: cleanText(deliveryChannel, "in_app"),
    delivery_status: cleanText(deliveryStatus, "created"),
    created_by_user_id: createdByUserId || null,
    is_read: false,
  };

  const { data, error } = await supabaseAdmin
    .from("notifications")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    return {
      success: false,
      error: error.message,
      notification: null,
    };
  }

  return {
    success: true,
    error: null,
    notification: data,
  };
}

export async function createRoleNotification({
  associationId,
  role,
  notificationType,
  title,
  message,
  relatedEntityType = null,
  relatedEntityId = null,
  priority = "normal",
  createdByUserId = null,
}) {
  return createNotification({
    associationId,
    recipientRole: role,
    notificationType,
    title,
    message,
    relatedEntityType,
    relatedEntityId,
    priority,
    createdByUserId,
  });
}

export async function createOwnerNotification({
  associationId,
  ownerUserId,
  notificationType = "owner_update",
  title,
  message,
  relatedEntityType = null,
  relatedEntityId = null,
  priority = "normal",
  createdByUserId = null,
}) {
  return createNotification({
    associationId,
    recipientUserId: ownerUserId,
    recipientRole: "owner",
    notificationType,
    title,
    message,
    relatedEntityType,
    relatedEntityId,
    priority,
    createdByUserId,
  });
}

export async function createBoardNotification({
  associationId,
  notificationType = "board_review",
  title,
  message,
  relatedEntityType = null,
  relatedEntityId = null,
  priority = "normal",
  createdByUserId = null,
}) {
  return createRoleNotification({
    associationId,
    role: "board",
    notificationType,
    title,
    message,
    relatedEntityType,
    relatedEntityId,
    priority,
    createdByUserId,
  });
}

export async function createManagerNotification({
  associationId,
  notificationType = "manager_update",
  title,
  message,
  relatedEntityType = null,
  relatedEntityId = null,
  priority = "normal",
  createdByUserId = null,
}) {
  return createRoleNotification({
    associationId,
    role: "manager",
    notificationType,
    title,
    message,
    relatedEntityType,
    relatedEntityId,
    priority,
    createdByUserId,
  });
}

export async function createVendorNotification({
  associationId,
  vendorUserId = null,
  notificationType = "vendor_dispatch",
  title,
  message,
  relatedEntityType = null,
  relatedEntityId = null,
  priority = "normal",
  createdByUserId = null,
}) {
  return createNotification({
    associationId,
    recipientUserId: vendorUserId,
    recipientRole: "vendor",
    notificationType,
    title,
    message,
    relatedEntityType,
    relatedEntityId,
    priority,
    createdByUserId,
  });
}
