import Link from "next/link";

export default function BoardVendorPerformance() {
  const vendors = [
    {
      name: "Landscape Maintenance Vendor",
      service: "Landscaping",
      score: "82",
      status: "Watch",
      desc: "Service quality is acceptable but recent landscape decline requires correction follow-up.",
    },
    {
      name: "Pool Service Contractor",
      service: "Pool / Recreation",
      score: "91",
      status: "Strong",
      desc: "Consistent service performance with timely response to recent equipment issues.",
    },
    {
      name: "Roofing Contractor",
      service: "Capital Project",
      score: "76",
      status: "Bid Review",
      desc: "Proposal under review with insurance, scope and warranty details pending confirmation.",
    },
    {
      name: "Elevator Service Provider",
      service: "Mechanical",
      score: "68",
      status: "Concern",
      desc: "Response time and repeat service calls should be reviewed before contract renewal.",
    },
  ];

  const workflow = [
    "Track active vendor contracts and renewals",
    "Monitor service quality and response times",
    "Flag insurance certificate or license expirations",
    "Document owner and manager service complaints",
    "Compare bids, exclusions and warranty language",
    "Prepare vendor recommendations for board review",
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
              Vendor Performance
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
            Vendor Accountability • Contracts • Service Quality
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Give boards real visibility into vendor performance and contract risk.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track service quality, response times, contract renewals, insurance
                certificates, complaints, bid history and vendor accountability from
                one board-level oversight center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Vendor Watch Items</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                3
              </div>
              <div className="mt-4 text-slate-300">
                1 vendor requires board-level contract review.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Active Vendors", "18"],
            ["Contracts Renewing", "4"],
            ["COIs Expiring", "3"],
            ["Open Complaints", "5"],
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
              Vendor Scorecards
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Performance & Contract Oversight
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {vendors.map((vendor) => (
              <div
                key={vendor.name}
                className="rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400/40 transition"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-semibold">{vendor.name}</h4>
                    <div className="mt-2 text-sm text-slate-400">
                      {vendor.service}
                    </div>
                    <p className="mt-4 leading-relaxed text-slate-300">
                      {vendor.desc}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-4xl font-semibold text-amber-300">
                      {vendor.score}
                    </div>
                    <div className="mt-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                      {vendor.status}
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${vendor.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Oversight Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Vendor Control Path
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {workflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Board-Level Accountability
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              No More Invisible Vendor Problems
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Boards often hear about vendor issues only after owners complain
                repeatedly or service problems become visible. This module gives
                the board a cleaner way to see performance trends before renewal
                decisions are made.
              </p>

              <p>
                SPM can track service history, complaints, response time,
                insurance documents, pricing changes and contract status so vendor
                recommendations are grounded in real operating performance.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This strengthens SPM’s positioning as a proactive, accountable
              management company with systems boards can actually see.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
