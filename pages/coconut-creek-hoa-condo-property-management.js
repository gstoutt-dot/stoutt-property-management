export default function CoconutCreekHoaCondoPropertyManagement() {
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
            Coconut Creek HOA & Condo Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Responsive HOA and condominium management for communities that want
            stronger communication, better consistency, and more proactive support.
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
              Why boards in Coconut Creek begin exploring new management
            </h2>
            <p className="mb-4 text-gray-400">
              Communities often begin exploring change when communication feels
              slow, issues remain open too long, and management becomes more reactive
              than proactive.
            </p>
            <p className="text-gray-400">
              Boards want a management company that communicates clearly, follows
              through consistently, and helps the association operate with more
              confidence and stability.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Inconsistent communication with board members</li>
              <li>Slow follow-up on maintenance and resident concerns</li>
              <li>Weak operational oversight</li>
              <li>Collections support lacking momentum</li>
              <li>Too little visibility into ongoing issues</li>
              <li>Management that reacts late instead of early</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Clear and proactive communication</li>
              <li>Hands-on management support</li>
              <li>Better accountability and execution</li>
              <li>Systems-driven organization</li>
              <li>Stronger follow-through</li>
              <li>Long-term community-focused leadership</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              HOA and condo management with stronger consistency and support
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management is built to help communities operate
              more smoothly through proactive service, better organization, and
              disciplined follow-through.
            </p>
            <p className="text-gray-400">
              We work to support boards, improve responsiveness, and strengthen
              the day-to-day management structure that communities rely on.
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
              Let’s look at where your community can improve
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can review your current management approach and identify where
              communication, operations, and support can become stronger.
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
