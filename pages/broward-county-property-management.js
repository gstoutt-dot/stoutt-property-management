import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function BrowardCountyPropertyManagement() {
  const cities = [
    {
      href: "/weston-hoa-condo-property-management",
      title: "Weston",
      desc: "HOA and condominium management built around responsiveness, operational control, and board communication.",
    },
    {
      href: "/miramar-hoa-condo-property-management",
      title: "Miramar",
      desc: "Proactive property management for communities seeking better structure, stronger follow-through, and improved service.",
    },
    {
      href: "/pompano-beach-condo-property-management",
      title: "Pompano Beach",
      desc: "Focused management support for associations that want stronger oversight, better vendor coordination, and consistency.",
    },
    {
      href: "/coconut-creek-hoa-condo-property-management",
      title: "Coconut Creek",
      desc: "Systems-driven association management with attention to communication, maintenance follow-up, and financial stability.",
    },
    {
      href: "/tamarac-hoa-condo-property-management",
      title: "Tamarac",
      desc: "Management services designed to help boards operate more efficiently and protect the long-term health of the community.",
    },
    {
      href: "/coral-springs",
      title: "Coral Springs",
      desc: "Proactive HOA and condominium management for communities that want stronger operations, better communication, and better financial control.",
    },
    {
      href: "/hallandale-beach",
      title: "Hallandale Beach",
      desc: "High-touch HOA and condo management for communities that expect better follow-up, better systems, and a more proactive management company.",
    },
  ];

  const strengths = [
    "Proactive communication",
    "Hands-on leadership",
    "Operational follow-through",
    "Stronger collections focus",
    "Better vendor oversight",
    "Relationship-driven board support",
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
                  Broward County Property Management
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                  Stoutt Property Management provides proactive HOA and
                  condominium management services throughout Broward County with
                  a focus on stronger communication, better follow-through,
                  financial discipline, and long-term community stability.
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
                  Broward County focus
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                  <li className="border-b border-white/10 pb-4">
                    Primary service concentration for Stoutt Property Management
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Ideal for condominium and HOA boards seeking stronger response
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Built around proactive oversight and systems-driven service
                  </li>
                  <li>
                    Supported by city-level pages for deeper local coverage
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CITY GRID */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Featured Broward County Cities
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Explore Our Broward Community Pages
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Each city page is designed to connect with associations looking
                for a more responsive, disciplined, and proactive management
                partner.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cities.map((city) => (
                <a
                  key={city.href}
                  href={city.href}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white transition group-hover:text-yellow-200">
                      {city.title}
                    </h3>
                    <span className="text-yellow-300 transition duration-300 group-hover:translate-x-1 group-hover:text-yellow-200">
                      →
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-white/70 transition group-hover:text-yellow-100/90">
                    {city.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHY COMMUNITIES SWITCH */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Why communities switch
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
                Boards are looking for more than basic management.
              </h2>
              <p className="mb-4 leading-8 text-white/70">
                Many associations begin looking for a new management company
                when communication weakens, follow-through becomes
                inconsistent, collections slow down, and problems are handled
                too late instead of early.
              </p>
              <p className="leading-8 text-white/70">
                Over time, that affects confidence, operations, and the
                financial health of the community. Stoutt Property Management
                is built for associations that want a more disciplined,
                hands-on, and proactive management partner.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <h3 className="mb-5 text-xl font-semibold text-white">
                What Stoutt brings
              </h3>
              <div className="grid gap-4">
                {strengths.map((item) => (
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

        {/* CTA */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-10 text-center md:p-14">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Next step
              </div>
              <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
                Let’s talk about your Broward County community.
              </h2>
              <p className="mx-auto mb-8 max-w-2xl leading-8 text-white/75">
                If your association is exploring a change, we can review your
                current structure, identify weak points, and show you what a
                stronger management approach can look like.
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
