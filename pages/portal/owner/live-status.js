// File: /portal/owner/live-status.js

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

export default function OwnerLiveStatus() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    setLoading(true);

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

  const awaitingReview = items.filter((item) => item.status === "Submitted to Manager Intake").length;
  const urgentItems = items.filter((item) => item.priority === "Urgent").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Live Request Status</h1>
            <p className="mt-2 text-white/60">
              Track owner submissions currently moving through the SPM review workflow.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadItems}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
            >
              Refresh Status
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
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Live Owner Workflow</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Your request enters manager review first</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            This page reads the same demo store used by the Manager Portal, showing how owner submissions can move from intake to review,
            dispatch, board submission, or completion.
          </p>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Live Items</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">{items.length}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Awaiting Manager Review</p>
            <p className="mt-2 text-4xl font-bold">{awaitingReview}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Urgent</p>
            <p className="mt-2 text-4xl font-bold">{urgentItems}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">System</p>
            <p className="mt-2 text-4xl font-bold">Live</p>
          </div>
        </div>

        {/* Status List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">My Live Submissions</h2>
              <p className="mt-1 text-sm text-white/50">Items posted through the owner request form.</p>
            </div>

            <Link
              href="/portal/manager/owner-intake"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition"
            >
              Manager View
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-white/60">
                Loading live request status...
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold">No live submissions yet</h3>
                <p className="mt-2 text-white/50">
                  Submit a test owner request and refresh this page to see it appear here.
                </p>
                <Link
                  href="/portal/owner/new-request"
                  className="mt-5 inline-block rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
                >
                  Submit Test Request
                </Link>
              </div>
            )}

            {!loading && items.map((item, index) => (
              <div key={`${item.submittedAt}-${index}`} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-white/50">{item.type || "Owner Request"} • {formatDate(item.submittedAt)}</p>
                    <h3 className="mt-1 text-xl font-semibold">{item.title || "Untitled Request"}</h3>
                    <p className="mt-2 text-sm text-white/60">{item.propertyAddress}</p>
                    <p className="mt-3 max-w-4xl text-white/70">{item.description}</p>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(item.status)}`}>
                      {item.status || "Submitted"}
                    </span>
                    <span className="text-sm text-white/40">
                      Priority: {item.priority || "Normal"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
