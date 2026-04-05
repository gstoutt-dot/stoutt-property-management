export default function PompanoBeachPage() {
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
            Pompano Beach Condo and HOA Property Management
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Stoutt Property Management provides proactive, systems-driven property
            management for condominium and HOA communities in Pompano Beach, Florida.
            We help boards improve communication, protect financial stability, and bring
            stronger operational oversight to coastal communities.
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
            Why Pompano Beach Communities Re-Evaluate Their Management Company
          </h2>

          <div className="grid gap-6 text-gray-400 md:grid-cols-2">
            <p>Inconsistent maintenance follow-through in coastal environments</p>
            <p>Weak communication between management and the board</p>
            <p>Collections issues that impact reserves and cash flow</p>
            <p>Poor visibility into vendors, repairs, and ongoing projects</p>
            <p>Reactive management instead of proactive planning</p>
            <p>Lack of accountability in complex condominium operations</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            A More Disciplined Approach to Property Management in Pompano Beach
          </h2>

          <div className="grid gap-6 text-gray-400 md:grid-cols-2">
            <p>Proactive operational oversight built around consistency</p>
            <p>Strong collections discipline to support association finances</p>
            <p>Hands-on board communication and better reporting</p>
            <p>Systems-driven management enhanced by intelligent technology</p>
            <p>Better follow-through on inspections, maintenance, and vendors</p>
            <p>A structure designed for communities with higher operational demands</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Supporting Coastal Condo and HOA Communities in Pompano Beach
          </h2>

          <p className="max-w-4xl text-gray-400">
            Pompano Beach communities face different pressures than inland neighborhoods.
            Between maintenance exposure, vendor coordination, and long-term financial planning,
            boards need a management company that operates with structure, urgency, and accountability.
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
            Looking for Better Condo or HOA Management in Pompano Beach?
          </h2>

          <p className="mb-6 text-gray-400">
            We help boards improve oversight, strengthen communication, and bring a more
            proactive management structure to coastal communities.
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
