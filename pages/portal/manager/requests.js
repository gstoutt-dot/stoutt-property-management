import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const STATUS_OPTIONS = [
  "Submitted",
  "In Review",
  "Approved",
  "Assigned to Vendor",
  "Work Scheduled",
  "Completed",
  "Denied",
];

export default function ManagerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadRequests() {
    try {
      setLoading(true);
      const res = await fetch("/api/bos-demo-store?view=requests");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Failed to load requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function updateStatus(request, status) {
    try {
      setUpdatingId(request.requestId || request.id);
      setMessage("");

      const res = await fetch("/api/bos-demo-store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: request.requestId || request.id,
          status,
          managerNote: `Manager updated status to ${status}.`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Update failed");
      }

      setMessage(`Updated ${request.requestId || request.id} to ${status}.`);
      await loadRequests();
    } catch (error) {
      setMessage(error.message || "Unable to update request.");
    } finally {
      setUpdatingId(null);
    }
  }

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      return (
        new Date(b.updatedAt || b.createdAt || 0).getTime() -
        new Date(a.updatedAt || a.createdAt || 0).getTime()
      );
    });
  }, [requests]);

  function formatDate(value) {
    if (!value) return "Recent";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recent";

    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d4af37]">
              Manager Portal
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Live Request Queue
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Review owner service requests, update statuses, and trigger live
              owner notifications through the BOS system.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/manager"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Manager Dashboard
            </Link>

            <Link
              href="/portal/owner/notifications"
              className="rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675]"
            >
              Owner Notifications
            </Link>
          </div>
        </div>

        {message && (
          <div className="mb-8 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-6">
            <p className="text-lg font-bold text-[#f1d675]">{message}</p>
          </div>
        )}

        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25">
            <p className="text-sm text-slate-300">Total Requests</p>
            <p className="mt-3 text-4xl font-bold">{requests.length}</p>
          </div>

          <div className="rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-6 shadow-2xl shadow-black/25">
            <p className="text-sm text-[#f1d675]">Submitted</p>
            <p className="mt-3 text-4xl font-bold text-[#f1d675]">
              {requests.filter((r) => r.status === "Submitted").length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25">
            <p className="text-sm text-slate-300">In Progress</p>
            <p className="mt-3 text-4xl font-bold">
              {
                requests.filter((r) =>
                  ["In Review", "Approved", "Assigned to Vendor", "Work Scheduled"].includes(
                    r.status
                  )
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25">
            <p className="text-sm text-slate-300">Completed</p>
            <p className="mt-3 text-4xl font-bold">
              {requests.filter((r) => r.status === "Completed").length}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Request Intake</h2>
              <p className="mt-2 text-slate-400">
                Every status update writes back to the shared API and creates an
                owner notification.
              </p>
            </div>

            <button
              onClick={loadRequests}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-10 text-center text-slate-300">
              Loading manager request queue...
            </div>
          ) : sortedRequests.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-10 text-center">
              <p className="text-xl font-bold text-white">
                No owner requests yet.
              </p>
              <p className="mt-3 text-slate-400">
                Submit a request from the Owner Portal to populate this live
                manager queue.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {sortedRequests.map((request) => {
                const requestKey = request.requestId || request.id;
                const isUpdating = updatingId === requestKey;

                return (
                  <article
                    key={requestKey}
                    className="rounded-3xl border border-white/10 bg-[#0c1222] p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f1d675]">
                            {request.status || "Submitted"}
                          </span>

                          <span className="text-sm text-slate-400">
                            {formatDate(request.updatedAt || request.createdAt)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-2xl font-bold text-white">
                          {request.subject || request.title || "Owner Request"}
                        </h3>

                        <p className="mt-2 text-sm font-bold text-[#f1d675]">
                          {requestKey}
                        </p>

                        <p className="mt-4 leading-7 text-slate-300">
                          {request.description || "No description provided."}
                        </p>

                        <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
                          <p>Owner: {request.ownerName || "Owner"}</p>
                          <p>Unit: {request.unit || "Not provided"}</p>
                          <p>Category: {request.category || "General"}</p>
                          <p>Priority: {request.priority || "Normal"}</p>
                          <p>Email: {request.email || "Not provided"}</p>
                          <p>Phone: {request.phone || "Not provided"}</p>
                        </div>
                      </div>

                      <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-5 lg:w-80">
                        <p className="text-sm font-bold text-slate-300">
                          Update Status
                        </p>

                        <div className="mt-4 grid gap-3">
                          {STATUS_OPTIONS.map((status) => (
                            <button
                              key={status}
                              onClick={() => updateStatus(request, status)}
                              disabled={isUpdating || request.status === status}
                              className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                                request.status === status
                                  ? "cursor-not-allowed bg-[#d4af37] text-[#070b16]"
                                  : "border border-white/10 bg-[#0c1222] text-white hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
                              } disabled:opacity-60`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>

                        <p className="mt-4 text-xs leading-5 text-slate-500">
                          Each change creates an owner-facing notification and a
                          history record.
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
