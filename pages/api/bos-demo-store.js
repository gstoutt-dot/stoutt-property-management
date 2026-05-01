let bosStore = global.bosStore;

if (!bosStore) {
  bosStore = {
    requests: [],
    notifications: [],
    history: [],
  };

  global.bosStore = bosStore;
}

function nowISO() {
  return new Date().toISOString();
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function cleanText(value, fallback = "") {
  if (!value) return fallback;
  return String(value).trim();
}

function normalizeTitle(value) {
  const text = cleanText(value, "General Request");
  return text.length > 70 ? `${text.slice(0, 67)}...` : text;
}

function createNotification({ title, message, requestId, type = "system" }) {
  const notification = {
    id: makeId("NOTIFY"),
    title,
    message,
    requestId: requestId || null,
    type,
    read: false,
    status: "unread",
    createdAt: nowISO(),
  };

  bosStore.notifications.unshift(notification);
  return notification;
}

function createHistory({ requestId, action, details }) {
  const historyItem = {
    id: makeId("HIST"),
    requestId: requestId || null,
    action,
    details,
    createdAt: nowISO(),
  };

  bosStore.history.unshift(historyItem);
  return historyItem;
}

function buildSubmittedNotification(request) {
  const subject = normalizeTitle(request.subject);
  const category = cleanText(request.category, "General Request");
  const unit = cleanText(request.unit, "your property");

  return {
    title: `${subject} Submitted`,
    message: `Your ${category.toLowerCase()} request for "${subject}" at ${unit} has been submitted and is pending manager review.`,
  };
}

function buildStatusNotification(request, previousStatus, newStatus) {
  const subject = normalizeTitle(request.subject);
  const unit = cleanText(request.unit, "your property");

  return {
    title: `${subject} Status Updated`,
    message: `Your request for "${subject}" at ${unit} changed from "${previousStatus}" to "${newStatus}".`,
  };
}

function buildUpdatedNotification(request) {
  const subject = normalizeTitle(request.subject);
  const unit = cleanText(request.unit, "your property");

  return {
    title: `${subject} Updated`,
    message: `A management update was recorded for your request "${subject}" at ${unit}.`,
  };
}

export default function handler(req, res) {
  try {
    if (req.method === "GET") {
      const view = req.query.view;

      if (view === "notifications") {
        return res.status(200).json({
          success: true,
          notifications: bosStore.notifications,
        });
      }

      if (view === "history") {
        return res.status(200).json({
          success: true,
          history: bosStore.history,
        });
      }

      if (view === "requests") {
        return res.status(200).json({
          success: true,
          requests: bosStore.requests,
        });
      }

      return res.status(200).json({
        success: true,
        requests: bosStore.requests,
        notifications: bosStore.notifications,
        history: bosStore.history,
      });
    }

    if (req.method === "POST") {
      const body = req.body || {};

      const requestId =
        body.requestId ||
        `REQ-${new Date().getFullYear()}-${String(
          bosStore.requests.length + 1
        ).padStart(4, "0")}`;

      const newRequest = {
        id: requestId,
        requestId,
        ownerName: cleanText(body.ownerName || body.name, "Owner"),
        unit: cleanText(body.unit || body.property, "Not provided"),
        category: cleanText(body.category || body.type, "General Request"),
        subject: cleanText(body.subject || body.title, "Owner Request"),
        description: cleanText(
          body.description || body.message,
          "No description provided."
        ),
        priority: cleanText(body.priority, "Normal"),
        status: cleanText(body.status, "Submitted"),
        createdAt: nowISO(),
        updatedAt: nowISO(),
        source: cleanText(body.source, "Owner Portal"),
      };

      bosStore.requests.unshift(newRequest);

      createHistory({
        requestId,
        action: "Request Submitted",
        details: `${newRequest.ownerName} submitted "${newRequest.subject}" for ${newRequest.unit}. Category: ${newRequest.category}.`,
      });

      const submittedAlert = buildSubmittedNotification(newRequest);

      createNotification({
        title: submittedAlert.title,
        message: submittedAlert.message,
        requestId,
        type: "request_submitted",
      });

      return res.status(201).json({
        success: true,
        request: newRequest,
        requests: bosStore.requests,
        notifications: bosStore.notifications,
        history: bosStore.history,
      });
    }

    if (req.method === "PUT") {
      const body = req.body || {};

      if (body.view === "notifications" && body.action === "mark_read") {
        const notification = bosStore.notifications.find(
          (item) => item.id === body.id
        );

        if (!notification) {
          return res.status(404).json({
            success: false,
            error: "Notification not found",
          });
        }

        notification.read = true;
        notification.status = "read";
        notification.readAt = nowISO();

        return res.status(200).json({
          success: true,
          notification,
          notifications: bosStore.notifications,
        });
      }

      const requestId = body.requestId || body.id;

      if (!requestId) {
        return res.status(400).json({
          success: false,
          error: "Missing requestId",
        });
      }

      const request = bosStore.requests.find(
        (item) => item.id === requestId || item.requestId === requestId
      );

      if (!request) {
        return res.status(404).json({
          success: false,
          error: "Request not found",
        });
      }

      const previousStatus = request.status;

      Object.assign(request, {
        ...body,
        id: request.id,
        requestId: request.requestId,
        updatedAt: nowISO(),
      });

      if (body.status && body.status !== previousStatus) {
        createHistory({
          requestId: request.requestId,
          action: "Status Updated",
          details: `"${request.subject}" changed from ${previousStatus} to ${body.status}.`,
        });

        const statusAlert = buildStatusNotification(
          request,
          previousStatus,
          body.status
        );

        createNotification({
          title: statusAlert.title,
          message: statusAlert.message,
          requestId: request.requestId,
          type: "status_updated",
        });
      } else {
        createHistory({
          requestId: request.requestId,
          action: "Request Updated",
          details: `Management updated "${request.subject}" for ${request.unit}.`,
        });

        const updatedAlert = buildUpdatedNotification(request);

        createNotification({
          title: updatedAlert.title,
          message: updatedAlert.message,
          requestId: request.requestId,
          type: "request_updated",
        });
      }

      return res.status(200).json({
        success: true,
        request,
        requests: bosStore.requests,
        notifications: bosStore.notifications,
        history: bosStore.history,
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("BOS demo store error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}


