export default function HallandaleBeach() {
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
            Hallandale Beach Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            High-touch HOA and condo management for communities that expect better
            follow-up, better systems, and a more proactive management company.
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
              Why boards in Hallandale Beach start exploring new management
            </h2>
            <p className="mb-4 text-gray-400">
              Boards usually begin looking for a new management company after repeated
              frustration. Communication becomes inconsistent. Issues stay open too long.
              Vendor oversight weakens. Financial follow-through is not strong enough.
              Residents feel it. Board members feel it. Confidence starts to drop.
            </p>
            <p className="text-gray-400">
              At that point, communities want more than basic administration. They want
              leadership, responsiveness, structure, and dependable execution.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Delayed responses to owner and board concerns</li>
              <li>Reactive instead of proactive management</li>
              <li>Weak vendor oversight</li>
              <li>Inconsistent communication</li>
              <li>Collections and follow-up not moving fast enough</li>
              <li>Too little personal attention from management</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Proactive property management</li>
              <li>Hands-on operational oversight</li>
              <li>Clear board communication</li>
              <li>Stronger accountability systems</li>
              <li>Focused collections support</li>
              <li>Long-term community-minded leadership</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Management built on experience, discipline, and follow-through
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management combines hands-on experience with intelligent
              systems and a proactive operating style. We believe associations should not
              have to chase their management company for answers, updates, or action.
            </p>
            <p className="text-gray-400">
              We work to create stability, improve responsiveness, strengthen operations,
              and help boards feel supported by a management company that is truly engaged.
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
              See what a stronger management structure could look like
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              Let’s review your current management approach and identify opportunities to
              improve service, operations, and financial performance.
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
