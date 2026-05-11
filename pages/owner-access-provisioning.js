import { useMemo, useState } from "react";

const initialOwners = [
  {
    unit: "101",
    owner: "Robert Mitchell",
    email: "robert@example.com",
    portalRole: "Owner",
    accessStatus: "Provisioned",
    financialAccess: "Active",
    inviteStatus: "Ready",
  },
  {
    unit: "102",
    owner: "Angela Brooks",
    email: "angela@example.com",
    portalRole: "Owner",
    accessStatus: "Pending",
    financialAccess: "Pending",
    inviteStatus: "Not Sent",
  },
  {
    unit: "103",
    owner: "Carlos Hernandez",
    email: "carlos@example.com",
    portalRole: "Owner",
    accessStatus: "Review Required",
    financialAccess: "Pending",
    inviteStatus: "Hold",
  },
];

export default function OwnerAccessProvisioning() {
  const [owners] = useState(initialOwners);

  const stats = useMemo(() => {
    return {
      total: owners.length,
      provisioned: owners.filter((o) => o.accessStatus === "Provisioned").length,
      pending: owners.filter((o) => o.accessStatus === "Pending").length,
      review: owners.filter((o) => o.accessStatus === "Review Required").length,
    };
  }, [owners]);

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
            complete. This layer controls portal readiness, financial visibility,
            and owner invitation status before activation.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Owner Records" value={stats.total} />
          <Metric label="Provisioned" value={stats.provisioned} />
          <Metric label="Pending" value={stats.pending} />
          <Metric label="Needs Review" value={stats.review} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Secure Portal Access
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Owner Login Activation Queue
                </h2>
              </div>

              <button
                type="button"
                className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
              >
                Send Owner Invitations
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
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
                  {owners.map((owner) => (
                    <tr key={owner.unit} className="bg-slate-950/40">
                      <td className="px-5 py-4 font-semibold text-white">
                        {owner.unit}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {owner.owner}
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {owner.email}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {owner.portalRole}
                      </td>
                      <td className="px-5 py-4">
                        <Status value={owner.accessStatus} />
                      </td>
                      <td className="px-5 py-4">
                        <FinancialStatus value={owner.financialAccess} />
                      </td>
                      <td className="px-5 py-4">
                        <InviteStatus value={owner.inviteStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Provisioning Workflow</h2>

              <div className="mt-6 space-y-3">
                <Step title="Confirm owner-unit identity" active />
                <Step title="Confirm QuickBooks mapping" active />
                <Step title="Create owner portal role" active />
                <Step title="Enable financial visibility" />
                <Step title="Send secure invitation" />
                <Step title="Owner completes login setup" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="font-semibold text-emerald-200">
                Owner Portal Readiness
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Once provisioned, each owner can access a secure portal showing
                their balance, payment status, account health, and association
                financial transparency.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
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
    value === "Provisioned"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Pending"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function FinancialStatus({ value }) {
  const styles =
    value === "Active"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function InviteStatus({ value }) {
  const styles =
    value === "Ready"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Not Sent"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}
