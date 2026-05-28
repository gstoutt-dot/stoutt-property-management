import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [agendaItems, setAgendaItems] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  const [meetingPackets, setMeetingPackets] = useState([]);
  const [packetTitle, setPacketTitle] = useState("");
  const [agendaDraft, setAgendaDraft] = useState("");
  const [packetNotes, setPacketNotes] = useState("");
  const [creatingPacket, setCreatingPacket] = useState(false);
  useEffect(() => {
    loadMeetingData();
    loadMeetingRecords();

    const interval = setInterval(() => {
      loadMeetingData();
      loadMeetingRecords();
    }, 30000);

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

      const { data: packetRows, error: packetError } = await supabase
  .from("board_meeting_packets")
  .select("*")
  .eq("association_id", DEFAULT_ASSOCIATION_ID)
  .order("created_at", { ascending: false });

if (packetError) throw packetError;

setMeetings(meetingRows || []);
setAgendaItems(agendaRows || []);
setMeetingPackets(packetRows || []);
    } catch (error) {
      console.error("Unable to load board meetings:", error);
      setMeetings([]);
      setAgendaItems([]);
      setSystemMessage(error.message || "Unable to load board meetings.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMeetingRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load meeting operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("meeting") ||
            combined.includes("agenda") ||
            combined.includes("packet") ||
            combined.includes("minutes") ||
            combined.includes("motion") ||
            combined.includes("vote") ||
            combined.includes("board review"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load meeting records:", error);
    } finally {
      setLoadingRecords(false);
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

  const meetingPrepRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
          .toLowerCase()
          .includes("meeting")
      ),
    [operationalRecords]
  );

  const packetRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
          .toLowerCase()
          .includes("packet")
      ),
    [operationalRecords]
  );

  async function createMeetingPacket() {
 
  try {
    setCreatingPacket(true);
    setSystemMessage("");

    const cleanTitle = String(packetTitle || "").trim();

    if (!cleanTitle) {
      alert("Packet title is blank.");
      setSystemMessage("Meeting packet title is required.");
      setCreatingPacket(false);
      return;
    }

    const payload = {
      association_id: DEFAULT_ASSOCIATION_ID,
      title: cleanTitle,
      agenda_text: String(agendaDraft || ""),
      packet_notes: String(packetNotes || ""),
      status: "Draft",
    };

    const { data, error } = await supabase
      .from("board_meeting_packets")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      alert(`Supabase error: ${error.message}`);
      console.error("Supabase insert error:", error);
      throw error;
    }

    alert(`Packet saved successfully: ${data.title}`);

    setPacketTitle("");
    setAgendaDraft("");
    setPacketNotes("");

    alert("Supabase insert completed");
  } catch (error) {
    console.error("Create meeting packet failed:", error);
    setSystemMessage(error.message || "Unable to create meeting packet.");
  } finally {
    setCreatingPacket(false);
  }
}

  const motionRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("motion") || combined.includes("vote");
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
              Meetings & Agenda
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Board meeting coordination, agenda review, meeting packet preparation,
              motions, votes, and governance follow-up.
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
            Distributed Meeting Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board meetings now connect live meeting tables with centralized operational preparation records.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Meeting preparation, agenda items, board packet records, motions, voting items,
            and governance follow-up can now be created through Admin Operations Intake
            and rendered directly inside the board portal meeting workflow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Meeting Preparation"
              )}&return_path=${encodeURIComponent(
                "/portal/board/meetings"
              )}&return_label=${encodeURIComponent("Meetings & Agenda")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Meeting Record
            </Link>

            <Link
              href="/board/meeting-packet"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meeting Packet
            </Link>

            <Link
              href="/board/motion-center"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Motion Center
            </Link>

            <Link
  href="/board/voting-center"
  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
>
  Voting Center
</Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Meetings" value={meetings.length} />
          <Metric label="Upcoming" value={upcomingMeetings.length} />
          <Metric label="Agenda Items" value={agendaItems.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

<section className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
  <div className="flex flex-col gap-6">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
        Meeting Packet Builder
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        Create Agenda & Packet
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
        Draft meeting agendas, create packet records, preserve governance
        documentation, and distribute board meeting preparation materials
        directly inside SPM.
      </p>
    </div>

    <input
      value={packetTitle}
      onChange={(event) => setPacketTitle(event.target.value)}
      placeholder="Meeting packet title..."
      className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none"
    />

    <textarea
      value={agendaDraft}
      onChange={(event) => setAgendaDraft(event.target.value)}
      placeholder="Draft meeting agenda..."
      rows={8}
      className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none"
    />

    <textarea
      value={packetNotes}
      onChange={(event) => setPacketNotes(event.target.value)}
      placeholder="Packet notes, preparation comments, board reminders..."
      rows={5}
      className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none"
    />

    <div className="flex flex-wrap gap-4">
      <button
  type="button"
  onClick={() => {
    createMeetingPacket();
  }}
  className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-4 font-semibold text-amber-300 hover:bg-amber-400/20"
>
  Create Meeting Packet
</button>
    </div>
  </div>
</section>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Meeting Preparation" items={meetingPrepRecords} />
          <OperationalPanel title="Packet Records" items={packetRecords} />
          <OperationalPanel title="Motion / Vote Items" items={motionRecords} />
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Live Meeting Queue
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Board Meetings
                </h2>
              </div>

              <Link
                href={`/admin/operations/new?request_type=${encodeURIComponent(
                  "Meeting Preparation"
                )}&return_path=${encodeURIComponent(
                  "/portal/board/meetings"
                )}&return_label=${encodeURIComponent("Meetings & Agenda")}`}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Create Meeting Record
              </Link>
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
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
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

                  <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
        Packet Archive
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        Meeting Packets
      </h2>
    </div>
  </div>

  <div className="mt-6 space-y-5">
    {meetingPackets.length === 0 ? (
      <Empty message="No meeting packets created yet." />
    ) : (
      meetingPackets.map((packet) => (
        <div
          key={packet.id}
          className="rounded-2xl border border-white/10 bg-slate-900/80 p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
              {packet.status || "Draft"}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold text-white">
  {packet.title}
</h3>

<div className="mt-4 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={() => {
      const content = `
${packet.title || "Meeting Packet"}

STATUS:
${packet.status || "Draft"}

AGENDA:
${packet.agenda_text || "No agenda provided."}

PACKET NOTES:
${packet.packet_notes || "No packet notes provided."}
`;

      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${String(
        packet.title || "meeting-packet"
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}.txt`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }}
    className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
  >
    Download Packet
  </button>

  <button
    type="button"
    onClick={() => window.print()}
    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
  >
    Print / Save as PDF
  </button>
</div>

          {packet.agenda_text && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-amber-300">
                Agenda
              </p>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {packet.agenda_text}
              </p>
            </div>
          )}

          {packet.packet_notes && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-emerald-300">
                Packet Notes
              </p>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {packet.packet_notes}
              </p>
            </div>
          )}
        </div>
      ))
    )}
  </div>
</section>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Meeting Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now preserves board meeting and agenda table visibility while
            adding distributed operational rendering from Admin Operations Intake.
          </p>
        </div>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">
        {title}
      </h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Meeting Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Operational Record"}</span>
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

function MeetingCard({ meeting }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
              {meeting.id}
            </span>

            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
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

      <p className="mt-3 text-xs font-semibold text-amber-300">
        {titleCase(item.status || "pending")}
      </p>
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
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatDateTime(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-US", {
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
