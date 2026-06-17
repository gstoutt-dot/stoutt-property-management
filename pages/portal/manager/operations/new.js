import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID =
  typeof window !== "undefined"
    ? localStorage.getItem("spm_selected_association_id") || ""
    : "";

const requestTypes = [
  "Budget Planning",
  "Election Preparation",
  "Legal Review",
  "Insurance & Risk",
  "Capital Project",
  "Vendor Performance",
  "Policy Review",
  "Meeting Preparation",
  "Board Packet",
  "Special Project",
];

export default function NewAdminOperation() {
  const router = useRouter();

  const returnPath =
  typeof router.query.return_path === "string"
    ? router.query.return_path
    : "/manager/dashboard";

  const returnLabel =
  typeof router.query.return_label === "string"
    ? router.query.return_label
    : "Dashboard";

  const defaultRequestType =
    typeof router.query.request_type === "string"
      ? router.query.request_type
      : "Special Project";

  const [form, setForm] = useState({
    request_type: "Special Project",
    title: "",
    description: "",
    priority: "Normal",
    assigned_to: "",
    due_date: "",
    board_review_required: false,
    owner_visible: false,
    vendor_visible: false,
    routing_target: "Admin Dashboard",
    recommended_action: "",
  });

  const [saving, setSaving] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    setForm((current) => ({
      ...current,
      request_type: defaultRequestType,
    }));
  }, [router.isReady, defaultRequestType]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setSystemMessage("Please enter a title before submitting.");
      return;
    }

    try {
      setSaving(true);
      setSystemMessage("");

      if (!DEFAULT_ASSOCIATION_ID) {
  setSystemMessage("No association selected. Please log in again.");
  return;
}

      const payload = {
        association_id: DEFAULT_ASSOCIATION_ID,
        created_by: "SPM Manager",
        created_by_role: "Manager",
        request_type: form.request_type,
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        status: "Submitted",
        assigned_to: form.assigned_to.trim() || null,
        board_review_required: form.board_review_required,
        owner_visible: form.owner_visible,
        vendor_visible: form.vendor_visible,
        due_date: form.due_date || null,
        source_module: "Admin Operations Intake",
        routing_target: form.routing_target,
        recommended_action: form.recommended_action.trim() || null,
      };

            const response = await fetch("/api/admin/operational-records", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const result = await response.json();

if (!response.ok || !result.success) {
  throw new Error(
    result.message || "Unable to submit operational record."
  );
}

       
      setSystemMessage("Operational record submitted successfully.");
    } catch (error) {
      console.error("Unable to submit admin operation:", error);
      setSystemMessage(error.message || "Unable to submit operational record.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={returnPath}
              className="text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              ← Back to {returnLabel}
            </Link>

            <Link
  href="/manager/dashboard"
  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
>
  Dashboard
</Link>
          </div>

          <div className="mt-6 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
            Admin Operations Intake
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Create Operational Record
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Submit administrative work, annual projects, governance preparation,
            risk items, vendor reviews, policy updates, or special association
            initiatives into the SPM operating system.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Request Type
              </span>

              <select
                value={form.request_type}
                onChange={(event) =>
                  updateField("request_type", event.target.value)
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400/50"
              >
                {requestTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Priority
              </span>

              <select
                value={form.priority}
                onChange={(event) => updateField("priority", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400/50"
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">Title</span>

            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Example: Review collections policy update"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">
              Description
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              rows={5}
              placeholder="Describe the work, issue, project, or governance item."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
            />
          </label>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Assigned To
              </span>

              <input
                value={form.assigned_to}
                onChange={(event) =>
                  updateField("assigned_to", event.target.value)
                }
                placeholder="Example: Admin, Board, Vendor, Attorney"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Due Date
              </span>

              <input
                type="date"
                value={form.due_date}
                onChange={(event) => updateField("due_date", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400/50"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">
              Routing Target
            </span>

            <select
              value={form.routing_target}
              onChange={(event) =>
                updateField("routing_target", event.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400/50"
            >
              <option>Manager Dashboard</option>
              <option>BOS Action Center</option>
              <option>Board Approval Queue</option>
              <option>Financial Review</option>
              <option>Legal / Risk Review</option>
              <option>Vendor Operations</option>
              <option>Owner Portal</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">
              Recommended Action
            </span>

            <input
              value={form.recommended_action}
              onChange={(event) =>
                updateField("recommended_action", event.target.value)
              }
              placeholder="Example: Review documents and prepare board recommendation."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
            />
          </label>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Toggle
              label="Board Review Required"
              checked={form.board_review_required}
              onChange={(value) =>
                updateField("board_review_required", value)
              }
            />

            <Toggle
              label="Owner Visible"
              checked={form.owner_visible}
              onChange={(value) => updateField("owner_visible", value)}
            />

            <Toggle
              label="Vendor Visible"
              checked={form.vendor_visible}
              onChange={(value) => updateField("vendor_visible", value)}
            />
          </div>

          {systemMessage && (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
              {systemMessage}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Submitting..." : "Submit Operational Record"}
            </button>

            <Link
              href={returnPath}
              className="rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Return to {returnLabel}
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-2xl border px-5 py-4 text-left transition ${
        checked
          ? "border-emerald-400/30 bg-emerald-400/10"
          : "border-white/10 bg-slate-950"
      }`}
    >
      <div
        className={`mb-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
          checked
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-slate-500/30 bg-slate-500/10 text-slate-400"
        }`}
      >
        {checked ? "Yes" : "No"}
      </div>

      <p className="text-sm font-semibold text-white">{label}</p>
    </button>
  );
}
