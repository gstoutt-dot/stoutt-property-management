import { getBosSystemStatus } from "../../lib/bosEngine/executeAction";

const statusStyles = {
  Operational: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  Active: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  Connected: "border-blue-300/20 bg-blue-300/10 text-blue-100",
  Enabled: "border-purple-300/20 bg-purple-300/10 text-purple-100",
  Ready: "border-amber-300/20 bg-amber-300/10 text-amber-100",
};

export default function BosSystemStatus() {
  const systemStatus = getBosSystemStatus();

  const statusItems = [
    { label: "System Status", value: systemStatus.status },
    { label: "Execution Engine", value: systemStatus.engine },
    { label: "Workflow State", value: systemStatus.workflow },
    { label: "Shared Actions", value: systemStatus.actions },
    { label: "AI Integration", value: systemStatus.aiIntegration },
    { label: "Accounting Integration", value: systemStatus.accountingIntegration },
    { label: "Vendor Dispatch", value: systemStatus.vendorDispatch },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
            BOS System Health
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Operating system readiness
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            This panel confirms that the BOS now has a connected execution
            engine, shared workflow queue, AI bridge, accounting hook, and vendor
            dispatch hook ready for database-backed operation.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
            Current State
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            Operational
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              {item.label}
            </p>

            <span
              className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                statusStyles[item.value] ||
                "border-white/10 bg-white/[0.04] text-slate-300"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
        <p className="text-sm font-semibold text-cyan-100">
          Why this matters
        </p>
        <p className="mt-2 text-sm leading-6 text-cyan-50/80">
          The board portal now has the foundation for real operating behavior:
          intake, task creation, action execution, audit trail response,
          accounting sync, vendor dispatch, and AI-driven workflow injection.
        </p>
      </div>
    </section>
  );
}
