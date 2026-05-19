import { useState } from "react";
import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function MaintenanceReview() {
  const [selectedItem, setSelectedItem] = useState(null);
  const maintenanceSignals = bosSignals.filter(
    (item) => item.module === "Maintenance" || item.type === "Operations"
  );

  const maintenanceAiEvents = aiEvents.filter(
    (event) => event.route === "/board/maintenance-review"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Maintenance Review Center
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Maintenance Review</h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
  <Link href="/board">Board Dashboard</Link>
</nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
  Maintenance Review Queue
</p>

<h2 className="mt-3 text-4xl font-semibold">
  Review maintenance requests and operational activity.
</h2>

<p className="mt-4 max-w-3xl text-slate-300">
  Review maintenance requests, repair activity, operational concerns,
  and items requiring board awareness or action.
</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Maintenance Requests</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {maintenanceSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">Reported Issues</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {maintenanceAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Active Maintenance Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {maintenanceSignals.length + maintenanceAiEvents.length}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">Maintenance Review Queue</h3>

            <div className="mt-6 space-y-4">
              {maintenanceSignals.map((item) => {
  const isOpen = selectedItem?.type === "maintenance" && selectedItem?.data?.id === item.id;

  return (
    <div
      key={item.id}
      className="rounded-2xl border border-white/10 bg-slate-900 p-5"
    >
      <button
        onClick={() =>
          setSelectedItem(isOpen ? null : { type: "maintenance", data: item })
        }
        className="block w-full text-left"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
          {item.id} · {item.module}
        </p>

        <h4 className="mt-2 font-semibold">{item.title}</h4>

        <p className="mt-2 text-sm text-slate-400">
          Next Action: {item.nextAction}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Owner: {item.owner} · Due: {item.dueDate}
        </p>

        <p className="mt-4 text-sm font-semibold text-amber-300">
          {isOpen ? "Hide Details" : "View Details"}
        </p>
      </button>

      {isOpen && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h5 className="text-lg font-semibold text-amber-200">
            Full Maintenance Details
          </h5>

          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <p><span className="text-slate-500">Request ID:</span> {item.id}</p>
            <p><span className="text-slate-500">Category:</span> {item.module}</p>
            <p><span className="text-slate-500">Title:</span> {item.title}</p>
            <p><span className="text-slate-500">Owner:</span> {item.owner}</p>
            <p><span className="text-slate-500">Due Date:</span> {item.dueDate}</p>
            <p><span className="text-slate-500">Status:</span> {item.status || "Pending Review"}</p>
            <p><span className="text-slate-500">Next Action:</span> {item.nextAction}</p>
          </div>
        </div>
      )}
    </div>
  );
})}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
  Maintenance Activity
</h3>

<p className="mt-2 text-sm text-violet-100/70">
  Reported maintenance concerns and operational activity.
</p>

            <div className="mt-6 space-y-4">
              {maintenanceAiEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                    {event.id} · {event.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{event.event}</h4>

                  <p className="mt-2 text-sm text-slate-300">
                    Source: {event.source}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Status: {event.status} · Priority: {event.priority}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
  <h3 className="text-xl font-semibold text-amber-200">
    Maintenance Oversight
  </h3>

  <p className="mt-3 text-slate-300">
    This area helps board members monitor maintenance activity,
    operational concerns, repair requests, and community upkeep.
  </p>
</div>
      </section>
    </main>
  );
}
