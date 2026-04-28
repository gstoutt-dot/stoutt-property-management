import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

const PHONE_HREF = "tel:+17546004755";

export default function FloridaBoardEducationRequirements() {
  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition hover:-translate-y-0.5 hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  const premiumCard =
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-5xl">
              <div className="flex flex-col items-start">
                <div className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Board Resources • Florida Education Requirements
                </div>

                <p className="mt-4 text-sm font-medium leading-6 tracking-[0.08em] text-yellow-100/85">
                  Helping boards understand evolving education obligations.
                </p>
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Understanding Florida board education requirements.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
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

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>

                <a href="/board-education" className={secondaryBtn}>
                  View Board Resources
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2">

            <div className={`${premiumCard} p-8`}>
              <h2 className="text-2xl font-semibold text-yellow-300">
                What Boards Need to Understand
              </h2>

              <ul className="mt-6 space-y-4 text-yellow-100/90 leading-7">
                <li>• Initial and continuing education requirements may apply.</li>
                <li>• Training obligations vary depending on the association.</li>
                <li>• Completion records must be maintained properly.</li>
                <li>• Boards should understand deadlines and documentation expectations.</li>
                <li>• Requirements continue to evolve and should be monitored.</li>
              </ul>
            </div>

            <div className={`${premiumCard} p-8`}>
              <h2 className="text-2xl font-semibold text-yellow-300">
                How Stoutt Helps
              </h2>

              <ul className="mt-6 space-y-4 text-yellow-100/90 leading-7">
                <li>• Help boards understand what applies.</li>
                <li>• Coordinate education planning and resources.</li>
                <li>• Support compliance awareness and tracking.</li>
                <li>• Help organize records and documentation.</li>
                <li>• Provide proactive alerts so boards stay ahead.</li>
              </ul>
            </div>

          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8 sm:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Better governance through education
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                The goal is not just compliance — it is better governance.
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/75">
                Education requirements are not simply another obligation.
                They are an opportunity for boards to strengthen governance,
                improve decision-making, and better serve their communities.
              </p>
            </div>
          </div>
        </section>

        {/* Seminar Training & Educational CEUs */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-yellow-400/5 p-8 md:p-10">
            <div className="max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Board Education Program
              </span>

              <h2 className="mt-6 text-3xl font-light text-white md:text-4xl">
                Seminar Training & Educational CEUs
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Stoutt Property Management is developing educational seminars
                and board training workshops designed to help directors
                strengthen their understanding of budgeting, reserves, insurance
                responsibilities, collections, governance, and statutory
                requirements affecting Florida condominium and homeowners
                associations.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-lg font-medium text-white">
                  Upcoming Workshops
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Seminar dates are currently being scheduled.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-lg font-medium text-white">
                  Continuing Education
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Planned workshops supporting continuing education objectives.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-lg font-medium text-white">
                  Custom On-Site Training
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Private educational sessions available upon request.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/proposal"
                className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-105"
              >
                Request Board Training Information
              </a>
            </div>
          </div>
        </section>

        {/* Related Board Resources */}
        <section className="px-6 pb-16">
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

        {/* Why Experience Matters */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Why experience matters
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Leadership built over decades.
              </h2>

              <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
                Licensed CAM leadership dating back to 1992 brings perspective
                that cannot be improvised.
              </p>
            </div>
          </div>
        </section>

        {/* Join The Winning Team */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className={`${premiumCard} p-8 text-center sm:p-10 lg:p-14`}>
            <div className="mx-auto max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Join the winning team
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                If your board is ready for stronger support, let’s talk.
              </h2>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>

                <a href={PHONE_HREF} className={secondaryBtn}>
                  Call Now
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      <StickyMobileCTA />
    </div>
  );
}
