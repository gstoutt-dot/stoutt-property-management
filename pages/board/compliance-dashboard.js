import Link from "next/link";

export default function BoardComplianceDashboard() {
  const complianceAreas = [
    {
      title: "Governing Documents",
      risk: "Low",
      status: "Current",
      desc: "Declaration, bylaws, rules and board policies tracked for compliance alignment.",
    },
    {
      title: "Florida Statutory Items",
      risk: "Medium",
      status: "Review Needed",
      desc: "Required association deadlines, notices and statutory obligations monitored.",
    },
    {
      title: "Insurance Renewals",
      risk: "High",
      status: "60 Days",
      desc: "Policy renewal window approaching with board review required.",
    },
    {
      title: "Reserve Study",
      risk: "Medium",
      status: "Update Pending",
      desc: "Reserve planning items flagged for funding review and future capital needs.",
    },
    {
      title: "Vendor Contracts",
      risk: "Low",
      status: "Tracked",
      desc: "Expiration dates, renewal terms and service obligations monitored.",
    },
    {
      title: "Open Violations",
      risk: "Medium",
      status: "Active",
      desc: "Enforcement exposure and unresolved owner compliance issues summarized.",
    },
  ];

  const riskAlerts = [
    "Insurance renewal package requires board review within 60 days",
    "Reserve funding exception should be reviewed before next budget cycle",
    "Two vendor contracts expire within the next quarter",
    "Violation hearing notices require confirmation before enforcement action",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stoutt Property Management
            </div>
            <h1 className="mt-1 text-2xl font-semibold">
              Compliance & Risk Dashboard
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/board" className="hover:text-amber-300">
              Board Portal
            </Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">
              Violations
            </Link>
            <Link href="/board/architectural-approvals" className="hover:text-amber-300">
              ARC Approvals
            </Link>
            <Link href="/board/maintenance-review" className="hover:text-amber-300">
              Maintenance
            </Link>
            <Link href="/board/financial-review" className="hover:text-amber-300">
              Financials
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Risk Monitoring • Deadlines • Compliance Visibility
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Give boards a clear view of association risk before it becomes a crisis.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Monitor governing document issues, statutory deadlines, insurance
                renewals, vendor contracts, reserve obligations, inspections and
                legal exposure from one executive dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Overall Risk Level</div>
              <div className="mt-2 text-5xl font-semibold text-amber-300">
                Medium
              </div>
              <div className="mt-4 text-slate-300">
                4 items require board visibility before next meeting.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Risk Alerts", "4"],
            ["Renewals Due", "3"],
            ["Compliance Reviews", "6"],
            ["Legal Flags", "1"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-3 text-4xl font-semibold text-amber-300">
                {value}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Compliance Areas
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Association Risk Map
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {complianceAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400/40 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                    {item.risk}
                  </span>
                </div>

                <div className="mt-4 text-sm text-slate-400">
                  Status:{" "}
                  <span className="text-slate-200">{item.status}</span>
                </div>

                <p className="mt-4 leading-relaxed text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              AI Risk Alerts
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Items Requiring Attention
            </h3>

            <div className="mt-8 space-y-4">
              {riskAlerts.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Compliance Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Board Protection System
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {[
                "Track statutory and document-based deadlines",
                "Flag insurance and vendor renewal windows",
                "Connect unresolved risks to action items",
                "Prepare compliance summaries for meeting packets",
                "Escalate legal or manager review items",
                "Archive completed compliance records",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This dashboard positions SPM as a proactive management company —
              not just a reactive service provider.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
