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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          view: "notifications",
          action: "mark_read",
          id: notification.id,
        }),
      });

      await loadNotifications();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  async function markAllAsRead() {
    const unread = notifications.filter(
      (n) => n.read !== true && n.status !== "read"
    );

    for (const n of unread) {
      await markAsRead(n);
    }
  }

  const grouped = useMemo(() => {
    const groups = {};

    notifications.forEach((n) => {
      const key = n.requestId || "general";

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(n);
    });

    return Object.entries(groups).sort((a, b) => {
      const dateA = new Date(a[1][0]?.createdAt || 0).getTime();
      const dateB = new Date(b[1][0]?.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [notifications]);

  function formatDate(value) {
    if (!value) return "Recent";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Recent";

    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const unreadCount = notifications.filter(
    (n) => n.read !== true && n.status !== "read"
  ).length;

  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d4af37]">
              Owner Portal
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Notifications
            </h1>
            <p className="mt-4 text-slate-300">
              Clean, grouped updates tied to each of your requests.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/portal/owner/requests"
              className="rounded-2xl bg-[#d4af37] px-5 py-3 font-bold text-[#070b16]"
            >
              Requests
            </Link>

            <button
              onClick={markAllAsRead}
              className="rounded-2xl border border-white/10 px-5 py-3 font-bold hover:border-[#d4af37]/60"
            >
              Mark All Read
            </button>
          </div>
        </div>

        <div className="mb-6 text-[#f1d675] font-bold">
          {unreadCount} unread notifications
        </div>

        {loading ? (
          <div className="text-center text-slate-400">
            Loading notifications...
          </div>
        ) : grouped.length === 0 ? (
          <div className="text-center text-slate-400">
            No notifications yet.
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([requestId, items]) => {
              const latest = items[0];

              return (
                <div
                  key={requestId}
                  className="rounded-3xl border border-white/10 bg-[#0c1222] p-6"
                >
                  <div className="mb-4">
                    <p className="text-sm text-[#f1d675] font-bold">
                      {requestId}
                    </p>
                    <h2 className="text-xl font-bold">
                      {latest.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {items.map((n) => {
                      const isRead =
                        n.read === true || n.status === "read";

                      return (
                        <div
                          key={n.id}
                          className={`rounded-2xl p-4 ${
                            isRead
                              ? "bg-[#070b16]"
                              : "bg-[#d4af37]/10 border border-[#d4af37]/30"
                          }`}
                        >
                          <div className="flex justify-between gap-4">
                            <div>
                              <p className="font-semibold">{n.message}</p>
                              <p className="text-sm text-slate-400 mt-1">
                                {formatDate(n.createdAt)}
                              </p>
                            </div>

                            {!isRead && (
                              <button
                                onClick={() => markAsRead(n)}
                                disabled={updatingId === n.id}
                                className="text-sm font-bold text-[#d4af37]"
                              >
                                Read
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
