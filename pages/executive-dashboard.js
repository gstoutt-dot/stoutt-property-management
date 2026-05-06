import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function ExecutiveDashboard() {
  const [actions, setActions] = useState([]);
  const [systemMessage, setSystemMessage] = useState("");

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
  }

  const metrics = useMemo(() => {
    const today = new Date().toDateString();

    return {
      open: actions.filter((a) => isOpen(a)).length,
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
      highPriority: actions.filter(
        (a) => String(a.priority || "").toLowerCase() === "high"
      ).length,
    };
  }, [actions]);

  const workflow = useMemo(() => {
    return [
      {
        label: "Ava Intake",
        count: actions.filter((a) => isOpen(a)).length,
        description: "New requests received",
      },
      {
        label: "Management",
        count: actions.filter((a) => a.status === "manager_review").length,
        description: "Under manager review",
      },
      {
        label: "Board",
        count: actions.filter((a) =>
          ["board_review", "board_approved"].includes(a.status)
        ).length,
        description: "Board oversight items",
      },
      {
        label: "Vendor",
        count: actions.filter(
          (a) => a.dispatched || a.status === "dispatched" || a.vendor_status
        ).length,
        description: "Vendor coordination",
      },
      {
        label: "Completion",
        count: actions.filter(
          (a) => a.status === "completed" || a.vendor_status === "completed"
        ).length,
        description: "Resolved requests",
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
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
                Stoutt Property Management
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                Community Operations Dashboard
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
                Calm, live operational awareness for community requests,
                management review, board oversight, vendor coordination, and
                owner updates.
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5 shadow-2xl shadow-black/30">
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-300">
                Live BOS Pulse
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">
                {actions.length}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Total operational records
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/bos/action-center"
                  className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20"
                >
                  BOS
                </Link>

                <Link
                  href="/software-dashboard"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10"
                >
                  Software
                </Link>
              </div>
            </div>
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
          <Metric label="Open Requests" value={metrics.open} />
          <Metric label="Board Review" value={metrics.board} />
          <Metric label="Active Vendors" value={metrics.vendors} />
          <Metric label="Completed Today" value={metrics.completedToday} />
          <Metric label="Owner Updates" value={metrics.ownerUpdates} />
          <Metric label="Priority Items" value={metrics.highPriority} alert />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              Live Workflow Progression
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Community Operations Flow
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Requests move quietly through the operating chain without exposing
              unnecessary internal complexity to owners.
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
          description="High-priority requests needing calm, prompt attention."
        >
          <ItemList
            items={priorityItems}
            empty="No high-priority items currently active."
          />
        </Panel>

        <Panel
          title="Board Review Queue"
          eyebrow="Board Oversight"
          description="Items currently requiring board visibility or decision."
        >
          <ItemList
            items={boardItems}
            empty="No items currently waiting for board review."
          />
        </Panel>

        <Panel
          title="Vendor Coordination"
          eyebrow="Service Movement"
          description="Requests currently in vendor dispatch or service flow."
        >
          <ItemList
            items={vendorItems}
            empty="No active vendor coordination items."
            vendor
          />
        </Panel>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/30">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                Ava Operational Activity
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Live Activity Feed
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                A simple view of recent community operations movement.
              </p>
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
      </section>
    </main>
  );
}

function Metric({ label, value, alert }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        alert
          ? "border-red-400/25 bg-red-400/10"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p
        className={`mt-2 text-3xl font-semibold ${
          alert ? "text-red-200" : "text-yellow-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function WorkflowStage({ step, index, isLast }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#020617]/80 p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-sm font-bold text-yellow-300">
          {index + 1}
        </div>

        {!isLast && (
          <div className="hidden h-px flex-1 bg-white/10 md:ml-4 md:block" />
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

function Panel({ eyebrow, title, description, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/30">
      <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

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
