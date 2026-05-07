import { createNotification } from "../../../lib/notificationRouter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const associationId =
      "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

    const result = await createNotification({
      associationId,
      recipientRole: "manager",
      notificationType: "system_test",
      title: "Notification system online",
      message:
        "Production notification routing is now active.",
      relatedEntityType: "system",
      priority: "normal",
    });

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json({
      success: true,
      notification: result.notification,
    });
  } catch (error) {
    console.error("Notification test-create API failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Unexpected notification test-create error.",
      stack: error?.stack || null,
    });
  }
}
