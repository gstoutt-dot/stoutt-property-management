import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed", "reviewed"];

export default function BoardMessages() {
  const [messages, setMessages] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadMessages();
    loadMessageRecords();

    const interval = setInterval(() => {
      loadMessages();
      loadMessageRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadMessages() {
    try {
      setLoadingMessages(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_board_messages")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error("Unable to load board messages:", error);
      setMessages([]);
      setSystemMessage(error.message || "Unable to load board messages.");
    } finally {
      setLoadingMessages(false);
    }
  }

  async function loadMessageRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load message operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("message") ||
            combined.includes("communication") ||
            combined.includes("notice") ||
            combined.includes("escalation") ||
            combined.includes("owner") ||
            combined.includes("board update") ||
            combined.includes("manager update") ||
            combined.includes("announcement"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load message operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  async function markReviewed(message) {
    if (!message?.id) return;

    const { error } = await supabase
      .from("association_board_messages")
      .update({
        status: "reviewed",
        reviewed: true,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", message.id);

    if (error) {
      console.error("Unable to mark board message reviewed:", error);
      setSystemMessage("Unable to mark message reviewed.");
      return;
    }

    await loadMessages();
    setSystemMessage("Message marked reviewed.");
  }

  const newMessages = useMemo(
    () =>
      messages.filter(
        (message) =>
          String(message.status || "").toLowerCase() === "new" ||
          !message.reviewed
      ),
    [messages]
  );

  const escalations = useMemo(
    () =>
      messages.filter((message) =>
        String(message.message_type || "").toLowerCase().includes("escalation")
      ),
    [messages]
  );

  const urgentMessages = useMemo(
    () =>
      messages.filter((message) =>
        ["high", "urgent", "critical"].includes(
          String(message.priority || "").toLowerCase()
        )
      ),
    [messages]
  );

  const escalationRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("escalation") || combined.includes("urgent");
      }),
    [operationalRecords]
  );

  const ownerRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("owner") || combined.includes("resident");
      }),
    [operationalRecords]
  );

  const noticeRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("notice") ||
          combined.includes("communication") ||
          combined.includes("announcement")
        );
      }),
    [operationalRecords]
  );

  const messageTypes = useMemo(() => {
    const types = messages
      .map((message) =>
        String(message.message_type || "board_message").toLowerCase()
      )
      .filter(Boolean);

    return ["all", ...Array.from(new Set(types))];
  }, [messages]);

  const filteredMessages = useMemo(() => {
    if (filter === "all") return messages;

    return messages.filter(
      (message) =>
        String(message.message_type || "board_message").toLowerCase() === filter
    );
  }, [messages, filter]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Board Messages
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Board communications, owner escalations, manager updates,
              operational notices, and association message records.
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
            Distributed Communication Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board messages now combine direct communications with centralized operational message records.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Owner escalations, manager updates, operational notices, board communications,
            and association announcements can now flow through Admin Operations Intake
            while preserving live board message visibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Special Project"
              )}&return_path=${encodeURIComponent(
                "/board/messages"
              )}&return_label=${encodeURIComponent("Board Messages")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Message Record
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Action Items
            </Link>

            <Link
              href="/board/search-center"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Search Center
            </Link>

            <Link
              href="/portal/board/meetings"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meetings
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Messages" value={messages.length} />
          <Metric label="New / Unreviewed" value={newMessages.length} />
          <Metric label="Owner Escalations" value={escalations.length + escalationRecords.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Escalation Records" items={escalationRecords} />
          <OperationalPanel title="Owner / Resident Records" items={ownerRecords} />
          <OperationalPanel title="Notices / Communications" items={noticeRecords} />
        </div>

        <section className="mt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Live Message Queue
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Association Communications
              </h2>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-full border border-amber-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-300 outline-none"
            >
              {messageTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Messages" : titleCase(type)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5">
            {loadingMessages ? (
              <Empty message="Loading board messages..." />
            ) : filteredMessages.length === 0 ? (
              <Empty message="No board messages are currently available for this view." />
            ) : (
              filteredMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onReviewed={markReviewed}
                />
              ))
            )}
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Communication Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now preserves board message visibility while adding distributed
            communication records from Admin Operations Intake.
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
                {item.title || "Untitled Message Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Message Record"}</span>
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

function MessageCard({ message, onReviewed }) {
  const reviewed =
    Boolean(message.reviewed) ||
    String(message.status || "").toLowerCase() === "reviewed";

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold">
              {message.subject || "Board Message"}
            </h3>

            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
              {titleCase(message.status || "new")}
            </span>

            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {titleCase(message.message_type || "board_message")}
            </span>

            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {titleCase(message.priority || "normal")}
            </span>
          </div>

          <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-4">
            <p>
              <span className="text-slate-500">From:</span>{" "}
              {message.sender_name || "Association"}
            </p>

            <p>
              <span className="text-slate-500">Role:</span>{" "}
              {message.sender_role || "Board"}
            </p>

            <p>
              <span className="text-slate-500">Received:</span>{" "}
              {formatDate(message.created_at)}
            </p>

            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {titleCase(message.status || "new")}
            </p>
          </div>

          <p className="mt-5 max-w-4xl leading-7 text-slate-300">
            {message.message_body || "No message body available."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {!reviewed && (
            <button
              onClick={() => onReviewed(message)}
              className="rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              Mark Reviewed
            </button>
          )}

          {reviewed && (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300">
              Reviewed
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

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
