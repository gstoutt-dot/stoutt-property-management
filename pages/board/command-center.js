import React from "react";
import BosSystemStatus from "../../components/board/BosSystemStatus";
import BosLiveConsole from "../../components/board/BosLiveConsole";
import BosActionButtons from "../../components/board/BosActionButtons";

export default function CommandCenter() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(234,179,8,0.16),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <header className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-300/10 text-xl font-black text-cyan-100 shadow-lg shadow-cyan-500/10">
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
                    label === "Command"
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
                Command Center · Live Console Connected
              </p>
              <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
                Executive control for the entire board operation.
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
                Monitor workflow health, live execution events, board action
                signals, and operating-system readiness from one premium command
                layer.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-black/40 backdrop-blur">
              <p className="text-lg font-bold text-white">
                Command Snapshot
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5">
                {[
                  ["4", "Active workflow items"],
                  ["5", "Routing rules"],
                  ["6", "Shared actions"],
                  ["1", "Live console"],
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

              <div className="mt-7 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6">
                <p className="font-bold text-cyan-100">What this represents</p>
                <p className="mt-4 leading-7 text-slate-300">
                  A real operating layer for board work: status, execution,
                  routing, audit visibility, and live feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <BosSystemStatus />
        <BosLiveConsole />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/30">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-emerald-300">
              Executable Controls
            </p>
            <h2 className="mt-3 text-3xl font-black text-white">
              Command actions wired to the BOS engine.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              These controls now route through the shared execution layer and
              can persist actions into Supabase.
            </p>
          </div>

          <BosActionButtons module="command-center" />
        </div>
      </section>
    </main>
  );
}
