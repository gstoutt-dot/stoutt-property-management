import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function MiamiDadeCountyPropertyManagement() {
  const cities = [
    {
      href: "/aventura-hoa-condo-property-management",
      title: "Aventura",
      desc: "High-rise and luxury condominium management with stronger communication, better oversight, and proactive operational control.",
    },
  ];

  const highlights = [
    "Miami-Dade County service expansion",
    "Focused on HOA and condominium communities",
    "Built for stronger communication and consistency",
    "Designed for proactive operational support",
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
                  Miami-Dade County
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Miami-Dade County Property Management
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                  Stoutt Property Management provides proactive HOA and
                  condominium management for communities throughout Miami-Dade
                  County with a focus on communication, consistency, operational
                  discipline, and long-term stability.
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
                  Miami-Dade focus
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CITY LINKS */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Featured Miami-Dade Community
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Explore Our Miami-Dade Community Page
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                This local page is designed for boards looking for stronger
                communication, better follow-through, and more disciplined
                management support.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-2xl gap-6">
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

        {/* SUPPORT COPY */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Next step
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Let’s talk about your Miami-Dade community.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">
              If your association is evaluating its current management company,
              we can review your current structure and identify where service,
              communication, and follow-through can improve.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/proposal" className={primaryBtn}>
                Request a Proposal
              </a>
              <a href="/proposal" className={secondaryBtn}>
                Schedule a Consultation
              </a>
            </div>
          </div>
        </section>
      </main>

      <StickyMobileCTA />
    </div>
  );
}
