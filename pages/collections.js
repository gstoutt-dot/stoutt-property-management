export default function CollectionsPage() {
  const problems = [
    "Collections are treated as an afterthought instead of a priority",
    "Delinquent accounts sit too long before action is taken",
    "Boards are left without clear process or visibility",
    "Weak follow-through hurts cash flow and financial stability",
    "Management companies often rely on inconsistent, reactive collection habits",
    "Associations absorb the cost of poor systems and delayed action",
  ];

  const stouttApproach = [
    "Structured and accountable collection procedures",
    "Earlier identification of delinquency trends",
    "Clear communication and escalation steps",
    "Attorney-integrated collection coordination",
    "Board visibility into process and status",
    "A stronger system designed to protect the association’s financial position",
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
            <a href="/why-switch" className="hover:text-white">Why Switch</a>
            <a href="/founder" className="hover:text-white">Founder</a>
            <a href="/collections" className="text-white">Collections</a>
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
            Collections
          </div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Stronger collections protect the entire community.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            One of the most common weaknesses in property management is poor
            collections follow-through. When delinquent accounts are not handled
            with discipline, structure, and urgency, the association’s balance
            sheet feels it. At Stoutt, collections are not treated like an
            afterthought.
          </p>
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              The industry problem
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Weak collections create bigger problems than most boards realize.
            </h2>
            <div className="mt-8 space-y-4">
              {problems.map((item) => (
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
              Why it matters
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              Delayed collections affect the entire association.
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              This is not just about one owner being late. Poor collections can
              impact cash flow, budget performance, reserve stability, board
              confidence, and the community’s ability to plan ahead.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              When management lacks a disciplined process, the association pays
              for it — financially and operationally.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-4xl">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            The Stoutt approach
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            A more structured, accountable system for collections.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Stoutt Property Management works with a stronger, more disciplined
            collections model designed to improve consistency, create better
            follow-through, and support healthier financial performance for the
            association.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stouttApproach.map((item) => (
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
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Competitive edge
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Stronger collections. No extra charge to the association.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This is one of the clearest ways Stoutt separates itself from the
              competition. We believe strong collections should be part of a
              disciplined management model — not treated as a premium add-on
              that leaves the board paying more to solve a basic operational
              need.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Our approach is designed to improve recovery and accountability at
              no extra charge to the association.
            </p>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Bottom line
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight">
              Better collections support better communities.
            </div>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              When assessments are collected more effectively, the entire
              association benefits: stronger financials, better planning, more
              confidence, and fewer avoidable problems caused by delayed action.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-slate-900 p-8 lg:p-10">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Next step
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            If your community needs stronger financial follow-through, Stoutt is built for that.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            We combine proven leadership, stronger processes, intelligent systems,
            and accountable collection coordination designed to protect the
            association’s financial position.
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
