import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const threads = [
  {
    id: "MSG-1001",
    subject: "Pool Light Repair Discussion",
    participants: ["President", "Treasurer", "Manager"],
    lastMessage: "Vendor quote looks reasonable. Ready to approve.",
    time: "15 min ago",
    unread: true,
  },
  {
    id: "MSG-1002",
    subject: "Fence ARC Request - Unit 301",
    participants: ["Secretary", "Director 1", "Manager"],
    lastMessage: "Need clarification on fence height.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "MSG-1003",
    subject: "April Financial Review",
    participants: ["Board Members", "Manager"],
    lastMessage: "Receivables trending down — good progress.",
    time: "Yesterday",
    unread: false,
  },
];

export default function BoardMessages() {
  const [activeThread, setActiveThread] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        {/* HEADER */}
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Communication</p>
              <h1 className={bosTheme.title}>Messages</h1>
              <p className={bosTheme.subtitle}>
                Communicate internally on approvals, financials, violations,
                and agenda items — all tied directly to system records.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/dashboard"
                className={bosTheme.secondaryButton}
              >
                Dashboard
              </Link>

              <Link
                href="/portal/board/notifications"
                className={bosTheme.primaryButton}
              >
                Notifications
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* THREAD LIST */}
          <div className={bosTheme.card}>
            <h2 className="text-lg font-semibold">Conversations</h2>

            <div className="mt-5 space-y-3">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setActiveThread(thread)}
                  className={`w-full text-left rounded-2xl border p-4 transition ${
                    activeThread?.id === thread.id
                      ? "border-yellow-400/40 bg-yellow-400/10"
                      : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">{thread.subject}</p>
                    {thread.unread && (
                      <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    {thread.participants.join(", ")}
                  </p>

                  <p className="mt-2 text-xs text-slate-500 truncate">
                    {thread.lastMessage}
                  </p>

                  <p className="mt-2 text-[10px] text-slate-600">
                    {thread.time}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE VIEW */}
          <div className={`${bosTheme.card} lg:col-span-2`}>
            {activeThread ? (
              <>
                <h2 className="text-lg font-semibold">
                  {activeThread.subject}
                </h2>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 space-y-3 max-h-[300px] overflow-y-auto">
                  <div className="text-sm text-slate-300">
                    <strong>Manager:</strong> Vendor quote uploaded for review.
                  </div>

                  <div className="text-sm text-slate-300">
                    <strong>President:</strong> Looks reasonable. Any concerns?
                  </div>

                  <div className="text-sm text-slate-300">
                    <strong>Treasurer:</strong> Budget impact is minimal.
                  </div>
                </div>

                {/* INPUT */}
                <div className="mt-5">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full min-h-[100px] rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none focus:border-yellow-400/40"
                    placeholder="Write a message..."
                  />

                  <div className="mt-4 flex justify-end">
                    <button className={bosTheme.goldButton}>
                      Send Message
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                Select a conversation to view messages
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
