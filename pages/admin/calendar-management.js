import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const eventTypes = [
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

export default function AdminCalendarManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/calendar/events?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load calendar events.");
      }

      setEvents(payload.events || []);
    } catch (error) {
      console.error("Unable to load calendar events:", error);
      setMessage(error.message || "Unable to load calendar events.");
    } finally {
      setLoading(false);
    }
  }

  async function createEvent(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

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
        throw new Error(payload.message || "Unable to create calendar event.");
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

      await loadEvents();
      setMessage("Calendar event created and published to the Board Calendar.");
    } catch (error) {
      console.error("Unable to create calendar event:", error);
      setMessage(error.message || "Unable to create calendar event.");
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(eventId, status) {
    try {
      setMessage("");

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
        throw new Error(payload.message || "Unable to update calendar event.");
      }

      await loadEvents();
      setMessage(`Calendar event marked ${titleCase(status)}.`);
    } catch (error) {
      console.error("Unable to update calendar event:", error);
      setMessage(error.message || "Unable to update calendar event.");
    }
  }

  const upcomingEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          !["completed", "cancelled"].includes(
            String(event.status || "").toLowerCase()
          )
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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Calendar Management
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Create and manage association meetings, deadlines, inspections,
              renewals, hearings, walkthroughs, and board-visible scheduling items.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board/calendar"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              View Board Calendar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Association Scheduling Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Create calendar items once and publish them directly to the Board Calendar.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            This page is the admin-side scheduling control center. Items created here
            are saved into the live association calendar table and appear on the
            board-facing calendar automatically.
          </p>
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {message}
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Metric label="Total Calendar Items" value={events.length} />
          <Metric label="Upcoming Items" value={upcomingEvents.length} />
          <Metric label="Completed Items" value={completedEvents.length} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
          <form
            onSubmit={createEvent}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
          >
            <h3 className="text-2xl font-semibold">Create Calendar Item</h3>

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
                  {eventTypes.map((type) => (
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

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-semibold">
                  Current Calendar Items
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  These items are live and visible from the Board Calendar.
                </p>
              </div>

              <button
                onClick={loadEvents}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Refresh
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <Empty message="Loading calendar items..." />
              ) : events.length === 0 ? (
                <Empty message="No calendar items have been created yet." />
              ) : (
                events.map((event) => (
                  <CalendarAdminCard
                    key={event.id}
                    event={event}
                    onStatusChange={updateStatus}
                  />
                ))
              )}
            </div>
          </section>
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

function CalendarAdminCard({ event, onStatusChange }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-semibold text-white">
              {event.title || "Calendar Item"}
            </h4>

            <Badge>{titleCase(event.event_type || "general")}</Badge>
            <Badge>{titleCase(event.status || "scheduled")}</Badge>
            <Badge>{titleCase(event.priority || "normal")}</Badge>
          </div>

          <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
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
              {event.location || "Not specified"}
            </p>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
            {event.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <button
            onClick={() => onStatusChange(event.id, "confirmed")}
            className="rounded-full border border-emerald-400/30 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/10"
          >
            Confirm
          </button>

          <button
            onClick={() => onStatusChange(event.id, "completed")}
            className="rounded-full border border-blue-400/30 px-4 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-400/10"
          >
            Complete
          </button>

          <button
            onClick={() => onStatusChange(event.id, "cancelled")}
            className="rounded-full border border-red-400/30 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-400/10"
          >
            Cancel
          </button>
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
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
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
