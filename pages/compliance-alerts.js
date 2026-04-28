import SiteHeader from "../components/SiteHeader";

export default function ComplianceAlertsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Board Education
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Compliance Alerts That Help Boards Stay Ahead
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/70">
              Associations need proactive guidance, not last-minute surprises.
              Stoutt Property Management helps boards stay aware of important
              compliance matters, deadlines, records issues, and operational risks.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/proposal"
                className="rounded-full bg-yellow-400 px-7 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Request a Proposal
              </a>

              <a
                href="/board-workshops"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Board Workshops
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Proactive Awareness",
              text: "Helping boards stay informed before small issues become urgent compliance problems.",
            },
            {
              title: "Records & Documentation",
              text: "Support for organized records, meeting documentation, notices, and owner communication standards.",
            },
            {
              title: "Operational Risk Reduction",
              text: "Identifying issues that could expose the association to unnecessary complaints, confusion, or liability.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 leading-7 text-white/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-10">
          <h2 className="text-3xl font-semibold">A More Proactive Management Standard</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Compliance support is part of a larger management philosophy:
            respond quickly, document clearly, communicate proactively, and help
            boards make informed decisions before problems escalate.
          </p>
        </div>
      </section>
    </main>
  );
}
