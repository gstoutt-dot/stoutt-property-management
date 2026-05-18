import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function BoardApprovalQueue() {
  const [actions, setActions] = useState([]);
  const [sortMode, setSortMode] = useState("newest");
  const [updatingId, setUpdatingId] = useState(null);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadBoardQueue();

    const interval = setInterval(() => {
      loadBoardQueue();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadBoardQueue() {
    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .in("status", ["board_review"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load board approval queue:", error);
      setSystemMessage("Unable to load board approval queue.");
      return;
    }

    setActions(data || []);
  }

  async function updateBoardAction(item, decision) {
    if (!item?.id) return;

    setUpdatingId(item.id);
    setSystemMessage("");

    const now = new Date().toISOString();

    const decisionMap = {
      approve: {
        status: "board_approved",
        board_decision: "approved",
        board_decision_at: now,
        internal_note: "Board approved request.",
      },
      request_clarification: {
        status: "needs_clarification",
        board_decision: "clarification_requested",
        board_decision_at: now,
        internal_note: "Board requested clarification.",
      },
      return_to_manager: {
        status: "manager_review",
        board_decision: "returned_to_manager",
        board_decision_at: now,
        internal_note: "Board returned request to manager review.",
      },
      dispatch_vendor: {
        status: "dispatched",
        board_decision: "approved_for_dispatch",
        board_decision_at: now,
        dispatched: true,
        dispatched_at: now,
        vendor_status: "pending",
        internal_note: "Board approved and vendor dispatch was initiated.",
      },
    };

    const fullPayload = decisionMap[decision];

    if (!fullPayload) {
      setUpdatingId(null);
      return;
    }

    const { error } = await supabase
      .from("bos_actions")
      .update(fullPayload)
      .eq("id", item.id);

    if (error) {
      console.warn("Full board update failed. Retrying with core fields.", error);

      const fallbackPayload = buildFallbackPayload(decision);

      const { error: fallbackError } = await supabase
        .from("bos_actions")
        .update(fallbackPayload)
        .eq("id", item.id);

      if (fallbackError) {
        console.error("Fallback board update failed:", fallbackError);
        setSystemMessage("Board action failed. Check Supabase column names.");
        setUpdatingId(null);
        return;
      }
    }

    await loadBoardQueue();
    setSystemMessage(getDecisionMessage(decision));
    setUpdatingId(null);
  }

  const sortedActions = useMemo(() => {
    const queue = [...actions];

    if (sortMode === "oldest") {
      queue.sort(
        (a, b) =>
          new Date(a.created_at || 0) - new Date(b.created_at || 0)
      );
    } else {
      queue.sort(
        (a, b) =>
          new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    }

    return queue;
  }, [actions, sortMode]);

  const highPriority = actions.filter(
    (a) => String(a.priority || "").toLowerCase() === "high"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide">
            Stoutt Board Portal
          </Link>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
  <Link href="/board">Board Dashboard</Link>
</nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Review Center
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Approval Queue
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
  Review requests submitted for board approval, vendor authorization,
  financial decisions, and community operations.
</p>

          <div className="mt-7 flex flex-wrap gap-3">
            
            <Link
              href="/portal/board"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
            >
              Back to Board Hub
            </Link>
          </div>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Live Approval Queue</h2>

                <p className="mt-2 text-sm text-slate-400">
                  Items currently routed to board review from the BOS Action
                  Center.
                </p>
              </div>

              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="rounded-2xl border border-amber-400/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-300 outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {sortedActions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-amber-400/20 bg-slate-900/60 p-10 text-center text-slate-400">
                No BOS actions are currently waiting for board review.
              </div>
            ) : (
              <div className="space-y-5">
                {sortedActions.map((item) => (
                  <ApprovalCard
                    key={item.id}
                    item={item}
                    onDecision={updateBoardAction}
                    updatingId={updatingId}
                  />
                ))}
              </div>
            )}
          </div>

          </section>

        </section>
    </main>
  );
}

function ApprovalCard({ item, onDecision, updatingId }) {
  const busy = updatingId === item.id;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            {formatCategory(item.category || item.request_type)} ·{" "}
            {titleCase(item.priority || "Medium")} Priority
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {item.title || "BOS Board Review Item"}
          </h3>
        </div>

        <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
          Board Review
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-300/[0.04] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
          Operational Summary
        </p>

        <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
          {cleanDescription(item.description)}
        </div>
      </div>

      <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
        <p>
          <span className="text-slate-500">Association:</span>{" "}
          {item.association_name || "Demo Association"}
        </p>

        <p>
          <span className="text-slate-500">Owner:</span>{" "}
          {item.owner_name || "Ava Caller"}
        </p>

        <p>
          <span className="text-slate-500">Property / Unit:</span>{" "}
          {item.property_address || "Pending"}
        </p>

        <p>
          <span className="text-slate-500">Created:</span>{" "}
          {item.created_at ? new Date(item.created_at).toLocaleString() : "N/A"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <DecisionButton
          label="Approve"
          disabled={busy}
          onClick={() => onDecision(item, "approve")}
        />

        <DecisionButton
          label="Dispatch Vendor"
          disabled={busy}
          strong
          onClick={() => onDecision(item, "dispatch_vendor")}
        />

        <DecisionButton
          label="Request Clarification"
          disabled={busy}
          onClick={() => onDecision(item, "request_clarification")}
        />

        <DecisionButton
          label="Return to Manager"
          disabled={busy}
          onClick={() => onDecision(item, "return_to_manager")}
        />
      </div>
    </div>
  );
}

function DecisionButton({ label, onClick, disabled, strong }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${
        strong
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
          : "border-amber-400/25 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"
      }`}
    >
      {disabled ? "Updating..." : label}
    </button>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        highlight
          ? "border-emerald-400/40 bg-emerald-400/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="text-sm text-slate-400">{label}</div>

      <div
        className={`mt-2 text-2xl font-black ${
          highlight ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function cleanDescription(description) {
  if (!description) {
    return "No operational summary available.";
  }

  return String(description)
    .replace(/Caller:/g, "\n\nCaller:")
    .replace(/Phone:/g, "\nPhone:")
    .replace(/Unit\/Address:/g, "\nUnit/Address:")
    .replace(/Category:/g, "\nCategory:")
    .replace(/Priority:/g, "\nPriority:")
    .replace(/Source:/g, "\n\nSource:")
    .trim();
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCategory(category) {
  return titleCase(String(category || "General").replace(/_/g, " "));
}

function buildFallbackPayload(decision) {
  if (decision === "approve") {
    return { status: "board_approved" };
  }

  if (decision === "request_clarification") {
    return { status: "needs_clarification" };
  }

  if (decision === "return_to_manager") {
    return { status: "manager_review" };
  }

  if (decision === "dispatch_vendor") {
    return { status: "dispatched", dispatched: true };
  }

  return { status: "board_review" };
}

function getDecisionMessage(decision) {
  const messages = {
    approve: "Board approved the request.",
    request_clarification: "Board requested clarification.",
    return_to_manager: "Request returned to manager review.",
    dispatch_vendor: "Board approved and vendor dispatch was initiated.",
  };

  return messages[decision] || "Board queue updated.";
}
