import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function OwnerRequests() {
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    phone: "",
    unit: "",
    category: "Maintenance",
    subject: "",
    description: "",
    priority: "Normal",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successRequest, setSuccessRequest] = useState(null);
  const [error, setError] = useState("");

  async function loadRequests() {
    try {
      setLoading(true);
      const res = await fetch("/api/bos-demo-store?view=requests");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function submitRequest(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessRequest(null);

    try {
      const res = await fetch("/api/bos-demo-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerName: form.ownerName,
          email: form.email,
          phone: form.phone,
          unit: form.unit,
          category: form.category,
          subject: form.subject,
          description: form.description,
          priority: form.priority,
          status: "Submitted",
          source: "Owner Portal",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Request failed");
      }

      setSuccessRequest(data.request);

      setForm({
        ownerName: "",
        email: "",
        phone: "",
        unit: "",
        category: "Maintenance",
        subject: "",
        description: "",
        priority: "Normal",
      });

      await loadRequests();
    } catch (err) {
      setError(err.message || "Unable to submit request.");
    } finally {
      setSubmitting(false);
    }
  }

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
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
              Owner Portal
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Service Requests
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Submit owner service requests directly into the BOS live intake
              system and review your request history from the shared system
              store.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/owner"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Owner Dashboard
            </Link>

            <Link
              href="/portal/owner/notifications"
              className="rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675]"
            >
              Notifications
            </Link>
          </div>
        </div>

        {successRequest && (
          <div className="mb-8 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-6">
            <p className="text-lg font-bold text-[#f1d675]">
              Request submitted successfully.
            </p>
            <p className="mt-2 text-slate-200">
              {successRequest.requestId} — {successRequest.subject}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-3xl border border-red-400/30 bg-red-500/10 p-6">
            <p className="text-lg font-bold text-red-300">
              Submission failed.
            </p>
            <p className="mt-2 text-slate-200">{error}</p>
          </div>
        )}

        <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <form
            onSubmit={submitRequest}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"
          >
            <h2 className="text-3xl font-bold">New Service Request</h2>
            <p className="mt-2 text-slate-400">
              This form writes directly to the shared BOS API and triggers owner
              notifications automatically.
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-slate-300">
                  Owner Name
                </label>
                <input
                  value={form.ownerName}
                  onChange={(e) => updateField("ownerName", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]"
                  placeholder="Owner name"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">
                  Unit / Address
                </label>
                <input
                  value={form.unit}
                  onChange={(e) => updateField("unit", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]"
                  placeholder="Unit 204 or address"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]"
                  placeholder="owner@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition focus:border-[#d4af37]"
                >
                  <option>Maintenance</option>
                  <option>Architectural Review</option>
                  <option>Amenity Request</option>
                  <option>Billing / Account</option>
                  <option>Violation Question</option>
                  <option>General Request</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) => updateField("priority", e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition focus:border-[#d4af37]"
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-300">
                  Subject
                </label>
                <input
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]"
                  placeholder="Pool light repair, gate issue, fence request..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-300">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  required
                  rows={6}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0c1222] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-[#d4af37]"
                  placeholder="Describe the request..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 w-full rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting Request..." : "Submit Service Request"}
            </button>
          </form>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">Request History</h2>
                <p className="mt-2 text-slate-400">
                  Live requests pulled from the BOS system store.
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
              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-8 text-center text-slate-300">
                Loading request history...
              </div>
            ) : sortedRequests.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-8 text-center">
                <p className="text-lg font-bold text-white">
                  No service requests yet.
                </p>
                <p className="mt-2 text-slate-400">
                  Submit a request to create the first live BOS record.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedRequests.map((request) => (
                  <article
                    key={request.id || request.requestId}
                    className="rounded-3xl border border-white/10 bg-[#0c1222] p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f1d675]">
                            {request.status || "Submitted"}
                          </span>

                          <span className="text-sm text-slate-400">
                            {formatDate(request.createdAt)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-white">
                          {request.subject || request.title || "Owner Request"}
                        </h3>

                        <p className="mt-2 text-sm text-[#f1d675]">
                          {request.requestId || request.id}
                        </p>

                        <p className="mt-3 text-slate-300">
                          {request.description || "No description provided."}
                        </p>

                        <div className="mt-4 grid gap-2 text-sm text-slate-400 md:grid-cols-2">
                          <p>Owner: {request.ownerName || "Owner"}</p>
                          <p>Unit: {request.unit || "Not provided"}</p>
                          <p>Category: {request.category || "General"}</p>
                          <p>Priority: {request.priority || "Normal"}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

