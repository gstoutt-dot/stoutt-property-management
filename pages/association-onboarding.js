import { useMemo, useState } from "react";

const initialForm = {
  associationName: "",
  propertyType: "HOA",
  city: "",
  county: "",
  state: "Florida",
  totalUnits: "",
  boardPresident: "",
  boardEmail: "",
  managementContact: "",
  quickbooksStatus: "Not Connected",
  onboardingStage: "Association Intake",
};

export default function AssociationOnboarding() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [savedAssociation, setSavedAssociation] = useState(null);
  const [error, setError] = useState("");

  const completionScore = useMemo(() => {
    const fields = Object.values(form);
    const completed = fields.filter((value) => String(value || "").trim()).length;
    return Math.round((completed / fields.length) * 100);
  }, [form]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveAssociation() {
    setSaving(true);
    setError("");
    setSavedAssociation(null);

    try {
      const response = await fetch("/api/onboarding/create-association", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to save association.");
      }

      setSavedAssociation(data.association);
    } catch (err) {
      setError(err.message || "Unable to save association.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Association Onboarding
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Association Onboarding Engine
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Begin onboarding a new association into SPM with the core financial,
            ownership, board, and QuickBooks readiness information required for
            live HOA financial operations.
          </p>
        </header>

        {error && (
          <section className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
            {error}
          </section>
        )}

        {savedAssociation && (
          <section className="mt-6 rounded-3xl border border-emerald-300/30 bg-emerald-400/10 p-5 text-emerald-200">
            Association saved successfully:{" "}
            <span className="font-semibold">
              {savedAssociation.association_name}
            </span>
          </section>
        )}

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold">Association Intake</h2>

              <button
                type="button"
                onClick={saveAssociation}
                disabled={saving}
                className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 disabled:opacity-50"
              >
                {saving ? "Saving Association..." : "Save Association Profile"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input
                label="Association Name"
                value={form.associationName}
                onChange={(v) => updateField("associationName", v)}
              />

              <label className="block">
                <span className="text-sm text-slate-400">Property Type</span>
                <select
                  value={form.propertyType}
                  onChange={(event) =>
                    updateField("propertyType", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                >
                  <option value="HOA">HOA</option>
                  <option value="Condominium Association">
                    Condominium Association
                  </option>
                </select>
              </label>

              <Input label="City" value={form.city} onChange={(v) => updateField("city", v)} />
              <Input label="County" value={form.county} onChange={(v) => updateField("county", v)} />
              <Input label="State" value={form.state} onChange={(v) => updateField("state", v)} />
              <Input label="Total Units" value={form.totalUnits} onChange={(v) => updateField("totalUnits", v)} />
              <Input label="Board President" value={form.boardPresident} onChange={(v) => updateField("boardPresident", v)} />
              <Input label="Board Email" value={form.boardEmail} onChange={(v) => updateField("boardEmail", v)} />
              <Input label="Management Contact" value={form.managementContact} onChange={(v) => updateField("managementContact", v)} />
              <Input label="QuickBooks Status" value={form.quickbooksStatus} onChange={(v) => updateField("quickbooksStatus", v)} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Onboarding Readiness
              </p>

              <p className="mt-4 text-5xl font-semibold text-amber-300">
                {completionScore}%
              </p>

              <p className="mt-3 text-sm text-slate-300">
                Completion based on required association intake fields.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Next Operational Steps</h2>

              <div className="mt-5 space-y-3">
                <Step title="Create Association Profile" active={!!savedAssociation} />
                <Step title="Import Owner / Unit Roster" active />
                <Step title="Map Owners to Units" />
                <Step title="Connect QuickBooks Realm" />
                <Step title="Generate Owner Login Access" />
                <Step title="Activate Board Financial Visibility" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="font-semibold text-emerald-200">
                Sales Demo Positioning
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                SPM can onboard an association, import owners and units, connect
                accounting records, and provide board-ready financial visibility
                immediately.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/50"
      />
    </label>
  );
}

function Step({ title, active }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div
        className={`h-3 w-3 rounded-full ${
          active ? "bg-emerald-300" : "bg-slate-600"
        }`}
      />
      <p className="text-sm text-slate-300">{title}</p>
    </div>
  );
}
