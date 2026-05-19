import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardCalendar() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadCalendarEvents();

    const interval = setInterval(() => {
      loadCalendarEvents();
    }, 10000);

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

      if (error) {
        throw error;
      }

      setEvents(data || []);
    } catch (error) {
      console.error("Unable to load board calendar events:", error);
      setEvents([]);
      setSystemMessage(error.message || "Unable to load board calendar.");
    } finally {
      setLoadingEvents(false);
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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
            <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Association Operations Calendar
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Board Calendar
              </h1>
            </div>

            <Link
              href="/board"
              className="text-lg font-medium text-white hover:text-yellow-300"
            >
              Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="rounded-3xl border border-yellow-300/20 bg-gradient-to-r from-slate-900 to-slate-950 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
            Calendar Operations Queue
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Review board meetings, inspections, deadlines, and association scheduling activity.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Track live board scheduling activity including meetings, vendor walkthroughs,
            inspections, compliance deadlines, insurance renewals, and association operational events.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Calendar Items" value={events.length} />
          <Metric label="Upcoming Items" value={upcomingEvents.length} />
          <Metric label="Deadlines" value={deadlineEvents.length} />
          <Metric label="Completed" value={completedEvents.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section id="calendar-events" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Upcoming Schedule
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Association Calendar
            </h2>
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-yellow-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-yellow-300 outline-none"
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
    </main>
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

            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
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
      <div className="text-3xl font-bold text-yellow-300">{value}</div>
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

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(start, end) {
  if (!start) return "N/A";

  const startText = new Date(start).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!end) return startText;

  const endText = new Date(end).toLocaleTimeString("en-US", {
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
