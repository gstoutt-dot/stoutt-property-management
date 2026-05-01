// File: /portal/owner/messages.js

import Link from "next/link";

const conversations = [
  {
    id: "MSG-3012",
    subject: "Pool light service update",
    sender: "Stoutt Property Management",
    date: "May 1, 2026",
    status: "New",
    preview: "Your maintenance request has been reviewed and dispatched for vendor follow-up.",
  },
  {
    id: "MSG-2998",
    subject: "Compliance photo received",
    sender: "Compliance Review Team",
    date: "Apr 30, 2026",
    status: "Open",
    preview: "Thank you for submitting your correction photo. Management is reviewing the update.",
  },
  {
    id: "MSG-2941",
    subject: "April assessment confirmation",
    sender: "Accounting Department",
    date: "Apr 1, 2026",
    status: "Closed",
    preview: "Your April assessment payment has been received and posted to your account.",
  },
];

function statusClass(status) {
  if (status === "New") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  if (status === "Open") {
    return "border-blue-400/30 bg-blue-400/10 text-blue-300";
  }

  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

export default function OwnerMessages() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Messages</h1>
            <p className="mt-2 text-white/60">
              Communicate with management and track important account updates.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            + New Message
          </button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Unread</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Open Conversations</p>
            <p className="mt-2 text-4xl font-bold">2</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Average Response</p>
            <p className="mt-2 text-4xl font-bold">Same Day</p>
          </div>
        </div>

        {/* Communication Notice */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <h2 className="text-xl font-bold text-yellow-200">Management Communication</h2>
          <p className="mt-2 text-yellow-50/80">
            Messages are routed through Stoutt Property Management for review, tracking, and follow-up.
            This keeps homeowner communication organized and connected to the correct request, account, or compliance item.
          </p>
        </div>

        {/* Conversation List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Inbox</h2>
              <p className="mt-1 text-sm text-white/50">Recent messages and management responses.</p>
            </div>

            <div className="flex gap-3">
              <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                Filter
              </button>
              <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                Archive
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {conversations.map((message) => (
              <div key={message.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm text-white/50">{message.id}</p>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(message.status)}`}>
                        {message.status}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold">{message.subject}</h3>
                    <p className="mt-1 text-sm text-white/50">From: {message.sender} • {message.date}</p>
                    <p className="mt-3 max-w-3xl text-white/70">{message.preview}</p>
                  </div>

                  <div className="flex gap-3 lg:pt-2">
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                      View
                    </button>
                    <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
