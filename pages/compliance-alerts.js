import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

const PHONE_HREF = "tel:+17546004755";

export default function ComplianceAlertsPage() {
  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition hover:-translate-y-0.5 hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  const premiumCard =
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl";

  const alertCards = [
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
  ];

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
                  Board Resources • Compliance Alerts • Risk Awareness
                </div>

                <p className="mt-4 text-sm font-medium leading-6 tracking-[0.08em] text-yellow-100/85">
                  Helping boards stay ahead of important requirements.
                </p>
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Compliance alerts that help boards stay ahead.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Associations need proactive guidance, not last-minute surprises.
                Stoutt Property Management helps boards stay aware of important
                compliance matters, deadlines, records issues, and operational
                risks.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-white/85">
                  Florida Board Education Requirements continue to evolve.
                  Stoutt Property Management helps train boards to stay current,
                  informed, and prepared through practical training, compliance
                  awareness, and proactive support.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/board-workshops" className={secondaryBtn}>
                  View Board Workshops
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {alertCards.map((item) => (
              <div key={item.title} className={`${premiumCard} p-8`}>
                <h2 className="text-xl font-semibold text-yellow-300">
                  {item.title}
                </h2>
                <p className="mt-4 leading-7 text-yellow-100/90">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8 sm:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                A more proactive management standard
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Compliance support should be proactive, documented, and clear.
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/75">
                Compliance support is part of a larger management philosophy:
                respond quickly, document clearly, communicate proactively, and
                help boards make informed decisions before problems escalate.
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
                  Seminar dates are currently being scheduled. Future sessions
                  and registration opportunities will be posted here.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-lg font-medium text-white">
                  Continuing Education
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Workshops are planned to support continuing education
                  objectives for board members seeking practical governance and
                  operational training.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-lg font-medium text-white">
                  Custom On-Site Training
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Private educational sessions for individual boards and
                  communities will also be available upon request.
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
                <p className="mt-3 text-white/65">
                  Guidance for board responsibilities, governance awareness, and
                  compliance expectations.
                </p>
              </a>

              <a
                href="/board-workshops"
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
              >
                <h3 className="text-xl font-semibold">Board Workshops</h3>
                <p className="mt-3 text-white/65">
                  Practical workshops designed to help board members lead with
                  confidence.
                </p>
              </a>

              <a
                href="/compliance-alerts"
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
              >
                <h3 className="text-xl font-semibold">Compliance Alerts</h3>
                <p className="mt-3 text-white/65">
                  Proactive updates and reminders to help boards stay ahead of
                  important requirements.
                </p>
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
                that cannot be improvised. That experience helps boards navigate
                operations, communication, vendor issues, budgeting, projects,
                and community expectations with greater confidence.
              </p>
              <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                For boards looking for stability, professionalism, and a
                management partner that understands the responsibility of
                association leadership, experience matters.
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
              <p className="mt-5 text-base leading-8 text-yellow-100/90">
                Stoutt Property Management is built for boards that want
                experienced leadership, proactive systems, and a management
                partner committed to helping communities operate better.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/proposal" className={primaryBtn}>
                Request a Proposal
              </a>
              <a href={PHONE_HREF} className={secondaryBtn}>
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <StickyMobileCTA />
    </div>
  );
}
