// File: /portal/owner/request-history.js

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

export default function OwnerRequestHistory() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setSelectedItem(reversed[0] || null);
    } catch (error) {
      setItems([]);
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const history = selectedItem?.history || [];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Request History Timeline</h1>
            <p className="mt-2 text-white/60">
              Review the full lifecycle of your submitted requests and status changes.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadItems}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
            >
              Refresh
            </button>
            <Link
              href="/portal/owner/new-request"
              className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
            >
              New Request
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Audit Trail</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Every request keeps its own timeline</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            The system records each major status update so owners, managers, and board members can see exactly where an item stands.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Request Selector */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">My Requests</h2>
            <p className="mt-1 text-sm text-white/50">Select a request to view history.</p>

            <div className="mt-6 space-y-3">
              {loading && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-white/60">
                  Loading requests...
                </div>
              )}

              {!loading && items.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <h3 className="font-semibold">No request history yet</h3>
                  <p className="mt-2 text-sm text-white/50">Submit a request first, then return to this page.</p>
                </div>
              )}

              {!loading && items.map((item, index) => (
                <button
                  key={item.id || index}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedItem?.id === item.id
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-white/10 bg-slate-900/60 hover:border-yellow-400"
                  }`}
                >
                  <p className="text-sm text-white/50">{item.type || "Owner Request"}</p>
                  <h3 className="mt-1 font-semibold">{item.title || "Untitled Request"}</h3>
                  <p className="mt-2 text-xs text-white/40">{formatDate(item.submittedAt || item.createdAt)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            {!selectedItem && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-white/60">
                Select a request to view its timeline.
              </div>
            )}

            {selectedItem && (
              <>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm text-white/50">{selectedItem.id}</p>
                    <h2 className="mt-1 text-2xl font-bold">{selectedItem.title || "Untitled Request"}</h2>
                    <p className="mt-2 text-white/60">{selectedItem.description}</p>
                  </div>

                  <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(selectedItem.status)}`}>
                    {selectedItem.status || "Submitted"}
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <h3 className="text-xl font-bold">Timeline</h3>
                  <p className="mt-1 text-sm text-white/50">Recorded status history for this item.</p>

                  <div className="mt-6 space-y-5">
                    {history.length === 0 && (
                      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-white/60">
                        No timeline entries yet.
                      </div>
                    )}

                    {history.map((entry, index) => (
                      <div key={`${entry.timestamp}-${index}`} className="relative pl-8">
                        <div className="absolute left-0 top-1 h-4 w-4 rounded-full border border-yellow-400 bg-yellow-400" />
                        {index !== history.length - 1 && (
                          <div className="absolute left-[7px] top-6 h-full w-px bg-white/10" />
                        )}

                        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(entry.status)}`}>
                              {entry.status}
                            </span>
                            <span className="text-sm text-white/40">{formatDate(entry.timestamp)}</span>
                          </div>
                          <p className="mt-3 text-white/70">{entry.note || "Status updated."}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Link
                    href="/portal/owner/live-status"
                    className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
                  >
                    View Live Status
                  </Link>
                  <Link
                    href="/portal/manager/owner-intake"
                    className="rounded-2xl bg-yellow-400 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
                  >
                    Manager Review View
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
