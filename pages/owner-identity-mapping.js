import { useEffect, useMemo, useState } from "react";

const initialMapping = {
  associationName: "Sunset Condominium Association",
  unitNumber: "",
  ownerName: "",
  ownerEmail: "",
  quickbooksCustomerName: "",
  quickbooksCustomerId: "",
  ownerUserId: "",
  matchStatus: "Matched",
  loginStatus: "Pending",
  financialVisibilityStatus: "Pending",
};

export default function OwnerIdentityMapping() {
  const [form, setForm] = useState(initialMapping);
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadMappings() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/list-owner-identity-mappings");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to load identity mappings.");
      }

      setMappings(data.mappings || []);
    } catch (err) {
      setError(err.message || "Unable to load identity mappings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMappings();
  }, []);

  const stats = useMemo(() => {
    return {
      total: mappings.length,
      matched: mappings.filter((item) => item.match_status === "Matched").length,
      review: mappings.filter((item) => item.match_status === "Needs Review").length,
      ready: mappings.filter((item) => item.login_status === "Ready").length,
    };
  }, [mappings]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveMapping() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/onboarding/create-owner-identity-mapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to save owner identity mapping.");
      }

      setSuccess(
        `Identity mapping saved: Unit ${data.mapping.unit_number} - ${data.mapping.owner_name}`
      );

      setForm(initialMapping);
      await loadMappings();
    } catch (err) {
      setError(err.message || "Unable to save owner identity mapping.");
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
            SPM Owner Identity Bridge
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Owner Identity Mapping
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Match imported owner-unit records to QuickBooks customers and prepare
            secure owner portal identity creation for live financial visibility.
          </p>
        </header>

        {error && (
          <section className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
            {error}
          </section>
        )}

        {success && (
          <section className="mt-6 rounded-3xl border border-emerald-300/30 bg-emerald-400/10 p-5 text-emerald-200">
            {success}
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Owner Records" value={stats.total} />
          <Metric label="QuickBooks Matched" value={stats.matched} />
          <Metric label="Needs Review" value={stats.review} />
          <Metric label="Login Ready" value={stats.ready} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Create Identity Mapping</h2>

            <div className="mt-6 grid gap-4">
              <Input label="Association Name" value={form.associationName} onChange={(v) => updateField("associationName", v)} />
              <Input label="Unit Number" value={form.unitNumber} onChange={(v) => updateField("unitNumber", v)} />
              <Input label="Owner Name" value={form.ownerName} onChange={(v) => updateField("ownerName", v)} />
              <Input label="Owner Email" value={form.ownerEmail} onChange={(v) => updateField("ownerEmail", v)} />
              <Input label="QuickBooks Customer Name" value={form.quickbooksCustomerName} onChange={(v) => updateField("quickbooksCustomerName", v)} />
              <Input label="QuickBooks Customer ID" value={form.quickbooksCustomerId} onChange={(v) => updateField("quickbooksCustomerId", v)} />
              <Input label="Owner User ID" value={form.ownerUserId} onChange={(v) => updateField("ownerUserId", v)} />

              <label className="block">
                <span className="text-sm text-slate-400">Match Status</span>
                <select
                  value={form.matchStatus}
                  onChange={(event) => updateField("matchStatus", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                >
                  <option value="Matched">Matched</option>
                  <option value="Needs Review">Needs Review</option>
                  <option value="Pending">Pending</option>
                </select>
              </label>

              <button
                type="button"
                onClick={saveMapping}
                disabled={saving}
                className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 disabled:opacity-50"
              >
                {saving ? "Saving Mapping..." : "Save Identity Mapping"}
              </button>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Live Identity Bridge
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Owner / Unit / QuickBooks Matching
                </h2>
              </div>

              <button
                type="button"
                onClick={loadMappings}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Refresh Mappings
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Association</th>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">QuickBooks Customer</th>
                    <th className="px-5 py-4">Owner User ID</th>
                    <th className="px-5 py-4">Match</th>
                    <th className="px-5 py-4">Login</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                        Loading identity mappings...
                      </td>
                    </tr>
                  ) : mappings.length > 0 ? (
                    mappings.map((owner) => (
                      <tr key={owner.id} className="bg-slate-950/40">
                        <td className="px-5 py-4 text-slate-400">
                          {owner.association_name || "—"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-white">
                          {owner.unit_number}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {owner.owner_name}
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          {owner.owner_email || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {owner.quickbooks_customer_name || "Pending"}
                        </td>
                        <td className="max-w-[220px] truncate px-5 py-4 text-slate-500">
                          {owner.owner_user_id || "Pending creation"}
                        </td>
                        <td className="px-5 py-4">
                          <Status value={owner.match_status} />
                        </td>
                        <td className="px-5 py-4">
                          <LoginStatus value={owner.login_status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                        No identity mappings saved yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
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

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function Status({ value }) {
  const styles =
    value === "Matched"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Needs Review"
      ? "border-red-300/30 bg-red-400/10 text-red-200"
      : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Pending"}
    </span>
  );
}

function LoginStatus({ value }) {
  const styles =
    value === "Ready"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Pending"}
    </span>
  );
}
