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
  if (value === undefined || value === null || value === "") return fallback;
  return String(value).trim();
}

function firstValue(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
}

function normalizeTitle(value) {
  const text = cleanText(value, "Owner Request");
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
  const category = cleanText(request.category, "general");
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
        firstValue(body.requestId, body.id) ||
        `REQ-${new Date().getFullYear()}-${String(
          bosStore.requests.length + 1
        ).padStart(4, "0")}`;

      const subject = cleanText(
        firstValue(
          body.subject,
          body.title,
          body.issue,
          body.requestTitle,
          body.requestType,
          body.type,
          body.category
        ),
        "Owner Request"
      );

      const newRequest = {
        id: requestId,
        requestId,
        ownerName: cleanText(
          firstValue(
            body.ownerName,
            body.name,
            body.fullName,
            body.residentName,
            body.homeownerName,
            body.submittedBy
          ),
          "Owner"
        ),
        email: cleanText(firstValue(body.email, body.ownerEmail), ""),
        phone: cleanText(firstValue(body.phone, body.ownerPhone), ""),
        unit: cleanText(
          firstValue(
            body.unit,
            body.unitNumber,
            body.address,
            body.property,
            body.location
          ),
          "Not provided"
        ),
        category: cleanText(
          firstValue(body.category, body.type, body.requestCategory),
          "General Request"
        ),
        subject,
        title: subject,
        description: cleanText(
          firstValue(
            body.description,
            body.message,
            body.details,
            body.notes,
            body.requestDescription
          ),
          "No description provided."
        ),
        priority: cleanText(firstValue(body.priority, body.urgency), "Normal"),
        status: cleanText(firstValue(body.status), "Submitted"),
        source: cleanText(firstValue(body.source), "Owner Portal"),
        createdAt: nowISO(),
        updatedAt: nowISO(),
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

      const requestId = firstValue(body.requestId, body.id);

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

      const updatedStatus = cleanText(firstValue(body.status), request.status);

      const updatedSubject = cleanText(
        firstValue(
          body.subject,
          body.title,
          body.issue,
          body.requestTitle,
          body.requestType
        ),
        request.subject
      );

      Object.assign(request, {
        ...request,
        ...body,
        id: request.id,
        requestId: request.requestId,
        subject: updatedSubject,
        title: updatedSubject,
        status: updatedStatus,
        updatedAt: nowISO(),
      });

      if (updatedStatus && updatedStatus !== previousStatus) {
        createHistory({
          requestId: request.requestId,
          action: "Status Updated",
          details: `"${request.subject}" changed from ${previousStatus} to ${updatedStatus}.`,
        });

        const statusAlert = buildStatusNotification(
          request,
          previousStatus,
          updatedStatus
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
      message: error.message,
    });
  }
}


