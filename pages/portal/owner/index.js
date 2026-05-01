import { useState } from "react";
import Link from "next/link";

export default function OwnerPortal() {
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

  const [submitting, setSubmitting] = useState(false);
  const [successRequest, setSuccessRequest] = useState(null);
  const [error, setError] = useState("");

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
      const response = await fetch("/api/bos-demo-store", {
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

      const data = await response.json();

      if (!response.ok || !data.success) {
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
    } catch (err) {
      setError(err.message || "Unable to submit request.");
    } finally {
      setSubmitting(false);
    }
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
              Submit a Request
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Submit maintenance, architectural, amenity, billing, violation,
              and general association requests directly into the BOS live intake
              system.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/owner/notifications"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Notifications
            </Link>

            <Link
              href="/portal/owner/requests"
              className="rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675]"
            >
              Request History
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
            <p className="text-lg font-bold text-red-300">Submission failed.</p>
            <p className="mt-2 text-slate-200">{error}</p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={submitRequest}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"
          >
            <h2 className="text-3xl font-bold">Owner Request Form</h2>
            <p className="mt-2 text-slate-400">
              This form writes directly to the shared BOS API.
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
                  placeholder="Unit 204 or property address"
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
                  placeholder="Pool light repair, fence request, gate issue..."
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
                  placeholder="Describe the issue or request..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 w-full rounded-2xl bg-[#d4af37] px-6 py-4 text-sm font-bold text-[#070b16] shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#f1d675] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting Request..." : "Submit Request"}
            </button>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/25">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Live BOS Loop
              </p>
              <h3 className="mt-3 text-2xl font-bold">
                What happens next?
              </h3>
              <div className="mt-5 space-y-4 text-slate-300">
                <p>1. Request is written to the shared API.</p>
                <p>2. Notification is created automatically.</p>
                <p>3. Manager sees the request in the intake queue.</p>
                <p>4. Owner receives status updates as the manager acts.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-7">
              <h3 className="text-2xl font-bold text-[#f1d675]">
                Early Product Infrastructure
              </h3>
              <p className="mt-3 leading-7 text-slate-200">
                This is now a working intake, history, and notification loop —
                the foundation for owner service automation.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

