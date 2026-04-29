import {
  bosRoles,
  getAllowedActions,
  bosActionLog,
} from "../../lib/bosActions";

import {
  getWorkflowOperatingSummary,
  getCrossModuleRoutesForModule,
} from "../../lib/bosWorkflowState";

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  Open: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  "In Progress": "bg-blue-500/10 text-blue-300 border-blue-400/20",
  Failed: "bg-rose-500/10 text-rose-300 border-rose-400/20",
};

export default function BosActionPanel({
  moduleName = "Board Operating System",
  role = bosRoles.MANAGER,
}) {
  const allowedActions = getAllowedActions(moduleName, role);
  const workflowSummary = getWorkflowOperatingSummary();
  const routingRules = getCrossModuleRoutesForModule(moduleName);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Shared BOS Actions
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Operating controls for {moduleName}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            These controls represent the shared action language now available
            across the Board Operating System: close, escalate, assign, review,
            create task, and route signal.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
            Current Role
          </p>
          <p className="mt-1 text-lg font-semibold capitalize text-white">
            {role}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">
            Available Actions
          </p>
          <div className="mt-4 space-y-3">
            {allowedActions.length > 0 ? (
              allowedActions.map((action) => (
                <div
                  key={action.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {action.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {action.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                <p className="text-sm font-semibold text-amber-200">
                  No direct actions available
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-100/80">
                  This role can view the module but cannot perform operating
                  actions from this panel.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">
            Workflow State
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-semibold text-white">
                {workflowSummary.openItems}
              </p>
              <p className="mt-1 text-xs text-slate-400">Open</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-semibold text-white">
                {workflowSummary.inProgressItems}
              </p>
              <p className="mt-1 text-xs text-slate-400">In Progress</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-semibold text-white">
                {workflowSummary.escalatedItems}
              </p>
              <p className="mt-1 text-xs text-slate-400">Escalated</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-semibold text-white">
                {workflowSummary.routingRules}
              </p>
              <p className="mt-1 text-xs text-slate-400">Routing Rules</p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            Shared workflow state is the foundation for connecting dashboard,
            command center, packets, tasks, vendors, legal, accounting, and AI
            activity into one operating loop.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <p className="text-sm font-semibold text-white">
            Cross-Module Routes
          </p>

          <div className="mt-4 space-y-3">
            {routingRules.length > 0 ? (
              routingRules.map((rule) => (
                <div
                  key={rule.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {rule.sourceModule} → {rule.targetModule}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {rule.condition}
                  </p>
                  <p className="mt-2 text-xs font-medium text-cyan-300">
                    {rule.result}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">
                  No direct route configured
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  This module can still participate in global workflow actions
                  and audit trail activity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">
            Recent BOS Audit Trail
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Live operating memory
          </p>
        </div>

        <div className="space-y-3">
          {bosActionLog.map((entry) => (
            <div
              key={entry.id}
              className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[1fr_140px]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-white">
                    {entry.action}
                  </p>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                    {entry.module}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {entry.timestamp} · {entry.actor}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {entry.summary}
                </p>
              </div>

              <div className="flex items-start justify-start md:justify-end">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    statusStyles[entry.status] ||
                    "border-white/10 bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
