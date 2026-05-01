// File: /portal/owner/announcements.js

import Link from "next/link";

const announcements = [
  {
    id: "ANN-4018",
    title: "Pool Light Repair Scheduled",
    category: "Maintenance",
    date: "May 1, 2026",
    priority: "Important",
    message:
      "A vendor has been scheduled to inspect and repair the pool light issue. Access to the pool area may be limited during service.",
  },
  {
    id: "ANN-4011",
    title: "May Board Meeting Reminder",
    category: "Board Meeting",
    date: "Apr 29, 2026",
    priority: "Notice",
    message:
      "The May board meeting will be held in the clubhouse. Owners may attend during the open session portion of the meeting.",
  },
  {
    id: "ANN-4004",
    title: "Landscape Service Update",
    category: "Landscaping",
    date: "Apr 24, 2026",
    priority: "General",
    message:
      "Routine landscape service has been adjusted due to recent weather. Trimming and cleanup will resume on the next scheduled service day.",
  },
];

function priorityClass(priority) {
  if (priority === "Important") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  if (priority === "Notice") {
    return "border-blue-400/30 bg-blue-400/10 text-blue-300";
  }

  return "border-white/10 bg-white/5 text-white/70";
}

export default function OwnerAnnouncements() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Announcements</h1>
            <p className="mt-2 text-white/60">
              Stay informed with community notices, maintenance updates, and meeting reminders.
            </p>
          </div>

          <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition">
            Notification Settings
          </button>
        </div>

        {/* Hero Notice */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Latest Important Update</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Pool Light Repair Scheduled</h2>
          <p className="mt-3 max-w-3xl text-yellow-50/80">
            A vendor has been scheduled to inspect and repair the pool light issue. Management will post a follow-up once service is completed.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Unread Updates</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">2</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">This Month</p>
            <p className="mt-2 text-4xl font-bold">6</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Alert Preference</p>
            <p className="mt-2 text-4xl font-bold">Email</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white/50">
              Search announcements...
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white/50">
              Category: All
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white/50">
              Priority: All
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Community Updates</h2>
              <p className="mt-1 text-sm text-white/50">Recent announcements from management and the association.</p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
              Mark All Read
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {announcements.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm text-white/50">{item.id} • {item.category} • {item.date}</p>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityClass(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 max-w-4xl text-white/70">{item.message}</p>
                  </div>

                  <div className="flex gap-3 lg:pt-2">
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                      View
                    </button>
                    <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                      Acknowledge
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

