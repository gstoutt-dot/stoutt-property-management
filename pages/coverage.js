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
<main className="px-6 py-20 max-w-6xl mx-auto">
      {/* HERO */}
      <section className="mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Property Management Coverage Across South Florida
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Stoutt Property Management serves condominium and HOA communities across
          Broward, Miami-Dade, and Palm Beach Counties with a proactive,
          systems-driven approach focused on consistency, communication, and
          financial stability.
        </p>
      </section>

      {/* COUNTIES */}
      <section className="grid md:grid-cols-3 gap-10 mb-24">

        {/* Broward */}
        <div className="border border-white/10 p-8 rounded-2xl hover:border-white/30 transition">
          <h2 className="text-xl font-medium mb-4">Broward County</h2>
          <p className="text-gray-400 mb-6">
            Serving communities across Broward County with proactive management,
            strong collections, and consistent board support.
          </p>
          <a href="/broward-county-property-management" className="underline">
            Explore Broward County →
          </a>
        </div>

        {/* Miami-Dade */}
        <div className="border border-white/10 p-8 rounded-2xl opacity-70">
          <h2 className="text-xl font-medium mb-4">Miami-Dade County</h2>
          <p className="text-gray-400 mb-6">
            Structured, responsive management for communities requiring visibility,
            organization, and execution.
          </p>
          <span className="text-gray-500">Coming Soon</span>
        </div>

        {/* Palm Beach */}
        <div className="border border-white/10 p-8 rounded-2xl opacity-70">
          <h2 className="text-xl font-medium mb-4">Palm Beach County</h2>
          <p className="text-gray-400 mb-6">
            Supporting associations with consistent oversight, financial stability,
            and proactive planning.
          </p>
          <span className="text-gray-500">Coming Soon</span>
        </div>

      </section>

      {/* BROWARD CITIES */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Featured Broward Communities
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <a href="/weston-hoa-condo-property-management" className="border p-6 rounded-xl hover:border-white/30 transition">
            Weston
          </a>

          <a href="/miramar-hoa-condo-property-management" className="border p-6 rounded-xl hover:border-white/30 transition">
            Miramar
          </a>

          <a href="/pompano-beach-condo-property-management" className="border p-6 rounded-xl hover:border-white/30 transition">
            Pompano Beach
          </a>

          <a href="/coconut-creek-hoa-condo-property-management" className="border p-6 rounded-xl hover:border-white/30 transition">
            Coconut Creek
          </a>

          <a href="/tamarac-hoa-condo-property-management" className="border p-6 rounded-xl hover:border-white/30 transition">
            Tamarac
          </a>

        </div>
      </section>

      {/* WHY LOCATION MATTERS */}
      <section className="mb-24 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
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
        <h2 className="text-3xl font-semibold mb-6">
          Not Sure Where to Start?
        </h2>
        <p className="text-gray-400 mb-8">
          If your community is evaluating its current management, we can help
          guide you through the process and provide a clear, structured path forward.
        </p>

        <a
          href="/contact"
          className="inline-block rounded-full border border-white/20 px-8 py-3 hover:border-white/40 transition"
        >
          Request a Proposal
        </a>
      </section>

   </main>
</div>
);
}
