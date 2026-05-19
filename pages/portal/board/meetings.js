import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [agendaItems, setAgendaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadMeetingData();

    const interval = setInterval(() => {
      loadMeetingData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadMeetingData() {
    try {
      setLoading(true);
      setSystemMessage("");

      const { data: meetingRows, error: meetingsError } = await supabase
        .from("association_board_meetings")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("meeting_time", { ascending: false });

      if (meetingsError) throw meetingsError;

      const { data: agendaRows, error: agendaError } = await supabase
        .from("association_board_agenda_items")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("created_at", { ascending: false });

      if (agendaError) throw agendaError;

      setMeetings(meetingRows || []);
      setAgendaItems(agendaRows || []);
    } catch (error) {
      console.error("Unable to load board meetings:", error);
      setMeetings([]);
      setAgendaItems([]);
      setSystemMessage(error.message || "Unable to load board meetings.");
    } finally {
      setLoading(false);
    }
  }

  const upcomingMeetings = useMemo(
    () =>
      meetings.filter(
        (meeting) => String(meeting.status || "").toLowerCase() !== "completed"
      ),
    [meetings]
  );

  const completedMeetings = useMemo(
    () =>
      meetings.filter(
        (meeting) => String(meeting.status || "").toLowerCase() === "completed"
      ),
    [meetings]
  );

  const pendingAgendaItems = useMemo(
    () =>
      agendaItems.filter(
        (item) => String(item.status || "").toLowerCase() !== "completed"
      ),
    [agendaItems]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Board Coordination
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Meetings & Agenda
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
            Meeting Operations
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Manage board meetings, agendas, decisions, and association review items.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Board members can review upcoming meetings, agenda items, financial
            review topics, vendor approvals, compliance matters, ARC requests,
            and completed meeting history from one live board coordination page.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Meetings" value={meetings.length} />
          <Metric label="Upcoming" value={upcomingMeetings.length} />
          <Metric label="Agenda Items" value={agendaItems.length} />
          <Metric label="Completed" value={completedMeetings.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Live Meeting Queue
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Board Meetings
            </h2>
          </div>

          <div className="space-y-5">
            {loading ? (
              <Empty message="Loading board meetings..." />
            ) : meetings.length === 0 ? (
              <Empty message="No board meetings are currently available." />
            ) : (
              meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Current Agenda
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Agenda Items
          </h2>

          <div className="mt-6 space-y-4">
            {loading ? (
              <Empty message="Loading agenda..." />
            ) : agendaItems.length === 0 ? (
              <Empty message="No agenda items are currently available." />
            ) : (
              agendaItems.map((item) => (
                <AgendaCard key={item.id} item={item} />
              ))
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Pending Agenda Items
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-100">
              {pendingAgendaItems.length}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function MeetingCard({ meeting }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
              {meeting.id}
            </span>

            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
              {titleCase(meeting.status || "upcoming")}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold">
            {meeting.title || "Board Meeting"}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {formatDateTime(meeting.meeting_time)} ·{" "}
            {meeting.location || "Location Pending"}
          </p>

          {meeting.notes && (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {meeting.notes}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function AgendaCard({ item }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
      <p className="text-sm font-semibold">
        {item.agenda_item || "Agenda Item"}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {item.detail || "No agenda detail available."}
      </p>

      <p className="mt-3 text-xs font-semibold text-yellow-300">
        {titleCase(item.status || "pending")}
      </p>
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
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatDateTime(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
