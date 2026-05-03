import { useEffect, useMemo, useState } from "react";

export default function DispatchFeed() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    loadActions();
  }, []);

  function loadActions() {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");
    setActions(stored);
  }

  const dispatchedItems = useMemo(
    () =>
      actions
        .filter((item) => item.dispatched || item.status === "board_approved")
        .slice()
        .reverse(),
    [actions]
  );

  const stats = {
    total: dispatchedItems.length,
    locked: dispatchedItems.filter((item) => item.dispatchLocked || item.dispatched)
      .length,
    today: dispatchedItems.filter((item) => {
      if (!item.dispatchedAt) return false;
      return new Date(item.dispatchedAt).toDateString() === new Date().toDateString();
    }).length,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-7 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              BOS Dispatch Layer
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
              Dispatch Activity Feed
            </h1>
            <p className="mt-2 max-w-2xl text-white/60">
              Board-approved actions released into the vendor dispatch workflow.
            </p>
          </div>

          <a
            href="/portal/board"
            className="hidden md:inline-flex rounded-2xl border border-yellow-400/30 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/10 transition"
          >
            Board Portal
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Dispatched" value={stats.total} />
          <StatCard label="Locked Actions" value={stats.locked} />
          <StatCard label="Dispatched Today" value={stats.today} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6 md:p-8 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              Vendor Dispatch Log
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Released Workflows
            </h2>
            <p className="mt-2 text-white/55">
              Each item below has passed board approval and entered the dispatch
              trail.
            </p>
          </div>

          {dispatchedItems.length === 0 ? (
            <EmptyState message="No dispatched items have been recorded yet." />
          ) : (
            <div className="space-y-4">
              {dispatchedItems.map((item) => (
                <DispatchCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DispatchCard({ item }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#020617]/80 p-6 hover:border-yellow-400/25 transition">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
            Dispatch Record
          </p>
          <h3 className="mt-2 text-xl font-semibold">
            {item.title || item.requestType || "BOS Action"}
          </h3>
          <p className="mt-3 text-white/65 leading-relaxed">
            {item.description || item.notes || "No description provided."}
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Dispatched
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
        <Meta label="Association" value={item.association} />
        <Meta label="Unit" value={item.unit} />
        <Meta label="Category" value={item.category || item.type} />
        <Meta label="Vendor" value={item.vendor || "Simulated Vendor"} />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <Meta
          label="Board Approved"
          value={
            item.boardDecisionAt
              ? new Date(item.boardDecisionAt).toLocaleString()
              : "Recorded"
          }
        />
        <Meta
          label="Dispatched"
          value={
            item.dispatchedAt
              ? new Date(item.dispatchedAt).toLocaleString()
              : item.dispatched
              ? "Dispatched"
              : "Pending"
          }
        />
        <Meta
          label="Dispatch Lock"
          value={item.dispatchLocked || item.dispatched ? "Locked" : "Open"}
        />
      </div>
    </article>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-yellow-500/10 bg-white/[0.025] p-5">
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-yellow-300">{value}</p>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-1 text-white/75">{value || "N/A"}</p>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-yellow-500/20 bg-white/[0.015] p-10 text-center">
      <p className="text-white/50">{message}</p>
    </div>
  );
}
