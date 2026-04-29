import { useState } from "react";

export default function BosLiveConsole() {
  const [logs, setLogs] = useState([
    {
      id: "log-1",
      message: "BOS Engine initialized",
      type: "system",
      time: "Just now",
    },
    {
      id: "log-2",
      message: "Workflow queue connected",
      type: "success",
      time: "Just now",
    },
  ]);

  function addLog(message, type = "system") {
    const newLog = {
      id: `log-${Date.now()}`,
      message,
      type,
      time: "Just now",
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  }

  const typeStyles = {
    system: "text-slate-300",
    success: "text-emerald-300",
    warning: "text-amber-300",
    error: "text-rose-300",
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
            Live Console
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            BOS Execution Stream
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-300">Live</span>
        </div>
      </div>

      <div className="space-y-2 font-mono text-xs">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
          >
            <span className="text-slate-500">{log.time}</span>
            <span
              className={`${typeStyles[log.type]} leading-5`}
            >
              {log.message}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button
          onClick={() => addLog("Test action executed", "success")}
          className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"
        >
          Test Success
        </button>

        <button
          onClick={() => addLog("Escalation triggered", "warning")}
          className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"
        >
          Test Escalate
        </button>

        <button
          onClick={() => addLog("Execution failed", "error")}
          className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-200"
        >
          Test Error
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        This console will later display real BOS execution events, AI activity,
        vendor dispatch logs, and accounting sync events.
      </p>
    </section>
  );
}
