// File: /portal/owner/requests.js

import Link from "next/link";

const requests = [
  {
    id: "REQ-1024",
    type: "Maintenance",
    title: "Pool light is out",
    status: "In Progress",
    date: "May 1, 2026",
  },
  {
    id: "REQ-1018",
    type: "Architectural",
    title: "Patio upgrade request",
    status: "Under Review",
    date: "Apr 28, 2026",
  },
  {
    id: "REQ-1009",
    type: "General",
    title: "Gate access issue",
    status: "Completed",
    date: "Apr 20, 2026",
  },
];

export default function OwnerRequests() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">My Requests</h1>
            <p className="mt-2 text-white/60">Submit and track your service and community requests.</p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            + New Request
          </button>
        </div>

        {/* Request List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold">Active & Recent Requests</h2>

          <div className="mt-6 space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-yellow-400 transition">
                <div>
                  <p className="text-sm text-white/50">{req.id} • {req.type}</p>
                  <h3 className="text-lg font-semibold mt-1">{req.title}</h3>
                  <p className="text-white/50 text-sm mt-1">Submitted: {req.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-yellow-400/10 border border-yellow-400/30 text-yellow-300">
                    {req.status}
                  </span>
                  <button className="text-sm text-white/70 hover:text-white transition">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
