import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

export default function ArchitecturalApprovals() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actions, setActions] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [loadingActions, setLoadingActions] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadArcActions();
    loadArcRecords();

    const interval = setInterval(() => {
      loadArcActions();
      loadArcRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadArcActions() {
    try {
      setLoadingActions(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("bos_actions")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .or(
          "request_type.ilike.%architectural%,category.ilike.%architectural%,title.ilike.%architectural%,description.ilike.%architectural%,request_type.ilike.%arc%,category.ilike.%arc%,title.ilike.%arc%,description.ilike.%arc%,request_type.ilike.%modification%,category.ilike.%modification%,title.ilike.%modification%,description.ilike.%modification%"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      setActions(data || []);
    } catch (error) {
      console.error("Unable to load architectural review items:", error);
      setActions([]);
      setSystemMessage(error.message || "Unable to load architectural review items.");
    } finally {
      setLoadingActions(false);
    }
  }

  async function loadArcRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load architectural operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("architectural") ||
            combined.includes("arc") ||
            combined.includes("modification") ||
            combined.includes("approval") ||
            combined.includes("inspection") ||
            combined.includes("owner application") ||
            combined.includes("conditional approval"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load architectural operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  const arcSignals = useMemo(() => actions, [actions]);

  const pendingArcItems = useMemo(
    () =>
      actions.filter((item) =>
        ["open", "manager_review", "board_review", "owner_notified"].includes(
          String(item.status || "open").toLowerCase()
        )
      ),
    [actions]
  );

  const applicationRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("application") ||
          combined.includes("architectural") ||
          combined.includes("modification")
        );
      }),
    [operationalRecords]
  );

  const inspectionRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("inspection") || combined.includes("condition");
      }),
    [operationalRecords]
  );

  const priorityRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        ["critical", "high"].includes(String(record.priority || "").toLowerCase())
      ),
    [operationalRecords]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Architectural Approvals
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              ARC requests, homeowner modifications, committee review, conditional
              approvals, inspections, and board-ready architectural records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Main Page
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Distributed ARC Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Architectural approvals now combine BOS ARC actions with centralized operational review records.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Homeowner architectural requests, ARC applications, conditional approvals,
            committee decisions, inspections, and board awareness items can now flow
            through Admin Operations Intake while preserving live BOS action visibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Policy Review"
              )}&return_path=${encodeURIComponent(
                "/board/architectural-approvals"
              )}&return_label=${encodeURIComponent("Architectural Approvals")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create ARC Record
            </Link>

            <Link
              href="/board/committee-center"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Committee Center
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Action Items
            </Link>

            <Link
              href="/board/meeting-packet"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meeting Packet
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="BOS ARC Requests" value={arcSignals.length} />
          <Metric label="Pending Review" value={pendingArcItems.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
          <Metric label="Priority Review" value={priorityRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="ARC Applications" items={applicationRecords} />
          <OperationalPanel title="Conditional / Inspection Items" items={inspectionRecords} />
          <OperationalPanel title="Priority ARC Review" items={priorityRecords} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                  Live BOS ARC Queue
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  ARC Review Queue
                </h3>
              </div>

              <Link
                href={`/admin/operations/new?request_type=${encodeURIComponent(
                  "Policy Review"
                )}&return_path=${encodeURIComponent(
                  "/board/architectural-approvals"
                )}&return_label=${encodeURIComponent("Architectural Approvals")}`}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Create ARC Record
              </Link>
            </div>

            <div className="space-y-4">
              {loadingActions ? (
                <Empty message="Loading architectural approval activity..." />
              ) : arcSignals.length === 0 ? (
                <Empty message="No architectural review items are currently available." />
              ) : (
                arcSignals.map((item) => {
                  const isOpen = selectedItem?.id === item.id;

                  return (
                    <ArcCard
                      key={item.id}
                      item={item}
                      isOpen={isOpen}
                      onToggle={() => setSelectedItem(isOpen ? null : item)}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-100">
              ARC Review Activity
            </h3>

            <div className="mt-6 grid gap-4">
              {[
                "Owner Applications",
                "Committee Decisions",
                "Conditional Approvals",
                "Final Inspections",
                "Board Awareness Items",
                "Meeting Packet Routing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Architectural Review Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now preserves BOS ARC action visibility while adding
            distributed architectural review records from Admin Operations Intake.
          </p>
        </div>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled ARC Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "ARC Record"}</span>
                <span>•</span>
                <span>{item.status || "Submitted"}</span>
                <span>•</span>
                <span>{item.priority || "Normal"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ArcCard({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <button onClick={onToggle} className="block w-full text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
          {item.id} · {formatCategory(item.category || item.request_type)}
        </p>

        <h4 className="mt-2 font-semibold">
          {item.title || "Architectural Review Request"}
        </h4>

        <p className="mt-2 text-sm text-slate-400">
          Review Action: Confirm committee decision, owner notice, approval
          conditions, and deadline tracking.
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Owner: {item.owner_name || "Resident"} · Unit:{" "}
          {item.property_address || "Pending"} · Status: {formatStatus(item.status)}
        </p>

        <p className="mt-4 text-sm font-semibold text-amber-300">
          {isOpen ? "Hide Details" : "View Details"}
        </p>
      </button>

      {isOpen && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h5 className="text-lg font-semibold text-amber-200">
            Full ARC Request Details
          </h5>

          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Request ID:</span> {item.id}
            </p>

            <p>
              <span className="text-slate-500">Category:</span>{" "}
              {formatCategory(item.category || item.request_type)}
            </p>

            <p>
              <span className="text-slate-500">Title:</span>{" "}
              {item.title || "Architectural Review Request"}
            </p>

            <p>
              <span className="text-slate-500">Owner:</span>{" "}
              {item.owner_name || "Resident"}
            </p>

            <p>
              <span className="text-slate-500">Unit:</span>{" "}
              {item.property_address || "Pending"}
            </p>

            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {formatStatus(item.status)}
            </p>

            <p>
              <span className="text-slate-500">Priority:</span>{" "}
              {titleCase(item.priority || "standard")}
            </p>

            <p>
              <span className="text-slate-500">Created:</span>{" "}
              {formatDateTime(item.created_at)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatDateTime(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString();
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

function formatStatus(status) {
  return titleCase(status || "Open");
}
