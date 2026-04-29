import Link from "next/link";

const profileItems = [
  ["Legal Name", "Sample Lakes Condominium Association, Inc."],
  ["Property Type", "Condominium Association"],
  ["Total Units", "148"],
  ["Fiscal Year", "January 1 – December 31"],
  ["Assigned Manager", "Stoutt Property Management"],
  ["Portal Status", "Active"],
];

const summaries = [
  {
    title: "Insurance Summary",
    status: "Renewal Review Open",
    details: "Carrier comparison pending board review before June renewal.",
    linked: "Insurance Center / Compliance Calendar",
  },
  {
    title: "Budget Summary",
    status: "Draft In Progress",
    details: "Annual budget packet being prepared for board adoption.",
    linked: "Budget Planning / Annual Requirements",
  },
  {
    title: "Reserve Summary",
    status: "Review Scheduled",
    details: "Reserve study review assigned to Treasurer and manager.",
    linked: "Reserves / Reserve Study Action",
  },
  {
    title: "QuickBooks Connection",
    status: "Pending Integration",
    details: "QuickBooks will serve as the near-term accounting engine.",
    linked: "Financial Review / Future QuickBooks Integration Center",
  },
];

const boardRoster = [
  ["President", "Board President", "Full governance access"],
  ["Vice President", "Vice President", "Approval and review access"],
  ["Treasurer", "Treasurer", "Financial and budget access"],
  ["Secretary", "Secretary", "Records and meeting access"],
  ["Director", "Director At Large", "Board voting access"],
];

const documents = [
  "Declaration of Condominium",
  "Articles of Incorporation",
  "Bylaws",
  "Rules & Regulations",
  "Collection Policy",
  "Architectural Guidelines",
  "Insurance Certificates",
  "Current Budget",
];

export default function BoardAssociationProfile() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide">
            Stoutt Board Portal
          </Link>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Portal</Link>
            <Link href="/board/violation-review">Violations</Link>
            <Link href="/board/architectural-approvals">ARC Approvals</Link>
            <Link href="/board/maintenance-review">Maintenance</Link>
            <Link href="/board/financial-review">Financials</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Association Command Profile
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Association Profile Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A centralized profile for association identity, property details,
            board roster, manager assignment, fiscal year, insurance summary,
            budget status, reserve status, governing documents, QuickBooks
            connection status, and portal setup progress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every board needs one trusted place for the association’s core
              information. This profile becomes the foundation that connects the
              portal, documents, financials, compliance dates, and future
              QuickBooks integration.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">One Source of Truth</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Legal name, unit count, property type, fiscal year, manager
              assignment, board roles, documents, and operating summaries all
              live in one profile view.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Integration Ready</h2>
            <p className="mt-4 leading-7 text-slate-300">
              This page prepares the system for QuickBooks now and the
              proprietary Stoutt platform later by organizing the association’s
              core setup data before deeper integrations begin.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Portal Setup", "86%"],
            ["Board Seats", "5"],
            ["Units", "148"],
            ["Linked Records", "312"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Association Details
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Core identity and operating information for the association.
                  </p>
                </div>

                <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                  Edit Profile
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {profileItems.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                  >
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 font-semibold text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-2xl font-semibold">Operating Summaries</h2>
              <p className="mt-2 text-sm text-slate-400">
                Key association summaries linked to the related board workflows.
              </p>

              <div className="mt-6 space-y-5">
                {summaries.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                          {item.linked}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          {item.title}
                        </h3>
                      </div>

                      <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Board Roster</h2>
              <div className="mt-5 space-y-3">
                {boardRoster.map(([role, name, access]) => (
                  <div
                    key={role}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm"
                  >
                    <p className="font-semibold text-slate-200">{role}</p>
                    <p className="mt-1 text-slate-400">{name}</p>
                    <p className="mt-1 text-xs text-amber-200">{access}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Governing Documents</h2>
              <div className="mt-5 grid gap-3">
                {documents.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            The Foundation for a Working Association Portal
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This profile center anchors the entire Board Portal. Once each
            association has its legal details, board roster, documents,
            operating summaries, fiscal year, and integration status in place,
            the portal can begin operating as a real management system — with
            QuickBooks supporting accounting now and the proprietary Stoutt
            platform replacing or expanding it later.
          </p>
        </section>
      </section>
    </main>
  );
}
