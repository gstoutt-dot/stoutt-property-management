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
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to load notifications:", error);
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
        }),
      });

      await loadNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    } finally {
      setUpdatingId(null);
    }
  }

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (item) => item.read !== true && item.status !== "read"
    ).length;
  }, [notifications]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
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
    <main className="min-h-screen bg-[#070b16] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d4af37]">
              Owner Portal
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Live Notifications
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Real-time BOS alerts generated from owner requests, manager
              review activity, status updates, and system event triggers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/owner"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Owner Dashboard
            </Link>

            <Link
              href="/portal/owner/requests"
              className="rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675]"
            >
              Request History
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/25">
            <p className="text-sm text-slate-300">Total Alerts</p>
            <p className="mt-4 text-5xl font-bold text-white">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-7 shadow-2xl shadow-black/25">
            <p className="text-sm text-[#f1d675]">Unread Alerts</p>
            <p className="mt-4 text-5xl font-bold text-[#f1d675]">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/25">
            <p className="text-sm text-slate-300">System Status</p>
            <p className="mt-4 text-3xl font-bold text-[#f1d675]">LIVE</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Notification Feed</h2>
              <p className="mt-2 text-slate-400">
                Synced from the shared BOS notifications engine.
              </p>
            </div>

            <button
              onClick={loadNotifications}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-bold text-white transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-10 text-center text-slate-300">
              Loading live notifications...
            </div>
          ) : sortedNotifications.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-10 text-center">
              <p className="text-xl font-bold text-white">
                No notifications yet.
              </p>
              <p className="mt-3 text-slate-400">
                Submit a new owner request or update a request from the manager
                portal to generate live alerts.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotifications.map((notification) => {
                const isRead =
                  notification.read === true ||
                  notification.status === "read";

                return (
                  <article
                    key={notification.id}
                    className={`rounded-3xl border p-5 transition ${
                      isRead
                        ? "border-white/10 bg-[#0c1222]"
                        : "border-[#d4af37]/35 bg-[#d4af37]/10"
                    }`}
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                              isRead
                                ? "border-white/20 bg-white/10 text-slate-300"
                                : "border-[#d4af37]/50 bg-[#d4af37] text-[#070b16]"
                            }`}
                          >
                            {isRead ? "Read" : "Unread"}
                          </span>

                          <span className="text-sm text-slate-400">
                            {formatDate(notification.createdAt)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-white">
                          {notification.title || "BOS Notification"}
                        </h3>

                        <p className="mt-2 max-w-4xl text-slate-300">
                          {notification.message ||
                            "A system notification was created."}
                        </p>

                        {notification.requestId && (
                          <p className="mt-3 text-sm text-[#f1d675]">
                            Linked Request: {notification.requestId}
                          </p>
                        )}
                      </div>

                      {isRead ? (
                        <div className="text-sm font-bold text-slate-400">
                          Read
                        </div>
                      ) : (
                        <button
                          onClick={() => markAsRead(notification)}
                          disabled={updatingId === notification.id}
                          className="rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675] disabled:cursor-not-allowed disabled:opacity-60"
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
