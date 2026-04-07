export default function Coverage() {
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
            <a href="/coverage" className="text-white">Coverage</a>
            <a href="/contact" className="transition hover:text-white">Contact</a>
          </nav>

          <a
            href="/contact"
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
            South Florida Service Area
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Property Management Coverage Across South Florida
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            Stoutt Property Management serves condominium and HOA communities across
            Broward, Miami-Dade, and Palm Beach Counties with a proactive,
            systems-driven approach focused on consistency, communication,
            and financial stability.
          </p>
        </section>

        {/* COUNTIES */}
        <section className="mb-24 grid gap-8 md:grid-cols-3">
          <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05]">
            <h2 className="mb-4 text-xl font-medium">Broward County</h2>
            <p className="mb-6 leading-7 text-slate-400">
              Serving communities across Broward County with proactive management,
              strong collections, and consistent board support.
            </p>
            <a
              href="/broward-county-property-management"
              className="inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200"
            >
              Explore Broward County →
            </a>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05]">
  <h2 className="mb-4 text-xl font-medium">Miami-Dade County</h2>
  <p className="mb-6 leading-7 text-slate-400">
    Structured, responsive management for communities requiring visibility,
    organization, and execution.
  </p>
  <a
    href="/miami-dade-county-property-management"
    className="inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200"
  >
    Explore Miami-Dade County →
  </a>
</div>

          <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05]">
  <h2 className="mb-4 text-xl font-medium">Palm Beach County</h2>
  <p className="mb-6 leading-7 text-slate-400">
    Supporting associations with consistent oversight, financial stability,
    and proactive planning.
  </p>
  <a
    href="/palm-beach-county-property-management"
    className="inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200"
  >
    Explore Palm Beach County →
  </a>
</div>
        </section>

        {/* BROWARD CITIES */}
        <section className="mb-24">
          <div className="mb-10 text-center">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Featured Broward Communities
            </div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Where We’re Building Stronger Communities
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["/weston-hoa-condo-property-management", "Weston"],
              ["/miramar-hoa-condo-property-management", "Miramar"],
              ["/pompano-beach-condo-property-management", "Pompano Beach"],
              ["/coconut-creek-hoa-condo-property-management", "Coconut Creek"],
              ["/tamarac-hoa-condo-property-management", "Tamarac"],
              ["/coral-springs", "Coral Springs"],
              ["/hallandale-beach", "Hallandale Beach"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-medium">{label}</span>
                  <span className="text-cyan-300 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* WHY LOCATION MATTERS */}
        <section className="mx-auto mb-24 max-w-3xl text-center">
          <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
            Why location matters
          </div>
          <h2 className="mb-6 text-3xl font-semibold">
            Different communities need different management strengths
          </h2>
          <p className="leading-8 text-slate-400">
            A coastal condominium in Pompano Beach has different needs than a
            townhome community in Miramar. A high-standard HOA in Weston operates
            differently from an established community in Tamarac.
            <br /><br />
            Stoutt Property Management adjusts its approach based on the
            community, property type, and local operating conditions to ensure
            consistent execution and long-term stability.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-14">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
              Not Sure Where to Start?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-8 text-slate-400">
              If your community is evaluating its current management, we can help
              guide you through the process and provide a clear, structured path forward.
            </p>

            <a
              href="/contact"
              className="inline-block rounded-full border border-white/20 px-8 py-3 font-semibold transition hover:border-cyan-300/50 hover:bg-white/[0.04]"
            >
              Request a Proposal
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
