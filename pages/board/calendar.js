import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed", "cancelled"];

export default function BoardCalendar() {
  const [events, setEvents] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadCalendarEvents();
    loadCalendarRecords();

    const interval = setInterval(() => {
      loadCalendarEvents();
      loadCalendarRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadCalendarEvents() {
    try {
      setLoadingEvents(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_calendar_events")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("start_time", { ascending: true });

      if (error) throw error;

      setEvents(data || []);
    } catch (error) {
      console.error("Unable to load board calendar events:", error);
      setEvents([]);
      setSystemMessage(error.message || "Unable to load board calendar.");
    } finally {
      setLoadingEvents(false);
    }
  }

  async function loadCalendarRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load calendar operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("calendar") ||
            combined.includes("meeting") ||
            combined.includes("deadline") ||
            combined.includes("inspection") ||
            combined.includes("renewal") ||
            combined.includes("walkthrough") ||
            combined.includes("hearing") ||
            combined.includes("event") ||
            combined.includes("schedule"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load calendar operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  async function markComplete(event) {
    if (!event?.id) return;

    const { error } = await supabase
      .from("association_calendar_events")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", event.id);

    if (error) {
      console.error("Unable to complete calendar event:", error);
      setSystemMessage("Unable to mark calendar item complete.");
      return;
    }

    await loadCalendarEvents();
    setSystemMessage("Calendar item marked complete.");
  }

  const upcomingEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          String(event.status || "").toLowerCase() !== "completed" &&
          String(event.status || "").toLowerCase() !== "cancelled"
      ),
    [events]
  );

  const completedEvents = useMemo(
    () =>
      events.filter(
        (event) => String(event.status || "").toLowerCase() === "completed"
      ),
    [events]
  );

  const deadlineEvents = useMemo(
    () =>
      events.filter((event) =>
        String(event.event_type || "").toLowerCase().includes("deadline")
      ),
    [events]
  );

  const filteredEvents = useMemo(() => {
    if (filter === "all") return events;

    return events.filter(
      (event) => String(event.event_type || "").toLowerCase() === filter
    );
  }, [events, filter]);

  const eventTypes = useMemo(() => {
    const types = events
      .map((event) => String(event.event_type || "general").toLowerCase())
      .filter(Boolean);

    return ["all", ...Array.from(new Set(types))];
  }, [events]);

  const meetingRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
          .toLowerCase()
          .includes("meeting")
      ),
    [operationalRecords]
  );

  const deadlineRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("deadline") || combined.includes("renewal");
      }),
    [operationalRecords]
  );

  const inspectionRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("inspection") || combined.includes("walkthrough");
      }),
    [operationalRecords]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Board Calendar
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Board meetings, inspections, deadlines, renewals, hearings,
              vendor walkthroughs, and association operational scheduling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Main Page
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Distributed Calendar Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board calendar now combines scheduled association events with centralized operational date tracking.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Meetings, inspections, deadlines, renewals, hearings, walkthroughs, and
            association scheduling matters can now be created through Admin Operations
            Intake and rendered alongside live calendar events.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Meeting Preparation"
              )}&return_path=${encodeURIComponent(
                "/board/calendar"
              )}&return_label=${encodeURIComponent("Board Calendar")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Calendar Record
            </Link>

            <Link
              href="/portal/board/meetings"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meetings
            </Link>

            <Link
              href="/board/compliance-calendar"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Compliance Calendar
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Action Items
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Calendar Items" value={events.length} />
          <Metric label="Upcoming Items" value={upcomingEvents.length} />
          <Metric label="Deadlines" value={deadlineEvents.length + deadlineRecords.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Meeting Records" items={meetingRecords} />
          <OperationalPanel title="Deadline / Renewal Records" items={deadlineRecords} />
          <OperationalPanel title="Inspection / Walkthrough Records" items={inspectionRecords} />
        </div>

        <section id="calendar-events" className="mt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Upcoming Schedule
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Association Calendar
              </h2>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-full border border-amber-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-300 outline-none"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Calendar Items" : titleCase(type)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5">
            {loadingEvents ? (
              <Empty message="Loading board calendar..." />
            ) : filteredEvents.length === 0 ? (
              <Empty message="No calendar items are currently available for this view." />
            ) : (
              filteredEvents.map((event) => (
                <CalendarCard
                  key={event.id}
                  event={event}
                  onComplete={markComplete}
                />
              ))
            )}
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Calendar Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now preserves association calendar event visibility while adding
            distributed operational schedule records from Admin Operations Intake.
          </p>
        </div>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Calendar Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Calendar Record"}</span>
                <span>•</span>
                <span>{item.status || "Submitted"}</span>
                <span>•</span>
                <span>{item.priority || "Normal"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CalendarCard({ event, onComplete }) {
  const status = String(event.status || "scheduled").toLowerCase();
  const isCompleted = status === "completed";

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold">
              {event.title || "Calendar Item"}
            </h3>

            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
              {titleCase(event.status || "scheduled")}
            </span>

            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {titleCase(event.event_type || "general")}
            </span>
          </div>

          <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-4">
            <p>
              <span className="text-slate-500">Date:</span>{" "}
              {formatDate(event.start_time)}
            </p>

            <p>
              <span className="text-slate-500">Time:</span>{" "}
              {formatTimeRange(event.start_time, event.end_time)}
            </p>

            <p>
              <span className="text-slate-500">Location:</span>{" "}
              {event.location || "Not Specified"}
            </p>

            <p>
              <span className="text-slate-500">Priority:</span>{" "}
              {titleCase(event.priority || "normal")}
            </p>
          </div>

          <p className="mt-5 max-w-3xl leading-7 text-slate-300">
            {event.description || "Association calendar item."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {!isCompleted && (
            <button
              onClick={() => onComplete(event)}
              className="rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Mark Complete
            </button>
          )}

          {isCompleted && (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300">
              Completed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(start, end) {
  if (!start) return "N/A";

  const startDate = new Date(start);

  if (Number.isNaN(startDate.getTime())) return "N/A";

  const startText = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!end) return startText;

  const endDate = new Date(end);

  if (Number.isNaN(endDate.getTime())) return startText;

  const endText = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${startText} - ${endText}`;
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
