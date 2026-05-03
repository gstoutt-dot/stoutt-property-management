import { useEffect, useMemo, useState } from "react";

export default function BOSActionCenter() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    loadActions();
  }, []);

  function loadActions() {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");
    setActions(stored);
  }

  const filtered = useMemo(() => {
    let list = [...actions];

    if (filter === "intake") list = list.filter((a) => a.status === "new");
    if (filter === "manager") list = list.filter((a) => a.status === "manager_approved");
    if (filter === "board") list = list.filter((a) => a.status === "board_approved");
    if (filter === "dispatch") list = list.filter((a) => a.dispatched);
    if (filter === "clarification") list = list.filter((a) => a.status === "needs_clarification");
    if (filter === "vendor") list = list.filter((a) => a.vendorStatus);

    if (sort === "newest") {
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    if (sort === "oldest") {
      list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    }

    if (sort === "priority") {
      list.sort((a, b) => getPriorityScore(b) - getPriorityScore(a));
    }

    return list;
  }, [actions, filter, sort]);

  const stats = {
    total: actions.length,
    intake: actions.filter((a) => a.status === "new").length,
    manager: actions.filter((a) => a.status === "manager_approved").length,
    board: actions.filter((a) => a.status === "board_approved").length,
    dispatched: actions.filter((a) => a.dispatched).length,
    clarification: actions.filter((a) => a.status === "needs_clarification").length,
    vendor: actions.filter((a) => a.vendorStatus).length,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-7 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              BOS SYSTEM
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
              Action Center
            </h1>
            <p className="mt-2 text-white/60">
              Lifecycle visibility from Ava intake through board approval, dispatch, and vendor response.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <a href="/portal/manager" className="navGold">Manager</a>
            <a href="/portal/board" className="navBtn">Board</a>
            <a href="/bos/dispatch-feed" className="navBtn">Dispatch</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Intake" value={stats.intake} />
          <Stat label="Manager" value={stats.manager} />
          <Stat label="Board" value={stats.board} />
          <Stat label="Dispatched" value={stats.dispatched} />
          <Stat label="Clarification" value={stats.clarification} />
          <Stat label="Vendor" value={stats.vendor} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex gap-3 flex-wrap">
            {["all", "intake", "manager", "board", "dispatch", "clarification", "vendor"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  filter === f
                    ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                    : "border-white/10 bg-white/[0.015] text-white/60 hover:border-yellow-400/25 hover:text-yellow-300"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-yellow-400/20 bg-[#020617] px-4 py-3 text-sm text-yellow-300 outline-none focus:border-yellow-400/50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority First</option>
          </select>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6 md:p-8 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              OPERATING TIMELINE
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Request Progression</h2>
            <p className="mt-2 text-white/55">
              Every action shows where it sits in the SPM/BOS approval chain.
            </p>
          </div>

          {filtered.length === 0 ? (
            <Empty filter={filter} />
          ) : (
            <div className="space-y-5">
              {filtered.map((item) => (
                <ActionRow
                  key={item.id}
                  item={item}
                  onOpen={() => setSelectedAction(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedAction && (
        <DetailDrawer
          item={selectedAction}
          onClose={() => setSelectedAction(null)}
        />
      )}

      <style jsx>{`
        .navBtn {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          transition: all 0.2s ease;
        }
        .navBtn:hover {
          border-color: rgba(250,204,21,0.3);
          color: rgb(253,224,71);
        }
        .navGold {
          border: 1px solid rgba(250,204,21,0.3);
          border-radius: 1rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgb(253,224,71);
          transition: all 0.2s ease;
        }
        .navGold:hover {
          background: rgba(250,204,21,0.1);
        }
      `}</style>
    </main>
  );
}

function ActionRow({ item, onOpen }) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer rounded-3xl border border-white/10 bg-[#020617]/80 p-6 hover:border-yellow-400/30 hover:bg-white/[0.025] transition"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
            BOS Action
          </p>
          <h3 className="mt-2 text-xl font-semibold group-hover:text-yellow-100 transition">
            {item.title || item.requestType || "BOS Action"}
          </h3>
          <p className="mt-3 text-white/65 leading-relaxed">
            {item.description || item.notes || "No description provided."}
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3">
          <Badge item={item} />
          <VendorBadge status={item.vendorStatus} />
          <span className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300 group-hover:bg-yellow-400/20 transition">
            View Details
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        <Meta label="Association" value={item.association} />
        <Meta label="Owner" value={item.ownerName || item.owner} />
        <Meta label="Unit" value={item.unit} />
        <Meta label="Category" value={item.category || item.type} />
      </div>

      <Timeline item={item} />
    </article>
  );
}

function Timeline({ item }) {
  const steps = [
    { key: "intake", label: "Ava Intake", complete: true, date: item.createdAt },
    {
      key: "manager",
      label: "Manager Review",
      complete:
        item.status === "manager_approved" ||
        item.status === "board_approved" ||
        item.status === "board_rejected" ||
        item.status === "needs_clarification" ||
        item.dispatched,
      date: item.managerUpdatedAt || item.managerDecisionAt,
    },
    {
      key: "board",
      label: "Board Decision",
      complete:
        item.status === "board_approved" ||
        item.status === "board_rejected" ||
        item.status === "needs_clarification" ||
        item.dispatched,
      date: item.boardDecisionAt,
    },
    {
      key: "dispatch",
      label: "Vendor Dispatch",
      complete: Boolean(item.dispatched),
      date: item.dispatchedAt,
    },
    {
      key: "vendor",
      label: "Vendor Response",
      complete: Boolean(item.vendorStatus),
      date: item.vendorUpdatedAt,
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-yellow-500/10 bg-yellow-400/[0.035] p-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div key={step.key} className="relative">
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 rounded-full border flex items-center justify-center text-sm font-semibold ${
                  step.complete
                    ? "border-yellow-400/40 bg-yellow-400/15 text-yellow-300"
                    : "border-white/10 bg-white/[0.03] text-white/35"
                }`}
              >
                {step.complete ? "✓" : index + 1}
              </div>

              <div>
                <p className={step.complete ? "text-white font-medium" : "text-white/40"}>
                  {step.label}
                </p>
                <p className="text-xs text-white/40">
                  {step.date
                    ? new Date(step.date).toLocaleString()
                    : step.complete
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden md:block absolute left-10 top-4 h-px w-[calc(100%-2.5rem)] bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailDrawer({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close drawer overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-yellow-500/10 bg-[#020617] p-6 shadow-2xl shadow-black">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              Action Detail
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              {item.title || item.requestType || "BOS Action"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3 py-2 text-white/60 hover:border-yellow-400/30 hover:text-yellow-300 transition"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Badge item={item} />
          <VendorBadge status={item.vendorStatus} />
          <PriorityBadge item={item} />
        </div>

        <div className="mt-6 rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/70">
            Request Summary
          </p>
          <p className="mt-3 text-white/70 leading-relaxed">
            {item.description || item.notes || "No description provided."}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Meta label="Association" value={item.association} />
          <Meta label="Owner" value={item.ownerName || item.owner} />
          <Meta label="Unit" value={item.unit} />
          <Meta label="Category" value={item.category || item.type} />
          <Meta label="Status" value={formatStatus(item.status)} />
          <Meta label="Vendor Status" value={formatVendorStatus(item.vendorStatus)} />
          <Meta
            label="Dispatch Lock"
            value={item.dispatchLocked || item.dispatched ? "Locked" : "Open"}
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

        <div className="mt-6 rounded-3xl border border-yellow-500/10 bg-yellow-400/[0.035] p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/70">
            Vendor Response
          </p>

          <div className="mt-4">
            <VendorBadge status={item.vendorStatus} />
          </div>

          <p className="mt-4 text-white/70 leading-relaxed">
            {item.vendorNote || "No vendor response has been recorded yet."}
          </p>
        </div>

        <div className="mt-6">
          <Timeline item={item} />
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.015] p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/70">
            Audit Trail
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <AuditLine
              label="Created"
              value={item.createdAt ? new Date(item.createdAt).toLocaleString() : "Not recorded"}
            />
            <AuditLine
              label="Manager Updated"
              value={
                item.managerUpdatedAt || item.managerDecisionAt
                  ? new Date(item.managerUpdatedAt || item.managerDecisionAt).toLocaleString()
                  : "Not recorded"
              }
            />
            <AuditLine
              label="Board Decision"
              value={item.boardDecisionAt ? new Date(item.boardDecisionAt).toLocaleString() : "Not recorded"}
            />
            <AuditLine
              label="Dispatch"
              value={
                item.dispatchedAt
                  ? new Date(item.dispatchedAt).toLocaleString()
                  : item.dispatched
                  ? "Dispatched"
                  : "Not dispatched"
              }
            />
            <AuditLine
              label="Vendor Response"
              value={
                item.vendorUpdatedAt
                  ? `${formatVendorStatus(item.vendorStatus)} — ${new Date(item.vendorUpdatedAt).toLocaleString()}`
                  : "Not recorded"
              }
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Badge({ item }) {
  if (item.dispatched) return <Pill text="Dispatched" tone="green" />;

  return (
    <Pill
      text={formatStatus(item.status)}
      tone={statusTone(item.status)}
    />
  );
}

function VendorBadge({ status }) {
  return (
    <Pill
      text={formatVendorStatus(status)}
      tone={vendorTone(status)}
    />
  );
}

function PriorityBadge({ item }) {
  const score = getPriorityScore(item);

  if (score >= 4) return <Pill text="High Priority" tone="red" />;
  if (score >= 2) return <Pill text="Medium Priority" tone="gold" />;
  return <Pill text="Standard Priority" tone="neutral" />;
}

function Pill({ text, tone }) {
  const styles = {
    gold: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    red: "border-red-400/30 bg-red-400/10 text-red-300",
    blue: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    neutral: "border-white/10 bg-white/5 text-white/60",
  };

  return (
    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone] || styles.neutral}`}>
      {text}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-yellow-500/10 bg-white/[0.025] p-5">
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-yellow-300">{value}</p>
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

function AuditLine({ label, value }) {
  return (
    <div className="flex justify-between gap-4 rounded-xl border border-white/10 bg-[#020617]/70 p-3">
      <span className="text-white/45">{label}</span>
      <span className="text-right text-white/75">{value}</span>
    </div>
  );
}

function Empty({ filter }) {
  return (
    <div className="rounded-3xl border border-dashed border-yellow-500/20 bg-white/[0.015] p-10 text-center">
      <p className="text-xl font-semibold text-white/80">No actions found</p>
      <p className="mt-2 text-white/50">
        There are no BOS actions in the <span className="text-yellow-300">{filter}</span> view yet.
      </p>
      <p className="mt-4 text-sm text-white/35">
        New activity will appear here as Ava, managers, board members, vendors, and dispatch events update the workflow.
      </p>
    </div>
  );
}

function formatStatus(status) {
  const labels = {
    new: "New Intake",
    manager_approved: "Manager Approved",
    board_approved: "Board Approved",
    board_rejected: "Board Rejected",
    needs_clarification: "Needs Clarification",
  };

  return labels[status] || status || "Unknown";
}

function statusTone(status) {
  const tones = {
    new: "blue",
    manager_approved: "gold",
    board_approved: "green",
    board_rejected: "red",
    needs_clarification: "blue",
  };

  return tones[status] || "neutral";
}

function formatVendorStatus(status) {
  const labels = {
    accepted: "Vendor Accepted",
    in_progress: "Vendor In Progress",
    completed: "Vendor Completed",
  };

  return labels[status] || "Awaiting Vendor";
}

function vendorTone(status) {
  const tones = {
    accepted: "blue",
    in_progress: "gold",
    completed: "green",
  };

  return tones[status] || "neutral";
}

function getPriorityScore(item) {
  const text = `${item.title || ""} ${item.description || ""} ${item.notes || ""} ${item.category || ""}`.toLowerCase();

  let score = 0;

  if (text.includes("leak")) score += 4;
  if (text.includes("water")) score += 3;
  if (text.includes("electrical")) score += 4;
  if (text.includes("fire")) score += 5;
  if (text.includes("security")) score += 4;
  if (text.includes("gate")) score += 2;
  if (text.includes("roof")) score += 3;
  if (text.includes("pool")) score += 2;
  if (text.includes("urgent")) score += 4;
  if (item.status === "needs_clarification") score += 1;
  if (item.dispatched && !item.vendorStatus) score += 2;

  return score;
}
