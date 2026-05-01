// File: /api/bos-demo-store.js

let STORE = [];
let NOTIFICATIONS = [];

function createNotification(item, status, note) {
  const ownerName = item.submittedBy || "Owner";
  const title = `Request status updated: ${status}`;
  const message = note || `${ownerName}'s request status was updated to ${status}.`;

  const notification = {
    id: `NTF-${Date.now()}`,
    source: "System Notification",
    ownerName,
    requestId: item.id,
    requestTitle: item.title || "Owner Request",
    title,
    message,
    status,
    read: false,
    createdAt: new Date().toISOString(),
  };

  NOTIFICATIONS.push(notification);
  return notification;
}

export default function handler(req, res) {
  if (req.method === "GET") {
    const view = req.query.view;

    if (view === "notifications") {
      return res.status(200).json(NOTIFICATIONS);
    }

    return res.status(200).json(STORE);
  }

  if (req.method === "POST") {
    const item = req.body;

    const enrichedItem = {
      ...item,
      id: `ITEM-${Date.now()}`,
      status: item.status || "Submitted to Manager Intake",
      createdAt: new Date().toISOString(),
      history: [
        {
          status: item.status || "Submitted to Manager Intake",
          timestamp: new Date().toISOString(),
          note: "Submitted from Owner Portal",
        },
      ],
    };

    STORE.push(enrichedItem);

    NOTIFICATIONS.push({
      id: `NTF-${Date.now()}`,
      source: "System Notification",
      ownerName: enrichedItem.submittedBy || "Owner",
      requestId: enrichedItem.id,
      requestTitle: enrichedItem.title || "Owner Request",
      title: "Request submitted to management",
      message: "Your request has been received and routed to the Manager Intake Queue.",
      status: enrichedItem.status,
      read: false,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, item: enrichedItem });
  }

  if (req.method === "PUT") {
    const { id, status, note, markNotificationRead } = req.body;

    if (markNotificationRead) {
      NOTIFICATIONS = NOTIFICATIONS.map((notification) => {
        if (notification.id === id) {
          return {
            ...notification,
            read: true,
          };
        }
        return notification;
      });

      return res.status(200).json({ success: true });
    }

    let updatedItem = null;

    STORE = STORE.map((item) => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          status: status || item.status,
          history: [
            ...(item.history || []),
            {
              status: status || item.status,
              timestamp: new Date().toISOString(),
              note: note || "Status updated",
            },
          ],
        };

        return updatedItem;
      }
      return item;
    });

    if (updatedItem) {
      createNotification(updatedItem, updatedItem.status, note);
    }

    return res.status(200).json({ success: true, item: updatedItem });
  }

  res.status(405).json({ error: "Method not allowed" });
}


