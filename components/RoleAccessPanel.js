export default function RoleAccessPanel({ profile, scope }) {
  return (
    <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6 shadow-2xl shadow-black/20">
      <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/80">
        Secure Access Scope
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-white">
        {profile?.full_name || "Authorized User"}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        This workspace is scoped to your assigned role and association.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <AccessItem label="Role" value={scope?.role || "guest"} />
        <AccessItem
          label="Association"
          value={profile?.association_id || scope?.associationId || "Scoped"}
        />
        <AccessItem
          label="Unit"
          value={profile?.unit_number || scope?.unitNumber || "N/A"}
        />
      </div>
    </div>
  );
}

function AccessItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}
