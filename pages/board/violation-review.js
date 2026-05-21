import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

export default function ViolationReview() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actions, setActions] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [loadingActions, setLoadingActions] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadViolationActions();
    loadViolationRecords();

    const interval = setInterval(() => {
      loadViolationActions();
      loadViolationRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadViolationActions() {
    try {
      setLoadingActions(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("bos_actions")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .or(
          "request_type.ilike.%violation%,category.ilike.%violation%,title.ilike.%violation%,description.ilike.%violation%,request_type.ilike.%compliance%,category.ilike.%compliance%,title.ilike.%compliance%,description.ilike.%compliance%"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      setActions(data || []);
    } catch (error) {
      console.error("Unable to load violation review items:", error);
      setActions([]);
      setSystemMessage(error.message || "Unable to load violation review items.");
    } finally {
      setLoadingActions(false);
    }
  }

  async function loadViolationRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load violation operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("violation") ||
            combined.includes("compliance") ||
            combined.includes("rules") ||
            combined.includes("community standards") ||
            combined.includes("notice") ||
            combined.includes("fine") ||
            combined.includes("hearing"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load violation operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  const violationSignals = useMemo(() => actions, [actions]);

  const aiViolationEvents = useMemo(
    () =>
      actions.filter((item) =>
        String(item.source || item.description || "")
          .toLowerCase()
          .includes("ava")
      ),
    [actions]
  );

  const complianceRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("compliance") || combined.includes("rules");
      }),
    [operationalRecords]
  );

  const hearingRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("hearing") || combined.includes("fine") || combined.includes("notice");
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
              Violation Review
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Community compliance review, violation activity, owner reports,
              hearing preparation, and board-ready compliance records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
  href="/board"
  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
>
  Board Dashboard
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
            Distributed Compliance Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Violation review now combines BOS compliance actions with centralized operational records.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Reported violations, compliance concerns, hearing preparation, rule notices,
            fines, and board awareness items can now flow through the centralized
            Admin Operations Intake system while preserving live BOS action visibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-200">
  Board review records are created by Admin or Management and routed here for board visibility.
</div>

            <Link
              href="/board/compliance-dashboard"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Compliance Dashboard
            </Link>

            <Link
              href="/board/compliance-calendar"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Compliance Calendar
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
          <Metric label="BOS Violations" value={violationSignals.length} />
          <Metric label="Ava / Owner Reports" value={aiViolationEvents.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
          <Metric label="Priority Review" value={priorityRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Compliance / Rules Records" items={complianceRecords} />
          <OperationalPanel title="Notice / Hearing Items" items={hearingRecords} />
          <OperationalPanel title="Priority Compliance Review" items={priorityRecords} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                  Live BOS Review Queue
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  Violation Review Queue
                </h3>
              </div>

              <Link
                href={`/admin/operations/new?request_type=${encodeURIComponent(
                  "Legal Review"
                )}&return_path=${encodeURIComponent(
                  "/board/violation-review"
                )}&return_label=${encodeURIComponent("Violation Review")}`}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Create Violation Record
              </Link>
            </div>

            <div className="space-y-4">
              {loadingActions ? (
                <Empty message="Loading violation activity..." />
              ) : violationSignals.length === 0 ? (
                <Empty message="No violation review items are currently available." />
              ) : (
                violationSignals.map((item) => {
                  const isOpen =
                    selectedItem?.type === "violation" &&
                    selectedItem?.data?.id === item.id;

                  return (
                    <ViolationCard
                      key={item.id}
                      item={item}
                      isOpen={isOpen}
                      onToggle={() =>
                        setSelectedItem(isOpen ? null : { type: "violation", data: item })
                      }
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              Complaint Activity
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              Community complaints and reported compliance concerns.
            </p>

            <div className="mt-6 space-y-4">
              {aiViolationEvents.length === 0 ? (
                <Empty message="No Ava or owner compliance reports currently found." />
              ) : (
                aiViolationEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                      {event.id} · {formatCategory(event.category || event.request_type)}
                    </p>

                    <h4 className="mt-2 font-semibold">
                      {event.title || "Owner Compliance Report"}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300">
                      Source: {event.source || "Owner / Ava Intake"}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Status: {formatStatus(event.status)} · Priority:{" "}
                      {titleCase(event.priority || "medium")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Compliance Review Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now preserves BOS violation action visibility while adding
            distributed compliance records from Admin Operations Intake.
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
                {item.title || "Untitled Compliance Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Compliance Record"}</span>
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

function ViolationCard({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <button onClick={onToggle} className="block w-full text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
          {item.id} · {formatCategory(item.category || item.request_type)}
        </p>

        <h4 className="mt-2 font-semibold">
          {item.title || "Violation Review Item"}
        </h4>

        <p className="mt-2 text-sm text-slate-400">
          Current Status: {formatStatus(item.status)}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Owner: {item.owner_name || "Resident"} · Unit:{" "}
          {item.property_address || "Pending"}
        </p>

        <p className="mt-4 text-sm font-semibold text-amber-300">
          {isOpen ? "Hide Details" : "View Details"}
        </p>
      </button>

      {isOpen && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h5 className="text-lg font-semibold text-amber-200">
            Full Violation Details
          </h5>

          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Review ID:</span> {item.id}
            </p>
            <p>
              <span className="text-slate-500">Category:</span>{" "}
              {formatCategory(item.category || item.request_type)}
            </p>
            <p>
              <span className="text-slate-500">Title:</span>{" "}
              {item.title || "Violation Review Item"}
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
