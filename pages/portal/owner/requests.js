// File: /portal/owner/requests.js

import Link from "next/link";

const requests = [
  {
    id: "REQ-1024",
    type: "Maintenance",
    title: "Pool light is out",
    status: "In Progress",
    date: "May 1, 2026",
    nextStep: "Vendor dispatch pending manager verification",
  },
  {
    id: "REQ-1018",
    type: "Architectural",
    title: "Patio upgrade request",
    status: "Under Review",
    date: "Apr 28, 2026",
    nextStep: "Management completeness review",
  },
  {
    id: "REQ-1009",
    type: "General",
    title: "Gate access issue",
    status: "Completed",
    date: "Apr 20, 2026",
    nextStep: "Closed after owner confirmation",
  },
];

function statusClass(status) {
  if (status === "In Progress") {
    return "border-blue-400/30 bg-blue-400/10 text-blue-300";
  }

  if (status === "Under Review") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

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
            <p className="mt-2 text-white/60">
              Submit and track maintenance, general, amenity, architectural, and account-related requests.
            </p>
          </div>

          <Link
            href="/portal/owner/new-request"
            className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
          >
            + New Request
          </Link>
        </div>

        {/* Flow Notice */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Owner → Manager Workflow</p>
          <h2 className="mt-3 text-2xl font-bold text-yellow-100">Every request starts with management review</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            Owner submissions are routed to the Manager Portal first so the property manager can verify details,
            determine responsibility, dispatch vendors when appropriate, or prepare items for board approval.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Open Requests</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">2</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">In Progress</p>
            <p className="mt-2 text-4xl font-bold">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Completed</p>
            <p className="mt-2 text-4xl font-bold">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Avg Response</p>
            <p className="mt-2 text-4xl font-bold">Same Day</p>
          </div>
        </div>

        {/* Request List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Active & Recent Requests</h2>
              <p className="mt-1 text-sm text-white/50">Requests submitted from your owner account.</p>
            </div>

            <Link
              href="/portal/owner/new-request"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition"
            >
              Submit Another
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-white/50">{req.id} • {req.type} • Submitted {req.date}</p>
                    <h3 className="mt-1 text-xl font-semibold">{req.title}</h3>
                    <p className="mt-3 text-sm text-white/60">
                      <span className="text-white/40">Next Step:</span> {req.nextStep}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(req.status)}`}>
                      {req.status}
                    </span>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                      View Details
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

