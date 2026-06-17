import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID =
  typeof window !== "undefined"
    ? localStorage.getItem("spm_selected_association_id") || ""
    : "";
const closedStatuses = ["completed", "closed", "archived"];

const requestTypes = [
  "Common Area Maintenance",
  "Building Maintenance",
  "Roof Leak",
  "Water Intrusion",
  "Plumbing",
  "Electrical",
  "Lighting / Electrical",
  "HVAC / Air Conditioning",
  "Elevator Issue",
  "Landscape / Irrigation",
  "Tree Trimming",
  "Pool / Spa Issue",
  "Gate / Access Control",
  "Security Concern",
  "Janitorial / Cleaning",
  "Pest Control",
  "Trash / Recycling",
  "Vendor Damage Report",
  "Other",
];

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
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const [requestType, setRequestType] = useState("Common Area Maintenance");
  const [priority, setPriority] = useState("Normal");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [title, setTitle] = useState("");
  const [unitNumber, setUnitNumber] = useState("Association");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    loadWorkOrders({ showLoading: true });
    loadVendors();

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

      if (!DEFAULT_ASSOCIATION_ID) {
  setSystemMessage("No association selected.");
  return;
}

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

  async function loadVendors() {
    if (!DEFAULT_ASSOCIATION_ID) return;
    const { data, error } = await supabase
      .from("association_vendors")
      .select("*")
      .eq("association_id", DEFAULT_ASSOCIATION_ID)
      .eq("active", true)
      .order("vendor_name", { ascending: true });

    if (error) {
      console.error("Association vendors load failed:", error);
      return;
    }

    setVendors(data || []);
  }

  async function submitRequest() {
    try {
      setSubmitting(true);
      setSubmitError("");
      setSubmitMessage("");
      if (!DEFAULT_ASSOCIATION_ID) {
  setSubmitError("No association selected.");
  return;
}

      const selectedVendor = vendors.find(
        (vendor) => String(vendor.id) === String(selectedVendorId)
      );

      const response = await fetch("/api/homeowner/service-request/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          associationId: DEFAULT_ASSOCIATION_ID,
          ownerUserId: "",
          ownerName: "Association Management",
          ownerEmail: "",
          unitNumber,
          requestType,
          priority,
          title,
          description,
          location,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to submit work order.");
      }

      if (selectedVendor && data.bosAction?.id) {
        const { error: workflowError } = await supabase
          .from("manager_workflow_records")
          .upsert(
            {
              source_record_id: String(data.bosAction.id),
              source_table: "bos_actions",
              association_id: DEFAULT_ASSOCIATION_ID,
              selected_vendor_id: String(selectedVendor.id),
              vendor_name:
                selectedVendor.vendor_name ||
                selectedVendor.vendor_display_name ||
                selectedVendor.company_name ||
                "",
              vendor_phone:
                selectedVendor.phone || selectedVendor.primary_phone || "",
              vendor_email:
                selectedVendor.email || selectedVendor.primary_email || "",
              dispatch_note: "",
              internal_assignment: "",
              due_date: null,
              pending_note: "",
              notes: [],
              timeline: [
                {
                  text: "Approved vendor selected from Association Work Orders",
                  date: new Date().toLocaleString(),
                },
              ],
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: "association_id,source_record_id,source_table",
            }
          );

        if (workflowError) {
          throw workflowError;
        }
      }

      setSubmitMessage("Association work order created successfully.");
      setTitle("");
      setDescription("");
      setLocation("");
      setUnitNumber("Association");
      setPriority("Normal");
      setRequestType("Common Area Maintenance");
      setSelectedVendorId("");

      await loadWorkOrders({ showLoading: false });
    } catch (error) {
      console.error("Create association work order failed:", error);
      setSubmitError(error.message || "Unable to submit work order.");
    } finally {
      setSubmitting(false);
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
          !closedStatuses.includes(String(request.status || "").toLowerCase())
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
        (statusFilter === "open" && !closedStatuses.includes(statusValue)) ||
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
              Create association work orders, assign an approved vendor when
              needed, and monitor all homeowner and management-created service
              requests from one operational registry.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
  href={
    typeof window !== "undefined" &&
    localStorage.getItem("spmPortalRole") === "manager"
      ? "/manager/dashboard"
      : "/admin"
  }
  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
>
  Dashboard
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

        <div className="rounded-3xl border border-amber-400/20 bg-white/[0.04] p-6 shadow-2xl">
          <p className="text-sm font-medium text-amber-300">
            Create Association Work Order
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Produce a work order for association processing
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            This uses the same service request workflow already connected to
            homeowner requests, BOS processing, manager review, and vendor dispatch.
          </p>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              submitRequest();
            }}
          >
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Request Type">
                <select
                  value={requestType}
                  onChange={(event) => setRequestType(event.target.value)}
                  className={inputClass}
                >
                  {requestTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </Field>

              <Field label="Priority">
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className={inputClass}
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Emergency</option>
                </select>
              </Field>

              <Field label="Association Approved Vendor">
                <select
                  value={selectedVendorId}
                  onChange={(event) => setSelectedVendorId(event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select approved vendor if applicable</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.vendor_name ||
                        vendor.vendor_display_name ||
                        vendor.company_name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Work Order Title">
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className={inputClass}
                  placeholder="Example: Elevator service request"
                />
              </Field>

              <Field label="Unit / Area">
                <input
                  value={unitNumber}
                  onChange={(event) => setUnitNumber(event.target.value)}
                  className={inputClass}
                  placeholder="Association, Building 1, Unit 101, Pool Area..."
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                rows="5"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={inputClass}
                placeholder="Describe the work needed, issue, location, timing, and any important instructions."
              />
            </Field>

            <Field label="Location">
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className={inputClass}
                placeholder="Building, common area, unit, equipment location, etc."
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating Work Order..." : "Create Association Work Order"}
            </button>

            {submitMessage && (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {submitMessage}
              </div>
            )}

            {submitError && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submitError}
              </div>
            )}
          </form>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
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
                Association Service Requests
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                These records originate from homeowner requests or management-created
                work orders and reflect the associated BOS workflow status when available.
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

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-400";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      {children}
    </div>
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
