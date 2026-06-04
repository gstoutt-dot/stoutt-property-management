import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const emptyProspect = {
  association_name: "",
  community_name: "",
  association_type: "",
  address: "",
  city: "",
  state: "FL",
  zip: "",
  units: "",
  current_management_company: "",
  president_name: "",
  president_email: "",
  president_phone: "",
  treasurer_name: "",
  treasurer_email: "",
  treasurer_phone: "",
  manager_contact_name: "",
  manager_contact_email: "",
  manager_contact_phone: "",
  pain_points: "",
  status: "Lead",
  next_follow_up_date: "",
  notes: "",
};

export default function ProspectPipeline() {
  const [prospects, setProspects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyProspect);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProspects();
  }, []);

  async function loadProspects() {
    try {
      setLoading(true);

      const response = await fetch("/api/prospects/list");
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message);
      }

      setProspects(payload.prospects || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveProspect() {
    try {
      setSaving(true);

      const response = await fetch("/api/prospects/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message);
      }

      setMessage("Prospect saved.");

      await loadProspects();

      if (!form.id) {
        setForm(emptyProspect);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteProspect(id) {
    if (!confirm("Delete this prospect?")) return;

    const response = await fetch(
      `/api/prospects/delete?id=${id}`,
      {
        method: "DELETE",
      }
    );

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      alert(payload.message);
      return;
    }

    await loadProspects();

    setSelected(null);
    setForm(emptyProspect);
  }

  const stats = useMemo(() => {
    return {
      total: prospects.length,
      presentations: prospects.filter(
        (p) => p.status === "Presentation Scheduled"
      ).length,
      proposals: prospects.filter(
        (p) => p.status === "Proposal Sent"
      ).length,
      contracts: prospects.filter(
        (p) => p.status === "Contract Pending"
      ).length,
      won: prospects.filter(
        (p) => p.status === "Won"
      ).length,
    };
  }, [prospects]);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-amber-300 text-xs tracking-[0.3em] uppercase">
            SPM Sales Command Center
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Prospect Pipeline
          </h1>
        </div>

        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300"
        >
          Admin Dashboard
        </Link>
      </div>

      {message && (
        <div className="mt-6 rounded-xl bg-amber-500/10 border border-amber-400/20 p-4">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-4 mt-8">
        <StatCard label="Prospects" value={stats.total} />
        <StatCard label="Presentations" value={stats.presentations} />
        <StatCard label="Proposals" value={stats.proposals} />
        <StatCard label="Contracts" value={stats.contracts} />
        <StatCard label="Won" value={stats.won} />
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mt-8">

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Associations
            </h2>

            <button
              onClick={() => {
                setSelected(null);
                setForm(emptyProspect);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-400/20"
            >
              New Prospect
            </button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-3">
              {prospects.map((prospect) => (
                <button
                  key={prospect.id}
                  onClick={() => {
                    setSelected(prospect);
                    setForm(prospect);
                  }}
                  className="w-full text-left rounded-xl border border-white/10 p-4 bg-slate-900"
                >
                  <div className="font-semibold">
                    {prospect.association_name}
                  </div>

                  <div className="text-sm text-slate-400 mt-1">
                    {prospect.current_management_company || "No Management Company"}
                  </div>

                  <div className="text-amber-300 text-xs mt-2">
                    {prospect.status}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold mb-6">
            Prospect Record
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="input"
              placeholder="Association Name"
              value={form.association_name || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  association_name: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Units"
              value={form.units || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  units: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="Current Management Company"
              value={form.current_management_company || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  current_management_company: e.target.value,
                })
              }
            />

            <select
              className="input"
              value={form.status || "Lead"}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              <option>Lead</option>
              <option>Research</option>
              <option>Initial Contact</option>
              <option>Follow Up</option>
              <option>Presentation Scheduled</option>
              <option>Proposal Sent</option>
              <option>Board Review</option>
              <option>Contract Pending</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <input
              className="input"
              placeholder="President Name"
              value={form.president_name || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  president_name: e.target.value,
                })
              }
            />

            <input
              className="input"
              placeholder="President Email"
              value={form.president_email || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  president_email: e.target.value,
                })
              }
            />

            <textarea
              rows={5}
              className="input md:col-span-2"
              placeholder="Pain Points"
              value={form.pain_points || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  pain_points: e.target.value,
                })
              }
            />

            <textarea
              rows={5}
              className="input md:col-span-2"
              placeholder="Notes"
              value={form.notes || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={saveProspect}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-amber-400/10 border border-amber-400/20"
            >
              {saving ? "Saving..." : "Save Prospect"}
            </button>

            {selected && (
              <button
                onClick={() => deleteProspect(selected.id)}
                className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-400/20"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(15,23,42,.9);
          color: white;
          padding: 12px;
        }
      `}</style>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-3xl font-bold text-amber-300">
        {value}
      </div>
      <div className="text-sm text-slate-400 mt-2">
        {label}
      </div>
    </div>
  );
}
