import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function TamaracHoaCondoPropertyManagement() {
  const reasonsForChange = [
    "Delayed responses to board and resident concerns",
    "Inconsistent follow-through on maintenance items",
    "Weak communication and updates",
    "Limited visibility into operations",
    "Collections not moving consistently",
    "Reactive instead of proactive management",
  ];

  const stouttAdvantages = [
    "Proactive and consistent communication",
    "Hands-on operational support",
    "Better organization and accountability",
    "Stronger follow-through",
    "Collections-focused structure",
    "Reliable board support",
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
                  Broward County
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Tamarac HOA & Condo Property Management
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                  Reliable HOA and condominium management for Tamarac communities
                  focused on consistency, communication, and long-term operational
                  stability.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="/proposal" className={primaryBtn}>
                    Request a Proposal
                  </a>
                  <a href="/coverage" className={secondaryBtn}>
                    Back to Coverage
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Tamarac communities
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                  <li className="border-b border-white/10 pb-4">
                    Built for communities that value consistency and communication
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Focused on reliable follow-through and operational support
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Designed for boards seeking better visibility and accountability
                  </li>
                  <li>
                    Structured around proactive management and long-term stability
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
                Why Tamarac communities begin exploring new management
              </h2>
              <p className="mb-4 leading-8 text-white/70">
                Many associations begin looking for a change when communication
                slows, follow-through becomes inconsistent, and issues remain
                unresolved longer than they should.
              </p>
              <p className="leading-8 text-white/70">
                Boards want a management company that is responsive, organized,
                and consistently engaged in the day-to-day operations of the
                community.
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
                Management focused on consistency and long-term stability
              </h2>
              <p className="mb-4 leading-8 text-white/70">
                Stoutt Property Management is built to provide reliable service,
                better organization, and proactive management that supports both
                boards and residents.
              </p>
              <p className="leading-8 text-white/70">
                We focus on improving communication, strengthening operations,
                and helping communities run more smoothly with fewer disruptions.
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
                Let’s review your Tamarac community’s management approach
              </h2>
              <p className="mx-auto mb-8 max-w-2xl leading-8 text-white/75">
                We can help identify where communication, service, and operational
                structure can be improved for better long-term results.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/proposal" className={secondaryBtn}>
                  Schedule a Consultation
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
