import { useEffect, useMemo, useState } from "react";

const initialAccess = {
  associationId: "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",
  associationName: "Sunset Condominium Association",
  unitNumber: "",
  ownerName: "",
  ownerEmail: "",
  portalRole: "Owner",
  accessStatus: "Pending",
  financialAccessStatus: "Pending",
  inviteStatus: "Not Sent",
};

export default function OwnerAccessProvisioning() {
  const [form, setForm] = useState(initialAccess);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadAccessRecords() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/list-owner-access");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to load owner access records.");
      }

      setRecords(data.accessRecords || []);
    } catch (err) {
      setError(err.message || "Unable to load owner access records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccessRecords();
  }, []);

  const stats = useMemo(() => {
    return {
      total: records.length,
      provisioned: records.filter((o) => o.access_status === "Provisioned")
        .length,
      pending: records.filter((o) => o.access_status === "Pending").length,
      review: records.filter((o) => o.access_status === "Review Required")
        .length,
    };
  }, [records]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveAccessRecord() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/onboarding/create-owner-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to save owner access record.");
      }

      setSuccess(
        `Owner access record saved: Unit ${data.accessRecord.unit_number} - ${data.accessRecord.owner_name}`
      );

      setForm(initialAccess);
      await loadAccessRecords();
    } catch (err) {
      setError(err.message || "Unable to save owner access record.");
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
            SPM Owner Access
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Owner Access Provisioning
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Prepare secure owner portal access after owner-unit mapping is
            complete. This live layer tracks portal readiness, financial access,
            and owner invitation status before activation.
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
          <Metric label="Provisioned" value={stats.provisioned} />
          <Metric label="Pending" value={stats.pending} />
          <Metric label="Needs Review" value={stats.review} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Create Access Record</h2>

            <div className="mt-6 grid gap-4">
              <Input label="Association Name" value={form.associationName} onChange={(v) => updateField("associationName", v)} />
              <Input label="Unit Number" value={form.unitNumber} onChange={(v) => updateField("unitNumber", v)} />
              <Input label="Owner Name" value={form.ownerName} onChange={(v) => updateField("ownerName", v)} />
              <Input label="Owner Email" value={form.ownerEmail} onChange={(v) => updateField("ownerEmail", v)} />

              <Select
                label="Access Status"
                value={form.accessStatus}
                onChange={(v) => updateField("accessStatus", v)}
                options={["Pending", "Provisioned", "Review Required"]}
              />

              <Select
                label="Financial Access"
                value={form.financialAccessStatus}
                onChange={(v) => updateField("financialAccessStatus", v)}
                options={["Pending", "Active", "Hold"]}
              />

              <Select
                label="Invite Status"
                value={form.inviteStatus}
                onChange={(v) => updateField("inviteStatus", v)}
                options={["Not Sent", "Ready", "Sent", "Hold"]}
              />

              <button
  type="button"
  onClick={() => {
    console.log("FORM DATA:", form);
    saveAccessRecord();
  }}
  disabled={saving}
  className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 disabled:opacity-50"
>
  {saving ? "Saving Access..." : "Save Access Record"}
</button>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Live Portal Access Queue
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Owner Login Activation Queue
                </h2>
              </div>

              <button
                type="button"
                onClick={loadAccessRecords}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Refresh Access Records
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Association</th>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Access</th>
                    <th className="px-5 py-4">Financial View</th>
                    <th className="px-5 py-4">Invite</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                        Loading owner access records...
                      </td>
                    </tr>
                  ) : records.length > 0 ? (
                    records.map((owner) => (
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
                          {owner.owner_email}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {owner.portal_role || "Owner"}
                        </td>
                        <td className="px-5 py-4">
                          <Status value={owner.access_status} />
                        </td>
                        <td className="px-5 py-4">
                          <FinancialStatus value={owner.financial_access_status} />
                        </td>
                        <td className="px-5 py-4">
                          <InviteStatus value={owner.invite_status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                        No owner access records saved yet.
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

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
    value === "Provisioned"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Pending"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Pending"}
    </span>
  );
}

function FinancialStatus({ value }) {
  const styles =
    value === "Active"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Hold"
      ? "border-red-300/30 bg-red-400/10 text-red-200"
      : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Pending"}
    </span>
  );
}

function InviteStatus({ value }) {
  const styles =
    value === "Sent" || value === "Ready"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Hold"
      ? "border-red-300/30 bg-red-400/10 text-red-200"
      : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Not Sent"}
    </span>
  );
}
