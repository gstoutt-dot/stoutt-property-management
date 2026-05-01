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
      {/* Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-yellow-500/20 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-amber-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        {/* HEADER */}
        <header className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                Stoutt Property Management
              </p>
              <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
                Manager Intake Review
              </h1>
              <p className="mt-3 text-sm text-slate-300 max-w-3xl">
                Review, verify, inspect, and prepare incoming requests before advancing to the Board.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/dashboard"
                className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-3 text-sm text-slate-200 hover:bg-white/[0.12]"
              >
                Dashboard
              </Link>

              <Link
                href="/portal/manager/board-ready"
                className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                Board Ready Queue
              </Link>
            </div>
          </div>
        </header>

        {/* KPI STRIP */}
        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["New Intake", "18"],
            ["Needs Inspection", "6"],
            ["Board Ready", "9"],
            ["AI Routed", "24"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-4xl font-semibold">{value}</h2>
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
              </div>
            </div>
          ))}
        </section>

        {/* FILTER BAR */}
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-2xl px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "bg-yellow-400 text-black"
                    : "border border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* CARDS */}
        <section className="mt-5 space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl hover:border-yellow-400/30"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
                {/* LEFT */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-white/10">
                      {item.id}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-400/10 text-yellow-300">
                      {item.category}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-amber-400/10 text-amber-300">
                      {item.priority}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm text-slate-300 max-w-3xl">
                    {item.summary}
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-4 text-sm">
                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                      <p className="text-xs text-slate-500">Resident</p>
                      <p>{item.resident}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                      <p className="text-xs text-slate-500">Unit</p>
                      <p>{item.unit}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                      <p className="text-xs text-slate-500">Association</p>
                      <p>{item.association}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/20">
                      <p className="text-xs text-slate-500">Received</p>
                      <p>{item.received}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT ACTION PANEL */}
                <div className="w-full xl:w-72 border border-white/10 rounded-2xl p-4 bg-black/20">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-semibold">{item.status}</p>

                  <div className="mt-5 space-y-3">
                    <button className="w-full bg-white text-black rounded-xl py-3 text-sm font-semibold hover:bg-slate-200">
                      Open Review
                    </button>

                    <button className="w-full bg-yellow-400 text-black rounded-xl py-3 text-sm font-semibold hover:bg-yellow-300">
                      Mark Board Ready
                    </button>

                    <button className="w-full border border-white/10 rounded-xl py-3 text-sm text-slate-300 hover:bg-white/10">
                      Request Info
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
