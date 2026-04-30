import React from "react";
import BosActionButtons from "../../components/board/BosActionButtons";

export default function WorkflowEngine() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(234,179,8,0.16),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <header className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-300/10 text-xl font-black text-cyan-100">
                SP
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.42em] text-cyan-200">
                  Stoutt Property Management
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Board Operating System
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-3 md:flex">
              {[
                ["Dashboard", "/board"],
                ["Workflow", "/board/workflow-engine"],
                ["Command", "/board/command-center"],
                ["Tasks", "/board/action-items"],
                ["Financial", "/board/financial-review"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                    label === "Workflow"
                      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-300/10"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>

          <div className="grid gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.55em] text-cyan-200">
                Unified Workflow Intelligence
              </p>
              <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
                The BOS workflow engine now routes board work.
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
                Shared workflow state, routing rules, escalations, and
                executable actions now operate from one central system layer.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur">
              <p className="text-lg font-bold text-white">
                Workflow Snapshot
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5">
                {[
                  ["4", "Active items"],
                  ["2", "Escalations"],
                  ["5", "Routing rules"],
                  ["6", "Action types"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"
                  >
                    <p className="text-4xl font-black text-white">{number}</p>
                    <p className="mt-3 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6">
                <p className="font-bold text-emerald-100">What this enables</p>
                <p className="mt-4 leading-7 text-slate-300">
                  Board work can now move from intake to routing, assignment,
                  escalation, and audit tracking through one connected engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Routing Rules",
              text: "Signals can be directed to the correct board workflow based on urgency, module, and responsibility.",
            },
            {
              title: "Shared State",
              text: "Workflow items can be reflected across Command Center, Tasks, and module-specific review pages.",
            },
            {
              title: "Audit Trail Ready",
              text: "Executed actions can be persisted into Supabase for review, history, and future reporting.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 shadow-2xl shadow-black/20"
            >
              <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
                BOS Layer
              </p>
              <h2 className="mt-4 text-2xl font-black text-white">
                {item.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/30">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-emerald-300">
              Executable Workflow Controls
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">
              Route workflow actions through the BOS engine.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              These workflow controls now use the same execution layer as
              Command Center and Action Items.
            </p>
          </div>

          <BosActionButtons module="workflow-engine" />
        </div>
      </section>
    </main>
  );
}
