import { useEffect, useMemo, useState } from "react";

export default function DispatchFeed() {
  const [actions, setActions] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadActions();
  }, []);

  function loadActions() {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");
    setActions(stored);
  }

  async function updateVendorStatus(actionId, vendorStatus, vendorNote) {
    setUpdatingId(actionId);

    try {
      await fetch("/api/vendor-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionId,
          status: vendorStatus,
          note: vendorNote,
        }),
      });

      const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");

      const updated = stored.map((item) =>
        item.id === actionId
          ? {
              ...item,
              vendorStatus,
              vendorNote,
              vendorUpdatedAt: new Date().toISOString(),
            }
          : item
      );

      localStorage.setItem("bos_actions", JSON.stringify(updated));
      setActions(updated);
    } catch (err) {
      console.error("Vendor status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
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
    accepted: dispatchedItems.filter((item) => item.vendorStatus === "accepted")
      .length,
    inProgress: dispatchedItems.filter(
      (item) => item.vendorStatus === "in_progress"
    ).length,
    completed: dispatchedItems.filter((item) => item.vendorStatus === "completed")
      .length,
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
              Board-approved actions released into vendor dispatch, with vendor
              response tracking.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <a
              href="/bos/action-center"
              className="rounded-2xl border border-yellow-400/30 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/10 transition"
            >
              Action Center
            </a>
            <a
              href="/portal/board"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 hover:border-yellow-400/30 hover:text-yellow-300 transition"
            >
              Board Portal
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Dispatched" value={stats.total} />
          <StatCard label="Vendor Accepted" value={stats.accepted} />
          <StatCard label="In Progress" value={stats.inProgress} />
          <StatCard label="Completed" value={stats.completed} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6 md:p-8 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              Vendor Dispatch Log
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Released Workflows</h2>
            <p className="mt-2 text-white/55">
              Simulate vendor responses and track field progress after board
              approval.
            </p>
          </div>

          {dispatchedItems.length === 0 ? (
            <EmptyState message="No dispatched items have been recorded yet." />
          ) : (
            <div className="space-y-5">
              {dispatchedItems.map((item) => (
                <DispatchCard
                  key={item.id}
                  item={item}
                  updating={updatingId === item.id}
                  onVendorUpdate={updateVendorStatus}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DispatchCard({ item, updating, onVendorUpdate }) {
  const [note, setNote] = useState(
    item.vendorNote || "Vendor response simulated from dispatch feed."
  );

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

        <VendorBadge status={item.vendorStatus} />
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
          label="Vendor Updated"
          value={
            item.vendorUpdatedAt
              ? new Date(item.vendorUpdatedAt).toLocaleString()
              : "No vendor response yet"
          }
        />
      </div>

      <div className="mt-6 rounded-2xl border border-yellow-500/10 bg-yellow-400/[0.035] p-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-300">
              Vendor Response Note
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-3 min-h-[92px] w-full rounded-2xl border border-white/10 bg-[#020617] px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/30 focus:border-yellow-400/40"
              placeholder="Add vendor response note..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            <VendorButton
              label="Accepted"
              disabled={updating}
              onClick={() => onVendorUpdate(item.id, "accepted", note)}
            />
            <VendorButton
              label="In Progress"
              disabled={updating}
              onClick={() => onVendorUpdate(item.id, "in_progress", note)}
            />
            <VendorButton
              label="Completed"
              disabled={updating}
              onClick={() => onVendorUpdate(item.id, "completed", note)}
            />
          </div>
        </div>

        {item.vendorNote && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-[#020617]/80 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              Current Vendor Note
            </p>
            <p className="mt-2 text-sm text-white/70">{item.vendorNote}</p>
          </div>
        )}
      </div>
    </article>
  );
}

function VendorButton({ label, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 transition disabled:cursor-not-allowed disabled:opacity-40"
    >
      {disabled ? "Updating..." : label}
    </button>
  );
}

function VendorBadge({ status }) {
  const styles = {
    accepted: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    in_progress: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  };

  const labels = {
    accepted: "Vendor Accepted",
    in_progress: "In Progress",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "border-white/10 bg-white/5 text-white/60"
      }`}
    >
      {labels[status] || "Awaiting Vendor"}
    </span>
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
