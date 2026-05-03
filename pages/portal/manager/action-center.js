import { useMemo, useState } from "react";
import Link from "next/link";

const initialActions = [
  {
    id: "BOS-1001",
    type: "Work Order",
    status: "Needs Review",
    priority: "High",
    owner: "Maria Gonzalez",
    unit: "Unit 204",
    association: "Demo Lakes Association",
    title: "Pool light is burnt out",
    description:
      "Owner reported that the pool light near the west side of the pool is out and needs inspection.",
    source: "Ava AI Intake",
    created: "Today",
  },
  {
    id: "BOS-1002",
    type: "Violation",
    status: "Manager Review",
    priority: "Medium",
    owner: "James Whitaker",
    unit: "Unit 118",
    association: "Demo Lakes Association",
    title: "Balcony storage concern",
    description:
      "Possible balcony storage violation submitted for manager review before board escalation.",
    source: "Portal Intake",
    created: "Today",
  },
  {
    id: "BOS-1003",
    type: "Vendor Invoice",
    status: "Ready for Board",
    priority: "Normal",
    owner: "Vendor Submission",
    unit: "Common Area",
    association: "Demo Lakes Association",
    title: "Landscape maintenance invoice",
    description:
      "Monthly landscape invoice requires manager review before board approval workflow.",
    source: "Manager Upload",
    created: "Yesterday",
  },
];

export default function ManagerActionCenter() {
  const [actions, setActions] = useState(initialActions);
  const [selected, setSelected] = useState(initialActions[0]);

  const stats = useMemo(() => {
    return {
      total: actions.length,
      high: actions.filter((a) => a.priority === "High").length,
      board: actions.filter((a) => a.status === "Ready for Board").length,
      review: actions.filter((a) => a.status.includes("Review")).length,
    };
  }, [actions]);

  function updateStatus(id, status) {
    const updated = actions.map((a) => (a.id === id ? { ...a, status } : a));
    setActions(updated);
    setSelected(updated.find((a) => a.id === id));
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
              BOS Manager Portal
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Action Center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Manager review hub for Ava intake, violations, work orders,
              vendor invoices, owner requests, board approvals, and dispatch
              readiness.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/manager"
              className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300"
            >
              Manager Portal
            </Link>
            <Link
              href="/portal/manager/vendor-dispatch"
              className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300"
            >
              Vendor Dispatch
            </Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <Stat label="Open Actions" value={stats.total} />
          <Stat label="High Priority" value={stats.high} />
          <Stat label="Board Ready" value={stats.board} />
          <Stat label="Manager Review" value={stats.review} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Incoming Queue</h2>
                <p className="text-sm text-slate-400">
                  Review, approve, escalate, or dispatch.
                </p>
              </div>
              <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                Live Demo Mode
              </span>
            </div>

            <div className="space-y-4">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setSelected(action)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    selected?.id === action.id
                      ? "border-yellow-400/60 bg-yellow-400/10"
                      : "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{action.type}</Badge>
                        <Priority priority={action.priority} />
                        <Badge>{action.status}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {action.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {action.description}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <p>{action.id}</p>
                      <p>{action.created}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30">
            {selected ? (
              <>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
                  Review Detail
                </p>
                <h2 className="text-2xl font-bold">{selected.title}</h2>

                <div className="mt-5 space-y-3 text-sm">
                  <Detail label="Action ID" value={selected.id} />
                  <Detail label="Association" value={selected.association} />
                  <Detail label="Owner / Source" value={selected.owner} />
                  <Detail label="Location" value={selected.unit} />
                  <Detail label="Created From" value={selected.source} />
                  <Detail label="Current Status" value={selected.status} />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm font-semibold text-slate-200">
                    Manager Notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Confirm accuracy, inspect if needed, then either approve
                    internally, forward to the board, or dispatch to a vendor.
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  <button
                    onClick={() => updateStatus(selected.id, "Approved")}
                    className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Ready for Board")
                    }
                    className="rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 text-sm font-bold text-yellow-300 hover:bg-yellow-400/15"
                  >
                    Send to Board
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Ready for Vendor Dispatch")
                    }
                    className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                  >
                    Mark Ready for Vendor Dispatch
                  </button>
                </div>
              </>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/20">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
      {children}
    </span>
  );
}

function Priority({ priority }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        priority === "High"
          ? "border border-red-400/40 bg-red-500/10 text-red-300"
          : priority === "Medium"
          ? "border border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
          : "border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
      }`}
    >
      {priority}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-100">{value}</span>
    </div>
  );
}
