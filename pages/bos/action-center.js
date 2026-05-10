import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { createNotificationEvent } from "../../lib/notificationEngine";

export default function BOSActionCenter() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedAction, setSelectedAction] = useState(null);
  const [sortMode, setSortMode] = useState("newest");
  const [updatingId, setUpdatingId] = useState(null);
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
      console.error("Unable to load BOS actions:", error);
      setSystemMessage("Unable to load BOS actions.");
      return;
    }

    setActions(data || []);
  }

  async function updateAction(item, workflowAction) {
    if (!item?.id) return;

    setUpdatingId(item.id);
    setSystemMessage("");

    const now = new Date().toISOString();

    const workflowMap = {
      manager_verified: {
        status: "manager_review",
        manager_updated_at: now,
        internal_note: "Manager verified intake and moved request into review.",
      },
      send_to_board: {
        status: "board_review",
        board_sent_at: now,
        internal_note: "Request routed to board for oversight or approval.",
      },
      request_clarification: {
        status: "needs_clarification",
        clarification_requested_at: now,
        internal_note: "Clarification requested before next operational step.",
      },
      dispatch_vendor: {
        status: "dispatched",
        dispatched: true,
        dispatched_at: now,
        vendor_status: "pending",
        vendor_name: "Premier Property Services",
        internal_note: "Vendor dispatch initiated.",
      },
      vendor_accepted: {
  vendor_status: "accepted",
  vendor_updated_at: now,
  internal_note: "Vendor accepted assignment.",
},
      vendor_in_progress: {
  vendor_status: "in_progress",
  vendor_updated_at: now,
  internal_note: "Vendor work is in progress.",
},
      mark_complete: {
        status: "completed",
        completed_at: now,
        vendor_status: "completed",
        internal_note: "Request marked complete.",
      },
      notify_owner: {
        owner_notified: true,
        owner_notified_at: now,
        internal_note: "Owner notification marked as sent.",
      },
    };

    const fullPayload = workflowMap[workflowAction];

    if (!fullPayload) {
      setUpdatingId(null);
      return;
    }

    const { error } = await supabase
      .from("bos_actions")
      .update(fullPayload)
      .eq("id", item.id);

    if (error) {
      console.warn("Full workflow update failed. Retrying with core fields.", error);

      const fallbackPayload = buildFallbackPayload(workflowAction);

      const { error: fallbackError } = await supabase
        .from("bos_actions")
        .update(fallbackPayload)
        .eq("id", item.id);

      if (fallbackError) {
        console.error("Fallback workflow update failed:", fallbackError);
        setSystemMessage("Workflow update failed. Check Supabase column names.");
        setUpdatingId(null);
        return;
      }
    }

        const updatedAction = {
      ...item,
      ...fullPayload,
    };

    await createNotificationEvent(
      supabase,
      updatedAction,
      getNotificationEventType(workflowAction)
    );

    await loadActions();

    setSelectedAction((current) =>
      current?.id === item.id
        ? {
            ...current,
            ...fullPayload,
          }
        : current
    );

    setSystemMessage(getWorkflowMessage(workflowAction));
    setUpdatingId(null);
  }

  const filtered = useMemo(() => {
    let filteredActions = [...actions];

    if (filter === "intake") {
      filteredActions = filteredActions.filter((a) => isIntake(a));
    }

    if (filter === "manager") {
      filteredActions = filteredActions.filter(
        (a) => a.status === "manager_review"
      );
    }

    if (filter === "accounting") {
  filteredActions = filteredActions.filter((a) =>
    isFinancialRequest(a)
  );
}

    if (filter === "board") {
      filteredActions = filteredActions.filter(
        (a) =>
  a.status === "board_review" ||
  a.status === "board_approved"
      );
    }

    if (filter === "dispatch") {
      filteredActions = filteredActions.filter(
        (a) => a.dispatched || a.status === "dispatched"
      );
    }

    if (filter === "clarification") {
      filteredActions = filteredActions.filter(
        (a) => a.status === "needs_clarification"
      );
    }

    if (filter === "completed") {
      filteredActions = filteredActions.filter(
        (a) => a.status === "completed" || a.vendor_status === "completed"
      );
    }

    if (sortMode === "oldest") {
      filteredActions.sort(
        (a, b) =>
          new Date(a.created_at || 0) - new Date(b.created_at || 0)
      );
    } else {
      filteredActions.sort(
        (a, b) =>
          new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    }

    return filteredActions;
  }, [actions, filter, sortMode]);

  const stats = {
    total: actions.length,
    intake: actions.filter((a) => isIntake(a)).length,
    manager: actions.filter((a) => a.status === "manager_review").length,
    accounting: actions.filter((a) => isFinancialRequest(a)).length,
    board: actions.filter((a) => a.status === "board_review").length,
    dispatched: actions.filter((a) => a.dispatched || a.status === "dispatched")
      .length,
    clarification: actions.filter((a) => a.status === "needs_clarification")
      .length,
    completed: actions.filter(
      (a) => a.status === "completed" || a.vendor_status === "completed"
    ).length,
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-7 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              BOS SYSTEM
            </p>

            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
              Action Center
            </h1>

            <p className="mt-2 text-white/60 max-w-3xl">
              Real-time operational command center from Ava AI intake through
              manager verification, board routing, vendor dispatch, owner
              notification, and completion.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <a
              href="/portal/manager"
              className="rounded-2xl border border-yellow-400/30 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/10 transition"
            >
              Manager
            </a>

            <a
              href="/portal/board"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 hover:border-yellow-400/30 hover:text-yellow-300 transition"
            >
              Board
            </a>

            <a
              href="/bos/dispatch-feed"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 hover:border-yellow-400/30 hover:text-yellow-300 transition"
            >
              Dispatch
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Intake" value={stats.intake} />
          <Stat label="Manager" value={stats.manager} />
          <Stat label="Accounting" value={stats.accounting} />
          <Stat label="Board" value={stats.board} />
          <Stat label="Dispatched" value={stats.dispatched} />
          <Stat label="Clarification" value={stats.clarification} />
          <Stat label="Completed" value={stats.completed} />
        </div>

        {systemMessage && (
          <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          {[
  "all",
  "intake",
  "manager",
  "accounting",
  "board",
  "dispatch",
  "clarification",
  "completed",
].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                  : "border-white/10 bg-white/[0.015] text-white/60 hover:border-yellow-400/25 hover:text-yellow-300"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="rounded-2xl border border-yellow-400/20 bg-[#020617] px-5 py-3 text-sm font-semibold text-yellow-300 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6 md:p-8 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
              OPERATING TIMELINE
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Request Progression
            </h2>

            <p className="mt-2 text-white/55">
              Every Ava-created action now has operational controls for manager,
              board, vendor, owner, and completion movement.
            </p>
          </div>

          {filtered.length === 0 ? (
            <Empty message="No actions in this stage." />
          ) : (
            <div className="space-y-5">
              {filtered.map((item) => (
                <ActionRow
                  key={item.id}
                  item={item}
                  onOpen={() => setSelectedAction(item)}
                  onUpdate={updateAction}
                  updatingId={updatingId}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedAction && (
        <DetailDrawer
          item={selectedAction}
          onClose={() => setSelectedAction(null)}
          onUpdate={updateAction}
          updatingId={updatingId}
        />
      )}
    </main>
  );
}

function ActionRow({ item, onOpen, onUpdate, updatingId }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#020617]/80 p-6 hover:border-yellow-400/25 transition duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
            AVA AI PHONE INTAKE
          </p>

          <h3 className="mt-2 text-2xl font-semibold leading-tight">
            {item.title || "BOS Action"}
          </h3>

          <div className="mt-5 rounded-2xl border border-yellow-500/10 bg-yellow-400/[0.035] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
              Operational Summary
            </p>

           <div className="mt-4 text-white/80 leading-relaxed space-y-4">
  <p>
    {item.description || "No operational summary available."}
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs uppercase tracking-[0.15em] text-white/40">
        Caller
      </p>

      <p className="mt-1 text-white/90">
        {item.owner_name || "Ava Caller"}
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs uppercase tracking-[0.15em] text-white/40">
        Phone
      </p>

      <p className="mt-1 text-white/90">
        {item.caller_phone || "Not Provided"}
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs uppercase tracking-[0.15em] text-white/40">
        Unit / Address
      </p>

      <p className="mt-1 text-white/90">
        {item.property_address || "Pending"}
      </p>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs uppercase tracking-[0.15em] text-white/40">
        Source
      </p>

      <p className="mt-1 text-white/90">
        Ava AI Phone Assistant
      </p>
    </div>
  </div>
</div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 min-w-[190px]">
          <Badge item={item} />

          <PriorityBadge priority={item.priority} />

{isFinancialRequest(item) && (
  <Pill text="Accounting Request" tone="gold" />
)}

<VendorBadge status={item.vendor_status} item={item} />

          <button
            onClick={onOpen}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 transition"
          >
            View Details
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        <Meta
          label="Association"
          value={item.association_name || "Demo Association"}
        />

        <Meta label="Owner" value={item.owner_name || "Ava Caller"} />

        <Meta
          label="Property / Unit"
          value={item.property_address || "Pending"}
        />

        <Meta
          label="Category"
          value={formatCategory(item.category || item.request_type)}
        />
      </div>

      <Timeline item={item} />

      <WorkflowControls
        item={item}
        onUpdate={onUpdate}
        updatingId={updatingId}
      />
    </article>
  );
}

function WorkflowControls({ item, onUpdate, updatingId }) {
  const busy = updatingId === item.id;

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
            Live Workflow Actions
          </p>

          <p className="mt-2 text-sm text-white/50">
            Move this request through the SPM/BOS operating chain.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <WorkflowButton
            label="Manager Verified"
            disabled={busy}
            onClick={() => onUpdate(item, "manager_verified")}
          />

        {String(item.request_type || "")
  .toLowerCase()
  .startsWith("financial_") && (
  <WorkflowButton
    label="Accounting Review"
    disabled={busy}
    onClick={() => onUpdate(item, "manager_verified")}
  />
)}

          <WorkflowButton
            label="Send to Board"
            disabled={busy}
            onClick={() => onUpdate(item, "send_to_board")}
          />

          <WorkflowButton
            label="Request Clarification"
            disabled={busy}
            onClick={() => onUpdate(item, "request_clarification")}
          />

          <WorkflowButton
            label="Dispatch Vendor"
            disabled={busy}
            onClick={() => onUpdate(item, "dispatch_vendor")}
          />

              <WorkflowButton
  label="Vendor Accepted"
  disabled={busy}
  onClick={() => onUpdate(item, "vendor_accepted")}
/>

<WorkflowButton
  label="Vendor In Progress"
  disabled={busy}
  onClick={() => onUpdate(item, "vendor_in_progress")}
/>

          <WorkflowButton
            label="Notify Owner"
            disabled={busy}
            onClick={() => onUpdate(item, "notify_owner")}
          />

          <WorkflowButton
            label="Mark Complete"
            disabled={busy}
            strong
            onClick={() => onUpdate(item, "mark_complete")}
          />
        </div>
      </div>
    </div>
  );
}

function WorkflowButton({ label, onClick, disabled, strong }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${
        strong
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
          : "border-yellow-400/25 bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400/20"
      }`}
    >
      {disabled ? "Updating..." : label}
    </button>
  );
}

function Timeline({ item }) {
  
  const isAccountingRequest = String(item.request_type || "")
    .toLowerCase()
    .startsWith("financial_");
  
  const steps = [
    {
      key: "intake",
      label: "Ava Intake",
      complete: true,
      date: item.created_at,
    },
    {
      key: "manager",
      label: "Manager Verified",
      complete:
        item.status === "manager_review" ||
        item.status === "board_review" ||
        item.status === "dispatched" ||
        item.status === "completed" ||
        item.dispatched,
      date: item.manager_updated_at,
    },
    {
      key: "board",
      label: isAccountingRequest ? "Accounting Review" : "Board Review",
      complete:
  item.status === "board_review" ||
  item.status === "board_approved" ||
  item.status === "dispatched" ||
  item.status === "completed" ||
  item.dispatched,
      date: item.board_sent_at || item.board_decision_at,
    },
    {
      key: "dispatch",
      label: "Vendor Dispatch",
      complete:
        item.status === "dispatched" ||
        item.status === "completed" ||
        Boolean(item.dispatched),
      date: item.dispatched_at,
    },
    {
      key: "complete",
      label: "Completed",
      complete:
        item.status === "completed" || item.vendor_status === "completed",
      date: item.completed_at || item.vendor_updated_at,
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-yellow-500/10 bg-yellow-400/[0.035] p-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div key={step.key} className="relative">
            <div className="flex items-center gap-3">
              <div
                className={`h-11 w-11 rounded-full border flex items-center justify-center text-sm font-semibold ${
                  step.complete
                    ? "border-yellow-400/40 bg-yellow-400/15 text-yellow-300"
                    : "border-white/10 bg-white/[0.03] text-white/35"
                }`}
              >
                {step.complete ? "✓" : index + 1}
              </div>

              <div>
                <p
                  className={
                    step.complete
                      ? "text-white font-medium"
                      : "text-white/40"
                  }
                >
                  {step.label}
                </p>

                <p className="text-xs text-white/40">
                  {step.date
                    ? new Date(step.date).toLocaleString()
                    : step.complete
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden md:block absolute left-12 top-5 h-px w-[calc(100%-3rem)] bg-white/10" />
            )}
          </div>
        ))}
      </div>

      {item.owner_notified && (
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Owner notification has been marked as sent.
        </div>
      )}
    </div>
  );
}

function DetailDrawer({ item, onClose, onUpdate, updatingId }) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close drawer overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-yellow-500/10 bg-[#020617] p-6 shadow-2xl shadow-black">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              Action Detail
            </p>

            <h2 className="mt-2 text-3xl font-semibold leading-tight">
              {item.title || "BOS Action"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3 py-2 text-white/60 hover:border-yellow-400/30 hover:text-yellow-300 transition"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Badge item={item} />
          <PriorityBadge priority={item.priority} />
          <VendorBadge status={item.vendor_status} item={item} />
        </div>

        <div className="mt-6 rounded-3xl border border-yellow-500/10 bg-white/[0.02] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/70">
            Operational Summary
          </p>

          <div className="mt-4 whitespace-pre-line text-white/75 leading-relaxed">
            {cleanDescription(item.description)}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Meta
            label="Association"
            value={item.association_name || "Demo Association"}
          />

          <Meta label="Owner" value={item.owner_name || "Ava Caller"} />

          <Meta label="Unit" value={item.property_address || "Pending"} />

          <Meta
            label="Category"
            value={formatCategory(item.category || item.request_type)}
          />

          <Meta label="Status" value={formatStatus(item.status)} />

          <Meta
            label="Priority"
            value={titleCase(item.priority || "medium")}
          />
            {String(item.request_type || "")
  .toLowerCase()
  .startsWith("financial_") && (
  <Meta
    label="Accounting Workflow"
    value="Financial Review Required"
  />
)}
        </div>

        <div className="mt-6">
          <Timeline item={item} />
        </div>

        <WorkflowControls
          item={item}
          onUpdate={onUpdate}
          updatingId={updatingId}
        />
      </aside>
    </div>
  );
}

function Badge({ item }) {
  const status = item.status || "open";

  const labels = {
    open: "New Intake",
    manager_review: "Manager Review",
    board_review: "Board Review",
    board_approved: "Board Approved",
    needs_clarification: "Needs Clarification",
    dispatched: "Dispatched",
    completed: "Completed",
  };

  const tones = {
    open: "blue",
    manager_review: "gold",
    board_review: "gold",
    board_approved: "green",
    needs_clarification: "red",
    dispatched: "blue",
    completed: "green",
  };

  return (
    <Pill
      text={labels[status] || formatStatus(status)}
      tone={tones[status] || "neutral"}
    />
  );
}

function PriorityBadge({ priority }) {
  const normalized = String(priority || "").toLowerCase();
  const value = String(priority || "medium").toLowerCase();

  if (
  normalized === "high" ||
  normalized === "financial_urgent"
) {
    return (
  <Pill
    text={
      normalized === "financial_urgent"
        ? "Financial Urgent"
        : "High Priority"
    }
    tone="red"
  />
);
  }

  if (value === "low") {
    return <Pill text="Low Priority" tone="blue" />;
  }

  return <Pill text="Medium Priority" tone="gold" />;
}

function VendorBadge({ status, item }) {
    if (
    String(item?.request_type || "")
      .toLowerCase()
      .startsWith("financial_")
  ) {
    return <Pill text="No Vendor Needed" tone="neutral" />;
  }
   if (item?.status === "completed") {
    return <Pill text="Completed" tone="green" />;
  }

  if (item?.status === "dispatched" || item?.dispatched) {
    return <Pill text="Vendor Dispatched" tone="blue" />;
  }

  const labels = {
    pending: "Vendor Pending",
    accepted: "Vendor Accepted",
    in_progress: "Vendor In Progress",
    completed: "Vendor Completed",
  };

  const tones = {
    pending: "neutral",
    accepted: "blue",
    in_progress: "gold",
    completed: "green",
  };

  return (
    <Pill
      text={labels[status] || "Awaiting Vendor"}
      tone={tones[status] || "neutral"}
    />
  );
}

function Pill({ text, tone }) {
  const styles = {
    gold: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    red: "border-red-400/30 bg-red-400/10 text-red-300",
    blue: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    neutral: "border-white/10 bg-white/5 text-white/60",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[tone] || styles.neutral
      }`}
    >
      {text}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-yellow-500/10 bg-white/[0.025] p-5">
      <p className="text-sm text-white/55">{label}</p>

      <p className="mt-2 text-2xl font-semibold text-yellow-300">{value}</p>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-lg text-white/85 break-words">
        {value || "N/A"}
      </p>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-yellow-500/20 bg-white/[0.015] p-10 text-center text-white/50">
      {message}
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

function formatStatus(status) {
  return titleCase(status || "Open");
}

function isIntake(action) {
  return !action.status || action.status === "open";
}

function isFinancialRequest(action) {
  return String(action?.request_type || "")
    .toLowerCase()
    .startsWith("financial_");
}

function buildFallbackPayload(workflowAction) {
  if (workflowAction === "manager_verified") {
    return { status: "manager_review" };
  }

  if (workflowAction === "send_to_board") {
    return { status: "board_review" };
  }

  if (workflowAction === "request_clarification") {
    return { status: "needs_clarification" };
  }

  if (workflowAction === "dispatch_vendor") {
    return { status: "dispatched", dispatched: true };
  }

  if (workflowAction === "mark_complete") {
    return { status: "completed" };
  }

  if (workflowAction === "notify_owner") {
    return { status: "manager_review" };
  }

  return { status: "open" };
}

function getNotificationEventType(workflowAction) {
  const map = {
    manager_verified: "manager_review",
    send_to_board: "board_review",
    request_clarification: "manager_review",
    dispatch_vendor: "vendor_dispatched",
    vendor_accepted: "vendor_accepted",
    vendor_in_progress: "vendor_in_progress",
    mark_complete: "completed",
    notify_owner: "owner_notified",
  };

  return map[workflowAction] || "manager_review";
}

function getWorkflowMessage(workflowAction) {
  const messages = {
    manager_verified: "Manager verification complete. Request moved into review.",
    send_to_board: "Request sent to board review.",
    request_clarification: "Clarification requested.",
    dispatch_vendor: "Vendor dispatch initiated.",
    vendor_accepted: "Vendor acceptance recorded.",
    vendor_in_progress: "Vendor work marked in progress.",
    mark_complete: "Request marked complete.",
    notify_owner: "Owner notification marked as sent.",
  };

  return messages[workflowAction] || "Workflow updated.";
}











