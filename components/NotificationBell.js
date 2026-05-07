import { useEffect, useState } from "react";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function NotificationBell({
  associationId = DEFAULT_ASSOCIATION_ID,
  recipientRole = "manager",
  recipientUserId = "",
  label = "Notifications",
}) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  async function loadNotifications() {
    if (!associationId) return;

    try {
      const params = new URLSearchParams({
        associationId,
        recipientRole,
        limit: "10",
      });

      if (recipientUserId) {
        params.set("recipientUserId", recipientUserId);
      }

      const [listResponse, countResponse] = await Promise.all([
        fetch(`/api/notifications/list?${params.toString()}`),
        fetch(
          `/api/notifications/unread-count?${params.toString()}`
        ),
      ]);

      const listResult = await listResponse.json();
      const countResult = await countResponse.json();

      if (listResult.success) {
        setNotifications(listResult.notifications || []);
      }

      if (countResult.success) {
        setUnreadCount(countResult.count || 0);
      }
    } catch (error) {
      console.error("Unable to load notifications:", error);
    }
  }

  async function markRead(notificationId) {
    try {
      await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId,
          associationId,
        }),
      });

      await loadNotifications();
    } catch (error) {
      console.error("Unable to mark notification read:", error);
    }
  }

  async function markAllRead() {
    try {
      await fetch("/api/notifications/mark-all-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          associationId,
          recipientRole,
          recipientUserId: recipientUserId || null,
        }),
      });

      await loadNotifications();
    } catch (error) {
      console.error("Unable to mark all notifications read:", error);
    }
  }

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [associationId, recipientRole, recipientUserId]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((current) => !current)}
        className="relative rounded-2xl border border-yellow-400/25 bg-yellow-400/10 px-4 py-3 text-sm font-semibold text-yellow-300 shadow-xl shadow-black/20 hover:bg-yellow-400/20"
        type="button"
      >
        {label}

        {unreadCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-[#020617] bg-yellow-300 px-2 text-xs font-bold text-slate-950">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-[#020617] shadow-2xl shadow-black/50">
          <div className="border-b border-white/10 bg-white/[0.035] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
                  Live Updates
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {label}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {unreadCount} unread
                </p>
              </div>

              <button
                onClick={markAllRead}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                type="button"
              >
                Clear
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="p-5 text-sm text-slate-400">
              No notifications yet.
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto p-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`mb-3 rounded-2xl border p-4 ${
                    notification.is_read
                      ? "border-white/10 bg-white/[0.025]"
                      : "border-yellow-400/20 bg-yellow-400/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">
                    {notification.title || "Operational Update"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {notification.message ||
                      "A new update is available."}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      {notification.created_at
                        ? new Date(
                            notification.created_at
                          ).toLocaleString()
                        : "—"}
                    </p>

                    {!notification.is_read && (
                      <button
                        onClick={() => markRead(notification.id)}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                        type="button"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
