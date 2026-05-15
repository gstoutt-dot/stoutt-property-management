import { useEffect, useMemo, useState } from "react";

const initialOwner = {
  associationId: "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",
  associationName: "Sunset Condominium Association",
  unitNumber: "",
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
  accountNumber: "",
  openingBalance: 0,
};

export default function OwnerUnitImport() {
  const [form, setForm] = useState(initialOwner);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [csvRows, setCsvRows] = useState([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkResult, setBulkResult] = useState(null);

const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  async function loadOwnerUnits() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/list-owner-units");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to load owner/unit records.");
      }

      setOwners(data.ownerUnits || []);
    } catch (err) {
      setError(err.message || "Unable to load owner/unit records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOwnerUnits();
  }, []);

  const stats = useMemo(() => {
    const total = owners.length;
    const mapped = owners.filter((o) => o.mapping_status === "Mapped").length;
    const ready = owners.filter((o) => o.import_status === "Ready").length;
    const review = owners.filter((o) => o.import_status === "Needs Review").length;

    return { total, mapped, ready, review };
  }, [owners]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleCsvUpload(event) {
  const file = event.target.files?.[0];

  if (!file) return;

  setCsvFileName(file.name);
  setShowBulkConfirm(false);
  setBulkResult(null);

  const text = await file.text();

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    setError("CSV file contains no rows.");
    return;
  }

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim());

  const rows = lines.slice(1).map((line) => {
    const values = line.split(",");

    return headers.reduce((obj, header, index) => {
      obj[header] = values[index]?.trim() || "";
      return obj;
    }, {});
  });

  setCsvRows(rows);
  setShowBulkConfirm(true);
}

  function getCsvRowValue(row, fields) {
  const normalizedRow = {};

  Object.entries(row).forEach(([key, value]) => {
    normalizedRow[
      String(key)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
    ] = value;
  });

  for (const field of fields) {
    const normalizedField = field
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const value = normalizedRow[normalizedField];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value).trim();
    }
  }

  return "";
}

  async function bulkOnboardCsvRows() {
  setBulkSaving(true);
  setError("");
  setSuccess("");
  setBulkResult(null);

  const results = {
  total: csvRows.length,
  successful: 0,
  skipped: 0,
  failed: 0,
  errors: [],
};

  try {
    for (const row of csvRows) {
      const payload = {
        associationId: form.associationId,
        associationName: form.associationName,
        unitNumber: row.unitNumber || row.unit_number || row.Unit || row.unit || "",
        ownerName: row.ownerName || row.owner_name || row.Owner || row.owner || "",
        ownerEmail: row.ownerEmail || row.owner_email || row.Email || row.email || "",
        ownerPhone: row.ownerPhone || row.owner_phone || row.Phone || row.phone || "",
        accountNumber:
          row.accountNumber ||
          row.account_number ||
          row.unitNumber ||
          row.unit_number ||
          row.Unit ||
          row.unit ||
          "",
        openingBalance: row.openingBalance || row.opening_balance || 0,
      };

      const response = await fetch("/api/onboarding/create-owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        results.failed += 1;
        results.errors.push({
          unitNumber: payload.unitNumber,
          ownerName: payload.ownerName,
          error: data?.error || "Unable to onboard owner.",
        });
      } else if (data?.skipped) {
  results.skipped += 1;

  results.errors.push({
    unitNumber: payload.unitNumber,
    ownerName: payload.ownerName,
    error: data.message || "Owner already exists.",
  });
} else {
  results.successful += 1;
}
    }

    setBulkResult(results);
    setSuccess(
  `Bulk onboarding complete: ${results.successful} created, ${results.skipped} skipped, ${results.failed} failed.`
);

    await loadOwnerUnits();
  } catch (err) {
    setError(err.message || "Unable to complete bulk onboarding.");
  } finally {
    setBulkSaving(false);
  }
}

  async function saveOwnerUnit() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
  ...form,
  accountNumber: form.accountNumber || form.unitNumber,
};

const response = await fetch("/api/onboarding/create-owner", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data?.error || "Unable to onboard owner.");
}

if (data?.skipped) {
  setSuccess(
    `Owner already exists: Unit ${data.ownerUnit.unit_number} - ${data.ownerUnit.owner_name}`
  );
} else {
  setSuccess(
    `Owner onboarded successfully: Unit ${data.ownerUnit.unit_number} - ${data.ownerUnit.owner_name}`
  );
}
      setForm(initialOwner);
      await loadOwnerUnits();
    } catch (err) {
      setError(err.message || "Unable to save owner/unit record.");
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
            SPM Owner Onboarding
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Owner / Unit Import Center
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Import, review, and persist owner-unit records before account
            creation, QuickBooks identity matching, and secure owner portal
            access.
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
          <Metric label="Total Records" value={stats.total} />
          <Metric label="Mapped" value={stats.mapped} />
          <Metric label="Ready" value={stats.ready} />
          <Metric label="Needs Review" value={stats.review} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Add Owner / Unit</h2>

          <div className="mt-6 rounded-2xl border border-dashed border-amber-300/30 bg-slate-950/40 p-5">
  <p className="text-sm text-slate-400">
    CSV Roster Upload (Preview Mode)
  </p>

  <input
    type="file"
    accept=".csv"
    onChange={handleCsvUpload}
    className="mt-4 block w-full text-sm"
  />

  {csvFileName && (
    <p className="mt-3 text-emerald-300 text-sm">
      Loaded: {csvFileName}
    </p>
  )}

  {csvRows.length > 0 && (
    <p className="mt-2 text-amber-300 text-sm">
      Parsed {csvRows.length} owner records
    </p>
  )}
</div>

            <div className="mt-6 grid gap-4">
              <Input
                label="Association Name"
                value={form.associationName}
                onChange={(v) => updateField("associationName", v)}
              />
              <Input
                label="Unit Number"
                value={form.unitNumber}
                onChange={(v) => updateField("unitNumber", v)}
              />
              <Input
                label="Owner Name"
                value={form.ownerName}
                onChange={(v) => updateField("ownerName", v)}
              />
              <Input
                label="Owner Email"
                value={form.ownerEmail}
                onChange={(v) => updateField("ownerEmail", v)}
              />
              {/* Owner phone can be added later if needed */}

             {/* Account number defaults to unit number for onboarding */}
              <Input
                label="Opening Balance"
                value={form.openingBalance}
                onChange={(v) => updateField("openingBalance", v)}
              />

              <button
                type="button"
                onClick={saveOwnerUnit}
                disabled={saving}
                className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 disabled:opacity-50"
              >
                {saving ? "Saving Owner..." : "Save Owner / Unit Record"}
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <Step title="Import owner roster" active />
              <Step title="Validate unit numbers" active={owners.length > 0} />
              <Step title="Match QuickBooks customers" />
              <Step title="Create owner identities" />
              <Step title="Generate login access" />
              <Step title="Activate financial dashboard" />
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Live Owner Records
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Unit Ownership Review
                </h2>
              </div>

              <button
                type="button"
                onClick={loadOwnerUnits}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Refresh Records
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Association</th>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Balance</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-5 py-10 text-center text-slate-400">
                        Loading owner/unit records...
                      </td>
                    </tr>
                  ) : owners.length > 0 ? (
                    owners.map((owner) => (
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
                        <td className="px-5 py-4 text-slate-400">
                          {owner.owner_phone || "—"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-amber-300">
                          ${Number(owner.opening_balance || 0).toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          <Status value={owner.import_status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-5 py-10 text-center text-slate-400">
                        No owner/unit records saved yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
</div>

{csvRows.length > 0 && (
  <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
    <div className="flex flex-col gap-3 bg-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
  <h2 className="text-xl font-semibold">CSV Preview</h2>

   {showBulkConfirm ? (
  <div className="flex flex-col gap-3 md:flex-row md:items-center">
    <button
      type="button"
      onClick={bulkOnboardCsvRows}
      disabled={bulkSaving || csvRows.length === 0}
      className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 disabled:opacity-50"
    >
      {bulkSaving ? "Onboarding CSV..." : `Confirm Onboard ${csvRows.length} Owners`}
    </button>

    <button
      type="button"
      onClick={() => {
        setCsvRows([]);
        setCsvFileName("");
        setShowBulkConfirm(false);
        setBulkResult(null);
      }}
      disabled={bulkSaving}
      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
    >
      Cancel Upload
    </button>
  </div>
) : (
  <p className="text-sm text-slate-400">
    Upload a CSV roster to preview owner records before onboarding.
  </p>
)}
</div>

{showBulkConfirm && (
  <div className="border-b border-amber-300/20 bg-amber-400/10 px-5 py-4">
    <p className="font-semibold text-amber-300">
      Bulk Onboarding Confirmation Required
    </p>

    <p className="mt-2 text-sm text-slate-300">
      You are about to create:
    </p>

    <ul className="mt-3 space-y-1 text-sm text-slate-300">
      <li>• Owner identities</li>
      <li>• Owner access records</li>
      <li>• Login accounts</li>
      <li>• Financial dashboard access</li>
    </ul>

    <p className="mt-3 text-sm text-red-300">
      Review the roster carefully before continuing.
    </p>
  </div>
)}

<table className="w-full text-left text-sm">
      <thead className="bg-slate-950/40">
        <tr>
          {Object.keys(csvRows[0]).map((header) => (
            <th key={header} className="px-4 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {csvRows.slice(0, 10).map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, col) => (
              <td key={col} className="px-4 py-3 text-slate-300">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
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

function Status({ value }) {
  const styles =
    value === "Mapped"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Ready"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Pending"}
    </span>
  );
}

