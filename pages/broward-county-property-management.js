export default function BrowardCountyPropertyManagement() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Florida Property Management
            </div>
            <div className="text-2xl font-semibold tracking-tight">
              Stoutt Property Management
            </div>
          </div>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/services" className="transition hover:text-white">Services</a>
            <a href="/founder" className="transition hover:text-white">Founder</a>
            <a href="/coverage" className="transition hover:text-white">Coverage</a>
            <a href="/contact" className="transition hover:text-white">Contact</a>
          </nav>

          <a
            href="/proposal"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* HERO */}
        <section className="mb-24 text-center">
          <div className="mb-4 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
            Broward County
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Broward County Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            Stoutt Property Management provides proactive HOA and condominium
            management services throughout Broward County with a focus on
            stronger communication, better follow-through, financial discipline,
            and long-term community stability.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/coverage"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-cyan-300/50 hover:bg-white/[0.04]"
            >
              Back to Coverage
            </a>
          </div>
        </section>

        {/* CITY GRID */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Featured Broward County Cities
            </div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Explore Our Broward Community Pages
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              [
                "/weston-hoa-condo-property-management",
                "Weston",
                "HOA and condominium management built around responsiveness, operational control, and board communication.",
              ],
              [
                "/miramar-hoa-condo-property-management",
                "Miramar",
                "Proactive property management for communities seeking better structure, stronger follow-through, and improved service.",
              ],
              [
                "/pompano-beach-condo-property-management",
                "Pompano Beach",
                "Focused management support for associations that want stronger oversight, better vendor coordination, and consistency.",
              ],
              [
                "/coconut-creek-hoa-condo-property-management",
                "Coconut Creek",
                "Systems-driven association management with attention to communication, maintenance follow-up, and financial stability.",
              ],
              [
                "/tamarac-hoa-condo-property-management",
                "Tamarac",
                "Management services designed to help boards operate more efficiently and protect the long-term health of the community.",
              ],
              [
                "/coral-springs",
                "Coral Springs",
                "Proactive HOA and condominium management for communities that want stronger operations, better communication, and better financial control.",
              ],
              [
                "/hallandale-beach",
                "Hallandale Beach",
                "High-touch HOA and condo management for communities that expect better follow-up, better systems, and a more proactive management company.",
              ],
            ].map(([href, title, desc]) => (
              <a
                key={href}
                href={href}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-medium">{title}</h3>
                  <span className="text-cyan-300 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <p className="text-sm leading-7 text-slate-400">{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* WHY COMMUNITIES SWITCH */}
        <section className="mb-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Why communities switch
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Boards are looking for more than basic management
            </h2>
            <p className="mb-4 leading-8 text-slate-400">
              Many associations begin looking for a new management company when
              communication weakens, follow-through becomes inconsistent,
              collections slow down, and problems are handled too late instead
              of early. Over time, that affects confidence, operations, and the
              financial health of the community.
            </p>
            <p className="leading-8 text-slate-400">
              Stoutt Property Management is built for associations that want a
              more disciplined, hands-on, and proactive management partner.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-slate-300">
              <li>Proactive communication</li>
              <li>Hands-on leadership</li>
              <li>Operational follow-through</li>
              <li>Stronger collections focus</li>
              <li>Better vendor oversight</li>
              <li>Relationship-driven board support</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-14">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Let’s talk about your Broward County community
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-8 text-slate-400">
              If your association is exploring a change, we can review your
              current structure, identify weak points, and show you what a
              stronger management approach can look like.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Schedule a Consultation
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
