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

  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

export default function ManagerOwnerIntake() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  async function loadItems() {
    try {
      const response = await fetch("/api/bos-demo-store");
      const data = await response.json();

      const ownerItems = Array.isArray(data)
        ? data.filter((item) => item.source === "Owner Portal")
        : [];

      setItems(ownerItems.reverse());
    } catch (error) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const openItems = items.filter((item) => item.status === "Submitted to Manager Intake").length;
  const urgentItems = items.filter((item) => item.priority === "Urgent").length;

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
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Owner → Manager → Board/Vendor</p>
          <h2 className="mt-3 text-2xl font-bold text-yellow-100">Manager review protects the association</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            Owner submissions land here first so management can verify facts, determine responsibility,
            request missing information, dispatch vendors, or escalate qualified items to the board.
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
            <p className="text-sm text-white/50">Review Layer</p>
            <p className="mt-2 text-4xl font-bold">PM</p>
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
                  key={`${item.submittedAt}-${index}`}
                  onClick={() => setSelectedItem(item)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-left hover:border-yellow-400 transition"
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
            <p className="mt-1 text-sm text-white/50">Select an owner item to review details.</p>

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
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Association</p>
                  <p className="mt-2 font-semibold">{selectedItem.association}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Description</p>
                  <p className="mt-2 text-sm text-white/75">{selectedItem.description}</p>
                </div>

                <div className="grid gap-3">
                  <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                    Approve for Dispatch
                  </button>
                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition">
                    Request More Info
                  </button>
                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition">
                    Prepare for Board
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
