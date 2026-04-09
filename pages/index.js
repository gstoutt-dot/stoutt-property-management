import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function HomePage() {
  const services = [
    {
      title: "Community Association Management",
      description:
        "Hands-on leadership for condominium and HOA boards with proactive site presence, vendor coordination, communication, and operational follow-through.",
    },
    {
      title: "Financial Oversight",
      description:
        "Budget support, reporting, collections coordination, financial controls, and board-ready transparency that protects the long-term health of the association.",
    },
    {
      title: "Maintenance & Vendor Coordination",
      description:
        "Fast issue tracking, smarter vendor management, and accountable follow-up so problems do not sit unresolved.",
    },
    {
      title: "Board & Resident Communication",
      description:
        "Clear communication, faster response times, and systems that reduce frustration for both board members and residents.",
    },
  ];

  const reasons = [
    "Slow response times that frustrate boards and residents",
    "Missed inspections and inconsistent site follow-through",
    "Weak collections follow-up and unresolved delinquencies",
    "High staff turnover and lack of continuity",
    "No real relationship-building with the board",
    "Too much reacting and not enough proactive leadership",
  ];

  const counties = [
    "Broward County",
    "Miami-Dade County",
    "Palm Beach County",
  ];

  const cardHover =
    "transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]";

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-yellow-400/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(234,179,8,0.08),transparent_24%),linear-gradient(180deg,#020617_0%,#020617_52%,#061126_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-20">
            <div className="max-w-[46rem]">
              <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-400">
                Florida HOA & Condo Specialists
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl xl:text-[5.25rem]">
                Redefining property management through experience, intelligent systems,
                and proactive leadership.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Stoutt Property Management helps condominium and HOA boards move beyond
                slow response times, missed details, and reactive management with a
                higher standard of structure, accountability, and follow-through.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/why-switch" className={secondaryBtn}>
                  Why Communities Switch
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: "82", label: "Associations Managed" },
                  { value: "$500M+", label: "Assets Overseen" },
                  { value: "20,000+", label: "Lives Impacted Through KDA" },
                  { value: "FL", label: "HOA & Condo Focus" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur ${cardHover}`}
                  >
                    <div className="text-2xl font-semibold text-white sm:text-3xl">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-stretch">
              <div className="w-full rounded-[2rem] border border-yellow-500/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-6 shadow-[0_0_50px_rgba(234,179,8,0.08)] backdrop-blur">
                <div
                  className={`rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 ${cardHover}`}
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                    Built for boards that expect more
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      "Proactive inspections and operational follow-through",
                      "Stronger collections coordination at no extra charge to the association",
                      "Faster communication backed by intelligent systems",
                      "Hands-on board relationships, not distant management",
                    ].map((item) => (
                      <div key={item} className="flex gap-3">
                        <div className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
                        <p className="text-sm leading-7 text-white/75">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-5 ${cardHover}`}
                  >
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-400">
                      Founder-led credibility
                    </div>
                    <p className="mt-2 text-sm leading-7 text-white/72">
                      Backed by decades of association leadership and a legacy built on
                      stewardship, systems, and long-term trust.
                    </p>
                    <a
                      href="https://glennstoutt.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-yellow-400 transition hover:text-yellow-300"
                    >
                      Explore Founder Story →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              "Proactive Site Presence",
              "Board-Ready Communication",
              "Smarter Operational Systems",
              "Relationship-Driven Leadership",
            ].map((item) => (
              <div
                key={item}
                className={`rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/75 ${cardHover}`}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(234,179,8,0.06),transparent_25%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[.98fr_1.02fr] lg:gap-14">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Why communities switch management companies
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                  Boards do not switch because they want change. They switch because
                  they need leadership.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
                  Most boards reach out after dealing with the same frustrations over
                  and over. Stoutt Property Management is built to solve those
                  frustrations with stronger follow-through, better systems, and real
                  accountability.
                </p>
                <div className="mt-8">
                  <a href="/proposal" className={primaryBtn}>
                    Start the Conversation
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className={`rounded-3xl border border-white/10 bg-white/5 p-5 ${cardHover}`}
                  >
                    <div className="mb-3 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
                    <p className="text-sm leading-7 text-white/75">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/55">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                Core services
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                Disciplined property management for Florida condominium and HOA
                communities.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                We combine operational structure, financial discipline, communication,
                and proactive field execution so boards can lead with confidence.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className={`rounded-[2rem] border border-white/10 bg-white/5 p-6 ${cardHover}`}
                >
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="/services" className={secondaryBtn}>
                View All Services
              </a>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-yellow-500/15 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-8 shadow-[0_0_60px_rgba(234,179,8,0.07)] lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_.92fr]">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Intelligent systems advantage
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                  Real-time property management powered by intelligent systems.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
                  Stoutt Property Management is building a different kind of management
                  experience. Intelligent systems help process requests faster, improve
                  communication, strengthen follow-through, and free leadership to focus
                  on relationships and decision-making.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Faster resident and board response handling",
                    "Smarter issue tracking and operational follow-up",
                    "Stronger visibility into unresolved items",
                    "More time dedicated to relationships and leadership",
                  ].map((item) => (
                    <div
                      key={item}
                      className={`rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75 ${cardHover}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 ${cardHover}`}
              >
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Why it matters
                </div>

                <div className="mt-6 space-y-5">
                  {[
                    {
                      title: "Faster answers",
                      description:
                        "Reduce frustration by responding faster and tracking requests more intelligently.",
                    },
                    {
                      title: "Better accountability",
                      description:
                        "Issues do not disappear into email chains. Systems create visibility and follow-up.",
                    },
                    {
                      title: "Stronger leadership focus",
                      description:
                        "When repetitive tasks are handled better, leadership can focus on boards, strategy, and relationships.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-3xl border border-white/10 bg-white/5 p-5 ${cardHover}`}
                    >
                      <div className="text-2xl font-semibold text-white">{item.title}</div>
                      <p className="mt-2 text-sm leading-7 text-white/72">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/55">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_.85fr]">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Stronger collections
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                  Stronger collections at no extra charge to the association.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                  Delinquencies affect cash flow, operations, and community stability.
                  We bring disciplined follow-up, stronger coordination, and clearer
                  processes that help protect the financial position of the association.
                </p>
                <div className="mt-8">
                  <a href="/collections" className={secondaryBtn}>
                    Explore Collections
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  "Disciplined follow-up and communication",
                  "Board visibility into status and unresolved items",
                  "Processes built to support stronger financial outcomes",
                ].map((item) => (
                  <div
                    key={item}
                    className={`rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75 ${cardHover}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(234,179,8,0.06),transparent_25%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[.92fr_1.08fr]">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Coverage area
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                  Serving condominium and HOA communities across South Florida.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
                  We are focused on Broward County and expanding strategically across
                  the surrounding markets where boards need responsive, experienced,
                  systems-driven management.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {counties.map((county) => (
                  <a
                    key={county}
                    href="/coverage"
                    className={`rounded-[2rem] border border-white/10 bg-white/5 p-6 ${cardHover}`}
                  >
                    <div className="text-2xl font-semibold text-white">{county}</div>
                    <div className="mt-2 text-sm leading-7 text-white/65">
                      View coverage and community focus.
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 pt-8 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2.25rem] border border-yellow-500/20 bg-yellow-500/10 p-8 text-center shadow-[0_0_60px_rgba(234,179,8,0.08)] sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Start the conversation
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                  If your board is considering a change, let’s have the right
                  conversation.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/75">
                  We built Stoutt Property Management to deliver a different level of
                  responsiveness, structure, and leadership for Florida communities.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/proposal" className={secondaryBtn}>
                  Schedule a Conversation
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StickyMobileCTA />
    </div>
  );
}

