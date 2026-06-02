import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "closed", "archived"];

function formatDate(value) {
  if (!value) return "Recently";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusLabel(value) {
  return String(value || "Received")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "emergency") {
    return "border-red-400/30 bg-red-500/10 text-red-200";
  }

  if (value === "high") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  return "border-sky-400/30 bg-sky-400/10 text-sky-300";
}

function statusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (closedStatuses.includes(value)) {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (value.includes("approved")) {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (value.includes("board")) {
    return "border-purple-400/30 bg-purple-400/10 text-purple-300";
  }

  if (value.includes("progress") || value.includes("review")) {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

export default function AssociationWorkOrders() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    loadWorkOrders({ showLoading: true });

    const interval = setInterval(() => {
      loadWorkOrders({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

    async function loadWorkOrders({ showLoading = false } = {}) {
    try {
      if (showLoading) {
        setLoading(true);
      }

      setSystemMessage("");

      const params = new URLSearchParams({
        associationId: DEFAULT_ASSOCIATION_ID,
      });

      const response = await fetch(
        `/api/homeowner/service-request/list?${params}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load association work orders.");
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Unable to load association work orders:", error);
      setRequests([]);
      setSystemMessage(
        error.message || "Unable to load association work orders."
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteWorkOrder(request) {
    const confirmed = window.confirm(
      `Delete "${request.title || "this work order"}" permanently? This will also remove the linked manager workflow record.`
    );

    if (!confirmed) return;

    try {
      setSystemMessage("");

      const response = await fetch(
        `/api/admin/delete-work-order?id=${encodeURIComponent(request.id)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete work order.");
      }

      setSystemMessage("Work order deleted successfully.");
      await loadWorkOrders({ showLoading: false });
    } catch (error) {
      console.error("Delete work order error:", error);
      setSystemMessage(error.message || "Unable to delete work order.");
    }
  }

  const openRequests = useMemo(
    () =>
      requests.filter(
        (request) =>
          !closedStatuses.includes(
            String(request.status || "").toLowerCase()
          )
      ),
    [requests]
  );

  const emergencyRequests = useMemo(
    () =>
      requests.filter(
        (request) =>
          String(request.priority || "").toLowerCase() === "emergency"
      ),
    [requests]
  );

  const vendorReadyRequests = useMemo(
    () =>
      requests.filter((request) => {
        const combined = `${request.status || ""} ${
          request.workflow_stage || ""
        }`.toLowerCase();

        return (
          combined.includes("approved") ||
          combined.includes("vendor") ||
          combined.includes("scheduled")
        );
      }),
    [requests]
  );

  const completedRequests = useMemo(
    () =>
      requests.filter((request) =>
        closedStatuses.includes(String(request.status || "").toLowerCase())
      ),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const normalizedSearch = String(searchTerm || "").toLowerCase().trim();

    return requests.filter((request) => {
      const statusValue = String(request.status || "").toLowerCase();
      const workflowValue = String(request.workflow_stage || "").toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "open" &&
          !closedStatuses.includes(statusValue)) ||
        (statusFilter === "vendor" &&
          (statusValue.includes("approved") ||
            workflowValue.includes("vendor") ||
            workflowValue.includes("scheduled"))) ||
        (statusFilter === "completed" &&
          closedStatuses.includes(statusValue)) ||
        statusValue.includes(statusFilter);

      const combined = [
        request.title,
        request.description,
        request.request_type,
        request.priority,
        request.status,
        request.workflow_stage,
        request.unit_number,
        request.owner_name,
        request.owner_email,
        request.location,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || combined.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [requests, searchTerm, statusFilter]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Association Work Orders
            </h1>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
              Association-wide work order registry showing homeowner service
              requests, workflow status, owner/unit details, management review
              progress, and vendor dispatch readiness.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/portal/manager#live-queue"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Manager Command Center
            </Link>

            <button
              onClick={() => loadWorkOrders({ showLoading: false })}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Refresh Work Orders
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Total Work Orders" value={requests.length} />
          <Metric label="Open Work Orders" value={openRequests.length} />
          <Metric label="Vendor / Scheduled" value={vendorReadyRequests.length} />
          <Metric label="Completed" value={completedRequests.length} />
        </div>

        {emergencyRequests.length > 0 && (
          <div className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-6">
            <h2 className="text-xl font-semibold text-red-100">
              Emergency Work Orders
            </h2>

            <p className="mt-2 text-sm text-red-100/80">
              {emergencyRequests.length} emergency work order
              {emergencyRequests.length === 1 ? "" : "s"} require immediate
              manager attention.
            </p>
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Live Work Order Registry
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Homeowner Service Requests
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                These records originate from the homeowner work order form and
                reflect the associated BOS workflow status when available.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
              >
                <option value="all">All Work Orders</option>
                <option value="open">Open</option>
                <option value="received">Received</option>
                <option value="review">In Review</option>
                <option value="board">Board Review</option>
                <option value="vendor">Vendor / Scheduled</option>
                <option value="completed">Completed</option>
              </select>

              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400"
                placeholder="Search owner, unit, type, location..."
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <Empty message="Loading association work orders..." />
            ) : filteredRequests.length === 0 ? (
              <Empty message="No work orders match the current filters." />
            ) : (
              filteredRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                            request.priority
                          )}`}
                        >
                          {request.priority || "Normal"}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(
                            request.status
                          )}`}
                        >
                          {statusLabel(request.status)}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {request.request_type || "Service Request"}
                        </span>

                        {request.bos_action_id && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                            BOS Linked
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold">
                        {request.title || "Untitled Work Order"}
                      </h3>

                      <p className="mt-3 max-w-4xl whitespace-pre-wrap text-sm leading-7 text-slate-300">
                        {request.description || "No description provided."}
                      </p>

                      <div className="mt-5 grid gap-3 md:grid-cols-4">
                        <InfoBox label="Owner" value={request.owner_name || "Homeowner"} />
                        <InfoBox label="Unit" value={request.unit_number || "Unknown"} />
                        <InfoBox label="Location" value={request.location || "Not specified"} />
                        <InfoBox label="Submitted" value={formatDate(request.created_at)} />
                      </div>

                      <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                          Workflow Stage
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-200">
                          {request.workflow_stage || "Owner Submitted"}
                        </p>
                      </div>

                      {selectedRequestId === request.id && (
                        <div className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-2">
                          <InfoBox
                            label="Owner Email"
                            value={request.owner_email || "Not provided"}
                          />

                          <InfoBox
                            label="Request ID"
                            value={String(request.id || "").toUpperCase()}
                          />

                          <InfoBox
                            label="BOS Action ID"
                            value={request.bos_action_id || "Not linked"}
                          />

                          <InfoBox
                            label="Owner Notified"
                            value={request.owner_notified ? "Yes" : "No"}
                          />
                        </div>
                      )}
                    </div>

                                        <div className="flex shrink-0 flex-col gap-3 lg:w-64">
                      <button
                        onClick={() =>
                          setSelectedRequestId(
                            selectedRequestId === request.id ? null : request.id
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                      >
                        {selectedRequestId === request.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>

                      <Link
                        href="/portal/manager#live-queue"
                        className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                      >
                        Process in Manager Center
                      </Link>

                      <button
                        onClick={() => deleteWorkOrder(request)}
                        className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20"
                      >
                        Delete Work Order
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm text-slate-200">{value}</p>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}
