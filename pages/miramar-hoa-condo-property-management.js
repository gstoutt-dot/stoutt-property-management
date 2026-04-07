export default function MiramarHoaCondoPropertyManagement() {
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
            Miramar HOA & Condo Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Proactive HOA and condominium management for Miramar communities that want
            stronger communication, better follow-through, and a more organized operating structure.
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
              Why boards in Miramar start exploring new management
            </h2>
            <p className="mb-4 text-gray-400">
              Communities often begin looking for a new management company when
              communication weakens, follow-up slows down, and issues stay open too long.
              Boards want more consistency, clearer updates, and better operational control.
            </p>
            <p className="text-gray-400">
              Over time, reactive management creates frustration. Associations begin
              looking for a partner that is present, responsive, and more proactive in execution.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Slow response times to boards and owners</li>
              <li>Maintenance issues lingering too long</li>
              <li>Inconsistent communication and follow-up</li>
              <li>Weak collections momentum</li>
              <li>Poor visibility into open items</li>
              <li>Reactive instead of proactive management</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Clear and proactive communication</li>
              <li>Hands-on management oversight</li>
              <li>Stronger accountability systems</li>
              <li>Organized operational follow-through</li>
              <li>Collections-focused support</li>
              <li>Relationship-driven board service</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Management built on consistency, structure, and support
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management is designed for communities that want a more
              disciplined, better organized, and proactive management experience.
            </p>
            <p className="text-gray-400">
              We help boards improve communication, strengthen operations, and bring
              greater stability to the day-to-day management of the association.
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
              Let’s review how your Miramar community is being managed today
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can help identify where communication, service, and follow-through
              can be improved to create a stronger management structure.
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
