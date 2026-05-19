import { useState } from "react";
import Link from "next/link";
import { bosSignals } from "../../lib/bosData"; 

export default function ArchitecturalApprovals() {
  const [selectedItem, setSelectedItem] = useState(null);
  const arcSignals = bosSignals.filter(
    (item) =>
      item.module === "ARC Approvals" ||
      item.type === "Architectural"
  );

  const pendingArcItems = arcSignals.filter(
    (item) =>
      item.status === "Pending Review" ||
      item.status === "Board Review"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Architecturl Review Center
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Architectural Approvals
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
  <Link href="/board">Board Dashboard</Link>
</nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
  Architectural Review Queue
</p>

<h2 className="mt-3 text-4xl font-semibold">
  Review homeowner architectural requests and approval activity.
</h2>

<p className="mt-4 max-w-3xl text-slate-300">
  Review pending ARC requests, homeowner submissions, approval conditions,
  and architectural review decisions.
</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">ARC Requests</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {arcSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-6">
            <p className="text-sm text-amber-100">Pending Review</p>
            <p className="mt-3 text-4xl font-semibold text-amber-200">
              {pendingArcItems.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">Priority Reviews</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                arcSignals.filter(
                  (item) =>
                    item.riskLevel === "High" ||
                    item.riskLevel === "Critical"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Community Activity</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">4</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">ARC Review Queue</h3>

            <div className="mt-6 space-y-4">
              {arcSignals.map((item) => {
  const isOpen =
    selectedItem?.id === item.id;

  return (
    <div
      key={item.id}
      className="rounded-2xl border border-white/10 bg-slate-900 p-5"
    >
      <button
        onClick={() =>
          setSelectedItem(isOpen ? null : item)
        }
        className="block w-full text-left"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
          {item.id} · {item.module}
        </p>

        <h4 className="mt-2 font-semibold">
          {item.title}
        </h4>

        <p className="mt-2 text-sm text-slate-400">
          Review Action: Confirm committee decision, owner notice,
          approval conditions, and deadline tracking.
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Owner: {item.owner} · Due: {item.dueDate} · Status:{" "}
          {item.status}
        </p>

        <p className="mt-4 text-sm font-semibold text-amber-300">
          {isOpen ? "Hide Details" : "View Details"}
        </p>
      </button>

      {isOpen && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h5 className="text-lg font-semibold text-amber-200">
            Full ARC Request Details
          </h5>

          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Request ID:</span>{" "}
              {item.id}
            </p>

            <p>
              <span className="text-slate-500">Category:</span>{" "}
              {item.module}
            </p>

            <p>
              <span className="text-slate-500">Title:</span>{" "}
              {item.title}
            </p>

            <p>
              <span className="text-slate-500">Owner:</span>{" "}
              {item.owner}
            </p>

            <p>
              <span className="text-slate-500">Due Date:</span>{" "}
              {item.dueDate}
            </p>

            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {item.status}
            </p>

            <p>
              <span className="text-slate-500">Risk Level:</span>{" "}
              {item.riskLevel || "Standard"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
})}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-100">
              ARC Review Activity
            </h3>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Owner Applications
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Committee Decisions
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Conditional Approvals
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Final Inspections
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
  <h3 className="text-xl font-semibold text-amber-200">
    Architectural Review Process
  </h3>

  <p className="mt-3 text-slate-300">
    This area helps board members review homeowner architectural requests,
    monitor ARC activity, and track approval decisions.
  </p>
</div>
      </section>
    </main>
  );
}
