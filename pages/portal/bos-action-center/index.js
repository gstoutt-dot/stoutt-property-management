import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function BOSActionCenter() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");

    const demo = [
      {
        id: "BOS-1001",
        source: "Ava Intake",
        property: "Demo Association",
        resident: "Maria Alvarez",
        type: "Maintenance",
        title: "Pool light reported out",
        status: "Manager Review",
        priority: "High",
        createdAt: new Date().toISOString(),
        nextStep: "Inspect and dispatch vendor",
      },
      {
        id: "BOS-1002",
        source: "Owner Portal",
        property: "Demo Association",
        resident: "James Carter",
        type: "Architectural",
        title: "Fence color approval request",
        status: "Board Review",
        priority: "Medium",
        createdAt: new Date().toISOString(),
        nextStep: "Board approval required",
      },
      {
        id: "BOS-1003",
        source: "Manager Portal",
        property: "Demo Association",
        resident: "Vendor Invoice",
        type: "Invoice",
        title: "Landscape monthly invoice",
        status: "Payment Review",
        priority: "Normal",
        createdAt: new Date().toISOString(),
        nextStep: "Confirm budget line item",
      },
    ];

    setActions([...stored, ...demo]);
  }, []);

  const stats = useMemo(() => {
    return {
      total: actions.length,
      manager: actions.filter((a) => String(a.status || "").includes("Manager")).length,
      board: actions.filter((a) => String(a.status || "").includes("Board")).length,
      vendor: actions.filter((a) => String(a.status || "").includes("Vendor")).length,
    };
  }, [actions]);

  const statusClass = (status = "") => {
    if (status.includes("Board")) return "border-yellow-400/40 bg-yellow-400/10 text-yellow-200";
    if (status.includes("Manager")) return "border-blue-400/40 bg-blue-400/10 text-blue-200";
    if (status.includes("Vendor")) return "border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
    if (status.includes("Payment")) return "border-purple-400/40 bg-purple-400/10 text-purple-200";
    return "border-white/10 bg-white/5 text-slate-300";
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Stoutt Property Management
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              BOS Action Center
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Central command for owner requests, Ava intake, manager review,
              board decisions, vendor dispatch, and payment workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/manager"
              className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-200 hover:bg-yellow-400/20"
            >
              Manager Portal
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Home
            </Link>
          </div>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Stat label="Total BOS Actions" value={stats.total} />
          <Stat label="Manager Review" value={stats.manager} />
          <Stat label="Board Review" value={stats.board} />
          <Stat label="Vendor Stage" value={stats.vendor} />
        </div>

        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/40">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Live BOS Workflow Queue</h2>
              <p className="text-sm text-slate-400">
                Demo actions are combined with local Ava/owner-created bos_actions.
              </p>
            </div>
            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-200">
              Simulated BOS environment
            </div>
          </div>

          <div className="grid gap-4">
            {actions.map((action, index) => (
              <article
                key={action.id || index}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-yellow-400/30 hover:bg-white/[0.055]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {action.id || `BOS-${index + 1}`}
                      </span>
                      <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                        {action.source || "BOS"}
                      </span>
                      <span className={`rounded-full border px-3 py-1 text-xs ${statusClass(action.status)}`}>
                        {action.status || "Open"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {action.title || action.request || "Untitled BOS Action"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {action.property || "Demo Association"} ·{" "}
                      {action.resident || action.owner || "Resident / Owner"} ·{" "}
                      {action.type || "Request"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
                    <p className="text-slate-400">Priority</p>
                    <p className="font-semibold text-yellow-200">
                      {action.priority || "Normal"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-[#020617] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Next BOS Step
                  </p>
                  <p className="mt-2 text-slate-200">
                    {action.nextStep || "Review, classify, and route to the correct approval lane."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}
