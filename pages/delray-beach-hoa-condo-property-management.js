export default function DelrayBeachHoaCondoPropertyManagement() {
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
            Delray Beach HOA & Condo Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            Delray Beach associations benefit from proactive oversight, stronger
            vendor coordination, and management that anticipates issues before they escalate.
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
              Why Delray Beach communities begin exploring new management
            </h2>
            <p className="mb-4 text-gray-400">
              Communities begin looking for change when communication weakens,
              follow-through becomes inconsistent, and important items are handled too late.
            </p>
            <p className="text-gray-400">
              Boards want stronger support, better execution, and a management
              company that helps them stay ahead of issues.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Delayed communication and updates</li>
              <li>Weak vendor follow-through</li>
              <li>Reactive issue handling</li>
              <li>Too little operational visibility</li>
              <li>Inconsistent board support</li>
              <li>Slower than needed response times</li>
            </ul>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Proactive communication</li>
              <li>Stronger vendor coordination</li>
              <li>Better accountability</li>
              <li>Hands-on support</li>
              <li>More organized execution</li>
              <li>Consistent board communication</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Management built on responsiveness and follow-through
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management helps communities strengthen communication,
              improve execution, and create a more stable day-to-day management structure.
            </p>
            <p className="text-gray-400">
              We focus on service, organization, and proactive support that boards can rely on.
            </p>
          </div>
        </section>

        <section className="text-center">
          <div className="rounded-2xl border border-white/10 p-10">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold">
              Let’s review your Delray Beach community’s management approach
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can help identify where service, communication, and operational
              support can become stronger.
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
