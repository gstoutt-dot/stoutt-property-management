import SiteHeader from "../components/SiteHeader";

export default function FloridaBoardEducationRequirements() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Board Resources
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Understanding Florida Board Education Requirements
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/70">
              Florida board education requirements continue to evolve, and many
              associations are still unclear about what applies, what must be
              completed, how training is documented, and how to remain compliant.
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
              <p className="text-lg leading-8 text-white/85">
                Stoutt Property Management helps train boards to stay current,
                informed, and prepared through practical training, compliance
                awareness, and proactive support.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/proposal"
                className="rounded-full bg-yellow-400 px-7 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Request a Proposal
              </a>

              <a
                href="/board-education"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Board Resources
              </a>
            </div>

          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-semibold">
              What Boards Need to Understand
            </h2>

            <ul className="mt-6 space-y-4 text-white/70 leading-7">
              <li>• Initial and continuing education requirements may apply.</li>
              <li>• Training obligations vary depending on the association.</li>
              <li>• Completion records must be maintained properly.</li>
              <li>• Boards should understand deadlines and documentation expectations.</li>
              <li>• Requirements continue to evolve and should be monitored.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-semibold">
              How Stoutt Helps
            </h2>

            <ul className="mt-6 space-y-4 text-white/70 leading-7">
              <li>• Help boards understand what applies.</li>
              <li>• Coordinate education planning and resources.</li>
              <li>• Support compliance awareness and tracking.</li>
              <li>• Help organize records and documentation.</li>
              <li>• Provide proactive alerts so boards stay ahead.</li>
            </ul>
          </div>

        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-10">
          <h2 className="text-3xl font-semibold">
            The Goal Is Not Just Compliance — It Is Better Governance
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/75">
            Education requirements are not simply another obligation.
            They are an opportunity for boards to strengthen governance,
            improve decision-making, and better serve their communities.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-semibold">
            Related Board Resources
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <a
              href="/board-education"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
            >
              <h3 className="text-xl font-semibold">
                Education & Compliance
              </h3>
            </a>

            <a
              href="/board-workshops"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
            >
              <h3 className="text-xl font-semibold">
                Board Workshops
              </h3>
            </a>

            <a
              href="/compliance-alerts"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
            >
              <h3 className="text-xl font-semibold">
                Compliance Alerts
              </h3>
            </a>

          </div>
        </div>
      </section>

    </main>
  );
}
