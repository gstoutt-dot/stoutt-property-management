// File: /portal/owner/notifications.js

import Link from "next/link";

const notifications = [
  {
    id: "NTF-8001",
    title: "Maintenance Request Updated",
    message: "Your pool light request has been dispatched to a vendor.",
    date: "May 1, 2026",
    type: "Update",
    read: false,
  },
  {
    id: "NTF-7994",
    title: "Payment Posted",
    message: "Your May assessment payment has been successfully processed.",
    date: "May 1, 2026",
    type: "Payment",
    read: true,
  },
  {
    id: "NTF-7980",
    title: "New Community Announcement",
    message: "Pool light repair has been scheduled for this week.",
    date: "Apr 30, 2026",
    type: "Announcement",
    read: false,
  },
];

function typeClass(type) {
  if (type === "Update") return "text-blue-300";
  if (type === "Payment") return "text-emerald-300";
  return "text-yellow-300";
}

export default function OwnerNotifications() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Notifications</h1>
            <p className="mt-2 text-white/60">
              Real-time updates from your community and account activity.
            </p>
          </div>

          <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition">
            Mark All as Read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`rounded-2xl border p-5 transition ${
                note.read
                  ? "border-white/10 bg-slate-900/50"
                  : "border-yellow-400/30 bg-yellow-400/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-white/50">{note.id}</p>
                    <span className={`text-xs font-semibold ${typeClass(note.type)}`}>
                      {note.type}
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold">{note.title}</h3>
                  <p className="mt-2 text-white/70">{note.message}</p>
                  <p className="mt-2 text-sm text-white/40">{note.date}</p>
                </div>

                <div className="flex gap-3">
                  <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                    View
                  </button>
                  {!note.read && (
                    <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
