export default function Coverage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              Florida Property Management
            </div>
            <div className="text-2xl font-semibold tracking-tight">
              Stoutt Property Management
            </div>
          </div>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/services" className="hover:text-white">Services</a>
            <a href="/founder" className="hover:text-white">Founder</a>
            <a href="/coverage" className="hover:text-white">Coverage</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </nav>

          <a
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* HERO */}
        <section className="mb-20 text-center">
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            Property Management Coverage Across South Florida
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Stoutt Property Management serves condominium and HOA communities across
            Broward, Miami-Dade, and Palm Beach Counties with a proactive,
            systems-driven approach focused on consistency, communication, and
            financial stability.
          </p>
        </section>

        {/* COUNTIES */}
        <section className="mb-24 grid gap-10 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 p-8 transition hover:border-white/30">
            <h2 className="mb-4 text-xl font-medium">Broward County</h2>
            <p className="mb-6 text-gray-400">
              Serving communities across Broward County with proactive management,
              strong collections, and consistent board support.
            </p>
            <a href="/broward-county-property-management" className="underline">
              Explore Broward County →
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 p-8 opacity-70">
            <h2 className="mb-4 text-xl font-medium">Miami-Dade County</h2>
            <p className="mb-6 text-gray-400">
              Structured, responsive management for communities requiring visibility,
              organization, and execution.
            </p>
            <span className="text-gray-500">Coming Soon</span>
          </div>

          <div className="rounded-2xl border border-white/10 p-8 opacity-70">
            <h2 className="mb-4 text-xl font-medium">Palm Beach County</h2>
            <p className="mb-6 text-gray-400">
              Supporting associations with consistent oversight, financial stability,
              and proactive planning.
            </p>
            <span className="text-gray-500">Coming Soon</span>
          </div>
        </section>

        {/* BROWARD CITIES */}
        <section className="mb-24">
          <h2 className="mb-10 text-center text-2xl font-semibold">
            Featured Broward Communities
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <a
              href="/weston-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Weston
            </a>

            <a
              href="/miramar-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Miramar
            </a>

            <a
              href="/pompano-beach-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Pompano Beach
            </a>

            <a
              href="/coconut-creek-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Coconut Creek
            </a>

            <a
              href="/tamarac-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Tamarac
            </a>

            <a
              href="/coral-springs"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Coral Springs
            </a>

            <a
              href="/hallandale-beach"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              Hallandale Beach
            </a>
          </div>
        </section>

        {/* WHY LOCATION MATTERS */}
        <section className="mx-auto mb-24 max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-semibold">
            Why Location Matters in Property Management
          </h2>
          <p className="text-gray-400">
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
          <h2 className="mb-6 text-3xl font-semibold">
            Not Sure Where to Start?
          </h2>
          <p className="mb-8 text-gray-400">
            If your community is evaluating its current management, we can help
            guide you through the process and provide a clear, structured path forward.
          </p>

          <a
            href="/contact"
            className="inline-block rounded-full border border-white/20 px-8 py-3 transition hover:border-white/40"
          >
            Request a Proposal
          </a>
        </section>
      </main>
    </div>
  );
}
