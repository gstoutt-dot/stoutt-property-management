import Link from "next/link";
import { useState } from "react";

const intakeItems = [
  {
    id: "REQ-1048",
    category: "Work Order",
    title: "Pool light out near east gate",
    resident: "Maria Hernandez",
    unit: "Unit 214",
    association: "Harbor Pointe HOA",
    received: "Today · 9:42 AM",
    priority: "High",
    status: "Manager Review",
    source: "Ava Voice Intake",
    summary:
      "Resident reported that the pool light near the east gate is out and the area is dark after sunset.",
  },
  {
    id: "REQ-1047",
    category: "Violation",
    title: "Commercial vehicle parking concern",
    resident: "David Collins",
    unit: "Unit 89",
    association: "Harbor Pointe HOA",
    received: "Today · 8:15 AM",
    priority: "Medium",
    status: "Inspection Needed",
    source: "Owner Portal",
    summary:
      "Possible overnight commercial vehicle parking reported in guest parking area.",
  },
  {
    id: "REQ-1046",
    category: "Architectural Review",
    title: "Fence installation request",
    resident: "Angela Martin",
    unit: "Unit 301",
    association: "Harbor Pointe HOA",
    received: "Yesterday · 4:28 PM",
    priority: "Medium",
    status: "Document Check",
    source: "Owner Portal",
    summary:
      "Owner submitted request to install white vinyl fencing along rear patio area.",
  },
  {
    id: "REQ-1045",
    category: "Vendor Invoice",
    title: "Landscape invoice submitted",
    resident: "Brightscape Services",
    unit: "Vendor",
    association: "Harbor Pointe HOA",
    received: "Yesterday · 1:06 PM",
    priority: "Low",
    status: "Board Ready",
    source: "Vendor Email",
    summary:
      "Monthly landscape maintenance invoice received and awaiting manager verification.",
  },
];

export default function ManagerIntakeReview() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Work Order",
    "Violation",
    "Architectural Review",
    "Vendor Invoice",
  ];

  const filteredItems =
    activeFilter === "All"
      ? intakeItems
      : intakeItems.filter((item) => item.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute left-[35%] top-[20%] h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Stoutt Property Management
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Manager Intake Review
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                Review, verify, inspect, and prepare incoming owner, vendor, and
                AI-routed requests before anything is advanced to the Board.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/dashboard"
                className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.12]"
              >
                Manager Dashboard
              </Link>

              <Link
                href="/portal/manager/board-ready"
                className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Board Ready Queue
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["New Intake", "18", "Awaiting manager review"],
            ["Needs Inspection", "6", "Field verification required"],
            ["Board Ready", "9", "Prepared for board action"],
            ["AI Routed", "24", "Created from Ava or portal"],
          ].map(([label, value, detail]) => (
            <div
              key={label}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/20 backdrop-blur-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-4xl font-semibold tracking-tight">
                  {value}
                </h2>
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/50" />
              </div>
              <p className="mt-3 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Review Queue</h2>
              <p className="mt-1 text-sm text-slate-400">
                Filter by request type and prepare items for action.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    activeFilter === filter
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.075]"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs text-slate-300">
                      {item.id}
                    </span>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                      {item.category}
                    </span>
                    <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                      {item.priority} Priority
                    </span>
                    <span className="rounded-full bg-indigo-300/10 px-3 py-1 text-xs text-indigo-200">
                      {item.source}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                    {item.summary}
                  </p>

                  <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-slate-500">Resident / Vendor</p>
                      <p className="mt-1 font-medium text-slate-100">
                        {item.resident}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-slate-500">Unit</p>
                      <p className="mt-1 font-medium text-slate-100">
                        {item.unit}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-slate-500">Association</p>
                      <p className="mt-1 font-medium text-slate-100">
                        {item.association}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-slate-500">Received</p>
                      <p className="mt-1 font-medium text-slate-100">
                        {item.received}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full rounded-3xl border border-white/10 bg-black/20 p-4 xl:w-72">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Current Status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {item.status}
                  </p>

                  <div className="mt-5 space-y-3">
                    <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                      Open Review
                    </button>

                    <button className="w-full rounded-2xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20">
                      Mark Board Ready
                    </button>

                    <button className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.1]">
                      Request More Info
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
