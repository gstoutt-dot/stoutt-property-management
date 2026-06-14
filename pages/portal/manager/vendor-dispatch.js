import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

export default function ManagerVendorDispatch() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [workflow, setWorkflow] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({});
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [dispatchNote, setDispatchNote] = useState("");

  useEffect(() => {
    loadDispatchQueue();
  }, []);

  async function loadDispatchQueue() {
    setLoading(true);

    const associationId =
  typeof window !== "undefined"
    ? localStorage.getItem("spm_selected_association_id") || ""
    : "";

if (!associationId) {
  setItems([]);
  setLoading(false);
  return;
}

const { data, error } = await supabase
  .from("bos_actions")
  .select("*")
  .eq("association_id", associationId)
  .in("status", ["approved", "Ready for Vendor Dispatch"])
  .order("created_at", { ascending: false });

    if (error) {
      console.error("Vendor dispatch queue load failed:", error);
      setItems([]);
      setLoading(false);
      return;
    }

    const safe = data || [];
    
if (!associationId) {
  setVendors([]);
} else {
  const { data: vendorData } = await supabase
    .from("association_vendors")
    .select("*")
    .eq("association_id", associationId)
    .eq("active", true)
    .order("vendor_name", { ascending: true });

  setVendors(vendorData || []);
}
    setItems(safe);

    setSelectedId((current) => {
      if (current && safe.some((item) => item.id === current)) return current;
      return safe[0]?.id || "";
    });

    setLoading(false);
  }

  const selected =
    items.find((item) => String(item.id) === String(selectedId)) ||
    items[0] ||
    null;

  const selectedVendor =
  vendors.find(
    (vendor) => String(vendor.id) === String(selectedVendorId)
  ) || null;

  const stats = useMemo(() => {
    return {
      ready: items.filter((item) => !item.dispatched_at).length,
      dispatched: items.filter((item) => item.dispatched_at).length,
      high: items.filter((item) => item.priority === "high").length,
      total: items.length,
    };
  }, [items]);

  function updateWorkflowField(id, field, value) {
    setWorkflow((current) => ({
      ...current,
      [id]: {
        ...(current[id] || {}),
        [field]: value,
      },
    }));
  }

  async function saveVendorDetails(item) {
    if (!item?.id) return;

    const wf = workflow[item.id] || {};

    const payload = {
      vendor_name: wf.vendor_name ?? item.vendor_name ?? "",
      vendor_phone: wf.vendor_phone ?? item.vendor_phone ?? "",
      vendor_email: wf.vendor_email ?? item.vendor_email ?? "",
      dispatch_note: wf.dispatch_note ?? item.dispatch_note ?? "",
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("bos_actions")
      .update(payload)
      .eq("id", item.id);

    if (error) {
      console.error("Vendor detail save failed:", error);
      setFeedback({
        type: "error",
        message: "Unable to save vendor details.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: "Vendor details saved.",
    });

    await loadDispatchQueue();
  }

  async function createVendorTrackingRecord(item, vendorName, dispatchNote) {
    const payload = {
      work_order_id: item.id,
      issue: item.title || item.request_type || "Vendor Dispatch",
      vendor: vendorName,
      status: "Dispatched",
      manager_note:
        dispatchNote ||
        `Dispatched from Manager Vendor Dispatch for ${
          item.association_name || "association"
        }.`,
    };

    const { error } = await supabase.from("vendor_tracking").insert(payload);

    if (error) {
      console.error("Vendor tracking insert failed:", error);
    }
  }

  async function dispatchVendor(item) {
    if (!item?.id) return;

    const wf = workflow[item.id] || {};

    const vendorName = wf.vendor_name ?? item.vendor_name ?? "";
    const vendorPhone = wf.vendor_phone ?? item.vendor_phone ?? "";
    const vendorEmail = wf.vendor_email ?? item.vendor_email ?? "";
    const dispatchNote = wf.dispatch_note ?? item.dispatch_note ?? "";

    if (!vendorName || !vendorPhone || !vendorEmail) {
      setFeedback({
        type: "error",
        message:
          "Please enter vendor name, phone, and email before dispatching.",
      });
      return;
    }

    try {
      setFeedback({
        type: "loading",
        message: "Preparing vendor dispatch...",
      });

      const response = await fetch("/api/send-vendor-dispatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action_id: item.id,
          requestId: item.id,
          vendorName,
          vendorPhone,
          vendorEmail,
          requestType: item.request_type || item.title || "Manager Dispatch",
          propertyName: item.association_name || "Association",
          ownerName: item.owner_name || "",
          ownerPhone: item.owner_phone || "",
          propertyAddress: item.property_address || "",
          description: item.description || "",
          dispatchNote,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Vendor dispatch failed.");
      }

      const { error } = await supabase
        .from("bos_actions")
        .update({
          vendor_name: vendorName,
          vendor_phone: vendorPhone,
          vendor_email: vendorEmail,
          dispatch_note: dispatchNote,
          dispatched_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (error) {
        throw error;
      }

      await createVendorTrackingRecord(item, vendorName, dispatchNote);

      setFeedback({
        type: "success",
        message: "Vendor dispatch completed and tracking record created.",
      });

      await loadDispatchQueue();
    } catch (error) {
      console.error("Vendor dispatch failed:", error);

      setFeedback({
        type: "error",
        message: error.message || "Unable to dispatch vendor.",
      });
    }
  }

  function formatDate(value) {
    if (!value) return "Not dispatched";
    return new Date(value).toLocaleString();
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
                Manager Operations
              </p>

              <h1 className="text-4xl font-semibold tracking-tight">
                Vendor Dispatch
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Assign approved work items to vendors, send dispatch details,
                and create live vendor tracking records.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager"
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300"
              >
                Manager Command Center
              </Link>

              <Link
                href="/portal/manager/action-center"
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300"
              >
                Action Center
              </Link>

              <button
                onClick={loadDispatchQueue}
                className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300"
              >
                Refresh
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <Stat label="Ready" value={stats.ready} />
          <Stat label="Dispatched" value={stats.dispatched} />
          <Stat label="High Priority" value={stats.high} />
          <Stat label="Total" value={stats.total} />
        </section>

        {feedback.message && (
          <div
            className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${
              feedback.type === "error"
                ? "border-red-400/30 bg-red-400/10 text-red-300"
                : feedback.type === "loading"
                ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-xl font-semibold">Approved Dispatch Queue</h2>
            <p className="mt-1 text-sm text-slate-400">
              Approved BOS actions ready for vendor assignment.
            </p>

            <div className="mt-5 space-y-4">
              {loading ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  Loading vendor dispatch queue...
                </div>
              ) : items.length > 0 ? (
                items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      String(selectedId) === String(item.id)
                        ? "border-yellow-400/60 bg-yellow-400/10"
                        : "border-white/10 bg-black/20 hover:border-yellow-400/30"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      <Badge>{item.status || "approved"}</Badge>
                      <Badge>{item.priority || "medium"} priority</Badge>
                      {item.dispatched_at && <Badge>Dispatched</Badge>}
                    </div>

                    <h3 className="mt-3 text-lg font-semibold">
                      {item.title || item.request_type || "Approved Work Item"}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                      {item.description || "No description provided."}
                    </p>

                    <div className="mt-4 text-xs text-slate-500">
                      {item.association_name || "Association"} ·{" "}
                      {item.property_address || "Location not provided"}
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  No approved items are currently ready for vendor dispatch.
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            {!selected ? (
              <div className="text-sm text-slate-400">
                Select an approved item to dispatch.
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
                  Dispatch Detail
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {selected.title || selected.request_type || "Approved Work Item"}
                </h2>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
                  {selected.description || "No description provided."}
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <Detail label="Association" value={selected.association_name} />
                  <Detail label="Owner" value={selected.owner_name} />
                  <Detail label="Location" value={selected.property_address} />
                  <Detail label="Dispatched" value={formatDate(selected.dispatched_at)} />
                </div>

                <div className="mt-6 grid gap-3">
  <select
    value={selectedVendorId}
    onChange={(e) => setSelectedVendorId(e.target.value)}
    className={inputClass}
  >
    <option value="">Select QuickBooks Vendor</option>

    {vendors.map((vendor) => (
      <option key={vendor.id} value={vendor.id}>
        {vendor.vendor_name ||
          vendor.vendor_display_name ||
          vendor.company_name ||
          "Unnamed Vendor"}
      </option>
    ))}
  </select>

  {selectedVendor && (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
      <div>
        Email:{" "}
        {selectedVendor.email ||
          selectedVendor.primary_email ||
          "—"}
      </div>

      <div>
        Phone:{" "}
        {selectedVendor.phone ||
          selectedVendor.primary_phone ||
          "—"}
      </div>

      <div>
        Address: {selectedVendor.address || "—"}
      </div>
    </div>
  )}

  <textarea
    value={dispatchNote}
    onChange={(e) => setDispatchNote(e.target.value)}
    rows={4}
    placeholder="Dispatch note for vendor..."
    className={inputClass}
  />
</div>

                <div className="mt-6 grid gap-3">
                  <button
                    onClick={() => saveVendorDetails(selected)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                  >
                    Save Vendor Details
                  </button>

                  <button
                    onClick={() => dispatchVendor(selected)}
                    disabled={!!selected.dispatched_at}
                    className={`rounded-xl px-4 py-3 text-sm font-bold ${
                      selected.dispatched_at
                        ? "cursor-not-allowed border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "bg-yellow-400 text-slate-950 hover:bg-yellow-300"
                    }`}
                  >
                    {selected.dispatched_at
                      ? "Already Dispatched"
                      : "Send Vendor Dispatch"}
                  </button>
                </div>
              </>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40";

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
      {children}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-100">
        {value || "—"}
      </span>
    </div>
  );
}
