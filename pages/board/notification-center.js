import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/bosClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const NOTIFICATION_SOURCE = "board_notification_center";

const alertTypes = [
  "Overdue tasks",
  "Upcoming deadlines",
  "Approval reminders",
  "Document review notices",
  "Compliance reminders",
  "Vendor updates",
  "Legal matter alerts",
  "Budget alerts",
  "Insurance renewals",
  "System notices",
];

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value) {
  if (!value) return "No date";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function priorityFromText(value) {
  const text = String(value || "").toLowerCase();

  if (
    text.includes("critical") ||
    text.includes("overdue") ||
    text.includes("urgent")
  ) {
    return "High";
  }

  if (
    text.includes("approval") ||
    text.includes("legal") ||
    text.includes("insurance") ||
    text.includes("budget")
  ) {
    return "Medium";
  }

  return "Normal";
}

export default function BoardNotificationCenter() {
  const [events, setEvents] = useState([]);
  const [actions, setActions] = useState([]);
  const [readNotifications, setReadNotifications] = useState({});
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadNotifications({ showLoading: true });

    const interval = setInterval(() => {
      loadNotifications({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadNotifications({ showLoading = false } = {}) {
    try {
      if (showLoading) {
        setLoading(true);
      }

      setSystemMessage("");

      const [
        { data: eventRows, error: eventsError },
        { data: actionRows, error: actionsError },
        { data: readRows, error: readsError },
      ] = await Promise.all([
        supabase
          .from("bos_events")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("bos_actions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("bos_notification_reads")
          .select("notification_id")
          .eq("association_id", DEFAULT_ASSOCIATION_ID)
          .eq("notification_source", NOTIFICATION_SOURCE)
          .eq("read_by_role", "board"),
      ]);

      if (eventsError) throw eventsError;
      if (actionsError) throw actionsError;
      if (readsError) throw readsError;

      const readMap = {};
      (readRows || []).forEach((row) => {
        readMap[row.notification_id] = true;
      });

      setEvents(eventRows || []);
      setActions(actionRows || []);
      setReadNotifications(readMap);
    } catch (error) {
      console.error("Unable to load board notifications:", error);
      setSystemMessage("Unable to load board notifications.");
      setEvents([]);
      setActions([]);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(notificationId) {
  try {
    setReadNotifications((current) => ({
      ...current,
      [notificationId]: true,
    }));

    const { error } = await supabase.from("bos_notification_reads").upsert(
      {
        notification_id: String(notificationId),
        notification_source: NOTIFICATION_SOURCE,
        association_id: DEFAULT_ASSOCIATION_ID,
        read_by_role: "board",
        read_at: new Date().toISOString(),
      },
      {
        onConflict:
          "notification_id,notification_source,association_id,read_by_role",
      }
    );

    if (error) {
      throw error;
    }

    await loadNotifications({ showLoading: false });
  } catch (error) {
    console.error("Unable to mark notification as read:", error);
    setSystemMessage("Unable to mark notification as read.");

    await loadNotifications({ showLoading: false });
  }
}

async function deleteNotification(notificationId) {
  try {
    setSystemMessage("");

    const response = await fetch(
      `/api/board/delete-notification?id=${notificationId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to delete notification.");
    }

    await loadNotifications({ showLoading: false });

    setSystemMessage("Notification deleted successfully.");
  } catch (error) {
    console.error("Unable to delete notification:", error);

    setSystemMessage(error.message || "Unable to delete notification.");
  }
}
}
    try {
      setReadNotifications((current) => ({
        ...current,
        [notificationId]: true,
      }));

      const { error } = await supabase.from("bos_notification_reads").upsert(
        {
          notification_id: String(notificationId),
          notification_source: NOTIFICATION_SOURCE,
          association_id: DEFAULT_ASSOCIATION_ID,
          read_by_role: "board",
          read_at: new Date().toISOString(),
        },
        {
          onConflict:
            "notification_id,notification_source,association_id,read_by_role",
        }
      );

      if (error) {
        throw error;
      }

      await loadNotifications({ showLoading: false });
    } catch (error) {
      console.error("Unable to mark notification as read:", error);
      setSystemMessage("Unable to mark notification as read.");

      await loadNotifications({ showLoading: false });
   
  const notifications = useMemo(() => {
    const actionMap = new Map(actions.map((action) => [action.id, action]));

    const eventNotifications = events.map((event) => {
      const linkedAction = actionMap.get(event.action_id);
      const message =
        event.message ||
        linkedAction?.description ||
        "Board notification update.";

      return {
        id: String(event.id),
        title:
          linkedAction?.title || titleCase(event.event_type || "Board Update"),
        type: titleCase(event.event_type || "System Notice"),
        priority: priorityFromText(
          `${event.event_type} ${message} ${linkedAction?.priority || ""}`
        ),
        date: formatDate(event.created_at),
        owner:
          linkedAction?.assigned_to ||
          linkedAction?.owner_name ||
          "Board / Management",
        status: readNotifications[String(event.id)] ? "Read" : "Unread",
        linked:
          event.module ||
          linkedAction?.category ||
          linkedAction?.request_type ||
          "Board Workflow",
        message,
      };
    });

    const openActionNotifications = actions
      .filter(
        (action) =>
          String(action.status || "open").toLowerCase() !== "completed"
      )
      .slice(0, 10)
      .map((action) => {
        const notificationId = `action-${action.id}`;

        return {
          id: notificationId,
          title: action.title || "Board Action Item",
          type: titleCase(
            action.category || action.request_type || "Action Reminder"
          ),
          priority: titleCase(action.priority || priorityFromText(action.title)),
          date: formatDate(action.created_at),
          owner: action.assigned_to || action.owner_name || "Board / Management",
          status: readNotifications[notificationId] ? "Read" : "Open",
          linked: "Board Workflow Engine",
          message:
            action.description ||
            action.recommended_action ||
            "This item is open and may require board awareness or follow-up.",
        };
      });

    return [...eventNotifications, ...openActionNotifications].slice(0, 20);
  }, [events, actions, readNotifications]);

  const highPriorityCount = useMemo(
    () =>
      notifications.filter((item) =>
        ["high", "critical"].includes(String(item.priority || "").toLowerCase())
      ).length,
    [notifications]
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (item) => String(item.status || "").toLowerCase() === "unread"
      ).length,
    [notifications]
  );

  const dueThisWeekCount = useMemo(
    () =>
      actions.filter((action) => {
        if (!action.due_date) return false;

        const dueDate = new Date(action.due_date);
        const now = new Date();
        const sevenDays = new Date();
        sevenDays.setDate(now.getDate() + 7);

        return dueDate >= now && dueDate <= sevenDays;
      }).length,
    [actions]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operations Center
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Notification Center
            </h1>
          </div>

          <Link
            href="/board"
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Return to Board Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Live Board Alert System
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Notification Center
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A centralized notification hub for board alerts, workflow updates,
            approval reminders, operational status changes, compliance reminders,
            vendor updates, budget items, insurance matters, and system notices.
          </p>
        </div>

        {systemMessage && (
          <div className="mb-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Board members should not have to hunt through emails or remember
              every deadline. This center surfaces live board updates as they are
              created across the platform.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Priority Awareness</h2>

            <p className="mt-4 leading-7 text-slate-300">
              High-priority approvals, overdue items, compliance dates, budget
              notices, insurance reminders, and workflow changes are organized
              into one board-safe view.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Connected Alerts</h2>

            <p className="mt-4 leading-7 text-slate-300">
              Notifications are connected to BOS events and board-visible actions
              so the board can see what changed and why it matters.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["New Alerts", notifications.length],
            ["High Priority", highPriorityCount],
            ["Unread", unreadCount],
            ["Due This Week", dueThisWeekCount],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Notification Feed</h2>

                <p className="mt-2 text-sm text-slate-400">
                  Alerts organized by priority, date, owner, status, and linked
                  board workflow.
                </p>
              </div>

              <button
                type="button"
                onClick={() => loadNotifications({ showLoading: true })}
                className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-200"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-5">
              {loading ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-400">
                  Loading board notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-200">
                  No board notifications are currently active.
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                          {item.type} · {item.priority} Priority · {item.date}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border px-4 py-1 text-sm ${
                            String(item.status || "").toLowerCase() === "read"
                              ? "border-emerald-300/30 text-emerald-200"
                              : "border-amber-300/30 text-amber-200"
                          }`}
                        >
                          {item.status}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
  {String(item.status || "").toLowerCase() !== "read" && (
    <button
      type="button"
      onClick={() => markAsRead(item.id)}
      className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20"
    >
      Read
    </button>
  )}

  <button
    type="button"
    onClick={() => deleteNotification(item.id)}
    className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-1 text-sm font-semibold text-red-300 hover:bg-red-400/20"
  >
    Delete
  </button>
</div>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                      <p>
                        <span className="text-slate-500">Owner:</span>{" "}
                        {item.owner}
                      </p>

                      <p>
                        <span className="text-slate-500">Linked Workflow:</span>{" "}
                        {item.linked}
                      </p>

                      <p className="md:col-span-2">
                        <span className="text-slate-500">Message:</span>{" "}
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Alert Types</h2>

              <div className="mt-5 grid gap-3">
                {alertTypes.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Notification Rules</h2>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• High priority items stay visible</p>
                <p>• Workflow updates appear from BOS events</p>
                <p>• Open actions can appear as reminders</p>
                <p>• Compliance and financial items receive special flags</p>
                <p>• Board view stays separate from Admin intake</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Fewer Missed Items, Better Board Awareness
          </h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This notification center gives the board one trusted place to see
            what needs attention. Instead of depending on scattered emails,
            every important alert connects back to live board workflow activity.
          </p>
        </section>
      </section>
    </main>
  );
}
