import Link from "next/link";
import { useState } from "react";

export default function ManagerIntakeReview() {
  const [filter, setFilter] = useState("All");

  const requests = [
    {
      id: "REQ-1048",
      type: "Work Order",
      resident: "Maria Hernandez",
      association: "Harbor Pointe HOA",
      issue: "Pool light is out near the east gate.",
      status: "Needs Manager Review",
      priority: "High",
      date: "Today",
    },
    {
      id: "REQ-1047",
      type: "Violation",
      resident: "David Collins",
      association: "Harbor Pointe HOA",
      issue: "Possible overnight commercial vehicle parking.",
      status: "Inspection Required",
      priority: "Medium",
      date: "Today",
    },
    {
      id: "REQ-1046",
      type: "Architectural Review",
      resident: "Angela Martin",
      association: "Harbor Pointe HOA",
      issue: "Request to install white vinyl fencing.",
      status: "Document Check",
      priority: "Medium",
      date: "Yesterday",
    },
    {
      id: "REQ-1045",
      type: "Vendor Invoice",
      resident: "Brightscape Services",
      association: "Harbor Pointe HOA",
      issue: "Monthly landscape maintenance invoice submitted.",
      status: "Ready for Board",
      priority: "Low",
      date: "Yesterday",
    },
  ];

  const filteredRequests =
    filter === "All" ? requests : requests.filter((item) => item.type === filter);

  const filters = [
    "All",
    "Work Order",
    "Violation",
    "Architectural Review",
    "Vendor Invoice",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              SPM BOS
            </p>
            <h1 className="mt-1 text-2xl font-semibold">
              Manager Intake Review
            </h1>
          </div>

          <Link
            href="/portal/manager/dashboard"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-sm text-cyan-200">New Intake</p>
            <h2 className="mt-2 text-3xl font-bold">18</h2>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5">
            <p className="text-sm text-amber-200">Needs Inspection</p>
            <h2 className="mt-2 text-3xl font-bold">6</h2>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            <p className="text-sm text-emerald-200">Board Ready</p>
            <h2 className="mt-2 text-3xl font-bold">9</h2>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-5">
            <p className="text-sm text-violet-200">AI Routed</p>
            <h2 className="mt-2 text-3xl font-bold">24</h2>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-xl px-4 py-2 text-sm transition ${
                  filter === item
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/10 text-slate-200 hover:bg-white/15"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                      {request.id}
                    </span>
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                      {request.type}
                    </span>
                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
                      {request.priority}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold">
                    {request.issue}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {request.resident} · {request.association} · {request.date}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200">
                    Review
                  </button>

                  <button className="rounded-xl border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-400/10">
                    Mark Board Ready
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Current Status</p>
                <p className="mt-1 font-medium text-white">{request.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
