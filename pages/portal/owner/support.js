// File: /portal/owner/support.js

import Link from "next/link";

const tickets = [
  {
    id: "SUP-9001",
    subject: "Question about late fee",
    status: "Open",
    date: "May 1, 2026",
  },
  {
    id: "SUP-8992",
    subject: "Clarification on pool rules",
    status: "Closed",
    date: "Apr 28, 2026",
  },
];

function statusClass(status) {
  if (status === "Open") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }
  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

export default function OwnerSupport() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Support</h1>
            <p className="mt-2 text-white/60">
              Submit questions and track support requests with management.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            + New Support Ticket
          </button>
        </div>

        {/* Help Box */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <h2 className="text-xl font-bold text-yellow-200">Need Help?</h2>
          <p className="mt-2 text-yellow-50/80">
            Submit a support request and management will respond promptly. Your message will be tracked and routed to the correct department.
          </p>
        </div>

        {/* Tickets */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-white/50">{ticket.id}</p>
                  <h3 className="mt-1 text-lg font-semibold">{ticket.subject}</h3>
                  <p className="text-sm text-white/50 mt-1">{ticket.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
