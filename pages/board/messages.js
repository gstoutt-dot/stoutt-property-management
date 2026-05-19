import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardMessages() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 10000);

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

      if (error) {
        throw error;
      }

      setMessages(data || []);
    } catch (error) {
      console.error("Unable to load board messages:", error);
      setMessages([]);
      setSystemMessage(error.message || "Unable to load board messages.");
    } finally {
      setLoadingMessages(false);
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
        String(message.message_type || "")
          .toLowerCase()
          .includes("escalation")
      ),
    [messages]
  );

  const aiSummaries = useMemo(
    () =>
      messages.filter((message) =>
        String(message.message_type || "")
          .toLowerCase()
          .includes("ai")
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
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Board Communications Center
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Board Messages
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
            Communications Queue
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Review board communications, owner escalations, manager updates, and operational notices.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Board members can monitor association communications, management
            updates, owner escalations, vendor notices, and Ava summaries from
            one live message center.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Messages" value={messages.length} />
          <Metric label="New / Unreviewed" value={newMessages.length} />
          <Metric label="Owner Escalations" value={escalations.length} />
          <Metric label="Urgent Items" value={urgentMessages.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Live Message Queue
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Association Communications
            </h2>
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-yellow-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-yellow-300 outline-none"
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
    </main>
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

            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
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

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
