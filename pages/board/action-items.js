import React from "react";
import BosActionButtons from "../../components/board/BosActionButtons";

export default function ActionItems() {
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
                  className={`rounded-full border px-5 py-2 text-sm font-semibold ${
                    label === "Tasks"
                      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-200"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>

          <div className="grid gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.55em] text-cyan-200">
                Engine-Connected Task Controls
              </p>

              <h1 className="mt-8 text-6xl font-black leading-tight">
                Action Items now execute through the BOS engine.
              </h1>

              <p className="mt-8 max-w-2xl text-lg text-slate-300">
                Board tasks and workflow items now share the same execution
                layer, returning structured audit-ready results.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur">
              <p className="text-lg font-bold">Task-State Snapshot</p>

              <div className="mt-6 grid grid-cols-2 gap-5">
                {[
                  ["4", "Total tasks"],
                  ["2", "Open tasks"],
                  ["1", "In progress"],
                  ["1", "Escalated"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"
                  >
                    <p className="text-4xl font-black">{num}</p>
                    <p className="mt-2 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="font-semibold text-emerald-200">What changed</p>
                <p className="mt-2 text-sm text-slate-300">
                  Tasks now execute through the BOS engine and persist results
                  into the shared system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-emerald-300">
              Executable Actions
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Run task actions through the BOS engine
            </h2>
          </div>

          <BosActionButtons module="action-items" />
        </div>
      </section>
    </main>
  );
}
