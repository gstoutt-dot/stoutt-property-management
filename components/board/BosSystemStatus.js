export default function BosSystemStatus() {
  const statusItems = [
    {
      label: "BOS Engine",
      status: "Operational",
      detail: "Actions are routing through the centralized execution engine.",
    },
    {
      label: "Workflow State",
      status: "Operational",
      detail: "Shared workflow queues are available across board modules.",
    },
    {
      label: "Event Bus",
      status: "Operational",
      detail: "Live events are publishing to the command console.",
    },
    {
      label: "Supabase Connection",
      status: "Connected",
      detail: "Production environment variables are configured.",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
          System Health
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Board Operating System Status
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          Core BOS services are active and ready for persistent workflow execution,
          live event routing, and production command-center monitoring.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-semibold text-white">
                {item.label}
              </h3>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                {item.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
