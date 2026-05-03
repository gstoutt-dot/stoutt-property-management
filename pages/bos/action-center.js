import { useEffect, useMemo, useState } from "react";

export default function BOSActionCenter() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadActions();
  }, []);

  function loadActions() {
    const stored = JSON.parse(localStorage.getItem("bos_actions") || "[]");
    setActions(stored.reverse());
  }

  const filtered = useMemo(() => {
    if (filter === "all") return actions;

    return actions.filter((a) => {
      if (filter === "intake") return a.status === "new";
      if (filter === "manager") return a.status === "manager_approved";
      if (filter === "board") return a.status === "board_approved";
      if (filter === "dispatch") return a.dispatched;
      return true;
    });
  }, [actions, filter]);

  const stats = {
    total: actions.length,
    intake: actions.filter((a) => a.status === "new").length,
    manager: actions.filter((a) => a.status === "manager_approved").length,
    board: actions.filter((a) => a.status === "board_approved").length,
    dispatched: actions.filter((a) => a.dispatched).length,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* HEADER */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-7 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              BOS System
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold mt-2">
              Action Center
            </h1>
            <p className="text-white/60 mt-2">
              Full lifecycle visibility across all requests
            </p>
          </div>

          <a
            href="/portal/manager"
            className="hidden md:inline-flex border border-yellow-400/30 px-5 py-3 rounded-2xl text-yellow-300 hover:bg-yellow-400/10 transition"
          >
            Manager Portal
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-5 gap-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Intake" value={stats.intake} />
          <Stat label="Manager" value={stats.manager} />
          <Stat label="Board" value={stats.board} />
          <Stat label="Dispatched" value={stats.dispatched} />
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex gap-3 flex-wrap">
          {["all", "intake", "manager", "board", "dispatch"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl border text-sm ${
                filter === f
                  ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                  : "border-white/10 text-white/60 hover:border-yellow-400/20"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* ACTION LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6">
          {filtered.length === 0 ? (
            <Empty message="No actions in this stage." />
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => (
                <Row key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Row({ item }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#020617]/80 p-5 flex flex-col md:flex-row md:justify-between gap-4">
      <div>
        <h3 className="font-semibold text-lg">
          {item.title || "BOS Action"}
        </h3>
        <p className="text-white/60 text-sm mt-1">
          {item.description || "No description"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Badge item={item} />
      </div>
    </div>
  );
}

function Badge({ item }) {
  if (item.dispatched) {
    return (
      <span className="px-3 py-1 rounded-full text-xs border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
        Dispatched
      </span>
    );
  }

  const map = {
    new: "text-blue-300 border-blue-400/30 bg-blue-400/10",
    manager_approved:
      "text-yellow-300 border-yellow-400/30 bg-yellow-400/10",
    board_approved:
      "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border ${
        map[item.status] || "border-white/10 text-white/50"
      }`}
    >
      {item.status || "unknown"}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-yellow-500/10 bg-white/[0.025] p-5">
      <p className="text-sm text-white/55">{label}</p>
      <p className="text-2xl mt-2 text-yellow-300 font-semibold">
        {value}
      </p>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="text-center text-white/50 p-10 border border-dashed border-yellow-500/20 rounded-2xl">
      {message}
    </div>
  );
}
