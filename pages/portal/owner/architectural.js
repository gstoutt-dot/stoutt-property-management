// File: /portal/owner/architectural.js

import Link from "next/link";

const arcRequests = [
  {
    id: "ARC-6028",
    project: "Patio paver extension",
    submitted: "Apr 28, 2026",
    status: "Under Review",
    nextStep: "Management completeness review",
    documents: "Survey, materials sheet, contractor license",
  },
  {
    id: "ARC-6014",
    project: "Front door color change",
    submitted: "Apr 12, 2026",
    status: "Approved",
    nextStep: "Work may proceed within approval window",
    documents: "Color sample, owner application",
  },
  {
    id: "ARC-5986",
    project: "Landscape border installation",
    submitted: "Mar 20, 2026",
    status: "Completed",
    nextStep: "Closed after final verification",
    documents: "Plan sketch, product photo",
  },
];

const requiredItems = [
  "Completed architectural application",
  "Project description and scope",
  "Photos, samples, or product specifications",
  "Survey or site plan when applicable",
  "Contractor license and insurance when applicable",
];

function statusClass(status) {
  if (status === "Under Review") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  if (status === "Approved") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return "border-white/10 bg-white/5 text-white/70";
}

export default function OwnerArchitectural() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Architectural Review</h1>
            <p className="mt-2 text-white/60">
              Submit improvement requests and track architectural review status.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            + New ARC Request
          </button>
        </div>

        {/* Hero */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Approval Workflow</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Before you begin exterior improvements</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            Many exterior changes require written approval before work begins. Submit your request here so management can review for completeness,
            confirm required documents, and route the item for approval when needed.
          </p>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Under Review</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Approved This Year</p>
            <p className="mt-2 text-4xl font-bold">5</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Typical Review Time</p>
            <p className="mt-2 text-4xl font-bold">7-14 Days</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Requests */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">My ARC Requests</h2>
                <p className="mt-1 text-sm text-white/50">Recent architectural submissions and approval status.</p>
              </div>

              <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                Download History
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {arcRequests.map((request) => (
                <div key={request.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm text-white/50">{request.id} • Submitted {request.submitted}</p>
                      <h3 className="mt-1 text-xl font-semibold">{request.project}</h3>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Next Step</p>
                          <p className="mt-1 text-sm text-white/80">{request.nextStep}</p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Documents</p>
                          <p className="mt-1 text-sm text-white/80">{request.documents}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(request.status)}`}>
                        {request.status}
                      </span>
                      <div className="flex gap-3">
                        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                          View
                        </button>
                        <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Items */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Before You Submit</h2>
            <p className="mt-1 text-sm text-white/50">Common items required for review.</p>

            <div className="mt-6 space-y-3">
              {requiredItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-yellow-400 transition">
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
              <p className="text-sm font-semibold text-yellow-200">Tip</p>
              <p className="mt-2 text-sm text-yellow-50/80">
                Complete submissions help avoid delays and reduce back-and-forth before board or committee review.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
