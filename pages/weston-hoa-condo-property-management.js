export default function WestonPage() {
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
            Weston Property Management for HOAs and Condominium Communities
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Stoutt Property Management delivers proactive, systems-driven HOA and condominium
            management in Weston, Florida. We help boards maintain higher standards through
            better communication, stronger oversight, and consistent execution.
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
            Why Weston Communities Re-Evaluate Their Management Company
          </h2>

          <div className="grid gap-6 text-gray-400 md:grid-cols-2">
            <p>Delayed response times and weak follow-through</p>
            <p>Inconsistent inspections and property oversight</p>
            <p>Weak collections discipline affecting association stability</p>
            <p>Communication gaps between management and the board</p>
            <p>Reactive problem-solving instead of proactive planning</p>
            <p>Lack of accountability in high-standard communities</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            A Higher Standard of Property Management in Weston
          </h2>

          <div className="grid gap-6 text-gray-400 md:grid-cols-2">
            <p>Proactive operational oversight built around consistency</p>
            <p>Disciplined collections processes that protect cash flow</p>
            <p>Hands-on board support and better communication</p>
            <p>Systems-driven management enhanced by intelligent technology</p>
            <p>Clear follow-through on inspections, vendors, and maintenance</p>
            <p>A leadership approach built for communities that expect more</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Serving Weston Communities That Expect Precision
          </h2>

          <p className="max-w-4xl text-gray-400">
            Weston communities are known for strong standards, well-maintained properties,
            and boards that expect consistent execution. Our management approach is built to
            support that environment through structure, responsiveness, and accountability.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Explore More Broward County Communities
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

  <a
    href="/broward-county-property-management"
    className="rounded-2xl border border-white/10 p-5 hover:border-white/30 transition"
  >
    Broward County
  </a>

  <a
    href="/miramar-hoa-condo-property-management"
    className="rounded-2xl border border-white/10 p-5 hover:border-white/30 transition"
  >
    Miramar
  </a>

  <a
    href="/pompano-beach-condo-property-management"
    className="rounded-2xl border border-white/10 p-5 hover:border-white/30 transition"
  >
    Pompano Beach
  </a>
  
  </div>
  </section>

        <section className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">
            Looking for Better HOA or Condo Management in Weston?
          </h2>

          <p className="mb-6 text-gray-400">
            We help boards improve communication, strengthen oversight, and bring a more
            proactive structure to community management.
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
