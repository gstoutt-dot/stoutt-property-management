import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const emptyProspect = {
  association_name: "",
  community_name: "",
  association_type: "Condominium",
  address: "",
  city: "",
  state: "FL",
  zip: "",
  county: "Broward",
  units: "",
  current_management_company: "",
  contract_expiration: "",
  self_managed: false,
  internal_staff: false,
  accounting_provider: "",
  president_name: "",
  president_email: "",
  president_phone: "",
  treasurer_name: "",
  treasurer_email: "",
  treasurer_phone: "",
  secretary_name: "",
  board_member_notes: "",
  manager_contact_name: "",
  manager_contact_email: "",
  manager_contact_phone: "",
  main_phone: "",
  main_email: "",
  website: "",
  pain_points: "",
  technology_issues: "",
  financial_issues: "",
  board_frustrations: "",
  operational_issues: "",
  status: "Lead",
  priority: "Normal",
  lead_source: "",
  last_contact_date: "",
  next_follow_up_date: "",
  presentation_date: "",
  proposal_date: "",
  outcome: "",
  notes: "",
};

const statusOptions = [
  "Lead",
  "Research",
  "Initial Contact",
  "Follow Up",
  "Presentation Scheduled",
  "Proposal Sent",
  "Board Review",
  "Contract Pending",
  "Won",
  "Lost",
];

const priorityOptions = ["Low", "Normal", "High", "Critical"];

export default function ProspectPipeline() {
  const [prospects, setProspects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyProspect);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    loadProspects();
  }, []);

  async function loadProspects() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/prospects/list");
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load prospects.");
      }

      setProspects(payload.prospects || []);
    } catch (error) {
      setMessage(error.message || "Unable to load prospects.");
    } finally {
      setLoading(false);
    }
  }

    async function importProspectCsv(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setImporting(true);
      setMessage("");

      const csvData = await file.text();

      const response = await fetch("/api/prospects/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csvData,
          fileName: file.name,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to import prospects.");
      }

      await loadProspects();

      setMessage(
        `Imported ${payload.imported} prospects from ${file.name}.`
      );

      event.target.value = "";
    } catch (error) {
      setMessage(error.message || "Unable to import prospects.");
    } finally {
      setImporting(false);
    }
  }

  async function saveProspect() {
    try {
      setSaving(true);
      setMessage("");

      const response = await fetch("/api/prospects/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to save prospect.");
      }

      setMessage("Prospect saved.");

      await loadProspects();

      setSelected(payload.prospect);
      setForm(payload.prospect);
    } catch (error) {
      setMessage(error.message || "Unable to save prospect.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProspect(id) {
    if (!confirm("Delete this prospect?")) return;

    const response = await fetch(`/api/prospects/delete?id=${id}`, {
      method: "DELETE",
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      alert(payload.message || "Unable to delete prospect.");
      return;
    }

    await loadProspects();

    setSelected(null);
    setForm(emptyProspect);
    setMessage("Prospect deleted.");
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const filteredProspects = useMemo(() => {
    const search = String(searchTerm || "").toLowerCase().trim();

    return prospects.filter((prospect) => {
      const matchesSearch =
        !search ||
        [
          prospect.association_name,
          prospect.community_name,
          prospect.city,
          prospect.current_management_company,
          prospect.president_name,
          prospect.treasurer_name,
          prospect.manager_contact_name,
          prospect.main_email,
          prospect.main_phone,
          prospect.status,
          prospect.priority,
          prospect.pain_points,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" || prospect.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [prospects, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: prospects.length,
      followUps: prospects.filter((p) => isFollowUpDue(p.next_follow_up_date)).length,
      presentations: prospects.filter((p) => p.status === "Presentation Scheduled").length,
      proposals: prospects.filter((p) => p.status === "Proposal Sent").length,
      contracts: prospects.filter((p) => p.status === "Contract Pending").length,
      won: prospects.filter((p) => p.status === "Won").length,
    };
  }, [prospects]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                SPM Sales Command Center
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Prospect Pipeline
              </h1>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
                Track Broward association prospects, board contacts, current
                management, follow-ups, presentations, proposals, pain points,
                and contract opportunities.
              </p>
            </div>

                        <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Admin Dashboard
              </Link>

              <label className="cursor-pointer rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-3 text-sm font-semibold text-sky-200 hover:bg-sky-500/20">
                Import CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={importProspectCsv}
                  className="hidden"
                />
              </label>

              <button
                onClick={loadProspects}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Refresh
              </button>

              <button
                onClick={() => {
                  setSelected(null);
                  setForm(emptyProspect);
                  setMessage("");
                }}
                className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20"
              >
                New Prospect
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-6">
            <StatCard label="Prospects" value={stats.total} />
            <StatCard label="Follow-Ups Due" value={stats.followUps} />
            <StatCard label="Presentations" value={stats.presentations} />
            <StatCard label="Proposals" value={stats.proposals} />
            <StatCard label="Contracts" value={stats.contracts} />
            <StatCard label="Won" value={stats.won} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {message && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {message}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.3fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Broward Target List
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Associations
              </h2>
            </div>

            <div className="grid gap-3">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="input"
                placeholder="Search association, city, management company, board member..."
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="input"
              >
                <option value="All">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <Empty message="Loading prospects..." />
              ) : filteredProspects.length === 0 ? (
                <Empty message="No prospects match the current search." />
              ) : (
                filteredProspects.map((prospect) => (
                  <button
                    key={prospect.id}
                    onClick={() => {
                      setSelected(prospect);
                      setForm(prospect);
                      setMessage("");
                    }}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selected?.id === prospect.id
                        ? "border-amber-400/60 bg-amber-400/10"
                        : "border-white/10 bg-slate-900 hover:border-amber-400/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-white">
                          {prospect.association_name || "Unnamed Association"}
                        </div>

                        <div className="mt-1 text-sm text-slate-400">
                          {prospect.city || "City Unknown"} ·{" "}
                          {prospect.units ? `${prospect.units} units` : "Units TBD"}
                        </div>

                        <div className="mt-2 text-xs text-slate-500">
                          {prospect.current_management_company ||
                            "Management company unknown"}
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge tone={prospect.priority}>
                          {prospect.priority || "Normal"}
                        </Badge>

                        <div className="mt-2 text-xs text-amber-300">
                          {prospect.status || "Lead"}
                        </div>
                      </div>
                    </div>

                    {isFollowUpDue(prospect.next_follow_up_date) && (
                      <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">
                        Follow-up due
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                  Prospect Record
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  {form.association_name || "New Prospect"}
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveProspect}
                  disabled={saving}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Prospect"}
                </button>

                {selected && (
                  <button
                    onClick={() => deleteProspect(selected.id)}
                    className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            <FormSection title="Association Information">
              <input className="input" placeholder="Association Name" value={form.association_name || ""} onChange={(e) => updateField("association_name", e.target.value)} />
              <input className="input" placeholder="Community Name" value={form.community_name || ""} onChange={(e) => updateField("community_name", e.target.value)} />
              <select className="input" value={form.association_type || "Condominium"} onChange={(e) => updateField("association_type", e.target.value)}>
                <option>Condominium</option>
                <option>HOA</option>
                <option>Cooperative</option>
                <option>Master Association</option>
              </select>
              <input className="input" placeholder="Units" value={form.units || ""} onChange={(e) => updateField("units", e.target.value)} />
              <input className="input md:col-span-2" placeholder="Address" value={form.address || ""} onChange={(e) => updateField("address", e.target.value)} />
              <input className="input" placeholder="City" value={form.city || ""} onChange={(e) => updateField("city", e.target.value)} />
              <input className="input" placeholder="Zip" value={form.zip || ""} onChange={(e) => updateField("zip", e.target.value)} />
            </FormSection>

            <FormSection title="Current Management / Accounting">
              <input className="input" placeholder="Current Management Company" value={form.current_management_company || ""} onChange={(e) => updateField("current_management_company", e.target.value)} />
              <input className="input" type="date" value={form.contract_expiration || ""} onChange={(e) => updateField("contract_expiration", e.target.value)} />
              <input className="input" placeholder="Accounting Provider" value={form.accounting_provider || ""} onChange={(e) => updateField("accounting_provider", e.target.value)} />
              <input className="input" placeholder="Lead Source" value={form.lead_source || ""} onChange={(e) => updateField("lead_source", e.target.value)} />

              <label className="checkbox-card">
                <input type="checkbox" checked={!!form.self_managed} onChange={(e) => updateField("self_managed", e.target.checked)} />
                Self Managed
              </label>

              <label className="checkbox-card">
                <input type="checkbox" checked={!!form.internal_staff} onChange={(e) => updateField("internal_staff", e.target.checked)} />
                Internal Staff
              </label>
            </FormSection>

                        <FormSection title="Board / Contact Information">
              <div className="md:col-span-2 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Board President
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <input className="input" placeholder="President Name" value={form.president_name || ""} onChange={(e) => updateField("president_name", e.target.value)} />
                  <input className="input" placeholder="President Phone" value={form.president_phone || ""} onChange={(e) => updateField("president_phone", e.target.value)} />
                  <input className="input" placeholder="President Email" value={form.president_email || ""} onChange={(e) => updateField("president_email", e.target.value)} />
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-4">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  Board Treasurer
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <input className="input" placeholder="Treasurer Name" value={form.treasurer_name || ""} onChange={(e) => updateField("treasurer_name", e.target.value)} />
                  <input className="input" placeholder="Treasurer Phone" value={form.treasurer_phone || ""} onChange={(e) => updateField("treasurer_phone", e.target.value)} />
                  <input className="input" placeholder="Treasurer Email" value={form.treasurer_email || ""} onChange={(e) => updateField("treasurer_email", e.target.value)} />
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-sky-400/20 bg-sky-500/[0.04] p-4">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">
                  Current Manager / Property Contact
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <input className="input" placeholder="Manager Contact Name" value={form.manager_contact_name || ""} onChange={(e) => updateField("manager_contact_name", e.target.value)} />
                  <input className="input" placeholder="Manager Contact Phone" value={form.manager_contact_phone || ""} onChange={(e) => updateField("manager_contact_phone", e.target.value)} />
                  <input className="input" placeholder="Manager Contact Email" value={form.manager_contact_email || ""} onChange={(e) => updateField("manager_contact_email", e.target.value)} />
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
                  General Association Contact
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <input className="input" placeholder="Main Phone" value={form.main_phone || ""} onChange={(e) => updateField("main_phone", e.target.value)} />
                  <input className="input" placeholder="Main Email" value={form.main_email || ""} onChange={(e) => updateField("main_email", e.target.value)} />
                  <input className="input" placeholder="Website" value={form.website || ""} onChange={(e) => updateField("website", e.target.value)} />
                </div>
              </div>
            </FormSection>

            <FormSection title="Sales Status / Follow-Up">
              <select className="input" value={form.status || "Lead"} onChange={(e) => updateField("status", e.target.value)}>
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <select className="input" value={form.priority || "Normal"} onChange={(e) => updateField("priority", e.target.value)}>
                {priorityOptions.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>

              <input className="input" type="date" value={form.last_contact_date || ""} onChange={(e) => updateField("last_contact_date", e.target.value)} />
              <input className="input" type="date" value={form.next_follow_up_date || ""} onChange={(e) => updateField("next_follow_up_date", e.target.value)} />
              <input className="input" type="date" value={form.presentation_date || ""} onChange={(e) => updateField("presentation_date", e.target.value)} />
              <input className="input" type="date" value={form.proposal_date || ""} onChange={(e) => updateField("proposal_date", e.target.value)} />
              <input className="input md:col-span-2" placeholder="Outcome" value={form.outcome || ""} onChange={(e) => updateField("outcome", e.target.value)} />
            </FormSection>

            <FormSection title="Sales Intelligence">
              <textarea className="input md:col-span-2" rows={4} placeholder="Pain Points" value={form.pain_points || ""} onChange={(e) => updateField("pain_points", e.target.value)} />
              <textarea className="input" rows={4} placeholder="Technology Issues" value={form.technology_issues || ""} onChange={(e) => updateField("technology_issues", e.target.value)} />
              <textarea className="input" rows={4} placeholder="Financial Issues" value={form.financial_issues || ""} onChange={(e) => updateField("financial_issues", e.target.value)} />
              <textarea className="input" rows={4} placeholder="Board Frustrations" value={form.board_frustrations || ""} onChange={(e) => updateField("board_frustrations", e.target.value)} />
              <textarea className="input" rows={4} placeholder="Operational Issues" value={form.operational_issues || ""} onChange={(e) => updateField("operational_issues", e.target.value)} />
              <textarea className="input md:col-span-2" rows={5} placeholder="General Notes" value={form.notes || ""} onChange={(e) => updateField("notes", e.target.value)} />
            </FormSection>
          </section>
        </div>
      </section>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background-color: rgba(15, 23, 42, 0.9) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          padding: 0.85rem 1rem;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }

        .input::placeholder {
          color: rgba(148, 163, 184, 0.95) !important;
          -webkit-text-fill-color: rgba(148, 163, 184, 0.95) !important;
        }

        option {
          background: #020617;
          color: #ffffff;
        }

        .checkbox-card {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background-color: rgba(15, 23, 42, 0.9);
          color: #ffffff;
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
        }
      `}</style>
    </main>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <h3 className="mb-4 text-lg font-semibold text-amber-300">
        {title}
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-3xl font-bold text-amber-300">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-400">
        {label}
      </div>
    </div>
  );
}

function Badge({ tone, children }) {
  const value = String(tone || "").toLowerCase();

  const style =
    value === "critical"
      ? "border-red-400/30 bg-red-500/10 text-red-200"
      : value === "high"
      ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
      : value === "low"
      ? "border-slate-400/30 bg-slate-400/10 text-slate-300"
      : "border-sky-400/30 bg-sky-400/10 text-sky-300";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>
      {children}
    </span>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function isFollowUpDue(dateValue) {
  if (!dateValue) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followUp = new Date(dateValue);
  followUp.setHours(0, 0, 0, 0);

  return followUp <= today;
}
