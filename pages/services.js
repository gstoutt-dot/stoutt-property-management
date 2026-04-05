export default function ServicesPage() {
  const coreServices = [
    {
      title: "Community Association Management",
      description:
        "Hands-on condominium and HOA management built around proactive site presence, disciplined follow-through, and real board relationships.",
      bullets: [
        "Routine on-site inspections",
        "Vendor coordination and accountability",
        "Work order oversight and completion follow-up",
        "Resident communication support",
        "Board meeting preparation and attendance",
      ],
    },
    {
      title: "Financial & Accounting Management",
      description:
        "Clear, disciplined financial systems designed to strengthen stability, improve visibility, and support better board decisions.",
      bullets: [
        "Budget preparation and planning",
        "Monthly financial reporting",
        "Reserve planning support",
        "Cash flow monitoring",
        "Invoice and expense coordination",
      ],
    },
    {
      title: "Collections & Recovery Systems",
      description:
        "Most management companies treat collections as an afterthought. We don’t. We use structured systems and accountable processes to improve recovery and protect association finances.",
      bullets: [
        "Structured collection procedures",
        "Attorney-integrated recovery process",
        "Clear escalation timelines",
        "Better accountability and follow-through",
        "At no extra charge to the association",
      ],
    },
    {
      title: "Maintenance & Vendor Oversight",
      description:
        "We manage maintenance with a proactive mindset that protects the property, improves resident experience, and reduces preventable issues.",
      bullets: [
        "Preventative maintenance planning",
        "Vendor performance monitoring",
        "Bid coordination and review",
        "Project supervision",
        "Completion verification",
      ],
    },
    {
      title: "Board Advisory & Governance Support",
      description:
        "We help boards lead with more clarity, better process, and stronger understanding of their role and responsibilities.",
      bullets: [
        "Board education and decision support",
        "Meeting planning and structure",
        "Policy and process guidance",
        "Compliance-focused administration",
        "Strategic planning support",
      ],
    },
    {
      title: "Project & Property Design Oversight",
      description:
        "With a background in landscape architecture and development, we bring a broader perspective to how communities function, look, and improve over time.",
      bullets: [
        "Project coordination",
        "Site and aesthetic oversight",
        "Long-term improvement thinking",
        "Living-environment perspective",
        "Design-driven decision support",
      ],
    },
  ];

  const aiCapabilities = [
    "Immediate response to homeowner questions",
    "Document-based answers from governing records",
    "Intelligent work order routing and escalation",
    "24/7 consistency in communication",
    "Faster internal problem-solving",
    "More time focused on people, boards, and relationships",
  ];

  const switchReasons = [
    "Calls that go unanswered",
    "Missed inspections and weak follow-through",
    "High property manager turnover",
    "Collections that drag on too long",
    "Slow response to complaints and requests",
    "Little real relationship-building with boards",
  ];

  const differencePoints = [
    "Proactive, not reactive",
    "Systems-driven, not personality-dependent",
    "AI-enhanced, not outdated",
    "Relationship-focused, not transactional",
    "Experienced leadership, not revolving-door management",
    "Built from proven experience, not theory",
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
            <a href="/services" className="text-white">Services</a>
            <a href="/#founder" className="hover:text-white">Founder</a>
            <a href="/#coverage" className="hover:text-white">Coverage</a>
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
            Services
          </div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Property Management, Rebuilt From Experience.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            After managing 82 associations and over $500 million in assets,
            we’ve seen exactly what works — and what doesn’t. Stoutt Property
            Management combines decades of experience with intelligent systems,
            proactive leadership, and a design-driven mindset to deliver a
            higher standard of management.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/#founder"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Meet the Founder
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Full-Service Management
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Built for condominium and HOA communities that expect more.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We provide comprehensive management across South Florida with a
              level of consistency, communication, and operational control that
              many firms simply do not deliver.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {coreServices.map((service) => (
              <div
                key={service.title}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-7"
              >
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 leading-8 text-slate-300">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-300">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Why communities switch
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Boards don’t usually switch because of price.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              They switch because of frustration. When communication slips,
              inspections stop happening, collections drag on, and managers keep
              changing, confidence disappears.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold text-white">
                Sound familiar?
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {switchReasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-slate-900 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              A different model
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              Stoutt was built to correct what’s broken.
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              This is not a typical management model. It is built on proven
              experience, refined systems, accountable processes, and a stronger
              commitment to being present where it matters most.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {differencePoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              AI integration
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              A fully integrated AI management system — built for speed,
              accuracy, and immediate response.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Most property management companies are still operating the same
              way they did 10 to 15 years ago: manual processes, delayed
              responses, missed follow-ups, and inconsistent communication.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Stoutt Property Management integrates advanced AI systems across
              daily operations so solutions can begin immediately, information
              can be delivered more consistently, and boards and residents can
              get faster answers without waiting days for action.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aiCapabilities.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              The Stoutt advantage
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight text-white">
              “Whatever AI can’t solve, we can.”
            </div>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              Technology handles the process. We handle the people. That means
              more immediate solutions, stronger relationships, better board
              support, and more time focused on customer service where it
              matters most.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Design-driven thinking
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              We don’t just manage properties — we understand them.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              With a background in landscape architecture and large-scale
              development, Stoutt approaches properties as living environments,
              not just a set of buildings and maintenance tasks.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              That perspective influences how projects are evaluated, how
              communities are experienced, how operational decisions are made,
              and how long-term value is protected.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Built on experience
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              This isn’t a startup model. It’s a refined one.
            </h3>
            <p className="mt-4 leading-8 text-slate-300">
              Stoutt Property Management is built on real history, proven scale,
              decades of operational leadership, and a return to the industry
              with a better model than before.
            </p>
            <a
              href="/#founder"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Explore Founder Story
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-slate-900 p-8 lg:p-10">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Next step
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Ready to raise the standard for your community?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            If your board is looking for stronger communication, better
            follow-through, more intelligent systems, and leadership with proven
            experience, Stoutt Property Management is built for that next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
