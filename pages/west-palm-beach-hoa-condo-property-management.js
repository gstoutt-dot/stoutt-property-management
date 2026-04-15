import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function WestPalmBeachHoaCondoPropertyManagement() {
  const reasonsForChange = [
    "Slow communication and follow-up",
    "Weak oversight of operations",
    "Reactive instead of proactive management",
    "Too little board support",
    "Inconsistent vendor coordination",
    "Lack of accountability",
  ];

  const stouttAdvantages = [
    "Proactive communication",
    "Better operational structure",
    "Hands-on oversight",
    "More consistent follow-through",
    "Stronger support for boards",
    "Long-term community-minded service",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Palm Beach County
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  West Palm Beach HOA & Condo Property Management
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                  West Palm Beach communities require responsive, structured
                  management. Stoutt Property Management provides proactive
                  communication, stronger oversight, and more consistent
                  execution.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="/proposal" className={primaryBtn}>
                    Request a Proposal
                  </a>
                  <a
                    href="/palm-beach-county-property-management"
                    className={secondaryBtn}
                  >
                    Back to Palm Beach County
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  West Palm Beach communities
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                  <li className="border-b border-white/10 pb-4">
                    Built for communities that expect responsiveness
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Focused on structure, consistency, and oversight
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Designed for stronger board support and visibility
                  </li>
                  <li>
                    Structured around proactive communication and accountability
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Why communities switch
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
                Why West Palm Beach communities begin looking for better management
              </h2>
              <p className="mb-4 leading-8 text-white/70">
                Associations often start exploring change when communication is
                inconsistent, issues remain open too long, and the board does
                not feel fully supported.
              </p>
              <p className="leading-8 text-white/70">
                Communities want a management company that brings structure,
                responsiveness, and stronger day-to-day operational control.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="mb-5 text-xl font-semibold text-white">
                Common reasons for change
              </h3>
              <div className="grid gap-4">
                {reasonsForChange.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.07] hover:text-yellow-200 hover:shadow-[0_0_26px_rgba(250,204,21,0.10)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="mb-5 text-xl font-semibold text-white">
                What Stoutt brings
              </h3>
              <div className="grid gap-4">
                {stouttAdvantages.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.07] hover:text-yellow-200 hover:shadow-[0_0_26px_rgba(250,204,21,0.10)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Our approach
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
                Property management built on structure and stability
              </h2>
              <p className="mb-4 leading-8 text-white/70">
                Stoutt Property Management works to improve communication,
                strengthen daily operations, and provide the consistent support
                boards need.
              </p>
              <p className="leading-8 text-white/70">
                Our goal is to create a more stable and responsive management
                experience for West Palm Beach communities.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-10 text-center">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Next step
              </div>
              <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
                Let’s look at how your West Palm Beach community is being managed today
              </h2>
              <p className="mx-auto mb-8 max-w-2xl leading-8 text-white/75">
                We can review your current structure and identify where
                communication, service, and operational support can improve.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="tel:+17546004755" className={secondaryBtn}>
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
