import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed", "cancelled"];

const calendarEventTypes = [
  "board_meeting",
  "annual_meeting",
  "budget_meeting",
  "inspection",
  "vendor_walkthrough",
  "insurance_review",
  "deadline",
  "renewal",
  "violation_hearing",
  "election",
  "community_event",
  "emergency_event",
  "training",
  "reserve_study",
  "financial_review",
];

export default function AssociationCalendar() {
  const [events, setEvents] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [saving, setSaving] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    event_type: "board_meeting",
    start_time: "",
    end_time: "",
    location: "",
    priority: "normal",
    status: "scheduled",
  });

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

      const response = await fetch(
        `/api/calendar/events?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load association calendar.");
      }

      setEvents(payload.events || []);
    } catch (error) {
      console.error("Unable to load association calendar events:", error);
      setEvents([]);
      setSystemMessage(error.message || "Unable to load association calendar.");
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

  async function createEvent(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setSystemMessage("");

      const response = await fetch("/api/calendar/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          ...form,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to create calendar item.");
      }

      setForm({
        title: "",
        description: "",
        event_type: "board_meeting",
        start_time: "",
        end_time: "",
        location: "",
        priority: "normal",
        status: "scheduled",
      });

      await loadCalendarEvents();
      setSystemMessage("Calendar item created and published to the Association Calendar.");
    } catch (error) {
      console.error("Unable to create calendar item:", error);
      setSystemMessage(error.message || "Unable to create calendar item.");
    } finally {
      setSaving(false);
    }
  }

  async function updateEventStatus(eventId, status) {
    if (!eventId) return;

    try {
      setSystemMessage("");

      const response = await fetch("/api/calendar/events", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: eventId,
          updates: {
            status,
            completed_at: status === "completed" ? new Date().toISOString() : null,
          },
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to update calendar item.");
      }

      await loadCalendarEvents();
      setSystemMessage(`Calendar item marked ${titleCase(status)}.`);
    } catch (error) {
      console.error("Unable to update calendar item:", error);
      setSystemMessage(error.message || "Unable to update calendar item.");
    }
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
              Association Calendar
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Association meetings, inspections, deadlines, renewals, hearings,
              vendor walkthroughs, and operational scheduling in one calendar center.
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
              Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Calendar Operations Center
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Create, manage, and view association scheduling from one live calendar system.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Calendar items created here are saved directly into the association calendar
            and appear in the schedule below. Meeting packet records are cleaned before
            display so the board sees agenda content, not routing scripts or attachment metadata.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portal/board/meetings"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meeting Packets
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
          <form
            onSubmit={createEvent}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
          >
            <h3 className="text-2xl font-semibold">Create Calendar Item</h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use this for meetings, inspections, renewals, hearings, deadlines,
              walkthroughs, and other association scheduling needs.
            </p>

            <div className="mt-6 space-y-5">
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  required
                  className="input"
                  placeholder="Example: Monthly Board Meeting"
                />
              </Field>

              <Field label="Event Type">
                <select
                  value={form.event_type}
                  onChange={(event) =>
                    setForm({ ...form, event_type: event.target.value })
                  }
                  className="input"
                >
                  {calendarEventTypes.map((type) => (
                    <option key={type} value={type}>
                      {titleCase(type)}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Start Date / Time">
                  <input
                    type="datetime-local"
                    value={form.start_time}
                    onChange={(event) =>
                      setForm({ ...form, start_time: event.target.value })
                    }
                    required
                    className="input"
                  />
                </Field>

                <Field label="End Date / Time">
                  <input
                    type="datetime-local"
                    value={form.end_time}
                    onChange={(event) =>
                      setForm({ ...form, end_time: event.target.value })
                    }
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(event) =>
                    setForm({ ...form, location: event.target.value })
                  }
                  className="input"
                  placeholder="Clubhouse, Zoom, Lobby, Vendor Site Visit..."
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Priority">
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm({ ...form, priority: event.target.value })
                    }
                    className="input"
                  >
                    <option value="normal">Normal</option>
                    <option value="attention">Attention</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </Field>

                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                    className="input"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="tentative">Tentative</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                </Field>
              </div>

              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  rows={6}
                  className="input"
                  placeholder="Add notes, agenda context, inspection details, renewal information, or scheduling instructions."
                />
              </Field>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
              >
                {saving ? "Creating Calendar Item..." : "Create Calendar Item"}
              </button>
            </div>
          </form>

          <section id="calendar-events">
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
                <Empty message="Loading association calendar..." />
              ) : filteredEvents.length === 0 ? (
                <Empty message="No calendar items are currently available for this view." />
              ) : (
                filteredEvents.map((event) => (
                  <CalendarCard
                    key={event.id}
                    event={event}
                    onStatusChange={updateEventStatus}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Meeting Records" items={meetingRecords} recordType="meeting" />
          <OperationalPanel title="Deadline / Renewal Records" items={deadlineRecords} recordType="deadline" />
          <OperationalPanel title="Inspection / Walkthrough Records" items={inspectionRecords} recordType="inspection" />
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Calendar Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now uses one calendar system for admin creation and board visibility.
            Operational records are also cleaned before display to prevent raw routing text,
            packet URLs, metadata, or board-action scripts from appearing in calendar panels.
          </p>
        </div>
      </section>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(15, 23, 42, 0.9);
          padding: 0.85rem 1rem;
          color: white;
          outline: none;
        }

        .input:focus {
          border-color: rgba(251, 191, 36, 0.45);
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.08);
        }

        option {
          background: #020617;
          color: white;
        }
      `}</style>
    </main>
  );
}

function OperationalPanel({ title, items, recordType }) {
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

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                {cleanOperationalRecordDescription(item.description, recordType) ||
                  "No calendar details provided."}
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

function CalendarCard({ event, onStatusChange }) {
  const status = String(event.status || "scheduled").toLowerCase();
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled";

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold">
              {event.title || "Calendar Item"}
            </h3>

            <Badge>{titleCase(event.status || "scheduled")}</Badge>
            <Badge>{titleCase(event.event_type || "general")}</Badge>
            <Badge>{titleCase(event.priority || "normal")}</Badge>
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

          <p className="mt-5 max-w-3xl whitespace-pre-wrap leading-7 text-slate-300">
            {event.description || "Association calendar item."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {!isCompleted && !isCancelled && (
            <>
              <button
                onClick={() => onStatusChange(event.id, "confirmed")}
                className="rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
              >
                Confirm
              </button>

              <button
                onClick={() => onStatusChange(event.id, "completed")}
                className="rounded-full border border-blue-400/30 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-400/10"
              >
                Complete
              </button>

              <button
                onClick={() => onStatusChange(event.id, "cancelled")}
                className="rounded-full border border-red-400/30 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
              >
                Cancel
              </button>
            </>
          )}

          {isCompleted && (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300">
              Completed
            </span>
          )}

          {isCancelled && (
            <span className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-300">
              Cancelled
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      {children}
    </label>
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

function Badge({ children }) {
  return (
    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
      {children}
    </span>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function cleanOperationalRecordDescription(description = "", recordType = "general") {
  const text = String(description || "").trim();

  if (!text) return "";

  if (recordType === "meeting") {
    return extractAgendaOnly(text);
  }

  return removeOperationalNoise(text);
}

function extractAgendaOnly(description = "") {
  const text = String(description || "").trim();

  if (!text.includes("Agenda:")) {
    return removeOperationalNoise(text);
  }

  const agendaText =
    text.split("Agenda:")[1]?.split("Packet Notes:")[0] ||
    text.split("Agenda:")[1]?.split("Attachments:")[0] ||
    text.split("Agenda:")[1] ||
    "";

  return removeOperationalNoise(agendaText).trim();
}

function removeOperationalNoise(value = "") {
  return String(value || "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/Attachments?:[\s\S]*$/gi, "")
    .replace(/Packet Notes?:[\s\S]*$/gi, "")
    .replace(/Board Actions?:[\s\S]*$/gi, "")
    .replace(/Packet ID:[\s\S]*$/gi, "")
    .replace(/Routing Target:[\s\S]*$/gi, "")
    .replace(/Recommended Action:[\s\S]*$/gi, "")
    .replace(/Send to Board[\s\S]*$/gi, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
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
