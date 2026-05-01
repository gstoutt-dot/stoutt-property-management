import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function OwnerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function loadNotifications() {
    try {
      setLoading(true);
      const res = await fetch("/api/bos-demo-store?view=notifications");
      const data = await res.json();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.notifications)
        ? data.notifications
        : [];

      setNotifications(list);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markAsRead(notification) {
    try {
      setUpdatingId(notification.id);

      await fetch("/api/bos-demo-store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          view: "notifications",
          action: "mark_read",
          id: notification.id,
          read: true,
        }),
      });

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id
            ? { ...item, read: true, status: "read" }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read && n.status !== "read").length;
  }, [notifications]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return dateB - dateA;
    });
  }, [notifications]);

  function formatDate(value) {
    if (!value) return "Recent";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recent";

    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Owner Portal
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Live Notifications
            </h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Real-time BOS alerts generated from owner requests, manager
              review activity, status updates, and system event triggers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/owner"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Owner Dashboard
            </Link>
            <Link
              href="/portal/owner/requests"
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Request History
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <p className="text-sm text-slate-400">Total Alerts</p>
            <p className="mt-2 text-4xl font-bold">{notifications.length}</p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-2xl shadow-black/20">
            <p className="text-sm text-emerald-200">Unread Alerts</p>
            <p className="mt-2 text-4xl font-bold text-emerald-300">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <p className="text-sm text-slate-400">System Status</p>
            <p className="mt-2 text-2xl font-bold text-emerald-300">LIVE</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Notification Feed</h2>
              <p className="mt-1 text-sm text-slate-400">
                Synced from the shared BOS notifications engine.
              </p>
            </div>

            <button
              onClick={loadNotifications}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300">
              Loading live notifications...
            </div>
          ) : sortedNotifications.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center">
              <p className="text-lg font-semibold">No notifications yet.</p>
              <p className="mt-2 text-slate-400">
                New owner requests and manager status updates will appear here
                automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotifications.map((notification) => {
                const isRead =
                  notification.read === true || notification.status === "read";

                return (
                  <article
                    key={notification.id}
                    className={`rounded-3xl border p-5 transition ${
                      isRead
                        ? "border-white/10 bg-slate-900/70"
                        : "border-emerald-400/30 bg-emerald-400/10"
                    }`}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                              isRead
                                ? "bg-slate-700 text-slate-300"
                                : "bg-emerald-300 text-slate-950"
                            }`}
                          >
                            {isRead ? "Read" : "Unread"}
                          </span>

                          <span className="text-sm text-slate-400">
                            {formatDate(
                              notification.createdAt || notification.date
                            )}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold">
                          {notification.title ||
                            notification.type ||
                            "BOS Notification"}
                        </h3>

                        <p className="mt-2 max-w-3xl text-slate-300">
                          {notification.message ||
                            notification.description ||
                            "A system update has been recorded."}
                        </p>

                        {notification.requestId && (
                          <p className="mt-3 text-sm text-slate-500">
                            Linked Request: {notification.requestId}
                          </p>
                        )}
                      </div>

                      {!isRead && (
                        <button
                          onClick={() => markAsRead(notification)}
                          disabled={updatingId === notification.id}
                          className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {updatingId === notification.id
                            ? "Updating..."
                            : "Mark as Read"}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
