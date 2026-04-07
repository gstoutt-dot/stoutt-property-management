export default function CoralSprings() {
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
            href="/proposal"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* HERO */}
        <section className="mb-20 text-center">
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-300">
            Broward County
          </div>
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            Coral Springs Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Proactive HOA and condominium management for communities that want
            stronger operations, better communication, and better financial control.
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
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-white/40"
            >
              Back to Coverage
            </a>
          </div>
        </section>

        {/* SECTION 1 */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Why communities switch
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Why associations in Coral Springs start looking for new management
            </h2>
            <p className="mb-4 text-gray-400">
              Many boards are not looking for change just to make change. They start
              looking because too many important things begin slipping at the same time.
              Communication slows down. Follow-up becomes inconsistent. Collections lose
              momentum. Small issues stay unresolved too long and eventually become larger,
              more expensive problems.
            </p>
            <p className="text-gray-400">
              When that starts happening, boards want a company that is present,
              organized, accountable, and proactive.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Slow response times to boards and residents</li>
              <li>Missed property follow-up and inspection issues</li>
              <li>Weak collections consistency</li>
              <li>Poor vendor coordination</li>
              <li>High turnover at larger management companies</li>
              <li>Lack of real board relationship-building</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Hands-on leadership</li>
              <li>Proactive communication</li>
              <li>Operational follow-through</li>
              <li>Stronger collections focus</li>
              <li>Systems-driven organization</li>
              <li>A relationship-first management style</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              A more disciplined and proactive model for Coral Springs communities
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management is built around experience, intelligent systems,
              and proactive execution. We believe communities perform better when the board
              has responsive support, clear communication, operational consistency, and a
              management company that sees issues early instead of reacting late.
            </p>
            <p className="text-gray-400">
              Our goal is simple: help your association operate more smoothly, protect the
              property, improve responsiveness, and strengthen financial stability.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 p-10">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold">
              Let’s review how your community is being managed now
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can evaluate your current structure, identify weak points, and show you
              what a stronger management approach can look like.
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
