export default function BrowardCounty() {
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

      <main className="px-6 py-20 max-w-6xl mx-auto">

        {/* HERO */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Broward County Property Management for Condominiums & HOAs
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Stoutt Property Management provides proactive, systems-driven condominium and HOA management across Broward County, including Weston, Miramar, Pompano Beach, Coconut Creek, and Tamarac. We focus on consistency, communication, and financial stability — delivering the level of service boards expect but rarely receive.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold"
            >
              Request a Proposal
            </a>

            <a
              href="/services"
              className="border border-white/20 px-6 py-3 rounded-full"
            >
              View Services
            </a>
          </div>
        </section>

        {/* WHY BOARDS SWITCH */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">
            Why Broward County Associations Are Switching Management Companies
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <p>Slow response times and lack of follow-through</p>
            <p>Missed property inspections and poor oversight</p>
            <p>Weak collections processes impacting cash flow</p>
            <p>High staff turnover and lack of consistency</p>
            <p>Minimal board communication and support</p>
            <p>Lack of proactive planning and accountability</p>
          </div>
        </section>

        {/* WHAT MAKES YOU DIFFERENT */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">
            A Different Approach to Property Management in Broward County
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <p>Proactive management with consistent oversight</p>
            <p>Strong collections process to protect association finances</p>
            <p>Hands-on leadership and board relationship focus</p>
            <p>Systems-driven operations supported by AI technology</p>
            <p>Clear communication with board members and residents</p>
            <p>Long-term planning and asset protection mindset</p>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">
            Communities We Serve in Broward County
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-gray-400">
            <p>Weston</p>
            <p>Miramar</p>
            <p>Pompano Beach</p>
            <p>Coconut Creek</p>
            <p>Tamarac</p>
            <p>Fort Lauderdale</p>
            <p>Hollywood</p>
            <p>Coral Springs</p>
            <p>Plantation</p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Looking for a Better Property Management Company in Broward County?
          </h2>

          <p className="text-gray-400 mb-6">
            Let’s talk about how we can improve operations, strengthen finances, and bring consistency back to your community.
          </p>

          <a
            href="/contact"
            className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold"
          >
            Request a Proposal
          </a>
        </section>

      </main>
    </div>
  );
}
