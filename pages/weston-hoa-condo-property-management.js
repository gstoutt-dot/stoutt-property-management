export default function WestonHoaCondoPropertyManagement() {
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
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-300">
            Broward County
          </div>
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            Weston HOA & Condo Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            High-standard HOA and condominium management for Weston communities that expect
            stronger execution, consistent communication, and long-term operational discipline.
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
              Why Weston boards expect more from their management company
            </h2>
            <p className="mb-4 text-gray-400">
              In communities with higher expectations, weak communication and inconsistent
              follow-through become obvious quickly. Boards want timely responses, organized
              execution, and a management company that handles details before they become problems.
            </p>
            <p className="text-gray-400">
              When service feels reactive or too many items slip through the cracks,
              associations begin looking for a stronger and more disciplined partner.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Inconsistent board communication</li>
              <li>Weak follow-through on priorities</li>
              <li>Too little operational visibility</li>
              <li>Slow response to issues and owners</li>
              <li>Collections and compliance not moving fast enough</li>
              <li>Lack of proactive planning and leadership</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Proactive communication and updates</li>
              <li>Hands-on operational leadership</li>
              <li>Stronger structure and accountability</li>
              <li>Disciplined follow-through</li>
              <li>Better visibility for boards</li>
              <li>A relationship-first management style</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              A more refined and proactive management model for Weston communities
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management combines experience, systems, and a proactive
              operating style to support communities that expect a high level of service
              and dependable execution.
            </p>
            <p className="text-gray-400">
              We work to improve communication, increase accountability, and give boards
              the confidence that their community is being managed with care and discipline.
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
              Let’s look at what stronger management could look like in Weston
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can review your current structure and identify where more proactive
              communication, follow-through, and support can improve results.
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
