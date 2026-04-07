export default function WestPalmBeachHoaCondoPropertyManagement() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Florida Property Management
            </div>
            <div className="text-2xl font-semibold tracking-tight">
              Stoutt Property Management
            </div>
          </div>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/services" className="transition hover:text-white">Services</a>
            <a href="/founder" className="transition hover:text-white">Founder</a>
            <a href="/coverage" className="transition hover:text-white">Coverage</a>
            <a href="/contact" className="transition hover:text-white">Contact</a>
          </nav>

          <a
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        <section className="mb-20 text-center">
          <div className="mb-4 text-[11px] uppercase tracking-[0.38em] text-cyan-300">
            Palm Beach County
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            West Palm Beach HOA & Condo Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            West Palm Beach communities require responsive, structured management.
            Stoutt Property Management provides proactive communication, stronger
            oversight, and more consistent execution.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/palm-beach-county-property-management"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-cyan-300/50 hover:bg-white/[0.04]"
            >
              Back to Palm Beach County
            </a>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Why communities switch
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Why West Palm Beach communities begin looking for better management
            </h2>
            <p className="mb-4 text-gray-400">
              Associations often start exploring change when communication is inconsistent,
              issues remain open too long, and the board does not feel fully supported.
            </p>
            <p className="text-gray-400">
              Communities want a management company that brings structure, responsiveness,
              and stronger day-to-day operational control.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Slow communication and follow-up</li>
              <li>Weak oversight of operations</li>
              <li>Reactive instead of proactive management</li>
              <li>Too little board support</li>
              <li>Inconsistent vendor coordination</li>
              <li>Lack of accountability</li>
            </ul>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Proactive communication</li>
              <li>Better operational structure</li>
              <li>Hands-on oversight</li>
              <li>More consistent follow-through</li>
              <li>Stronger support for boards</li>
              <li>Long-term community-minded service</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Property management built on structure and stability
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management works to improve communication, strengthen
              daily operations, and provide the consistent support boards need.
            </p>
            <p className="text-gray-400">
              Our goal is to create a more stable and responsive management experience
              for West Palm Beach communities.
            </p>
          </div>
        </section>

        <section className="text-center">
          <div className="rounded-2xl border border-white/10 p-10">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold">
              Let’s look at how your West Palm Beach community is being managed today
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can review your current structure and identify where communication,
              service, and operational support can improve.
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
