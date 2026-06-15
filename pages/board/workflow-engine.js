import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/bosClient";

export default function WorkflowEngine() {
  const router = useRouter();

  const [associationId, setAssociationId] = useState("");
  const [associationName, setAssociationName] = useState("Selected Association");
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const queryAssociationId =
      router.query.association_id || router.query.associationId || "";

    const queryAssociationName =
      router.query.association_name || router.query.associationName || "";

    const storedAssociationId =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedAssociationId") ||
          localStorage.getItem("spm_selected_association_id") ||
          localStorage.getItem("association_id") ||
          localStorage.getItem("associationId") ||
          ""
        : "";

    const storedAssociationName =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedAssociationName") ||
          localStorage.getItem("association_name") ||
          localStorage.getItem("associationName") ||
          "Selected Association"
        : "Selected Association";

    const finalAssociationId = String(
      queryAssociationId || storedAssociationId || ""
    ).trim();

    const finalAssociationName = String(
      queryAssociationName || storedAssociationName || "Selected Association"
    ).trim();

    if (!finalAssociationId) {
      setSystemMessage(
        "No association context found. Please return to the board dashboard and reopen this page."
      );
      setLoading(false);
      return;
    }

    setAssociationId(finalAssociationId);
    setAssociationName(finalAssociationName);

    localStorage.setItem("selectedAssociationId", finalAssociationId);
    localStorage.setItem("spm_selected_association_id", finalAssociationId);
    localStorage.setItem("selectedAssociationName", finalAssociationName);
  }, [router.isReady, router.query]);

    async function fetchActions() {
    try {
      setLoading(true);
      setSystemMessage("");

      if (!associationId) {
        setActions([]);
        setSystemMessage("No association context found.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("bos_actions")
        .select("*")
        .eq("association_id", associationId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setActions(data || []);
    } catch (error) {
      console.error("Unable to load workflow actions:", error);
      setSystemMessage("Unable to load workflow actions.");
      setActions([]);
    } finally {
      setLoading(false);
    }
  }

    useEffect(() => {
    if (!associationId) return;

    fetchActions();

    const interval = setInterval(() => {
      fetchActions();
    }, 30000);

    return () => clearInterval(interval);
  }, [associationId]);

    async function moveAction(id, newStatus, title) {
    if (!associationId) {
      setSystemMessage("Association ID is required to update workflow actions.");
      return;
    }

    const { data, error } = await supabase
      .from("bos_actions")
      .update({ status: newStatus })
      .eq("id", id)
      .eq("association_id", associationId)
      .select()
      .single();

    if (error) {
      console.error("Unable to update workflow action:", error);
      setSystemMessage("Unable to update workflow action.");
      return;
    }

    if (data) {
      let eventType = "status_change";
      let message = `Status changed to ${newStatus}`;

      if (newStatus === "in_progress") {
        eventType = "workflow_started";
        message = `Workflow started: ${title}`;
      }

      if (newStatus === "completed") {
        eventType = "action_completed";
        message = `Action completed: ${title}`;
      }

      const { error: eventError } = await supabase.from("bos_events").insert([
        {
          action_id: id,
          association_id: associationId,
          event_type: eventType,
          message,
          module: "Board Workflow Engine",
        },
      ]);

      if (eventError) {
        console.warn("Workflow action updated, but event insert failed:", eventError);
      }
    }

    await fetchActions();
  }

  const openActions = useMemo(
    () => actions.filter((a) => !a.status || a.status === "open"),
    [actions]
  );

  const inProgressActions = useMemo(
    () => actions.filter((a) => a.status === "in_progress"),
    [actions]
  );

  const completedActions = useMemo(
    () => actions.filter((a) => a.status === "completed"),
    [actions]
  );

  const boardVisibleActions = useMemo(
    () =>
      actions.filter((action) => {
        const combined = `${action.title || ""} ${action.description || ""} ${
          action.category || ""
        } ${action.request_type || ""}`.toLowerCase();

        return (
          combined.includes("board") ||
          combined.includes("approval") ||
          combined.includes("financial") ||
          combined.includes("vendor") ||
          combined.includes("violation") ||
          combined.includes("maintenance") ||
          combined.includes("architectural") ||
          combined.includes("workflow")
        );
      }),
    [actions]
  );

  const columns = [
    {
      title: "Open",
      description: "New or pending board actions waiting to be started.",
      status: "open",
      items: openActions,
    },
    {
      title: "In Progress",
      description: "Actions currently being worked by management, board, or vendors.",
      status: "in_progress",
      items: inProgressActions,
    },
    {
      title: "Completed",
      description: "Closed actions with completion history preserved.",
      status: "completed",
      items: completedActions,
    },
  ];

  function statusLabel(status) {
    if (status === "in_progress") return "In Progress";
    if (status === "completed") return "Completed";
    return "Open";
  }

  function formatDate(value) {
    if (!value) return "No date";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "No date";

    return date.toLocaleString();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operations Center
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Workflow Engine
            </h1>
          </div>

                    <Link
            href={{
              pathname: "/board",
              query: {
                association_id: associationId,
                association_name: associationName,
              },
            }}
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Return to Board Dashboard
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_36%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Live Board Workflow Pipeline
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Board Workflow Engine
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            A live operational pipeline that moves BOS actions from open intake
            through active execution and final completion, with audit events
            written into Supabase.
          </p>

          {systemMessage && (
            <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
              {systemMessage}
            </div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <Metric label="Open" value={openActions.length} />
            <Metric label="In Progress" value={inProgressActions.length} />
            <Metric label="Completed" value={completedActions.length} amber />
            <Metric label="Board Visible" value={boardVisibleActions.length} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-slate-400">
            Loading workflow actions...
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-3">
            {columns.map((column) => (
              <div
                key={column.status}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {column.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {column.description}
                    </p>
                  </div>

                  <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
                    {column.items.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {column.items.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                      <p className="text-sm text-slate-500">
                        No actions in this stage.
                      </p>
                    </div>
                  ) : (
                    column.items.map((action) => (
                      <div
                        key={action.id}
                        className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-amber-300/40"
                      >
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            {action.category || action.request_type || "Workflow"}
                          </span>

                          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                            {statusLabel(action.status)}
                          </span>
                        </div>

                        <p className="mt-4 text-base font-semibold text-white">
                          {action.title || "Untitled Action"}
                        </p>

                        {action.description && (
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {action.description}
                          </p>
                        )}

                        <p className="mt-3 text-xs text-slate-500">
                          Created: {formatDate(action.created_at)}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {action.status !== "open" && (
                            <button
                              onClick={() =>
                                moveAction(action.id, "open", action.title)
                              }
                              className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white hover:border-amber-300 hover:text-amber-300"
                            >
                              Move Open
                            </button>
                          )}

                          {action.status !== "in_progress" && (
                            <button
                              onClick={() =>
                                moveAction(action.id, "in_progress", action.title)
                              }
                              className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white hover:border-amber-300 hover:text-amber-300"
                            >
                              Start
                            </button>
                          )}

                          {action.status !== "completed" && (
                            <button
                              onClick={() =>
                                moveAction(action.id, "completed", action.title)
                              }
                              className="rounded-full bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value, amber = false }) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-2xl shadow-black/20 ${
        amber
          ? "border-amber-300/20 bg-amber-300/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <p className={amber ? "text-sm text-amber-100/80" : "text-sm text-slate-400"}>
        {label}
      </p>

      <p className="mt-3 text-4xl font-bold text-amber-300">
        {value}
      </p>
    </div>
  );
}
