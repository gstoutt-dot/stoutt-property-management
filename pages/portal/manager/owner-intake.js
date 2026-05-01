// File: /portal/manager/owner-intake.js

import { useEffect, useState } from "react";
import Link from "next/link";

function statusClass(status) {
  if (status === "Submitted to Manager Intake") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  if (status === "Approved for Dispatch") {
    return "border-blue-400/30 bg-blue-400/10 text-blue-300";
  }

  if (status === "Submitted to Board") {
    return "border-purple-400/30 bg-purple-400/10 text-purple-300";
  }

  if (status === "More Info Requested") {
    return "border-orange-400/30 bg-orange-400/10 text-orange-300";
  }

  if (status === "Completed") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return "border-white/10 bg-white/5 text-white/70";
}

function formatDate(value) {
  if (!value) return "Recently";

  try {
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch (error) {
    return "Recently";
  }
}

export default function ManagerOwnerIntake() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [notice, setNotice] = useState("");

  async function loadItems() {
    setLoading(true);

    try {
      const response = await fetch("/api/bos-demo-store");
      const data = await response.json();

      const ownerItems = Array.isArray(data)
        ? data.filter((item) => item.source === "Owner Portal")
        : [];

      const reversed = ownerItems.reverse();
      setItems(reversed);

      if (selectedItem) {
        const refreshedSelected = reversed.find((item) => item.id === selectedItem.id);
        setSelectedItem(refreshedSelected || null);
      }
    } catch (error) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus, note) {
    if (!selectedItem?.id) return;

    setUpdating(true);
    setNotice("");

    try {
      const response = await fetch("/api/bos-demo-store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedItem.id,
          status: newStatus,
          note,
        }),
      });

      if (!response.ok) {
        throw new Error("Status update failed.");
      }

      setNotice(`Status updated to: ${newStatus}`);
      await loadItems();
    } catch (error) {
      setNotice("Status update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const openItems = items.filter((item) => item.status === "Submitted to Manager Intake").length;
  const urgentItems = items.filter((item) => item.priority === "Urgent").length;
  const boardItems = items.filter((item) => item.status === "Submitted to Board").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/portal/manager" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Manager Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Owner Intake Queue</h1>
            <p className="mt-2 text-white/60">
              Review owner-submitted requests before dispatch, follow-up, or board submission.
            </p>
          </div>

          <button
            onClick={loadItems}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
          >
            Refresh Queue
          </button>
        </div>

        {/* Workflow Notice */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Live Status Control</p>
          <h2 className="mt-3 text-2xl font-bold text-yellow-100">Manager decisions now write back to the system</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            Select an owner request, update its status, then open Owner Live Status to see the homeowner-facing view change.
          </p>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Total Owner Items</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">{items.length}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Awaiting Review</p>
            <p className="mt-2 text-4xl font-bold">{openItems}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Urgent</p>
            <p className="mt-2 text-4xl font-bold">{urgentItems}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Board Routed</p>
            <p className="mt-2 text-4xl font-bold">{boardItems}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Queue */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Live Owner Submissions</h2>
                <p className="mt-1 text-sm text-white/50">Items posted from /portal/owner/new-request.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {loading && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-white/60">
                  Loading owner intake queue...
                </div>
              )}

              {!loading && items.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                  <h3 className="text-lg font-semibold">No owner submissions yet</h3>
                  <p className="mt-2 text-white/50">
                    Submit a test request from the Owner Portal and refresh this queue.
                  </p>
                  <Link
                    href="/portal/owner/new-request"
                    className="mt-5 inline-block rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
                  >
                    Submit Test Owner Request
                  </Link>
                </div>
              )}

              {!loading && items.map((item, index) => (
                <button
                  key={item.id || `${item.submittedAt}-${index}`}
                  onClick={() => {
                    setSelectedItem(item);
                    setNotice("");
                  }}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    selectedItem?.id === item.id
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-white/10 bg-slate-900/60 hover:border-yellow-400"
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm text-white/50">{item.source} • {item.type}</p>
                      <h3 className="mt-1 text-xl font-semibold">{item.title || "Untitled Owner Request"}</h3>
                      <p className="mt-2 text-sm text-white/60">{item.propertyAddress}</p>
                      <p className="mt-3 line-clamp-2 text-white/70">{item.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(item.status)}`}>
                        {item.status || "New"}
                      </span>
                      <span className="text-sm text-white/40">
                        Priority: {item.priority || "Normal"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Manager Review</h2>
            <p className="mt-1 text-sm text-white/50">Select an owner item to update status.</p>

            {!selectedItem && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-white/60">
                No item selected.
              </div>
            )}

            {selectedItem && (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Owner</p>
                  <p className="mt-2 font-semibold">{selectedItem.submittedBy}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Status</p>
                  <span className={`mt-2 inline-block rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(selectedItem.status)}`}>
                    {selectedItem.status}
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Association</p>
                  <p className="mt-2 font-semibold">{selectedItem.association}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Submitted</p>
                  <p className="mt-2 text-sm text-white/75">{formatDate(selectedItem.submittedAt || selectedItem.createdAt)}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Description</p>
                  <p className="mt-2 text-sm text-white/75">{selectedItem.description}</p>
                </div>

                {notice && (
                  <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm font-semibold text-yellow-200">
                    {notice}
                  </div>
                )}

                <div className="grid gap-3">
                  <button
                    disabled={updating}
                    onClick={() => updateStatus("Approved for Dispatch", "Manager approved this owner request for vendor dispatch.")}
                    className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 transition"
                  >
                    Approve for Dispatch
                  </button>

                  <button
                    disabled={updating}
                    onClick={() => updateStatus("More Info Requested", "Manager requested more information from the owner.")}
                    className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 transition"
                  >
                    Request More Info
                  </button>

                  <button
                    disabled={updating}
                    onClick={() => updateStatus("Submitted to Board", "Manager prepared this owner request for board review.")}
                    className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 transition"
                  >
                    Prepare for Board
                  </button>

                  <button
                    disabled={updating}
                    onClick={() => updateStatus("Completed", "Manager marked this owner request completed.")}
                    className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60 transition"
                  >
                    Mark Completed
                  </button>
                </div>

                <Link
                  href="/portal/owner/live-status"
                  className="block rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white/70 hover:border-yellow-400 hover:text-white transition"
                >
                  Check Owner Live Status
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

