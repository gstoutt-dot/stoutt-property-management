import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const BOARD_DECISION_STATUSES = ["board_review", "approved", "rejected"];

function statusLabel(status) {
  if (status === "open") return "Request Received";
  if (status === "in_progress") return "Management Review";
  if (status === "board_review") return "Board Review";
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  if (status === "completed") return "Completed";
  return "Request Received";
}

function requestTypeLabel(type) {
  if (type === "maintenance") return "Maintenance";
  if (type === "architectural") return "Architectural";
  if (type === "amenity") return "Amenity";
  if (type === "financial") return "Financial";
  if (type === "violation") return "Violation";
  if (type === "documents") return "Documents";
  return "General";
}

export default function BoardActionCenter() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("board_review");
  const [loading, setLoading] = useState(true);
  const [decisionNotes, setDecisionNotes] = useState({});
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    loadItems();
    loadSavedNotes();
  }, []);

  function loadSavedNotes() {
    const saved = localStorage.getItem("bos_board_decision_notes");
    if (saved) setDecisionNotes(JSON.parse(saved));
  }

  function saveNotes(nextNotes) {
    setDecisionNotes(nextNotes);
    localStorage.setItem("bos_board_decision_notes", JSON.stringify(nextNotes));
  }

  async function loadItems() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setItems(data || []);
    }

    setLoading(false);
  }

  async function logBoardEvent(item, decision, note) {
    try {
      await supabase.from("bos_events").insert([
        {
          message: `Board ${decision}: ${item.title || "Association request"}${
            note ? ` — ${note}` : ""
          }`,
        },
      ]);
    } catch {
      // Event logging is optional. Status update is the source of truth.
    }
  }

  async function makeDecision(item, nextStatus, decisionText) {
    setFeedback("");

    const note = decisionNotes[item.id]?.trim() || "";

    const { error } = await supabase
      .from("bos_actions")
      .update({ status: nextStatus })
      .eq("id", item.id);

    if (error) {
      setFeedback(error.message || "Decision could not be saved.");
      return;
    }

    await logBoardEvent(item, decisionText, note);

    setFeedback(`${decisionText} saved successfully.`);
    await loadItems();
  }

  function updateNote(id, value) {
    saveNotes({
      ...decisionNotes,
      [id]: value,
    });
  }

  const counts = useMemo(() => {
    return {
      total: items.length,
      board_review: items.filter((i) => i.status === "board_review").length,
      approved: items.filter((i) => i.status === "approved").length,
      rejected: items.filter((i) => i.status === "rejected").length,
      high_priority: items.filter(
        (i) => i.priority === "high" && i.status !== "completed"
      ).length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "board_related") {
      return items.filter((i) => BOARD_DECISION_STATUSES.includes(i.status));
    }
    return items.filter((i) => i.status === filter);
  }, [items, filter]);

  const statusStyles = {
    open: "border-slate-400/30 bg-slate-400/10 text-slate-300",
    in_progress: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    board_review: "border-purple-400/30 bg-purple-400/10 text-purple-300",
    approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    rejected: "border-red-400/30 bg-red-400/10 text-red-300",
    completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  };

  const priorityStyles = {
    high: "border-red-400/30 bg-red-400/10 text-red-300",
    medium: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    low: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
                Board Decision Layer
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Board Action Center
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Review management-escalated items, approve or reject requests,
                and send decisions back into the BOS workflow for manager
                execution.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/board/command-center"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                Command Center
              </Link>

              <button
                onClick={loadItems}
                className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-900/20 hover:bg-amber-300"
              >
                Refresh Board Queue
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <Metric label="Total BOS Items" value={counts.total} />
            <Metric label="Awaiting Board" value={counts.board_review} highlight />
            <Metric label="Approved" value={counts.approved} />
            <Metric label="Rejected" value={counts.rejected} />
            <Metric label="Active High Priority" value={counts.high_priority} danger />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {feedback && (
          <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm font-medium text-emerald-300">
            {feedback}
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-5">
          {[
            ["board_review", "Awaiting Board"],
            ["approved", "Approved"],
            ["rejected", "Rejected"],
            ["board_related", "Board Related"],
            ["all", "All Items"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-2xl border p-5 text-left transition ${
                filter === key
                  ? "border-amber-400/40 bg-amber-400/10 shadow-xl shadow-amber-900/20"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-2 text-2xl font-semibold">
                {key === "all"
                  ? counts.total
                  : key === "board_related"
                  ? items.filter((i) => BOARD_DECISION_STATUSES.includes(i.status)).length
                  : items.filter((i) => i.status === key).length}
              </div>
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-2xl font-semibold">Board Review Queue</h2>
            <p className="mt-1 text-sm text-slate-400">
              Showing {filteredItems.length} item
              {filteredItems.length === 1 ? "" : "s"}.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {loading && (
              <div className="px-6 py-10 text-slate-400">
                Loading board action items...
              </div>
            )}

            {!loading && filteredItems.length === 0 && (
              <div className="px-6 py-10 text-slate-400">
                No board items found for this filter.
              </div>
            )}

            {!loading &&
              filteredItems.map((item) => (
                <div key={item.id} className="px-6 py-7">
                  <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            statusStyles[item.status] ||
                            "border-white/10 bg-white/5 text-slate-300"
                          }`}
                        >
                          {statusLabel(item.status)}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            priorityStyles[item.priority] ||
                            "border-white/10 bg-white/5 text-slate-300"
                          }`}
                        >
                          {item.priority || "normal"} priority
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                          {requestTypeLabel(item.request_type)}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold">
                        {item.title || "Untitled Board Item"}
                      </h3>

                      {item.description && (
                        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <Info label="Association" value={item.association_name || "—"} />
                        <Info label="Owner" value={item.owner_name || "—"} />
                        <Info label="Owner Phone" value={item.owner_phone || "—"} />
                        <Info label="Owner Email" value={item.owner_email || "—"} />
                        <Info label="Property / Unit" value={item.property_address || "—"} />
                        <Info
                          label="Submitted"
                          value={
                            item.created_at
                              ? new Date(item.created_at).toLocaleString()
                              : "—"
                          }
                        />
                      </div>

                      {item.request_type === "amenity" && (
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          <Info
                            label="Amenity Requested"
                            value={item.amenity_selected || "—"}
                          />
                          <Info
                            label="Amenity Date"
                            value={
                              item.amenity_date
                                ? new Date(item.amenity_date).toLocaleDateString()
                                : "—"
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-black/30 p-5">
                      <h4 className="text-lg font-semibold">Board Decision</h4>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Decision updates write directly to the BOS action record.
                        Approved items return to manager execution and vendor
                        workflow.
                      </p>

                      <textarea
                        value={decisionNotes[item.id] || ""}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Optional board note..."
                        rows={4}
                        className="mt-5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400/40"
                      />

                      <div className="mt-4 grid gap-3">
                        <button
                          onClick={() =>
                            makeDecision(item, "approved", "approved request")
                          }
                          className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20"
                        >
                          Approve Request
                        </button>

                        <button
                          onClick={() =>
                            makeDecision(
                              item,
                              "in_progress",
                              "requested more information"
                            )
                          }
                          className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-left text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20"
                        >
                          Request More Information
                        </button>

                        <button
                          onClick={() =>
                            makeDecision(item, "rejected", "rejected request")
                          }
                          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-left text-sm font-semibold text-red-300 hover:bg-red-400/20"
                        >
                          Reject Request
                        </button>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-5 text-slate-400">
                        Current status:{" "}
                        <span className="font-semibold text-amber-300">
                          {statusLabel(item.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value, highlight, danger }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        danger
          ? "border-red-400/40 bg-red-400/10"
          : highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="text-sm text-slate-400">{label}</div>
      <div
        className={`mt-2 text-3xl font-semibold ${
          danger ? "text-red-300" : highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-300">{value}</div>
    </div>
  );
}
