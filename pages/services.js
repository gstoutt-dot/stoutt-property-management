import SiteHeader from "../components/SiteHeader"; 
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function ServicesPage() {
  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-400">
                Services
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Property management services built for Florida condominium and HOA communities.
              </h1>

              <p className="mt-6 text-lg leading-8 text-white/70">
                Stoutt Property Management combines experience, proactive leadership,
                stronger systems, and responsive service to help boards operate more
                effectively and with greater confidence.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/proposal" className={secondaryBtn}>
                  Schedule a Conversation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="pb-16 pt-8 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Community Association Management
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Hands-on leadership for condominium and HOA boards including site
                  presence, vendor coordination, communication, and operational follow-through.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Financial Oversight
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Budget support, reporting, collections coordination, financial controls,
                  and board-ready transparency that protects long-term community health.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Vendor & Maintenance Coordination
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Proactive maintenance tracking, vendor oversight, and follow-up systems
                  that ensure issues are handled quickly and correctly.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Board Support & Governance
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Meeting coordination, compliance guidance, and structured processes
                  that support effective board decision-making.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Collections Coordination
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Strong, consistent follow-up systems designed to improve collections
                  without adding additional cost to the association.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Communication & Responsiveness
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Clear, consistent communication with board members and residents,
                  supported by systems that ensure nothing falls through the cracks.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Next step
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Let’s talk about what your community needs most.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75">
                  If your board is evaluating management support, we would welcome the
                  opportunity to learn about your property, your priorities, and where
                  better systems and stronger leadership can help.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/proposal" className={secondaryBtn}>
                  Schedule a Conversation
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
