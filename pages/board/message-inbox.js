import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import bosTheme from "../../styles/bos-theme";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardMessageInbox() {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [newMessage, setNewMessage] = useState({
    subject: "",
    message_body: "",
    message_type: "general_question",
    priority: "normal",
    sent_by_name: "Board Member",
  });

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      setLoading(true);
      setSystemMessage("");

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

      if (!activeMessage && payload.messages?.length > 0) {
        setActiveMessage(payload.messages[0]);
      }
    } catch (error) {
      console.error("Unable to load board inbox:", error);
      setSystemMessage(error.message || "Unable to load board inbox.");
    } finally {
      setLoading(false);
    }
  }

    function updateNewMessage(field, value) {
    setNewMessage((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function sendMessageToManagement(event) {
    event.preventDefault();

    if (!newMessage.subject.trim() || !newMessage.message_body.trim()) {
      setSystemMessage("Subject and message are required.");
      return;
    }

    try {
      setSendingMessage(true);
      setSystemMessage("");

      const response = await fetch("/api/board/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          subject: newMessage.subject.trim(),
          message_body: newMessage.message_body.trim(),
          sent_by_name: newMessage.sent_by_name || "Board Member",
          sent_by_role: "board",
          sent_to_role: "management",
          message_type: newMessage.message_type,
          priority: newMessage.priority,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send message.");
      }

      setNewMessage({
        subject: "",
        message_body: "",
        message_type: "general_question",
        priority: "normal",
        sent_by_name: "Board Member",
      });

      await loadMessages();

      setSystemMessage("Message sent to management and administration.");
    } catch (error) {
      console.error("Unable to send board message:", error);
      setSystemMessage(error.message || "Unable to send board message.");
    } finally {
      setSendingMessage(false);
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
          replied_by: "Board Member",
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send reply.");
      }

      setReplyBody("");

      await loadMessages();

      setActiveMessage(payload.message);

      setSystemMessage("Reply sent.");
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
              <h1 className={bosTheme.title}>Board Message Inbox</h1>
              <p className={bosTheme.subtitle}>
                Internal messages from management and administration for board
                members. Use this page to review operational updates, meeting
                follow-ups, financial review notes, and board coordination items.
              </p>
            </div>

            <Link href="/board" className={bosTheme.primaryButton}>
              Board Dashboard
            </Link>
          </div>
        </header>

        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}

                <section className="mb-6 grid gap-4 md:grid-cols-3">
          <Metric label="Messages" value={messages.length} />
          <Metric label="Unread / New" value={unreadCount} />
          <Metric label="Channel" value="Board / Management" />
        </section>

                <section className="mb-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Contact Management
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Send Message to Manager
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Send questions, concerns, requests, or board follow-up items directly to management. Administration will receive the message as part of the permanent operational record.
          </p>

          <form onSubmit={sendMessageToManagement} className="mt-5 grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <input
                value={newMessage.sent_by_name}
                onChange={(event) =>
                  updateNewMessage("sent_by_name", event.target.value)
                }
                placeholder="Your name or board role..."
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
              />

              <select
                value={newMessage.message_type}
                onChange={(event) =>
                  updateNewMessage("message_type", event.target.value)
                }
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50"
              >
                <option value="general_question">General Question</option>
                <option value="financial_question">Financial Question</option>
                <option value="vendor_concern">Vendor Concern</option>
                <option value="owner_concern">Owner Concern</option>
                <option value="insurance_question">Insurance Question</option>
                <option value="legal_question">Legal Question</option>
                <option value="emergency_issue">Emergency Issue</option>
                <option value="other">Other</option>
              </select>

              <select
                value={newMessage.priority}
                onChange={(event) =>
                  updateNewMessage("priority", event.target.value)
                }
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <input
              value={newMessage.subject}
              onChange={(event) =>
                updateNewMessage("subject", event.target.value)
              }
              placeholder="Subject..."
              className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
            />

            <textarea
              value={newMessage.message_body}
              onChange={(event) =>
                updateNewMessage("message_body", event.target.value)
              }
              placeholder="Type your message to management..."
              rows={5}
              className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
            />

            <button
              type="submit"
              disabled={sendingMessage}
              className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 disabled:opacity-50"
            >
              {sendingMessage ? "Sending..." : "Send to Management"}
            </button>
          </form>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className={bosTheme.card}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Inbox</h2>

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
                <Empty message="No board messages have been received yet." />
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
                      From: {message.sent_by_name || "Admin"}
                    </p>

                    <p className="mt-2 truncate text-xs text-slate-500">
                      {message.message_body || "No message body."}
                    </p>

                    <p className="mt-2 text-[10px] text-slate-600">
                      {formatDateTime(message.created_at)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className={`${bosTheme.card} lg:col-span-2`}>
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
                      Replied by {activeMessage.replied_by || "Management"} ·{" "}
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
                    placeholder="Type your reply..."
                    rows={4}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
                  />

                  <button
                    type="submit"
                    disabled={sendingReply}
                    className="mt-3 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 disabled:opacity-50"
                  >
                    {sendingReply ? "Sending Reply..." : "Send Reply"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-5 flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm text-slate-500">
                Select a message to view details.
              </div>
            )}
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
