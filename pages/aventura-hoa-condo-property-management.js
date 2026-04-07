export default function AventuraHoaCondoPropertyManagement() {
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
            Miami-Dade County
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Aventura HOA & Condo Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">
            High-rise and luxury condominium management in Aventura requires precision,
            responsiveness, and strong operational control. Stoutt Property Management
            provides proactive support built for communities that expect more.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/miami-dade-county-property-management"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-cyan-300/50 hover:bg-white/[0.04]"
            >
              Back to Miami-Dade County
            </a>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Why communities switch
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Why Aventura communities begin exploring new management
            </h2>
            <p className="mb-4 text-gray-400">
              In high-rise and luxury communities, boards expect fast communication,
              strong oversight, and dependable follow-through. When those standards slip,
              frustration rises quickly.
            </p>
            <p className="text-gray-400">
              Communities begin looking for a management company that is proactive,
              organized, and capable of delivering a higher level of service.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">Common reasons for change</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Slow response times and weak communication</li>
              <li>Inconsistent operational oversight</li>
              <li>Vendor management not strong enough</li>
              <li>Too little visibility for the board</li>
              <li>Reactive instead of proactive management</li>
              <li>Service levels below community expectations</li>
            </ul>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>High-touch communication</li>
              <li>Hands-on oversight</li>
              <li>Stronger operational discipline</li>
              <li>Clearer accountability</li>
              <li>Better board support</li>
              <li>Proactive execution</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Our approach
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Structured management for communities that expect more
            </h2>
            <p className="mb-4 text-gray-400">
              Stoutt Property Management helps communities improve communication,
              strengthen operations, and support boards with a more disciplined
              and responsive management model.
            </p>
            <p className="text-gray-400">
              Our goal is to provide a stronger level of service, consistency,
              and control for Aventura associations.
            </p>
          </div>
        </section>

        <section className="text-center">
          <div className="rounded-2xl border border-white/10 p-10">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold">
              Let’s review your Aventura community’s management structure
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              We can help identify where service, communication, and operational
              follow-through can be improved.
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
