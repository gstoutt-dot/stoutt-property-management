import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function ManagerVendorDispatch() {
  const [items, setItems] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [dispatchNote, setDispatchNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadPageData();
  }, []);

  async function loadPageData() {
    setLoading(true);
    setFeedback(null);

    const { data: actionData, error: actionError } = await supabase
      .from("bos_actions")
      .select("*")
      .eq("association_id", ASSOCIATION_ID)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    const { data: vendorData, error: vendorError } = await supabase
      .from("association_vendors")
      .select("*")
      .eq("association_id", ASSOCIATION_ID)
      .eq("active", true)
      .order("vendor_name", { ascending: true });

    if (actionError) console.error("Dispatch queue load failed:", actionError);
    if (vendorError) console.error("Vendor mirror load failed:", vendorError);

    const safeItems = actionData || [];
    const safeVendors = vendorData || [];

    setItems(safeItems);
    setVendors(safeVendors);
    setSelectedId((current) => current || safeItems[0]?.id || "");
    setSelectedVendorId((current) => current || safeVendors[0]?.id || "");

    setLoading(false);
  }

  const selectedItem =
    items.find((item) => String(item.id) === String(selectedId)) || null;

  const selectedVendor =
    vendors.find((vendor) => String(vendor.id) === String(selectedVendorId)) ||
    null;

  const stats = useMemo(() => {
    return {
      ready: items.filter((item) => !item.dispatched_at).length,
      dispatched: items.filter((item) => item.dispatched_at).length,
      vendors: vendors.length,
      total: items.length,
    };
  }, [items, vendors]);

  async function dispatchSelectedItem() {
    if (!selectedItem || !selectedVendor) {
      setFeedback({
        type: "error",
        message: "Select an approved item and a QuickBooks vendor first.",
      });
      return;
    }

    const vendorName =
      selectedVendor.vendor_name ||
      selectedVendor.vendor_display_name ||
      selectedVendor.company_name ||
      "Selected Vendor";

    const vendorPhone =
      selectedVendor.phone || selectedVendor.primary_phone || "";

    const vendorEmail =
      selectedVendor.email || selectedVendor.primary_email || "";

    if (!vendorEmail) {
      setFeedback({
        type: "error",
        message:
          "This QuickBooks vendor does not have an email address in the vendor mirror.",
      });
      return;
    }

    try {
      setFeedback({
        type: "loading",
        message: "Sending vendor dispatch...",
      });

      const response = await fetch("/api/send-vendor-dispatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action_id: selectedItem.id,
          requestId: selectedItem.id,
          vendorName,
          vendorPhone,
          vendorEmail,
          requestType:
            selectedItem.request_type ||
            selectedItem.title ||
            "Manager Dispatch",
          propertyName:
            selectedItem.association_name || "Sunset Condominium Association",
          ownerName: selectedItem.owner_name || "",
          ownerPhone: selectedItem.owner_phone || "",
          propertyAddress:
            selectedItem.property_address ||
            selectedItem.unit_number ||
            "",
          description: selectedItem.description || "",
          dispatchNote,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Vendor dispatch failed.");
      }

      await supabase
        .from("bos_actions")
        .update({
          dispatched_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedItem.id);

      await supabase.from("vendor_tracking").insert({
        work_order_id: selectedItem.id,
        issue: selectedItem.title || selectedItem.request_type || "Vendor Dispatch",
        vendor: vendorName,
        status: "Dispatched",
        manager_note:
          dispatchNote ||
          `Dispatched to ${vendorName} from Manager Vendor Dispatch.`,
      });

      setFeedback({
        type: "success",
        message: "Vendor dispatch sent and tracking record created.",
      });

      setDispatchNote("");
      await loadPageData();
    } catch (error) {
      console.error("Vendor dispatch failed:", error);
      setFeedback({
        type: "error",
        message: error.message || "Unable to dispatch vendor.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
                Manager Operations
              </p>
              <h1 className="text-4xl font-semibold">Vendor Dispatch</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Dispatch approved work items using the QuickBooks vendor mirror
                stored in Supabase.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/portal/manager" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200">
                Manager Command Center
              </Link>
              <Link href="/portal/manager/vendor-tracking" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200">
                Vendor Tracking
              </Link>
              <button onClick={loadPageData} className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950">
                Refresh
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <Stat label="Ready" value={stats.ready} />
          <Stat label="Dispatched" value={stats.dispatched} />
          <Stat label="Synced Vendors" value={stats.vendors} />
          <Stat label="Total Items" value={stats.total} />
        </section>

        {feedback && (
          <div className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${
            feedback.type === "error"
              ? "border-red-400/30 bg-red-400/10 text-red-300"
              : feedback.type === "loading"
              ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
              : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          }`}>
            {feedback.message}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-xl font-semibold">Approved Dispatch Queue</h2>

            <div className="mt-5 space-y-4">
              {loading ? (
                <div className="text-sm text-slate-400">Loading...</div>
              ) : items.length ? (
                items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-2xl border p-5 text-left ${
                      selectedId === item.id
                        ? "border-yellow-400/60 bg-yellow-400/10"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <div className="text-lg font-semibold">
                      {item.title || item.request_type || "Approved Work Item"}
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      {item.description || "No description provided."}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      {item.association_name || "Association"} ·{" "}
                      {item.property_address || item.unit_number || "Location not provided"}
                    </p>
                  </button>
                ))
              ) : (
                <div className="text-sm text-slate-400">
                  No approved items are ready for vendor dispatch.
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Dispatch Detail
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {selectedItem?.title || selectedItem?.request_type || "Select an Item"}
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-slate-400">
                QuickBooks Vendor Mirror
              </label>
              <select
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
              >
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.vendor_name ||
                      vendor.vendor_display_name ||
                      vendor.company_name ||
                      "Unnamed Vendor"}
                  </option>
                ))}
              </select>
            </div>

            {selectedVendor && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                <div>Email: {selectedVendor.email || selectedVendor.primary_email || "—"}</div>
                <div>Phone: {selectedVendor.phone || selectedVendor.primary_phone || "—"}</div>
                <div>Address: {selectedVendor.address || "—"}</div>
              </div>
            )}

            <textarea
              value={dispatchNote}
              onChange={(e) => setDispatchNote(e.target.value)}
              rows={4}
              placeholder="Dispatch note for vendor..."
              className="mt-5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
            />

            <button
              onClick={dispatchSelectedItem}
              disabled={!selectedItem || !selectedVendor}
              className="mt-5 w-full rounded-xl bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-950 disabled:opacity-50"
            >
              Send Vendor Dispatch
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}
