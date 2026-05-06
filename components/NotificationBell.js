import { useEffect, useState } from "react";

export default function NotificationBell({
  audience = "manager",
  label = "Notifications",
}) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [audience]);

  async function loadNotifications() {
    try {
      const response = await fetch(
        `/api/notifications/list?audience=${audience}&status=pending&limit=10`
      );

      const result = await response.json();

      if (result.success) {
        setNotifications(result.notifications || []);
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
        body: JSON.stringify({ notificationId }),
      });

      setNotifications((current) =>
        current.filter((item) => item.id !== notificationId)
      );
    } catch (error) {
      console.error("Unable to mark notification read:", error);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((current) => !current)}
        className="relative rounded-2xl border border-yellow-400/25 bg-yellow-400/10 px-4 py-3 text-sm font-semibold text-yellow-300 shadow-xl shadow-black/20 hover:bg-yellow-400/20"
      >
        {label}

        {notifications.length > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-[#020617] bg-yellow-300 px-2 text-xs font-bold text-slate-950">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-[#020617] shadow-2xl shadow-black/50">
          <div className="border-b border-white/10 bg-white/[0.035] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
              Live Updates
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {label}
            </h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-5 text-sm text-slate-400">
              No pending notifications.
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto p-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {notification.title || "Operational Update"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {notification.message || "A new update is available."}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      {notification.created_at
                        ? new Date(notification.created_at).toLocaleString()
                        : "—"}
                    </p>

                    <button
                      onClick={() => markRead(notification.id)}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                    >
                      Mark Read
                    </button>
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
