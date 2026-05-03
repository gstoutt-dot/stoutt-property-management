import { useEffect, useMemo, useState } from "react";

export default function BoardPortal() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    loadActions();
  }, []);

  function loadActions() {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");
    setActions(stored);
  }

  function updateStatus(id, status) {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");

    const updated = stored.map((item) =>
      item.id === id
        ? {
            ...item,
            status,
            boardDecisionAt: new Date().toISOString(),
          }
        : item
    );

    localStorage.setItem("bos_actions", JSON.stringify(updated));
    setActions(updated);
  }

  const boardQueue = useMemo(
    () =>
      actions
        .filter((item) => item.status === "manager_approved")
        .slice()
        .reverse(),
    [actions]
  );

  const decisionHistory = useMemo(
    () =>
      actions
        .filter((item) =>
          ["board_approved", "board_rejected", "needs_clarification"].includes(
            item.status
          )
        )
        .slice()
        .reverse(),
    [actions]
  );

  const stats = {
    awaiting: boardQueue.length,
    approved: actions.filter((item) => item.status === "board_approved").length,
    rejected: actions.filter((item) => item.status === "board_rejected").length,
    clarification: actions.filter((item) => item.status === "needs_clarification")
      .length,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[#020617]">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              Stoutt Property Management
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
              Board Review Portal
            </h1>
            <p className="mt-2 max-w-2xl text-white/60">
              Manager-reviewed BOS actions awaiting board decision.
            </p>
          </div>

          <a
            href="/portal/manager"
            className="hidden md:inline-flex rounded-2xl border border-yellow-400/30 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/10 transition"
          >
            Manager Portal
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Awaiting Review" value={stats.awaiting} />
          <StatCard label="Approved" value={stats.approved} />
          <StatCard label="Rejected" value={stats.rejected} />
          <StatCard label="Clarification" value={stats.clarification} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6 md:p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                Board Queue
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Items Awaiting Decision
              </h2>
              <p className="mt-2 text-white/55">
                These items were reviewed by management and are ready for board
                action.
              </p>
            </div>
          </div>

          {boardQueue.length === 0 ? (
            <EmptyState message="No manager-approved items are currently waiting for board review." />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {boardQueue.map((item) => (
                <ActionCard
                  key={item.id}
                  item={item}
                  onApprove={() => updateStatus(item.id, "board_approved")}
                  onReject={() => updateStatus(item.id, "board_rejected")}
                  onClarify={() => updateStatus(item.id, "needs_clarification")}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.015] p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              Decision History
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Recent Board Actions</h2>
          </div>

          {decisionHistory.length === 0 ? (
            <EmptyState message="No board decisions have been recorded yet." />
          ) : (
            <div className="space-y-4">
              {decisionHistory.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#020617]/80 p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.title || item.requestType || "BOS Action"}
                      </h3>
                      <p className="mt-1 text-sm text-white/55">
                        {item.description || item.notes || "No description provided."}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/55">
                    <Meta label="Association" value={item.association} />
                    <Meta label="Unit" value={item.unit} />
                    <Meta
                      label="Decision Date"
                      value={
                        item.boardDecisionAt
                          ? new Date(item.boardDecisionAt).toLocaleString()
                          : "Not recorded"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
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

function ActionCard({ item, onApprove, onReject, onClarify }) {
  return (
    <article className="rounded-3xl border border-yellow-500/10 bg-[#020617]/80 p-6 hover:border-yellow-400/30 hover:bg-white/[0.035] transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
            Manager Approved
          </p>
          <h3 className="mt-2 text-xl font-semibold">
            {item.title || item.requestType || "BOS Action"}
          </h3>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <p className="mt-4 text-white/70 leading-relaxed">
        {item.description || item.notes || "No description provided."}
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <Meta label="Association" value={item.association} />
        <Meta label="Owner" value={item.ownerName || item.owner} />
        <Meta label="Unit" value={item.unit} />
        <Meta label="Category" value={item.category || item.type} />
      </div>

      <div className="mt-6 rounded-2xl border border-yellow-500/10 bg-yellow-400/[0.04] p-4">
        <p className="text-sm font-medium text-yellow-300">Board Decision Needed</p>
        <p className="mt-1 text-sm text-white/55">
          Review the manager-approved action and record the board direction.
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onApprove}
          className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 transition"
        >
          Approve
        </button>

        <button
          onClick={onReject}
          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-400/20 transition"
        >
          Reject
        </button>

        <button
          onClick={onClarify}
          className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 transition"
        >
          Request Info
        </button>
      </div>
    </article>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-yellow-500/20 bg-white/[0.015] p-10 text-center">
      <p className="text-white/50">{message}</p>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className="mt-1 text-white/75">{value || "N/A"}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    manager_approved: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    board_approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    board_rejected: "border-red-400/30 bg-red-400/10 text-red-300",
    needs_clarification: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  };

  const labels = {
    manager_approved: "Manager Approved",
    board_approved: "Board Approved",
    board_rejected: "Board Rejected",
    needs_clarification: "Needs Clarification",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "border-white/10 bg-white/5 text-white/60"
      }`}
    >
      {labels[status] || status || "Unknown"}
    </span>
  );
}
