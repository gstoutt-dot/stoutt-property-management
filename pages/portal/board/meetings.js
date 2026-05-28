import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

export default function BoardMeetings() {
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [meetingPackets, setMeetingPackets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  const [packetTitle, setPacketTitle] = useState("");
  const [agendaDraft, setAgendaDraft] = useState("");
  const [packetNotes, setPacketNotes] = useState("");
  const [creatingPacket, setCreatingPacket] = useState(false);
  const [uploadingPacketId, setUploadingPacketId] = useState("");

  useEffect(() => {
    loadMeetingData();
    loadMeetingRecords();
  }, []);

  async function loadMeetingData() {
    try {
      setLoading(true);
      setSystemMessage("");

      const packetResponse = await fetch(
        `/api/board/meeting-packets/list?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const packetPayload = await packetResponse.json();

      if (!packetResponse.ok || !packetPayload.success) {
        throw new Error(
          packetPayload.message || "Unable to load meeting packets."
        );
      }

      setMeetingPackets(packetPayload.packets || []);
    } catch (error) {
      console.error("Unable to load meeting packets:", error);
      setMeetingPackets([]);
      setSystemMessage(error.message || "Unable to load meeting packets.");
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
        throw new Error(
          payload.message || "Unable to load meeting operational records."
        );
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

  async function createMeetingPacket() {
    try {
      setCreatingPacket(true);
      setSystemMessage("");

      if (!packetTitle.trim()) {
        setSystemMessage("Meeting packet title is required.");
        return;
      }

      const response = await fetch("/api/board/meeting-packets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          title: packetTitle,
          agenda_text: agendaDraft,
          packet_notes: packetNotes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to create meeting packet.");
      }

      setPacketTitle("");
      setAgendaDraft("");
      setPacketNotes("");
      setSystemMessage("Meeting packet created successfully.");

      await loadMeetingData();
    } catch (error) {
      setSystemMessage(error.message || "Unable to create meeting packet.");
    } finally {
      setCreatingPacket(false);
    }
  }

  async function uploadPacketAttachment(packet, file) {
    if (!file || !packet?.id) return;

    try {
      setUploadingPacketId(packet.id);
      setSystemMessage("");

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const filePath = `${DEFAULT_ASSOCIATION_ID}/${packet.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("meeting-packets")
        .upload(filePath, file, {
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("meeting-packets")
        .getPublicUrl(filePath);

      const existingAttachments = Array.isArray(packet.attachments)
        ? packet.attachments
        : [];

      const nextAttachments = [
        ...existingAttachments,
        {
          file_name: file.name,
          file_path: filePath,
          file_url: publicData?.publicUrl || "",
          file_type: file.type || "file",
          uploaded_at: new Date().toISOString(),
        },
      ];

      const { error: updateError } = await supabase
        .from("board_meeting_packets")
        .update({
          attachments: nextAttachments,
          updated_at: new Date().toISOString(),
        })
        .eq("id", packet.id);

      if (updateError) throw updateError;

      setSystemMessage("Attachment uploaded to meeting packet.");
      await loadMeetingData();
    } catch (error) {
      console.error("Packet upload failed:", error);
      setSystemMessage(error.message || "Unable to upload attachment.");
    } finally {
      setUploadingPacketId("");
    }
  }

  async function notifyBoard(packet) {
  try {
    setSystemMessage("");

    const now = new Date().toISOString();

    const { error: packetError } = await supabase
      .from("board_meeting_packets")
      .update({
        status: "Sent to Board",
        board_notification_status: "Board Notified",
        sent_to_board_at: now,
        updated_at: now,
      })
      .eq("id", packet.id);

    if (packetError) {
      throw packetError;
    }

    const response = await fetch(
      "/api/board/meeting-packets/send-to-board",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          packet,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to route packet to board."
      );
    }

    setSystemMessage(
      "Meeting packet successfully routed to Board Approval Queue."
    );

    await loadMeetingData();
  } catch (error) {
    console.error("Board notification failed:", error);

    setSystemMessage(
      error.message || "Unable to send packet to board."
    );
  }
}

  const meetingPrepRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`
          .toLowerCase()
          .includes("meeting")
      ),
    [operationalRecords]
  );

  const packetRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`
          .toLowerCase()
          .includes("packet")
      ),
    [operationalRecords]
  );

  const motionRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${
          record.title || ""
        } ${record.description || ""}`.toLowerCase();

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
              Meeting Packets
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Prepare board meeting packets, draft agendas, upload packet
              attachments, and distribute meeting materials to the board.
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
            Board Packet Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Create, attach, download, and distribute meeting packets from one
            board-ready workspace.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            This page is now focused on real meeting packet preparation:
            agenda drafting, packet notes, attachment uploads, packet archive,
            PDF/print export, and board notification status.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Meeting Packets" value={meetingPackets.length} />
          <Metric
            label="Draft Packets"
            value={
              meetingPackets.filter(
                (packet) =>
                  String(packet.status || "").toLowerCase() === "draft"
              ).length
            }
          />
          <Metric
            label="Sent to Board"
            value={
              meetingPackets.filter(
                (packet) =>
                  String(packet.status || "").toLowerCase() ===
                  "sent to board"
              ).length
            }
          />
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
                Draft the agenda, add packet notes, save the packet, then upload
                supporting documents, spreadsheets, photos, or other board
                materials after the packet is created.
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
                disabled={creatingPacket}
                className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-4 font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
              >
                {creatingPacket ? "Creating..." : "Create Meeting Packet"}
              </button>
            </div>
          </div>
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
            {loading ? (
              <Empty message="Loading meeting packets..." />
            ) : meetingPackets.length === 0 ? (
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

                    <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-xs font-semibold text-blue-200">
                      {packet.board_notification_status || "Not Sent"}
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

BOARD NOTIFICATION:
${packet.board_notification_status || "Not Sent"}

AGENDA:
${packet.agenda_text || "No agenda provided."}

PACKET NOTES:
${packet.packet_notes || "No packet notes provided."}

ATTACHMENTS:
${
  Array.isArray(packet.attachments) && packet.attachments.length > 0
    ? packet.attachments
        .map((file) => `- ${file.file_name || "Attachment"}: ${file.file_url}`)
        .join("\n")
    : "No attachments uploaded."
}
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

                    <button
                      type="button"
                      onClick={() => notifyBoard(packet)}
                      className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20"
                    >
                      Send to Board
                    </button>

                    <label className="cursor-pointer rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-500/20">
                      {uploadingPacketId === packet.id
                        ? "Uploading..."
                        : "Upload Attachment"}

                      <input
                        type="file"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          uploadPacketAttachment(packet, file);
                          event.target.value = "";
                        }}
                      />
                    </label>
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

                  {Array.isArray(packet.attachments) &&
                    packet.attachments.length > 0 && (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm font-semibold text-blue-300">
                          Attachments
                        </p>

                        <div className="mt-4 grid gap-3">
                          {packet.attachments.map((file, index) => (
                            <a
                              key={`${file.file_name}-${index}`}
                              href={file.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                            >
                              {file.file_name || "Open Attachment"}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))
            )}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel
            title="Meeting Preparation"
            items={meetingPrepRecords}
          />
          <OperationalPanel title="Packet Records" items={packetRecords} />
          <OperationalPanel title="Motion / Vote Items" items={motionRecords} />
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Meeting Packet Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now supports packet creation, agenda drafting, packet
            attachments, packet downloading, PDF printing, and board notification
            status.
          </p>
        </div>
      </section>
    </main>
  );
}

function extractAgendaOnly(description = "") {
  const text = String(description || "");

  if (!text.includes("Agenda:")) {
    return text;
  }

  const agendaText =
    text.split("Agenda:")[1]?.split("Packet Notes:")[0] || "";

  return agendaText.trim();
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
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
            >
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Meeting Record"}
              </h4>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
  {extractAgendaOnly(item.description) || "No agenda provided."}
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
