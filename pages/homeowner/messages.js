import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeownerMessages() {
  const [messages, setMessages] = useState([]);
const [loadingMessages, setLoadingMessages] = useState(true);
const [selectedCategory, setSelectedCategory] = useState("All Messages");
const filteredMessages =
  selectedCategory === "All Messages"
    ? messages
    : messages.filter((message) =>
        String(
          message.category ||
            message.notification_type ||
            message.type ||
            ""
        )
          .toLowerCase()
          .includes(
            selectedCategory
              .replace("&", "")
              .replace("Notices", "")
              .replace("Updates", "")
              .replace("Messages", "")
              .trim()
              .toLowerCase()
          )
      );

useEffect(() => {
  async function loadMessages() {
    try {
      setLoadingMessages(true);

      const response = await fetch(
        "/api/homeowner/messages/list?associationId=622aaf96-ae1c-4f98-b0b2-00cc9178c2a2&limit=25"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load messages.");
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Unable to load homeowner messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }

  loadMessages();
}, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Messages & Notifications
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                View association announcements, service updates, meeting
                reminders, direct messages, and important homeowner notices.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
  <div className="grid gap-6 md:grid-cols-4">
    {[
      [
        "Unread",
        String(
          messages.filter(
            (message) => !message.read_at && message.status !== "Read"
          ).length
        ),
      ],
      [
        "Announcements",
        String(
          messages.filter((message) =>
            String(
              message.category ||
                message.notification_type ||
                message.type ||
                ""
            )
              .toLowerCase()
              .includes("announcement")
          ).length
        ),
      ],
      [
        "Service Updates",
        String(
          messages.filter((message) =>
            String(
              message.category ||
                message.notification_type ||
                message.type ||
                ""
            )
              .toLowerCase()
              .includes("service")
          ).length
        ),
      ],
      [
        "Direct Messages",
        String(
          messages.filter((message) =>
            String(
              message.category ||
                message.notification_type ||
                message.type ||
                ""
            )
              .toLowerCase()
              .includes("direct")
          ).length
        ),
      ],
    ].map(([label, value]) => (
      <div
        key={label}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <p className="text-sm text-slate-400">{label}</p>
        <div className="mt-3 text-4xl font-bold text-yellow-400">
          {value}
        </div>
      </div>
    ))}
  </div>
</section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-yellow-400">
              Message Center
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Recent Notices</h2>
          </div>

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
              placeholder="Search messages, notices, meetings, or updates..."
            />
          </div>

          <div className="space-y-5">
  {loadingMessages ? (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
      Loading homeowner messages...
    </div>
  ) : filteredMessages.length > 0 ? (
    filteredMessages.map((message) => (
      <div
        key={message.id}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">
              {(message.category ||
                message.notification_type ||
                message.type ||
                "Homeowner Notice")}{" "}
              • {String(message.id || "").slice(0, 8).toUpperCase()}
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {message.title ||
                message.subject ||
                "Homeowner Notification"}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {message.created_at
                ? new Date(message.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recently"}
            </p>
          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {message.read_at ? "Read" : message.status || "Unread"}
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
          {message.message ||
            message.body ||
            message.preview ||
            message.description ||
            "A homeowner notification is available."}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
            Open Message
          </button>

          <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
            Mark Read
          </button>

          <Link
            href="/homeowner/ava"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300"
          >
            Ask Ava
          </Link>
        </div>
      </div>
    ))
  ) : (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
      No homeowner messages are available for this category.
    </div>
  )}
</div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Message Categories
            </p>

            <div className="mt-5 space-y-3">
              {[
  "All Messages",
  "Association Announcements",
  "Board Meeting Notices",
  "Service & Maintenance Updates",
  "Compliance Notices",
  "Architectural Review Updates",
  "Financial Notices",
  "Direct Messages",
].map((category) => (
  <button
    key={category}
    type="button"
    onClick={() => setSelectedCategory(category)}
    className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
      selectedCategory === category
        ? "border-yellow-400/60 bg-yellow-400/10 text-yellow-300"
        : "border-white/10 text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
    }`}
  >
    {category}
  </button>
))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ask Ava About a Notice
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Need help understanding a message?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can summarize announcements, explain what action may be
              needed, locate related documents, and help homeowners understand
              deadlines or next steps.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Notification Preferences
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Email notifications enabled",
                "Text alerts for urgent notices",
                "Maintenance updates enabled",
                "Meeting reminders enabled",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
              Manage Preferences
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
