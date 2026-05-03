import { useEffect, useMemo, useState } from "react";

export default function BOSActionCenter() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

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

  return (
    <main className="min-h-screen bg-[#020617] text-white relative">
      {/* HEADER */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-7 flex justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              BOS SYSTEM
            </p>
            <h1 className="text-3xl font-semibold mt-2">Action Center</h1>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="max-w-7xl mx-auto px-6 py-6 flex gap-3 flex-wrap">
        {["all", "intake", "manager", "board", "dispatch", "clarification"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border text-sm ${
              filter === f
                ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                : "border-white/10 text-white/60"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </section>

      {/* LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="cursor-pointer rounded-2xl border border-white/10 bg-[#020617]/80 p-5 hover:border-yellow-400/30 transition"
            >
              <h3 className="font-semibold">{item.title || "BOS Action"}</h3>
              <p className="text-sm text-white/60 mt-1">
                {item.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DRAWER */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelected(null)}
          />

          <div className="ml-auto w-full md:w-[480px] h-full bg-[#020617] border-l border-yellow-500/10 p-6 overflow-y-auto relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold">
              {selected.title || "BOS Action"}
            </h2>

            <p className="text-white/60 mt-3">
              {selected.description || "No description provided."}
            </p>

            {/* META */}
            <div className="mt-6 space-y-3 text-sm">
              <Meta label="Association" value={selected.association} />
              <Meta label="Unit" value={selected.unit} />
              <Meta label="Category" value={selected.category} />
              <Meta label="Status" value={selected.status} />
            </div>

            {/* TIMELINE */}
            <div className="mt-8">
              <h3 className="text-sm text-yellow-400 mb-4">Timeline</h3>
              <Timeline item={selected} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Timeline({ item }) {
  const steps = [
    { label: "Ava Intake", done: true },
    { label: "Manager", done: item.status !== "new" },
    {
      label: "Board",
      done:
        item.status === "board_approved" ||
        item.status === "board_rejected" ||
        item.status === "needs_clarification",
    },
    { label: "Dispatch", done: item.dispatched },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className={`h-6 w-6 rounded-full ${
              step.done ? "bg-yellow-400" : "bg-white/20"
            }`}
          />
          <span className={step.done ? "text-white" : "text-white/40"}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <span className="text-white/40">{label}:</span>{" "}
      <span className="text-white/80">{value || "N/A"}</span>
    </div>
  );
}
