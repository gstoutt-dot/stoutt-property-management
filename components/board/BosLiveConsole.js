import { useEffect, useState } from "react";
import { subscribe } from "../../lib/bosEngine/eventBus";

export default function BosLiveConsole() {
  const [logs, setLogs] = useState([
    {
      id: "log-1",
      message: "BOS Engine initialized",
      type: "system",
      module: "BOS Engine",
      time: "Ready",
    },
    {
      id: "log-2",
      message: "Workflow queue connected",
      type: "success",
      module: "Workflow Engine",
      time: "Ready",
    },
  ]);

  useEffect(() => {
    const unsubscribe = subscribe((event) => {
      const newLog = {
        id: event.id,
        message: event.message,
        type: event.level === "success" ? "success" : event.type,
        module: event.module,
        time: "Just now",
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
    });

    return unsubscribe;
  }, []);

  function addLog(message, type = "system", module = "Command Center") {
    const newLog = {
      id: `log-${Date.now()}`,
      message,
      type,
      module,
      time: "Just now",
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
  }

  const typeStyles = {
    system: "text-slate-300",
    success: "text-emerald-300",
    warning: "text-amber-300",
    error: "text-rose-300",
    action: "text-cyan-300",
    ai_event: "text-purple-300",
    vendor_dispatch: "text-blue-300",
    accounting_sync: "text-emerald-300",
  };

  const badgeStyles = {
    system: "border-slate-400/20 bg-slate-400/10 text-slate-200",
    success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    error: "border-rose-400/20 bg-rose-400/10 text-rose-200",
    action: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    ai_event: "border-purple-400/20 bg-purple-400/10 text-purple-200",
    vendor_dispatch: "border-blue-400/20 bg-blue-400/10 text-blue-200",
    accounting_sync: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
            Live Console
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            BOS Event Stream
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500">
            Now subscribed to the BOS event bus. Engine actions, AI events,
            accounting syncs, and vendor dispatches can publish here.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs text-emerald-300">Listening</span>
        </div>
      </div>

      <div className="space-y-2 font-mono text-xs">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-3"
          >
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-slate-500">{log.time}</span>

              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] ${
                  badgeStyles[log.type] ||
                  "border-white/10 bg-white/[0.04] text-slate-300"
                }`}
              >
                {log.type}
              </span>

              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{log.module}</span>
            </div>

            <p
              className={`leading-5 ${
                typeStyles[log.type] || "text-slate-300"
              }`}
            >
              {log.message}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() =>
            addLog("Manual console test executed", "success", "Command Center")
          }
          className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200"
        >
          Test Success
        </button>

        <button
          type="button"
          onClick={() =>
            addLog("Manual escalation test triggered", "warning", "Command Center")
          }
          className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-200"
        >
          Test Escalate
        </button>

        <button
          type="button"
          onClick={() =>
            addLog("Manual error test recorded", "error", "Command Center")
          }
          className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-200"
        >
          Test Error
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Next: connect database persistence so every event is permanently stored
        and reflected across all BOS modules.
      </p>
    </section>
  );
}
