import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/bosClient";

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
  }, []);

  async function loadNotifications() {
    try {
      setLoading(true);
      setSystemMessage("");

      const [
        { data: eventRows, error: eventsError },
        { data: actionRows, error: actionsError },
      ] = await Promise.all([
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
        priority: titleCase(
          linkedAction?.priority || priorityFromText(`${event.event_type} ${message}`)
        ),
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
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
              Board Alerts
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight">
              Admin Notifications
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
              Live board notices from Admin, Management, workflow events,
              approvals, financial updates, agenda changes, and recorded platform decisions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/board"
              className="rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Board Dashboard
            </Link>

            <Link
              href="/board/approval-queue"
              className="rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-200"
            >
              Approval Queue
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="grid gap-5 md:grid-cols-4">
          {[
            ["Unread Alerts", unreadCount, "Need attention"],
            ["Approval Notices", approvalCount, "Pending decisions"],
            ["High Priority", highPriorityCount, "Board awareness"],
            ["Reports Ready", reportCount, "Available now"],
          ].map(([label, value, detail]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <p className="text-sm text-slate-400">{label}</p>

              <div className="mt-4 flex items-end justify-between">
                <h2 className="text-4xl font-bold">{value}</h2>
                <span className="h-3 w-3 rounded-full bg-amber-300" />
              </div>

              <p className="mt-4 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Notification Center</h2>
              <p className="mt-1 text-sm text-slate-400">
                Filter board-safe notices by status or category.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    activeFilter === filter
                      ? "bg-amber-300 text-slate-950"
                      : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}

              <button
                onClick={loadNotifications}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10"
              >
                Refresh
              </button>

              <button
                onClick={markAllReviewed}
                className="rounded-2xl bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-200"
              >
                Mark All Reviewed
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.36fr]">
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-400">
                Loading board notifications...
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-sm text-emerald-200">
                No board notifications currently match this filter.
              </div>
            ) : (
              filteredNotifications.map((notice) => (
                <article
                  key={notice.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
                >
                  <div className="grid gap-6 xl:grid-cols-[1fr_220px] xl:items-start">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                          {notice.id}
                        </span>

                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                          {notice.category}
                        </span>

                        <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1 text-xs font-semibold text-amber-200">
                          {notice.priority} Priority
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                    <aside className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                        Board Actions
                      </p>

                      <div className="mt-4 space-y-3">
                        <Link
                          href="/board/workflow-engine"
                          className="block rounded-xl bg-amber-300 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-amber-200"
                        >
                          Open Workflow
                        </Link>

                        <button
                          onClick={() => markRead(notice.id)}
                          className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                        >
                          Mark as Read
                        </button>

                        <button
                          onClick={() => snoozeAlert(notice.id)}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
                        >
                          Snooze Alert
                        </button>
                      </div>
                    </aside>
                  </div>
                </article>
              ))
            )}
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <h2 className="text-xl font-semibold">Notification Summary</h2>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <SummaryRow label="Unread Alerts" value={unreadCount} />
              <SummaryRow label="Approval Notices" value={approvalCount} />
              <SummaryRow label="High Priority" value={highPriorityCount} />
              <SummaryRow label="Reports Ready" value={reportCount} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Quick Rules
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>• High priority items stay visible</p>
                <p>• Workflow updates appear from BOS events</p>
                <p>• Open actions can appear as reminders</p>
                <p>• Compliance and financial items are flagged</p>
                <p>• Board view stays separate from Admin</p>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
