import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function ExecutiveDashboard() {
  const [actions, setActions] = useState([]);
  const [systemMessage, setSystemMessage] = useState("");
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    loadActions();

    const interval = setInterval(() => {
      loadActions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadActions() {
    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load executive dashboard:", error);
      setSystemMessage("Unable to load live community operations.");
      return;
    }

    setActions(data || []);
    setSystemMessage("");
    setLastSync(new Date());
  }

  const metrics = useMemo(() => {
    const today = new Date().toDateString();

    return {
      active: actions.filter((a) => isOpen(a)).length,
      board: actions.filter((a) =>
        ["board_review", "board_approved"].includes(a.status)
      ).length,
      vendors: actions.filter(
        (a) => a.dispatched || a.status === "dispatched" || a.vendor_status
      ).length,
      completedToday: actions.filter(
        (a) =>
          (a.status === "completed" || a.vendor_status === "completed") &&
          a.completed_at &&
          new Date(a.completed_at).toDateString() === today
      ).length,
      ownerUpdates: actions.filter((a) => a.owner_notified).length,
      attention: actions.filter(
        (a) => String(a.priority || "").toLowerCase() === "high"
      ).length,
    };
  }, [actions]);

  const workflow = useMemo(() => {
    return [
      {
        label: "Ava Intake",
        count: actions.filter((a) => isOpen(a)).length,
        description: "Received",
      },
      {
        label: "Manager Review",
        count: actions.filter((a) => a.status === "manager_review").length,
        description: "Under review",
      },
      {
        label: "Board Review",
        count: actions.filter((a) =>
          ["board_review", "board_approved"].includes(a.status)
        ).length,
        description: "Board visibility",
      },
      {
        label: "Vendor Coordination",
        count: actions.filter(
          (a) => a.dispatched || a.status === "dispatched" || a.vendor_status
        ).length,
        description: "Service movement",
      },
      {
        label: "Completed",
        count: actions.filter(
          (a) => a.status === "completed" || a.vendor_status === "completed"
        ).length,
        description: "Resolved",
      },
    ];
  }, [actions]);

  const priorityItems = actions
    .filter((a) => String(a.priority || "").toLowerCase() === "high")
    .slice(0, 5);

  const boardItems = actions
    .filter((a) => ["board_review", "board_approved"].includes(a.status))
    .slice(0, 5);

  const vendorItems = actions
    .filter(
      (a) => a.dispatched || a.status === "dispatched" || a.vendor_status
    )
    .slice(0, 5);

  const activityFeed = actions.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_32%),linear-gradient(135deg,#020617,#0f172a_42%,#1c1917)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-yellow-400/80">
                Stoutt Property Management
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
                Executive Community Operations Dashboard
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Peaceful visibility into live community requests, management
                review, board oversight, vendor coordination, and owner updates.
              </p>
            </div>

            <div className="w-full rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5 shadow-2xl shadow-black/40 backdrop-blur lg:w-80">
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">
                Live Operations Pulse
              </p>

              <p className="mt-4 text-5xl font-semibold text-white">
                {actions.length}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Community operation records
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  href="/bos/action-center"
                  className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-center text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20"
                >
                  BOS Center
                </Link>

                <Link
                  href="/software-dashboard"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-slate-300 hover:bg-white/10"
                >
                  Software
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <StatusPill label="Community Operations" value="Stable" />
            <StatusPill label="Live Sync" value="Active" />
            <StatusPill label="Board Visibility" value={`${metrics.board} Items`} />
            <StatusPill
              label="Last Sync"
              value={lastSync ? lastSync.toLocaleTimeString() : "Loading"}
            />
          </div>

          {systemMessage && (
            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-200">
              {systemMessage}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Metric label="Active Requests" value={metrics.active} />
          <Metric label="Board Review" value={metrics.board} />
          <Metric label="Vendor Coordination" value={metrics.vendors} />
          <Metric label="Completed Today" value={metrics.completedToday} />
          <Metric label="Owner Updates" value={metrics.ownerUpdates} />
          <Metric label="Attention Needed" value={metrics.attention} alert />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="rounded-[2rem] border border-yellow-500/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                Live Workflow Progression
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Community Operations Flow
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-400">
              A quiet operating chain from first contact through completion.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {workflow.map((step, index) => (
              <WorkflowStage
                key={step.label}
                step={step}
                index={index}
                isLast={index === workflow.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-8 lg:grid-cols-3">
        <Panel
          title="Priority Attention Items"
          eyebrow="Community Impact"
          tone="attention"
        >
          <ItemList
            items={priorityItems}
            empty="No high-priority items currently active."
          />
        </Panel>

        <Panel title="Board Review Queue" eyebrow="Board Oversight" tone="board">
          <ItemList
            items={boardItems}
            empty="No items currently waiting for board review."
          />
        </Panel>

        <Panel
          title="Vendor Coordination"
          eyebrow="Service Movement"
          tone="vendor"
        >
          <ItemList
            items={vendorItems}
            empty="No active vendor coordination items."
            vendor
          />
        </Panel>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_38%),rgba(255,255,255,0.025)] p-6 shadow-2xl shadow-black/30">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              Community Coordination View
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Operational Calm Layer
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Reserved for future property-level coordination, vendor movement,
              building zones, and community service visibility.
            </p>

            <div className="mt-8 rounded-3xl border border-dashed border-yellow-400/20 bg-yellow-400/[0.035] p-6">
              <div className="grid gap-3">
                <CoordinationLine label="Owner Requests" value={metrics.active} />
                <CoordinationLine label="Board Items" value={metrics.board} />
                <CoordinationLine label="Vendor Flow" value={metrics.vendors} />
                <CoordinationLine
                  label="Completed Today"
                  value={metrics.completedToday}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                  Ava Operational Activity
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Live Activity Feed
                </h2>
              </div>

              <Link
                href="/bos/action-center"
                className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20"
              >
                Open Action Center
              </Link>
            </div>

            {activityFeed.length === 0 ? (
              <Empty message="No recent activity yet." />
            ) : (
              <div className="space-y-3">
                {activityFeed.map((item) => (
                  <ActivityRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatusPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function Metric({ label, value, alert }) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-xl shadow-black/20 ${
        alert
          ? "border-amber-400/25 bg-amber-400/[0.08]"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p
        className={`mt-2 text-3xl font-semibold ${
          alert ? "text-amber-200" : "text-yellow-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function WorkflowStage({ step, index, isLast }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#020617]/80 p-5 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-sm font-bold text-yellow-300 shadow-lg shadow-yellow-950/30">
          {index + 1}
        </div>

        {!isLast && (
          <div className="hidden h-px flex-1 bg-gradient-to-r from-yellow-400/25 to-white/5 md:ml-4 md:block" />
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold">{step.label}</h3>

      <p className="mt-1 text-sm text-slate-400">{step.description}</p>

      <p className="mt-4 text-3xl font-semibold text-yellow-300">
        {step.count}
      </p>
    </div>
  );
}

function Panel({ eyebrow, title, children, tone }) {
  const tones = {
    attention:
      "border-amber-400/15 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.09),transparent_40%),rgba(255,255,255,0.025)]",
    board:
      "border-yellow-400/15 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_40%),rgba(255,255,255,0.025)]",
    vendor:
      "border-sky-300/15 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.07),transparent_40%),rgba(255,255,255,0.025)]",
  };

  return (
    <div
      className={`rounded-[2rem] border p-6 shadow-2xl shadow-black/30 ${
        tones[tone] || "border-white/10 bg-white/[0.025]"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>

      <div className="mt-6">{children}</div>
    </div>
  );
}

function ItemList({ items, empty, vendor }) {
  if (!items.length) {
    return <Empty message={empty} />;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-[#020617]/80 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
                {formatCategory(item.category || item.request_type)}
              </p>

              <h3 className="mt-1 font-semibold text-white">
                {item.title || "Community Request"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {item.association_name || "Demo Association"}
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {vendor
                ? formatStatus(item.vendor_status || item.status)
                : formatStatus(item.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityRow({ item }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#020617]/80 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            {getActivityText(item)}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {item.title || "Community request"} ·{" "}
            {item.association_name || "Demo Association"}
          </p>
        </div>

        <p className="text-xs text-slate-500">
          {item.created_at ? new Date(item.created_at).toLocaleString() : "—"}
        </p>
      </div>
    </div>
  );
}

function CoordinationLine({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-lg font-semibold text-yellow-300">{value}</span>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
      {message}
    </div>
  );
}

function isOpen(item) {
  return !item.status || item.status === "open";
}

function getActivityText(item) {
  if (item.status === "completed" || item.vendor_status === "completed") {
    return "Request completed";
  }

  if (item.owner_notified) {
    return "Owner update sent";
  }

  if (item.vendor_status === "in_progress") {
    return "Vendor work in progress";
  }

  if (item.vendor_status === "accepted") {
    return "Vendor accepted assignment";
  }

  if (item.dispatched || item.status === "dispatched") {
    return "Vendor dispatched";
  }

  if (item.status === "board_approved") {
    return "Board approved request";
  }

  if (item.status === "board_review") {
    return "Request sent to board review";
  }

  if (item.status === "manager_review") {
    return "Manager review underway";
  }

  return "New request received";
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCategory(category) {
  return titleCase(category || "General");
}

function formatStatus(status) {
  return titleCase(status || "Open");
}
