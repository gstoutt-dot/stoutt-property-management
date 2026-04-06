export default function BrowardCountyPropertyManagement() {
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
            South Florida Service Area
          </div>
          <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
            Broward County Property Management
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Stoutt Property Management provides proactive HOA and condominium
            management services throughout Broward County with a focus on
            stronger communication, better follow-through, financial discipline,
            and long-term community stability.
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

        {/* COMMUNITIES */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Communities we serve
            </div>
            <h2 className="mb-4 text-3xl font-semibold">
              Featured Broward County Cities
            </h2>
            <p className="mx-auto max-w-3xl text-gray-400">
              Explore our Broward County city pages to see how Stoutt Property
              Management supports associations with responsive communication,
              stronger operations, and proactive follow-through.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <a
              href="/weston-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Weston</h3>
              <p className="text-sm text-gray-400">
                HOA and condominium management built around responsiveness,
                operational control, and board communication.
              </p>
            </a>

            <a
              href="/miramar-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Miramar</h3>
              <p className="text-sm text-gray-400">
                Proactive property management for communities seeking better
                structure, stronger follow-through, and improved service.
              </p>
            </a>

            <a
              href="/pompano-beach-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Pompano Beach</h3>
              <p className="text-sm text-gray-400">
                Focused management support for associations that want stronger
                oversight, better vendor coordination, and consistency.
              </p>
            </a>

            <a
              href="/coconut-creek-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Coconut Creek</h3>
              <p className="text-sm text-gray-400">
                Systems-driven association management with attention to
                communication, maintenance follow-up, and financial stability.
              </p>
            </a>

            <a
              href="/tamarac-hoa-condo-property-management"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Tamarac</h3>
              <p className="text-sm text-gray-400">
                Management services designed to help boards operate more
                efficiently and protect the long-term health of the community.
              </p>
            </a>

            <a
              href="/coral-springs"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Coral Springs</h3>
              <p className="text-sm text-gray-400">
                Proactive HOA and condominium management for communities that
                want stronger operations, better communication, and better
                financial control.
              </p>
            </a>

            <a
              href="/hallandale-beach"
              className="rounded-xl border border-white/20 p-6 transition hover:border-white/40"
            >
              <h3 className="mb-2 text-xl font-medium">Hallandale Beach</h3>
              <p className="text-sm text-gray-400">
                High-touch HOA and condo management for communities that expect
                better follow-up, better systems, and a more proactive
                management company.
              </p>
            </a>
          </div>
        </section>

        {/* WHY COMMUNITIES SWITCH */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Why communities switch
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              Boards are looking for more than basic management
            </h2>
            <p className="mb-4 text-gray-400">
              Many associations begin looking for a new management company when
              communication weakens, follow-through becomes inconsistent,
              collections slow down, and problems are handled too late instead
              of early. Over time, that affects confidence, operations, and the
              financial health of the community.
            </p>
            <p className="text-gray-400">
              Stoutt Property Management is built for associations that want a
              more disciplined, hands-on, and proactive management partner.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="mb-4 text-xl font-medium">What Stoutt brings</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Proactive communication</li>
              <li>Hands-on leadership</li>
              <li>Operational follow-through</li>
              <li>Stronger collections focus</li>
              <li>Better vendor oversight</li>
              <li>Relationship-driven board support</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 p-10">
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              Next step
            </div>
            <h2 className="mb-4 text-3xl font-semibold">
              Let’s talk about your Broward County community
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">
              If your association is exploring a change, we can review your
              current structure, identify weak points, and show you what a
              stronger management approach can look like.
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
