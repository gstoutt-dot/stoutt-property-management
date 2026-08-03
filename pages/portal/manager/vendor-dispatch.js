import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

function getStoredAssociationId() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("spm_selected_association_id") ||
    localStorage.getItem("selectedAssociationId") ||
    ""
  );
}

function getVendorName(vendor) {
  return (
    vendor?.vendor_name ||
    vendor?.vendor_display_name ||
    vendor?.company_name ||
    "Unnamed Vendor"
  );
}

function getVendorEmail(vendor) {
  return vendor?.email || vendor?.primary_email || "";
}

function getVendorPhone(vendor) {
  return vendor?.phone || vendor?.primary_phone || "";
}

export default function ManagerVendorDispatch() {
  const router = useRouter();
  const [associationId, setAssociationId] = useState("");
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({});
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [dispatchNote, setDispatchNote] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const queryAssociationId = String(
      router.query.association_id || router.query.associationId || ""
    ).trim();
    const resolvedAssociationId = queryAssociationId || getStoredAssociationId();

    setAssociationId(resolvedAssociationId);

    if (resolvedAssociationId && typeof window !== "undefined") {
      localStorage.setItem("spm_selected_association_id", resolvedAssociationId);
      localStorage.setItem("selectedAssociationId", resolvedAssociationId);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!associationId) {
      setItems([]);
      setVendors([]);
      setLoading(false);
      return;
    }

    loadDispatchQueue();
  }, [associationId]);

  const selected =
    items.find((item) => String(item.id) === String(selectedId)) ||
    items[0] ||
    null;

  const selectedVendor =
    vendors.find((vendor) => String(vendor.id) === String(selectedVendorId)) ||
    null;

  useEffect(() => {
    if (!selected) {
      setSelectedVendorId("");
      setDispatchNote("");
      return;
    }

    const matchingVendor = vendors.find(
      (vendor) =>
        String(getVendorEmail(vendor)).toLowerCase() ===
          String(selected.vendor_email || "").toLowerCase() ||
        String(getVendorName(vendor)).toLowerCase() ===
          String(selected.vendor_name || "").toLowerCase()
    );

    setSelectedVendorId(matchingVendor?.id ? String(matchingVendor.id) : "");
    setDispatchNote(selected.dispatch_note || "");
  }, [selected?.id, vendors]);

  async function loadDispatchQueue() {
    if (!associationId) return;

    setLoading(true);
    setFeedback({});

    try {
      const [actionsResponse, vendorsResponse] = await Promise.all([
        supabase
          .from("bos_actions")
          .select("*")
          .eq("association_id", associationId)
          .in("vendor_status", [
            "approved",
            "pending",
            "accepted",
            "in_progress",
            "completed",
          ])
          .order("created_at", { ascending: false }),
        supabase
          .from("association_vendors")
          .select("*")
          .eq("association_id", associationId)
          .eq("active", true)
          .order("vendor_name", { ascending: true }),
      ]);

      if (actionsResponse.error) throw actionsResponse.error;
      if (vendorsResponse.error) throw vendorsResponse.error;

      const safeItems = actionsResponse.data || [];

      setItems(safeItems);
      setVendors(vendorsResponse.data || []);
      setSelectedId((current) =>
        current && safeItems.some((item) => String(item.id) === String(current))
          ? current
          : safeItems[0]?.id || ""
      );
    } catch (error) {
      console.error("Vendor dispatch queue load failed:", error);
      setItems([]);
      setVendors([]);
      setFeedback({
        type: "error",
        message: error.message || "Unable to load the vendor dispatch queue.",
      });
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(
    () => ({
      ready: items.filter((item) => item.vendor_status === "approved").length,
      dispatched: items.filter((item) => Boolean(item.dispatched_at)).length,
      high: items.filter(
        (item) => String(item.priority || "").toLowerCase() === "high"
      ).length,
      total: items.length,
    }),
    [items]
  );

  async function appendWorkflowTimeline(item, text) {
    if (!item?.id || !associationId || !text) return;

    const { data: existing, error: loadError } = await supabase
      .from("manager_workflow_records")
      .select("notes, timeline")
      .eq("association_id", associationId)
      .eq("source_record_id", item.id)
      .eq("source_table", "bos_actions")
      .maybeSingle();

    if (loadError) throw loadError;

    const currentTimeline = Array.isArray(existing?.timeline)
      ? existing.timeline
      : [];

    const { error: saveError } = await supabase
      .from("manager_workflow_records")
      .upsert(
        {
          association_id: associationId,
          source_record_id: item.id,
          source_table: "bos_actions",
          notes: Array.isArray(existing?.notes) ? existing.notes : [],
          timeline: [
            { text, date: new Date().toLocaleString() },
            ...currentTimeline,
          ],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "source_record_id,source_table" }
      );

    if (saveError) throw saveError;
  }

  async function saveVendorDetails(item) {
    if (!item?.id || !selectedVendor) {
      setFeedback({
        type: "error",
        message: "Select an approved vendor before saving vendor details.",
      });
      return;
    }

    const { error } = await supabase
      .from("bos_actions")
      .update({
        vendor_name: getVendorName(selectedVendor),
        vendor_phone: getVendorPhone(selectedVendor),
        vendor_email: getVendorEmail(selectedVendor),
        dispatch_note: dispatchNote,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id)
      .eq("association_id", associationId);

    if (error) {
      console.error("Vendor detail save failed:", error);
      setFeedback({ type: "error", message: "Unable to save vendor details." });
      return;
    }

    try {
      await appendWorkflowTimeline(item, "Vendor details saved");
    } catch (timelineError) {
      console.error("Unable to save vendor timeline entry:", timelineError);
    }

    setFeedback({ type: "success", message: "Vendor details saved." });
    await loadDispatchQueue();
  }

  async function createVendorTrackingRecord(item, vendorName) {
    const { error } = await supabase.from("vendor_tracking").insert({
      work_order_id: item.id,
      issue: item.title || item.request_type || "Vendor Dispatch",
      vendor: vendorName,
      status: "Dispatched",
      manager_note:
        dispatchNote ||
        `Dispatched from BOSai Vendor Dispatch for ${
          item.association_name || "association"
        }.`,
    });

    if (error) {
      console.error("Vendor tracking insert failed:", error);
    }
  }

  async function dispatchVendor(item) {
    if (!item?.id || !selectedVendor) {
      setFeedback({
        type: "error",
        message: "Select an approved vendor before sending this dispatch.",
      });
      return;
    }

    const vendorName = getVendorName(selectedVendor);
    const vendorPhone = getVendorPhone(selectedVendor);
    const vendorEmail = getVendorEmail(selectedVendor);

    if (!vendorPhone || !vendorEmail) {
      setFeedback({
        type: "error",
        message: "The selected vendor needs both a phone number and email address.",
      });
      return;
    }

    try {
      setFeedback({ type: "loading", message: "Sending vendor dispatch..." });

      const response = await fetch("/api/send-vendor-dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action_id: item.id,
          requestId: item.id,
          vendorName,
          vendorPhone,
          vendorEmail,
          requestType: item.request_type || item.title || "Service Request",
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
          status: "dispatched",
          dispatched: true,
          dispatched_at: new Date().toISOString(),
          vendor_status: "pending",
          vendor_name: vendorName,
          vendor_phone: vendorPhone,
          vendor_email: vendorEmail,
          dispatch_note: dispatchNote,
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id)
        .eq("association_id", associationId);

      if (error) throw error;

      await createVendorTrackingRecord(item, vendorName);
      try {
        await appendWorkflowTimeline(
          item,
          `Vendor dispatch sent to ${vendorName}`
        );
      } catch (timelineError) {
        console.error("Unable to save vendor timeline entry:", timelineError);
      }

      setFeedback({
        type: "success",
        message: "Vendor dispatch sent and tracking record created.",
      });
      await loadDispatchQueue();
    } catch (error) {
      console.error("Vendor dispatch failed:", error);
      setFeedback({
        type: "error",
        message: error.message || "Unable to dispatch this vendor.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
                BOSai Manager Operations
              </p>
              <h1 className="text-4xl font-semibold tracking-tight">Vendor Dispatch</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Assign vendor-approved work items, send dispatch details, and create live vendor tracking records.
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
                href={`/bos/action-center?returnTo=${encodeURIComponent(
                  "/portal/manager"
                )}&association_id=${encodeURIComponent(associationId)}`}
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
            <h2 className="text-xl font-semibold">Vendor-Approved Dispatch Queue</h2>
            <p className="mt-1 text-sm text-slate-400">
              Only work items specifically approved for vendor dispatch appear here.
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
                      <Badge>{item.vendor_status === "approved" ? "Vendor Approved" : item.vendor_status || "Dispatched"}</Badge>
                      <Badge>{item.priority || "medium"} priority</Badge>
                      {item.dispatched_at && <Badge>Dispatched</Badge>}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">
                      {item.title || item.request_type || "Vendor Work Item"}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                      {item.description || "No description provided."}
                    </p>
                    <div className="mt-4 text-xs text-slate-500">
                      {item.association_name || "Association"} · {item.property_address || "Location not provided"}
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  No vendor-approved work items are currently waiting for dispatch.
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            {!selected ? (
              <div className="text-sm text-slate-400">
                Select a vendor-approved work item to dispatch.
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
                  Dispatch Detail
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  {selected.title || selected.request_type || "Vendor Work Item"}
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
                    onChange={(event) => setSelectedVendorId(event.target.value)}
                    className={inputClass}
                    disabled={Boolean(selected.dispatched_at)}
                  >
                    <option value="">Select BOSai Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {getVendorName(vendor)}
                      </option>
                    ))}
                  </select>
                  {selectedVendor && (
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                      <div>Email: {getVendorEmail(selectedVendor) || "—"}</div>
                      <div className="mt-1">Phone: {getVendorPhone(selectedVendor) || "—"}</div>
                      <div className="mt-1">Address: {selectedVendor.address || "—"}</div>
                    </div>
                  )}
                  <textarea
                    value={dispatchNote}
                    onChange={(event) => setDispatchNote(event.target.value)}
                    rows={4}
                    placeholder="Dispatch note for vendor..."
                    className={inputClass}
                    disabled={Boolean(selected.dispatched_at)}
                  />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => saveVendorDetails(selected)}
                    disabled={Boolean(selected.dispatched_at)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Save Vendor Details
                  </button>
                  <button
                    onClick={() => dispatchVendor(selected)}
                    disabled={Boolean(selected.dispatched_at)}
                    className={`rounded-xl px-4 py-3 text-sm font-bold ${
                      selected.dispatched_at
                        ? "cursor-not-allowed border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "bg-yellow-400 text-slate-950 hover:bg-yellow-300"
                    }`}
                  >
                    {selected.dispatched_at ? "Already Dispatched" : "Send Vendor Dispatch"}
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

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "Not dispatched";
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40 disabled:cursor-not-allowed disabled:opacity-55";

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
      <span className="text-right font-semibold text-slate-100">{value || "—"}</span>
    </div>
  );
}
