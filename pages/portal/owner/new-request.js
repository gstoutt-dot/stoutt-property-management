// File: /portal/owner/new-request.js

import { useState } from "react";
import Link from "next/link";

const requestTypes = [
  "Maintenance Request",
  "General Question",
  "Amenity Request",
  "Architectural Review",
  "Violation Response",
  "Accounting Question",
  "Other",
];

export default function OwnerNewRequest() {
  const [formData, setFormData] = useState({
    ownerName: "Michael Reynolds",
    propertyAddress: "1842 Harbor Palm Drive, Unit 204",
    association: "Harbor Palm Villas HOA",
    requestType: "Maintenance Request",
    subject: "",
    description: "",
    priority: "Normal",
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const payload = {
      source: "Owner Portal",
      submittedBy: formData.ownerName,
      association: formData.association,
      propertyAddress: formData.propertyAddress,
      type: formData.requestType,
      title: formData.subject,
      description: formData.description,
      priority: formData.priority,
      status: "Submitted to Manager Intake",
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/bos-demo-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request could not be submitted.");
      }

      setStatus("success");
      setMessage("Your request has been submitted to management for review.");
      setFormData((prev) => ({
        ...prev,
        subject: "",
        description: "",
        priority: "Normal",
      }));
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again or contact management.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Submit New Request</h1>
            <p className="mt-2 text-white/60">
              Send a request directly to the Stoutt Property Management intake queue.
            </p>
          </div>

          <Link
            href="/portal/owner/requests"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
          >
            View My Requests
          </Link>
        </div>

        {/* Routing Notice */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Owner → Manager Intake</p>
          <h2 className="mt-3 text-2xl font-bold text-yellow-100">Your request will be reviewed before action is taken</h2>
          <p className="mt-3 text-yellow-50/80">
            Management reviews owner submissions for accuracy, responsibility, urgency, and next steps before dispatch,
            board submission, or owner follow-up.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-white/70">Owner Name</label>
              <input
                value={formData.ownerName}
                onChange={(event) => updateField("ownerName", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white/70">Association</label>
              <input
                value={formData.association}
                onChange={(event) => updateField("association", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-white/70">Property Address</label>
              <input
                value={formData.propertyAddress}
                onChange={(event) => updateField("propertyAddress", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white/70">Request Type</label>
              <select
                value={formData.requestType}
                onChange={(event) => updateField("requestType", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-yellow-400"
              >
                {requestTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-white/70">Priority</label>
              <select
                value={formData.priority}
                onChange={(event) => updateField("priority", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-yellow-400"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-white/70">Subject</label>
              <input
                value={formData.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                placeholder="Example: Pool light is out"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-white/70">Description</label>
              <textarea
                value={formData.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Describe the issue, question, or request. Include location details when helpful."
                required
                rows={6}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {message && (
            <div
              className={`mt-6 rounded-2xl border p-4 text-sm font-semibold ${
                status === "success"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border-red-400/30 bg-red-400/10 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
            <Link
              href="/portal/owner"
              className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white/70 hover:border-yellow-400 hover:text-white transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 transition"
            >
              {status === "submitting" ? "Submitting..." : "Submit to Management"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
