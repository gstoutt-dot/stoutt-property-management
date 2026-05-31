import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function SignatureApprovalNew() {
  const [form, setForm] = useState({
    title: "",
    approval_category: "Contract Approval",
    required_signer: "Board President",
    linked_workflow: "",
    certification_record: "",
    priority: "normal",
    status: "pending_signature",
    due_date: "",
  });

  const [saving, setSaving] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setSystemMessage("Please enter an approval title.");
      return;
    }

    try {
      setSaving(true);
      setSystemMessage("");

      const payload = {
        association_id: DEFAULT_ASSOCIATION_ID,
        title: form.title.trim(),
        approval_category: form.approval_category,
        required_signer: form.required_signer.trim() || "Board",
        linked_workflow: form.linked_workflow.trim() || "Board Operations",
        certification_record:
          form.certification_record.trim() || "Certification pending.",
        priority: form.priority,
        status: form.status,
        due_date: form.due_date || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

            const response = await fetch("/api/signature-approvals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to create signature approval.");
      }

      setSystemMessage("Signature approval created successfully.");

      setForm({
        title: "",
        approval_category: "Contract Approval",
        required_signer: "Board President",
        linked_workflow: "",
        certification_record: "",
        priority: "normal",
        status: "pending_signature",
        due_date: "",
      });
    } catch (error) {
      console.error("Unable to create signature approval:", error);
      setSystemMessage(error.message || "Unable to create signature approval.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Signature Approval Intake
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Create Signature Approval
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/board/signature-approval-log"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Signature Log
            </Link>

            <Link
              href="/admin"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl"
        >
          <label className="block">
            <span className="text-sm font-semibold text-slate-300">
              Approval Title
            </span>

            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Example: Approve landscape contract renewal"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
            />
          </label>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Approval Category
              </span>

              <select
                value={form.approval_category}
                onChange={(event) =>
                  updateField("approval_category", event.target.value)
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400/50"
              >
                <option>Contract Approval</option>
                <option>Policy Approval</option>
                <option>Budget Approval</option>
                <option>Insurance Approval</option>
                <option>Vendor Authorization</option>
                <option>Reserve Expenditure</option>
                <option>Legal Authorization</option>
                <option>Emergency Approval</option>
                <option>Resolution Approval</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Required Signer
              </span>

              <input
                value={form.required_signer}
                onChange={(event) =>
                  updateField("required_signer", event.target.value)
                }
                placeholder="Example: Board President"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Priority
              </span>

              <select
                value={form.priority}
                onChange={(event) => updateField("priority", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400/50"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
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
              Linked Workflow
            </span>

            <input
              value={form.linked_workflow}
              onChange={(event) =>
                updateField("linked_workflow", event.target.value)
              }
              placeholder="Example: Motion Center / Vendor Renewal / Budget Approval"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">
              Certification Record / Notes
            </span>

            <textarea
              rows={5}
              value={form.certification_record}
              onChange={(event) =>
                updateField("certification_record", event.target.value)
              }
              placeholder="Describe what is being approved, supporting documents, authorization basis, or board action."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-amber-400/50"
            />
          </label>

          {systemMessage && (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
              {systemMessage}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-amber-200 disabled:opacity-60"
            >
              {saving ? "Creating..." : "Create Signature Approval"}
            </button>

            <Link
              href="/board/signature-approval-log"
              className="rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Return to Signature Log
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
