import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

export default function BoardCommitteeCenter() {
  const [committees, setCommittees] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [loadingCommittees, setLoadingCommittees] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadCommittees();
    loadCommitteeRecords();

    const interval = setInterval(() => {
      loadCommittees();
      loadCommitteeRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadCommittees() {
    try {
      setLoadingCommittees(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_committees")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("committee_name", { ascending: true });

      if (error) throw error;

      setCommittees(data || []);
    } catch (error) {
      console.error("Unable to load committees:", error);
      setCommittees([]);
      setSystemMessage(error.message || "Unable to load committees.");
    } finally {
      setLoadingCommittees(false);
    }
  }

  async function loadCommitteeRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load committee operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.assigned_to || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("committee") ||
            combined.includes("arc") ||
            combined.includes("architectural") ||
            combined.includes("finance committee") ||
            combined.includes("landscape") ||
            combined.includes("rules committee") ||
            combined.includes("recommendation"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load committee records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  const totalOpenItems = useMemo(
    () =>
      committees.reduce(
        (sum, committee) => sum + Number(committee.open_items || 0),
        0
      ),
    [committees]
  );

  const totalBoardReady = useMemo(
    () =>
      committees.reduce(
        (sum, committee) => sum + Number(committee.board_ready_items || 0),
        0
      ),
    [committees]
  );

  const totalAssignedTasks = useMemo(
    () =>
      committees.reduce(
        (sum, committee) => sum + Number(committee.assigned_tasks_count || 0),
        0
      ),
    [committees]
  );

  const boardReadyRecords = useMemo(
    () => operationalRecords.filter((record) => record.board_review_required),
    [operationalRecords]
  );

  const arcRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
          .toLowerCase()
          .includes("arc") ||
        `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
          .toLowerCase()
          .includes("architectural")
      ),
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
              Committee Center
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Committee oversight, recommendations, assignments, meeting notes,
              and board-ready governance activity.
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
            Distributed Committee Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Committee activity now connects live committee structure with operational record tracking.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            ARC, finance, landscape, rules, and special committees can now operate through
            a connected governance center that renders both committee records and centralized
            operational intake items.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Special Project"
              )}&return_path=${encodeURIComponent(
                "/board/committee-center"
              )}&return_label=${encodeURIComponent("Committee Center")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Committee Record
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Action Items
            </Link>

            <Link
              href="/board/architectural-approvals"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Architectural Approvals
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
          <Metric label="Active Committees" value={committees.length} />
          <Metric label="Committee Open Items" value={totalOpenItems} />
          <Metric label="Board Ready" value={totalBoardReady + boardReadyRecords.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Priority Committee Items" items={priorityRecords} />
          <OperationalPanel title="ARC / Architectural Items" items={arcRecords} />
          <OperationalPanel title="Board-Ready Recommendations" items={boardReadyRecords} />
        </div>

        <div className="mt-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Live Committee Queue
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Association Committees
              </h2>
            </div>

            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Special Project"
              )}&return_path=${encodeURIComponent(
                "/board/committee-center"
              )}&return_label=${encodeURIComponent("Committee Center")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Committee Record
            </Link>
          </div>

          {loadingCommittees ? (
            <Empty message="Loading committee activity..." />
          ) : committees.length === 0 ? (
            <Empty message="No committees are currently available." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {committees.map((committee) => (
                <CommitteeCard key={committee.id} committee={committee} />
              ))}
            </div>
          )}
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
              Governance Workflow
            </p>

            <h3 className="mt-3 text-3xl font-semibold">
              Committee Recommendation Flow
            </h3>

            <div className="mt-8 space-y-4">
              {[
                "Create committee records through Admin Operations Intake",
                "Track committee recommendations and assigned follow-up",
                "Prepare board-ready summaries for review",
                "Route ARC and policy matters into governance workflows",
                "Connect committee recommendations to meeting packets",
                "Preserve committee oversight history for future association review",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">
              Governance Oversight Active
            </p>

            <h3 className="mt-3 text-3xl font-semibold text-emerald-100">
              Committees now operate inside the SPM governance system.
            </h3>

            <div className="mt-8 space-y-5 leading-8 text-slate-300">
              <p>
                This page now preserves direct committee table visibility while also
                rendering committee-related records from the centralized operational
                intake architecture.
              </p>

              <p>
                Committee work can flow into action items, architectural approvals,
                meeting packets, motion review, and board governance decisions without
                becoming disconnected from the rest of the platform.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-100">
              Committee Center is now aligned with distributed operational rendering.
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">
        {title}
      </h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Committee Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Operational Record"}</span>
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

function CommitteeCard({ committee }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-xl">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">
            {committee.committee_name || "Committee"}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {committee.focus_area || "Association Operations"}
          </p>

          <p className="mt-5 leading-7 text-slate-300">
            {committee.description || "Committee operational oversight."}
          </p>
        </div>

        <div className="text-right">
          <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
            {titleCase(committee.status || "active")}
          </div>

          <div className="mt-5 text-3xl font-bold text-amber-300">
            {committee.open_items || 0}
          </div>

          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
            Open Items
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
        <p>
          <span className="text-slate-500">Chair:</span>{" "}
          {committee.chair_name || "Not Assigned"}
        </p>

        <p>
          <span className="text-slate-500">Board Ready:</span>{" "}
          {committee.board_ready_items || 0}
        </p>

        <p>
          <span className="text-slate-500">Meeting Notes:</span>{" "}
          {committee.meeting_notes_count || 0}
        </p>

        <p>
          <span className="text-slate-500">Assigned Tasks:</span>{" "}
          {committee.assigned_tasks_count || 0}
        </p>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-300">
        {label}
      </div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
