export default function PalmBeachCountyPropertyManagement() {
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
            Palm Beach County
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Palm Beach County Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            Stoutt Property Management supports HOA and condominium communities
            across Palm Beach County with proactive service, stronger communication,
            operational consistency, and disciplined follow-through.
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
              Featured Palm Beach Communities
            </div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Explore Our Palm Beach County Community Pages
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="/boca-raton-hoa-condo-property-management"
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium">Boca Raton</h3>
                <span className="text-cyan-300 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="text-sm leading-7 text-slate-400">
                Property management for communities expecting a higher level of
                communication, discipline, and operational execution.
              </p>
            </a>

            <a
              href="/delray-beach-hoa-condo-property-management"
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium">Delray Beach</h3>
                <span className="text-cyan-300 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="text-sm leading-7 text-slate-400">
                Proactive management support with stronger vendor coordination,
                better follow-through, and improved day-to-day consistency.
              </p>
            </a>

            <a
              href="/west-palm-beach-hoa-condo-property-management"
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium">West Palm Beach</h3>
                <span className="text-cyan-300 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="text-sm leading-7 text-slate-400">
                Responsive HOA and condominium management with better structure,
                stronger communication, and long-term stability.
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
              Let’s talk about your Palm Beach County community
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-8 text-slate-400">
              If your association is exploring a change, we can help you review
              your current management approach and identify where communication,
              operations, and support can be improved.
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
