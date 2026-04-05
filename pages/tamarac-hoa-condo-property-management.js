export default function TamaracPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
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
        <section className="mb-20 text-center">
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            Tamarac Property Management for HOAs and Condominium Communities
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Stoutt Property Management provides proactive, systems-driven HOA and
            condominium management in Tamarac, Florida. We help associations improve
            communication, strengthen financial stability, and bring greater consistency
            to day-to-day operations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
            >
              Request a Proposal
            </a>

            <a
              href="/broward-county-property-management"
              className="rounded-full border border-white/20 px-6 py-3"
            >
              View Broward County
            </a>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Why Tamarac Communities Re-Evaluate Their Management Company
          </h2>

          <div className="grid gap-6 text-gray-400 md:grid-cols-2">
            <p>Slow response times and inconsistent follow-through</p>
            <p>Weak inspections and poor operational oversight</p>
            <p>Collections issues affecting association stability</p>
            <p>Poor communication between management and the board</p>
            <p>Reactive problem-solving instead of proactive planning</p>
            <p>Lack of accountability in everyday operations</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            A More Disciplined Approach to Property Management in Tamarac
          </h2>

          <div className="grid gap-6 text-gray-400 md:grid-cols-2">
            <p>Proactive oversight built to reduce operational breakdowns</p>
            <p>Disciplined collections processes that support financial health</p>
            <p>Hands-on communication and board support</p>
            <p>Systems-driven management enhanced by intelligent technology</p>
            <p>Better follow-through on maintenance, vendors, and inspections</p>
            <p>A structure built for communities that value reliability and control</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Supporting Tamarac Communities with Greater Stability
          </h2>

          <p className="max-w-4xl text-gray-400">
            Tamarac communities benefit from management that is organized, responsive,
            and financially disciplined. Our approach helps boards improve communication,
            maintain standards, and create a more stable operating environment for residents.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Explore More Broward County Communities
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="/broward-county-property-management"
              className="rounded-2xl border border-white/10 p-5 hover:border-white/30"
            >
              Broward County
            </a>

            <a
              href="/weston-hoa-condo-property-management"
              className="rounded-2xl border border-white/10 p-5 hover:border-white/30"
            >
              Weston
            </a>

            <a
              href="/miramar-hoa-condo-property-management"
              className="rounded-2xl border border-white/10 p-5 hover:border-white/30"
            >
              Miramar
            </a>
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">
            Looking for Better HOA or Condo Management in Tamarac?
          </h2>

          <p className="mb-6 text-gray-400">
            We help boards improve communication, strengthen oversight, and bring
            a more proactive management structure to community operations.
          </p>

          <a
            href="/contact"
            className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900"
          >
            Request a Proposal
          </a>
        </section>
      </main>
    </div>
  );
}
