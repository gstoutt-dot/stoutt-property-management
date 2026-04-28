import Link from "next/link";

export default function HomeownerDocuments() {
  const documents = [
    {
      title: "Declaration of Covenants",
      type: "Governing Document",
      date: "Updated Apr 2026",
      status: "Available",
    },
    {
      title: "Rules & Regulations",
      type: "Governing Document",
      date: "Updated Mar 2026",
      status: "Available",
    },
    {
      title: "2026 Approved Budget",
      type: "Financial Document",
      date: "Posted Jan 2026",
      status: "Available",
    },
    {
      title: "ARC Application Form",
      type: "Forms & Applications",
      date: "Updated Apr 2026",
      status: "Available",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Documents Center
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Access governing documents, meeting records, financial files,
                forms, applications, and association notices.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Governing Docs", "8"],
            ["Meeting Records", "14"],
            ["Financial Files", "6"],
            ["Forms", "11"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 text-4xl font-bold text-yellow-400">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-yellow-400">
              Association Library
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Available Documents</h2>
          </div>

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
              placeholder="Search documents, forms, policies, or meeting records..."
            />
          </div>

          <div className="space-y-5">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{doc.type}</p>
                    <h3 className="mt-2 text-xl font-semibold">{doc.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{doc.date}</p>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {doc.status}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
                    View Document
                  </button>

                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                    Download
                  </button>

                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                    Ask Ava
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Document Categories
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Declaration & Bylaws",
                "Rules & Regulations",
                "Meeting Minutes",
                "Budgets & Financials",
                "Insurance Documents",
                "Forms & Applications",
                "Notices & Announcements",
              ].map((category) => (
                <button
                  key={category}
                  className="block w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ask Ava About Documents
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Need help understanding a rule?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can help explain governing document language, locate relevant
              sections, summarize policies, and guide homeowners to the right
              form or process.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Recent Uploads
            </p>

            <div className="mt-5 space-y-4">
              {[
                "April Board Meeting Minutes",
                "Updated Pool Rules Notice",
                "2026 Insurance Certificate",
                "ARC Paint Color Chart",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
