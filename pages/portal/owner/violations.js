// File: /portal/owner/violations.js

import Link from "next/link";

const violations = [
  {
    id: "VIO-2041",
    category: "Exterior Maintenance",
    title: "Trash receptacle visible from street",
    status: "Open",
    dateIssued: "Apr 29, 2026",
    correctionDue: "May 10, 2026",
    action: "Submit photo after correction",
  },
  {
    id: "VIO-2017",
    category: "Landscaping",
    title: "Palm fronds require trimming",
    status: "Pending Verification",
    dateIssued: "Apr 18, 2026",
    correctionDue: "Apr 30, 2026",
    action: "Manager review in progress",
  },
  {
    id: "VIO-1988",
    category: "Parking",
    title: "Guest vehicle parked overnight without registration",
    status: "Closed",
    dateIssued: "Mar 25, 2026",
    correctionDue: "Apr 3, 2026",
    action: "Resolved",
  },
];

function statusClass(status) {
  if (status === "Open") {
    return "border-red-400/30 bg-red-400/10 text-red-300";
  }

  if (status === "Pending Verification") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

export default function OwnerViolations() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Violations & Compliance</h1>
            <p className="mt-2 text-white/60">
              Review notices, correction deadlines, and compliance status.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            Submit Compliance Update
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Open Notices</p>
            <p className="mt-2 text-4xl font-bold">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Pending Verification</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Closed This Year</p>
            <p className="mt-2 text-4xl font-bold">4</p>
          </div>
        </div>

        {/* Educational Notice */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <h2 className="text-xl font-bold text-yellow-200">Compliance Support</h2>
          <p className="mt-2 text-yellow-50/80">
            Notices are intended to help maintain community standards. If you have corrected an item,
            submit an update with a photo or short explanation so management can review and close the matter.
          </p>
        </div>

        {/* Violations List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Violation History</h2>
              <p className="mt-1 text-sm text-white/50">Current and past compliance items for your property.</p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
              Download History
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {violations.map((violation) => (
              <div key={violation.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-white/50">{violation.id} • {violation.category}</p>
                    <h3 className="mt-1 text-xl font-semibold">{violation.title}</h3>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Issued</p>
                        <p className="mt-1 text-sm text-white/80">{violation.dateIssued}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Correction Due</p>
                        <p className="mt-1 text-sm text-white/80">{violation.correctionDue}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Next Step</p>
                        <p className="mt-1 text-sm text-white/80">{violation.action}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(violation.status)}`}>
                      {violation.status}
                    </span>

                    <div className="flex gap-3">
                      <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                        View Notice
                      </button>
                      <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                        Respond
                      </button>
                    </div>
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
