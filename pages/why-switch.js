export default function WhySwitchPage() {
  const frustrations = [
    "Slow response times and unresolved homeowner concerns",
    "Missed inspections and poor follow-through on property issues",
    "High manager turnover and lack of consistency",
    "Weak collections processes that hurt cash flow",
    "Little real relationship-building with board members",
    "Outdated systems that delay answers and decisions",
  ];

  const stouttDifference = [
    "Proactive site presence instead of reactive oversight",
    "AI-enhanced systems that improve speed and consistency",
    "Stable leadership with real operational experience",
    "Board education and partnership, not just administration",
    "Structured collections processes with accountability built in",
    "A design-driven perspective that sees communities as living environments",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
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
            <a href="/why-switch" className="text-white">Why Switch</a>
            <a href="/#founder" className="hover:text-white">Founder</a>
            <a href="/#contact" className="hover:text-white">Contact</a>
          </nav>

          <a
            href="/#contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Why Communities Switch
          </div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Communities don’t switch because of price. They switch because they’re tired of being let down.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Most boards stay with the wrong management company longer than they should. Not because everything is working — but because changing feels difficult.
            The reality is that many communities are already paying the price through poor communication, missed issues, weak collections, and a lack of real leadership.
          </p>
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Common frustration
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              What boards are dealing with every day
            </h2>
            <div className="mt-8 space-y-4">
              {frustrations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-slate-900 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              The real cost
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              Poor management costs more than people think.
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The cost is not just frustration. It shows up in delayed repairs, weaker financial performance, resident dissatisfaction,
              poor board confidence, and communities that slowly lose momentum because no one is truly leading.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              When management becomes reactive, disconnected, or inconsistent, the entire property feels it.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-4xl">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Why Stoutt
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Stoutt was built to correct what other companies normalized.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            After decades in the industry, we’ve seen what too many firms have accepted as normal: poor communication, high turnover,
            delayed action, weak collections, and little meaningful board partnership. Stoutt Property Management was built to be the opposite.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stouttDifference.map((item) => (
            <div
              key={item}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                Technology + leadership
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Immediate answers. Intelligent systems. Real leadership.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Most companies are still relying on old processes and slow internal response. Stoutt integrates AI into daily operations so information can move faster,
                questions can be answered sooner, and problems can begin moving toward resolution immediately.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                And when technology reaches its limit, leadership takes over.
              </p>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8">
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                Stoutt advantage
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-tight">
                “Whatever AI can’t solve, we can.”
              </div>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                Technology handles the process. We handle the relationship. That creates a stronger experience for boards,
                faster answers for residents, and a more advanced model of property management than most communities are used to seeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-slate-900 p-8 lg:p-10">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Next step
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            If your community is ready for something stronger, Stoutt is built for that transition.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            We combine proven leadership, intelligent systems, stronger processes, and a more proactive model designed for communities that expect more.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/services"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
