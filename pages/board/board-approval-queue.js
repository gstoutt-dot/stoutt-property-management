import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/bosClient";

export default function BoardApprovalQueue() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadApprovals();

    const interval = setInterval(() => {
      loadApprovals();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadApprovals() {
    try {
      setLoading(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("bos_actions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setActions(data || []);
    } catch (error) {
      console.error("Unable to load board approval queue:", error);
      setSystemMessage("Unable to load board approval queue.");
      setActions([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateApproval(action, newStatus, eventType, message) {
    const { data, error } = await supabase
      .from("bos_actions")
      .update({ status: newStatus })
      .eq("id", action.id)
      .select()
      .single();

    if (!error && data) {
      await supabase.from("bos_events").insert([
        {
          action_id: action.id,
          event_type: eventType,
          message,
          module: "Board Approval Queue",
        },
      ]);
    }

    await loadApprovals();
  }

  const approvalItems = useMemo(() => {
    return actions.filter((action) => {
      const status = String(action.status || "open").toLowerCase();

      const combined = `${action.title || ""} ${action.description || ""} ${
        action.category || ""
      } ${action.request_type || ""} ${action.recommended_action || ""}`.toLowerCase();

      const sentForBoardApproval =
        combined.includes("board approval") ||
        combined.includes("approval needed") ||
        combined.includes("pending vote") ||
        combined.includes("vote needed") ||
        combined.includes("board review") ||
        combined.includes("approve");

      return status !== "completed" && sentForBoardApproval;
    });
  }, [actions]);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Decision Center
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Board Approval Queue
            </h1>
          </div>

          <Link
            href="/board"
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Return to Board Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Approval Only
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Items sent specifically for board approval appear here.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Admin and Management create and route approval items. The board can
            acknowledge, approve, request more information, or record a decision
            without entering the Admin Dashboard.
          </p>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Metric label="Approval Items" value={approvalItems.length} />
          <Metric
            label="Pending Review"
            value={
              approvalItems.filter(
                (item) => String(item.status || "open").toLowerCase() === "open"
              ).length
            }
          />
          <Metric
            label="In Progress"
            value={
              approvalItems.filter(
                (item) => String(item.status || "").toLowerCase() === "in_progress"
              ).length
            }
          />
        </div>

        <section className="mt-10 space-y-5">
          {loading ? (
            <Empty message="Loading board approval items..." />
          ) : approvalItems.length === 0 ? (
            <Empty message="No board approval items are currently active." />
          ) : (
            approvalItems.map((action) => (
              <article
                key={action.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{action.id}</Badge>
                      <Badge>{action.category || action.request_type || "Approval"}</Badge>
                      <Badge>{action.status || "Open"}</Badge>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold">
                      {action.title || "Board Approval Item"}
                    </h3>

                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
                      {action.description ||
                        action.recommended_action ||
                        "This item was routed for board approval."}
                    </p>
                  </div>

                  <div className="grid min-w-[260px] gap-3">
                    <button
                      onClick={() =>
                        updateApproval(
                          action,
                          "board_acknowledged",
                          "board_acknowledged",
                          `Board acknowledged: ${action.title}`
                        )
                      }
                      className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20"
                    >
                      Acknowledge
                    </button>

                    <button
                      onClick={() =>
                        updateApproval(
                          action,
                          "board_approved",
                          "board_approved",
                          `Board approved: ${action.title}`
                        )
                      }
                      className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateApproval(
                          action,
                          "more_info_requested",
                          "more_info_requested",
                          `Board requested more information: ${action.title}`
                        )
                      }
                      className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-400/20"
                    >
                      Request More Info
                    </button>

                    <button
                      onClick={() =>
                        updateApproval(
                          action,
                          "decision_recorded",
                          "decision_recorded",
                          `Board decision recorded: ${action.title}`
                        )
                      }
                      className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-3 text-sm font-semibold text-violet-300 hover:bg-violet-400/20"
                    >
                      Record Decision
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold text-amber-300">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
      {children}
    </span>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}
