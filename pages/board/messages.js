import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import bosTheme from "../../styles/bos-theme";

const DEFAULT_ASSOCIATION_ID =
  typeof window !== "undefined"
    ? localStorage.getItem("spm_selected_association_id") || ""
    : "";

export default function BoardMessages() {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  const [form, setForm] = useState({
    subject: "",
    message_body: "",
    message_type: "general",
    sent_by_name: "Admin",
    sent_by_role: "admin",
  });

    useEffect(() => {
    loadMessages();

        const interval = setInterval(() => {
      loadMessages({ silent: true });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

    async function loadMessages({ silent = false } = {}) {
    try {
      if (!silent) setLoading(true);
      if (!silent) setSystemMessage("");

      if (!DEFAULT_ASSOCIATION_ID) {
  setSystemMessage("No association selected.");
  return;
}

      const response = await fetch(
        `/api/board/messages/list?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load board messages.");
      }

      setMessages(payload.messages || []);
    } catch (error) {
      console.error("Unable to load board messages:", error);
      setSystemMessage(error.message || "Unable to load board messages.");
        } finally {
      if (!silent) setLoading(false);
    }
  }

  async function deleteMessage(messageId) {
  if (!messageId) return;

  const confirmed = window.confirm("Delete this board message permanently?");
  if (!confirmed) return;

  try {
    setSystemMessage("");

    if (!DEFAULT_ASSOCIATION_ID) {
  setSystemMessage("No association selected.");
  return;
}

        const response = await fetch(
      `/api/board/messages/delete?id=${messageId}&association_id=${encodeURIComponent(
        DEFAULT_ASSOCIATION_ID
      )}`,
      {
        method: "DELETE",
      }
    );

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Unable to delete board message.");
    }

    setMessages((current) =>
      current.filter((message) => message.id !== messageId)
    );

    if (activeMessage?.id === messageId) {
      setActiveMessage(null);
    }

    setSystemMessage("Board message deleted.");
  } catch (error) {
    console.error("Unable to delete board message:", error);
    setSystemMessage(error.message || "Unable to delete board message.");
  }
}

  async function sendMessage(event) {
    event.preventDefault();

    try {
      setSending(true);
      setSystemMessage("");

      const response = await fetch("/api/board/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
                body: JSON.stringify({
  association_id: DEFAULT_ASSOCIATION_ID,
  subject: form.subject.trim(),
  message_body: form.message_body.trim(),
  message_type: form.message_type,
  sent_by_name: form.sent_by_name || "Admin",
  sent_by_role: form.sent_by_role || "admin",
  sent_to_role: "board",
  priority: "normal",
}),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send board message.");
      }

      setForm({
        subject: "",
        message_body: "",
        message_type: "general",
        sent_by_name: "Admin",
        sent_by_role: "admin",
      });

      await loadMessages();
      setActiveMessage(payload.message);
      setSystemMessage("Board message sent successfully.");
    } catch (error) {
      console.error("Unable to send board message:", error);
      setSystemMessage(error.message || "Unable to send board message.");
    } finally {
      setSending(false);
    }
  }

    async function sendReplyToMessage(event) {
    event.preventDefault();

    if (!activeMessage?.id || !replyBody.trim()) {
      setSystemMessage("Reply message is required.");
      return;
    }

    try {
      setSendingReply(true);
      setSystemMessage("");

      const response = await fetch("/api/board/messages/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: activeMessage.id,
          reply_body: replyBody.trim(),
          replied_by: "Admin / Management",
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send reply.");
      }

      setReplyBody("");

      await loadMessages();

      setActiveMessage(payload.message);

      setSystemMessage("Reply sent to board.");
    } catch (error) {
      console.error("Unable to send reply:", error);
      setSystemMessage(error.message || "Unable to send reply.");
    } finally {
      setSendingReply(false);
    }
  }

  const unreadCount = useMemo(
    () =>
      messages.filter((message) => {
        const status = String(message.status || "sent").toLowerCase();
        return status === "sent" || status === "unread";
      }).length,
    [messages]
  );

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Communication Center</p>
              <h1 className={bosTheme.title}>Board Messages</h1>
              <p className={bosTheme.subtitle}>
                Internal Admin and Management messages for the Board. Use this
                space for operational updates, meeting follow-ups, financial
                review notes, compliance questions, and board coordination.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/manager/dashboard" className={bosTheme.secondaryButton}>
  Dashboard
</Link>

              <Link href="/board" className={bosTheme.primaryButton}>
                Board Dashboard
              </Link>
            </div>
          </div>
        </header>

        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <Metric label="Board Messages" value={messages.length} />
          <Metric label="Unread / Sent" value={unreadCount} />
          <Metric label="Message Channel" value="Internal" />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className={bosTheme.card}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Message Inbox</h2>

              <button
                onClick={loadMessages}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
              >
                Refresh
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <Empty message="Loading board messages..." />
              ) : messages.length === 0 ? (
                <Empty message="No board messages have been sent yet." />
              ) : (
                messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setActiveMessage(message)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      activeMessage?.id === message.id
                        ? "border-yellow-400/40 bg-yellow-400/10"
                        : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        {message.subject || "Board Message"}
                      </p>

                      <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2 py-1 text-[10px] font-semibold text-yellow-300">
                        {formatStatus(message.status || "sent")}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      From: {message.sent_by_name || "Admin"} ·{" "}
                      {formatStatus(message.sent_by_role || "admin")}
                    </p>

                    <p className="mt-2 truncate text-xs text-slate-500">
                      {message.message_body || "No message body."}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-3">
  <p className="text-[10px] text-slate-600">
    {formatDateTime(message.created_at)}
  </p>

  <button
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      deleteMessage(message.id);
    }}
    className="rounded-lg border border-red-400/30 bg-red-500/10 px-2 py-1 text-[10px] font-semibold text-red-200 hover:bg-red-500/20"
  >
    Delete
  </button>
</div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className={`${bosTheme.card} lg:col-span-2`}>
            <div className="grid gap-6 xl:grid-cols-2">
              <form onSubmit={sendMessage}>
                <h2 className="text-lg font-semibold">
                  Send Message to Board
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  This is the internal management-to-board channel. Messages sent
                  here are not homeowner notifications.
                </p>

                <div className="mt-5 space-y-4">
                  <input
                    value={form.subject}
                    onChange={(event) =>
                      setForm({ ...form, subject: event.target.value })
                    }
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none focus:border-yellow-400/40"
                    placeholder="Subject"
                  />

                  <select
                    value={form.message_type}
                    onChange={(event) =>
                      setForm({ ...form, message_type: event.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none focus:border-yellow-400/40"
                  >
                    <option value="general">General Update</option>
                    <option value="financial">Financial Review</option>
                    <option value="meeting">Meeting Follow-up</option>
                    <option value="compliance">Compliance</option>
                    <option value="vendor">Vendor / Contract</option>
                    <option value="urgent">Urgent Board Attention</option>
                  </select>

                  <textarea
                    value={form.message_body}
                    onChange={(event) =>
                      setForm({ ...form, message_body: event.target.value })
                    }
                    required
                    className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none focus:border-yellow-400/40"
                    placeholder="Write an internal message to the board..."
                  />

                  <button
                    disabled={sending}
                    className={bosTheme.goldButton}
                  >
                    {sending ? "Sending..." : "Send Board Message"}
                  </button>
                </div>
              </form>

              <div>
                <h2 className="text-lg font-semibold">Selected Message</h2>

                {activeMessage ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{formatStatus(activeMessage.message_type || "general")}</Badge>
                      <Badge>{formatStatus(activeMessage.status || "sent")}</Badge>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold">
                      {activeMessage.subject}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      From {activeMessage.sent_by_name || "Admin"} ·{" "}
                      {formatDateTime(activeMessage.created_at)}
                    </p>

                                                            <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                      {activeMessage.message_body}
                    </p>

                    {activeMessage.reply_body && (
                      <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                          Reply
                        </p>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">
                          {activeMessage.reply_body}
                        </p>

                        <p className="mt-3 text-xs text-slate-500">
                          Replied by {activeMessage.replied_by || "Board Member"} ·{" "}
                          {formatDateTime(activeMessage.replied_at)}
                        </p>
                      </div>
                    )}

                    <form onSubmit={sendReplyToMessage} className="mt-6">
                      <p className="text-sm font-semibold text-yellow-300">
                        Send Reply
                      </p>

                      <textarea
                        value={replyBody}
                        onChange={(event) => setReplyBody(event.target.value)}
                        placeholder="Type management reply to board..."
                        rows={4}
                        className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
                      />

                      <button
                        type="submit"
                        disabled={sendingReply}
                        className="mt-3 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 disabled:opacity-50"
                      >
                        {sendingReply ? "Sending Reply..." : "Send Reply to Board"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm text-slate-500">
                    Select a message to view details.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className={bosTheme.card}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
      {children}
    </span>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

function formatStatus(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDateTime(value) {
  if (!value) return "No date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "No date";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
