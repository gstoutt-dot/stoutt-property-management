import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";
export default function ServicesPage() {
  const services = [
    {
      title: "Community Association Management",
      description:
        "Hands-on management for condominium and HOA boards with proactive oversight, operational follow-through, vendor coordination, and leadership that stays engaged.",
    },
    {
      title: "Financial Oversight",
      description:
        "Budget support, reporting coordination, financial visibility, and disciplined processes that help boards protect the long-term financial health of the association.",
    },
    {
      title: "Maintenance & Vendor Coordination",
      description:
        "Smarter issue tracking, faster maintenance coordination, and accountable vendor follow-up so important items do not sit unresolved.",
    },
    {
      title: "Board & Resident Communication",
      description:
        "Clear communication systems that improve response times, reduce frustration, and keep boards and residents better informed.",
    },
    {
      title: "Inspections & Site Presence",
      description:
        "Consistent site awareness and proactive attention to property conditions, operations, and issues before they become larger problems.",
    },
    {
      title: "Collections Coordination",
      description:
        "Stronger collections support and more disciplined follow-up designed to help improve cash flow and financial stability for the community.",
    },
  ];

  const supportPoints = [
    "Proactive, systems-driven management",
    "Hands-on board relationships",
    "Operational accountability and follow-through",
    "Smarter communication and response handling",
    "Florida condominium and HOA focus",
    "Leadership built on experience and stewardship",
  ];

  const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_38%),linear-gradient(180deg,#020617_0%,#020617_48%,#08111f_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-400">
  Services
</div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Property management services built for Florida condominium and HOA communities.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                Stoutt Property Management combines experience, proactive leadership,
                stronger systems, and responsive service to help boards operate more
                effectively and with greater confidence.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/coverage" className={secondaryBtn}>
                  View Coverage
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {supportPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/75"
              >
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Core service areas
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Disciplined support where boards need it most.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">
              Our service model is designed to reduce friction, strengthen operations,
              improve visibility, and create a more responsive management experience for
              both boards and residents.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Why this matters
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Boards need more than basic administration.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Effective association management requires leadership, operational
                discipline, communication, follow-through, and systems that help issues
                get addressed before they damage trust or performance.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Faster response handling and clearer communication",
                "Stronger operational follow-through",
                "Better vendor coordination and maintenance visibility",
                "Improved support for financial discipline and collections",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
  Next step
</div> 
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
