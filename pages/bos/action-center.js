import { useEffect, useMemo, useState } from "react";

export default function BOSActionCenter() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    loadActions();
  }, []);

  function loadActions() {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");
    setActions(stored.slice().reverse());
  }

  const filtered = useMemo(() => {
    if (filter === "all") return actions;
    if (filter === "intake") return actions.filter((a) => a.status === "new");
    if (filter === "manager") return actions.filter((a) => a.status === "manager_approved");
    if (filter === "board") return actions.filter((a) => a.status === "board_approved");
    if (filter === "dispatch") return actions.filter((a) => a.dispatched);
    if (filter === "clarification") return actions.filter((a) => a.status === "needs_clarification");
    return actions;
  }, [actions, filter]);

  const stats = {
    total: actions.length,
    intake: actions.filter((a) => a.status === "new").length,
    manager: actions.filter((a) => a.status === "manager_approved").length,
    board: actions.filter((a) => a.status === "board_approved").length,
    dispatched: actions.filter((a) => a.dispatched).length,
    clarification: actions.filter((a) => a.status === "needs_clarification").length,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* HEADER */}
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
              Lifecycle visibility from intake through dispatch and vendor response.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <a href="/portal/manager" className="btn-gold">Manager</a>
            <a href="/portal/board" className="btn">Board</a>
            <a href="/bos/dispatch-feed" className="btn">Dispatch</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Intake" value={stats.intake} />
          <Stat label="Manager" value={stats.manager} />
          <Stat label="Board" value={stats.board} />
          <Stat label="Dispatched" value={stats.dispatched} />
          <Stat label="Clarification" value={stats.clarification} />
        </div>
      </section>

      {/* FILTER */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex gap-3 flex-wrap">
          {["all","intake","manager","board","dispatch","clarification"].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className={`filter-btn ${filter===f ? "active" : ""}`}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6 md:p-8">
          {filtered.length === 0 ? (
            <Empty message="No actions in this stage." />
          ) : (
            <div className="space-y-5">
              {filtered.map(item => (
                <ActionRow key={item.id} item={item} onOpen={()=>setSelectedAction(item)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedAction && (
        <Drawer item={selectedAction} onClose={()=>setSelectedAction(null)} />
      )}
    </main>
  );
}

/* ROW */
function ActionRow({ item, onOpen }) {
  return (
    <div className="card">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">{item.title || "BOS Action"}</h3>
          <p className="text-white/60 mt-2">{item.description || "No description"}</p>
        </div>
        <Badge item={item} />
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Meta label="Unit" value={item.unit} />
        <Meta label="Category" value={item.category} />
        <Meta label="Status" value={item.status} />
        <Meta label="Vendor" value={item.vendorStatus || "Pending"} />
      </div>

      <button onClick={onOpen} className="btn-gold mt-4">View Details</button>

      <Timeline item={item} />
    </div>
  );
}

/* DRAWER */
function Drawer({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="overlay" onClick={onClose} />
      <div className="drawer">

        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <Badge item={item} />

        <div className="section">
          <h3>Request Summary</h3>
          <p>{item.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Meta label="Unit" value={item.unit} />
          <Meta label="Category" value={item.category} />
          <Meta label="Status" value={item.status} />
          <Meta label="Vendor Status" value={item.vendorStatus || "Awaiting"} />
        </div>

        {/* 🔥 NEW VENDOR BLOCK */}
        <div className="section">
          <h3>Vendor Response</h3>

          <VendorBadge status={item.vendorStatus} />

          <p className="mt-3 text-white/70">
            {item.vendorNote || "No vendor response yet."}
          </p>

          <p className="text-sm text-white/40 mt-2">
            {item.vendorUpdatedAt
              ? new Date(item.vendorUpdatedAt).toLocaleString()
              : ""}
          </p>
        </div>

        <Timeline item={item} />

      </div>
    </div>
  );
}

/* COMPONENTS */

function VendorBadge({ status }) {
  const map = {
    accepted: "text-blue-300",
    in_progress: "text-yellow-300",
    completed: "text-green-300"
  };
  return <span className={map[status] || "text-white/40"}>{status || "Awaiting Vendor"}</span>;
}

function Badge({ item }) {
  if (item.dispatched) return <span className="text-green-300">Dispatched</span>;
  return <span className="text-yellow-300">{item.status}</span>;
}

function Timeline({ item }) {
  return (
    <div className="mt-5 text-sm text-white/50">
      Timeline: Intake → Manager → Board → Dispatch → Vendor
    </div>
  );
}

function Meta({ label, value }) {
  return <div><span className="text-white/40">{label}:</span> {value || "N/A"}</div>;
}

function Stat({ label, value }) {
  return <div className="stat">{label}: {value}</div>;
}

function Empty({ message }) {
  return <div className="text-white/50 text-center p-10">{message}</div>;
}
