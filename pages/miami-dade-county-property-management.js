export default function MiamiDadeCountyPropertyManagement() {
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
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* HERO */}
        <section className="mb-20 text-center">
          <div className="mb-4 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
            Miami-Dade County
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Miami-Dade County Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            Stoutt Property Management provides proactive HOA and condominium
            management for communities throughout Miami-Dade County with a focus
            on communication, consistency, operational discipline, and long-term stability.
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

        {/* CITY LINKS */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Featured Miami-Dade Community
            </div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Explore Our Miami-Dade Community Page
            </h2>
          </div>

          <div className="mx-auto grid max-w-2xl gap-6">
            <a
              href="/aventura-hoa-condo-property-management"
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium">Aventura</h3>
                <span className="text-cyan-300 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="text-sm leading-7 text-slate-400">
                High-rise and luxury condominium management with stronger
                communication, better oversight, and proactive operational control.
              </p>
            </a>
          </div>
        </section>

        {/* SUPPORT COPY */}
        <section className="text-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-14">
            <div className="mb-3 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Let’s talk about your Miami-Dade community
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-8 text-slate-400">
              If your association is evaluating its current management company,
              we can review your current structure and identify where service,
              communication, and follow-through can improve.
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
