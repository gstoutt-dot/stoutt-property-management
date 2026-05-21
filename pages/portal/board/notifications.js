import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/bosClient";
import bosTheme from "../../../styles/bos-theme";

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatTime(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleString();
}

function priorityFromText(value) {
  const text = String(value || "").toLowerCase();

  if (text.includes("critical") || text.includes("urgent") || text.includes("overdue")) {
    return "High";
  }

  if (
    text.includes("approval") ||
    text.includes("vote") ||
    text.includes("financial") ||
    text.includes("legal") ||
    text.includes("insurance")
  ) {
    return "Medium";
  }

  return "Normal";
}

export default function BoardNotifications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [actions, setActions] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [snoozedIds, setSnoozedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadNotifications() {
    try {
      setLoading(true);
      setSystemMessage("");

      const [{ data: eventRows, error: eventsError }, { data: actionRows, error: actionsError }] =
        await Promise.all([
          supabase
            .from("bos_events")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(75),
          supabase
            .from("bos_actions")
            .select("*")
            .order("created_at", { ascending: false }),
        ]);

      if (eventsError) throw eventsError;
      if (actionsError) throw actionsError;

      setEvents(eventRows || []);
      setActions(actionRows || []);
    } catch (error) {
      console.error("Unable to load board notifications:", error);
      setSystemMessage("Unable to load board notifications.");
      setEvents([]);
      setActions([]);
    } finally {
      setLoading(false);
    }
  }

  const notifications = useMemo(() => {
    const actionMap = new Map(actions.map((action) => [action.id, action]));

    const eventNotices = events.map((event) => {
      const linkedAction = actionMap.get(event.action_id);
      const message =
        event.message ||
        linkedAction?.description ||
        linkedAction?.recommended_action ||
        "A board-visible platform update was posted.";

      return {
        id: event.id,
        title: linkedAction?.title || titleCase(event.event_type || "Board Notification"),
        category: titleCase(event.event_type || linkedAction?.category || "System Notice"),
        priority: titleCase(linkedAction?.priority || priorityFromText(`${event.event_type} ${message}`)),
        time: formatTime(event.created_at),
        detail: message,
        status: readIds.includes(event.id) ? "Read" : "Unread",
        linked: event.module || linkedAction?.request_type || "Board Workflow",
        source: "Platform Event",
      };
    });

    const actionNotices = actions
      .filter((action) => String(action.status || "open").toLowerCase() !== "completed")
      .slice(0, 20)
      .map((action) => ({
        id: `action-${action.id}`,
        title: action.title || "Board Action Item",
        category: titleCase(action.category || action.request_type || "Action"),
        priority: titleCase(action.priority || priorityFromText(action.title)),
        time: formatTime(action.created_at),
        detail:
          action.description ||
          action.recommended_action ||
          "This item is open and may require board awareness or follow-up.",
        status: readIds.includes(`action-${action.id}`) ? "Read" : "Unread",
        linked: "Board Workflow Engine",
        source: "Open Action",
      }));

    return [...eventNotices, ...actionNotices]
      .filter((item) => !snoozedIds.includes(item.id))
      .slice(0, 40);
  }, [events, actions, readIds, snoozedIds]);

  const filters = ["All", "Unread", "Approval", "Meeting", "Report", "Action", "System Notice"];

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter(
          (item) =>
            item.status === activeFilter ||
            item.category === activeFilter ||
            item.category.includes(activeFilter)
        );

  const unreadCount = notifications.filter((item) => item.status === "Unread").length;
  const approvalCount = notifications.filter((item) =>
    `${item.category} ${item.title} ${item.detail}`.toLowerCase().includes("approval")
  ).length;
  const highPriorityCount = notifications.filter((item) =>
    ["high", "critical"].includes(String(item.priority || "").toLowerCase())
  ).length;
  const reportCount = notifications.filter((item) =>
    `${item.category} ${item.title} ${item.detail}`.toLowerCase().includes("report")
  ).length;

  function markRead(id) {
    setReadIds((current) => Array.from(new Set([...current, id])));
  }

  function snoozeAlert(id) {
    setSnoozedIds((current) => Array.from(new Set([...current, id])));
  }

  function markAllReviewed() {
    setReadIds((current) =>
      Array.from(new Set([...current, ...notifications.map((item) => item.id)]))
    );
  }

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Alerts</p>
              <h1 className={bosTheme.title}>Notifications</h1>
              <p className={bosTheme.subtitle}>
                Live board notices from Admin, Management, workflow events,
                approvals, financial updates, agenda changes, and recorded
                platform decisions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/board" className={bosTheme.secondaryButton}>
                Board Dashboard
              </Link>

              <Link href="/board/approval-queue" className={bosTheme.primaryButton}>
                Approval Queue
              </Link>
            </div>
          </div>
        </header>

        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Unread Alerts", unreadCount, "Need attention"],
            ["Approval Notices", approvalCount, "Pending decisions"],
            ["High Priority", highPriorityCount, "Board awareness"],
            ["Reports Ready", reportCount, "Available now"],
          ].map(([label, value, detail]) => (
            <div key={label} className={bosTheme.statCard}>
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-4xl font-semibold">{value}</h2>
                <span className={bosTheme.statDot} />
              </div>
              <p className="mt-3 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Notification Center</h2>
              <p className="mt-1 text-sm text-slate-400">
                Filter board-safe notices by status or category.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    activeFilter === filter
                      ? bosTheme.filterActive
                      : bosTheme.filterInactive
                  }`}
                >
                  {filter}
                </button>
              ))}

              <button
                onClick={loadNotifications}
                className={bosTheme.filterInactive}
              >
                Refresh
              </button>

              <button
                onClick={markAllReviewed}
                className={bosTheme.filterActive}
              >
                Mark All Reviewed
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {loading ? (
            <div className={bosTheme.card}>
              <p className="text-sm text-slate-400">
                Loading board notifications...
              </p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className={bosTheme.card}>
              <p className="text-sm text-emerald-300">
                No board notifications currently match this filter.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notice) => (
              <article
                key={notice.id}
                className={`${bosTheme.card} ${bosTheme.cardHover}`}
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className={bosTheme.badgeNeutral}>{notice.id}</span>
                      <span className={bosTheme.badgeGold}>
                        {notice.category}
                      </span>
                      <span className={bosTheme.badgeAmber}>
                        {notice.priority} Priority
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          notice.status === "Unread"
                            ? "bg-yellow-400/10 text-yellow-300"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {notice.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold">
                      {notice.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                      {notice.detail}
                    </p>

                    <div className="mt-4 grid gap-2 text-xs text-slate-500 md:grid-cols-3">
                      <p>{notice.time}</p>
                      <p>Linked: {notice.linked}</p>
                      <p>Source: {notice.source}</p>
                    </div>
                  </div>

                  <aside className={bosTheme.actionPanel}>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Board Actions
                    </p>

                    <div className="mt-5 space-y-3">
                      <Link
                        href="/board/workflow-engine"
                        className={bosTheme.goldButton}
                      >
                        Open Workflow
                      </Link>

                      <button
                        onClick={() => markRead(notice.id)}
                        className={bosTheme.whiteButton}
                      >
                        Mark as Read
                      </button>

                      <button
                        onClick={() => snoozeAlert(notice.id)}
                        className={bosTheme.outlineButton}
                      >
                        Snooze Alert
                      </button>
                    </div>
                  </aside>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
