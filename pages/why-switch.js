import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function WhySwitchPage() {
  const problems = [
    "Emails and calls that go unanswered or take too long to resolve",
    "Issues that require multiple follow-ups before anything gets done",
    "Delinquencies that sit too long without consistent action",
    "Vendors not being properly managed or held accountable",
    "Frequent staff changes with no continuity for the board",
    "A growing sense that management is reacting instead of leading",
  ];

  const solutions = [
    "Clear, accountable response systems so issues move faster",
    "Consistent follow-through without repeated board involvement",
    "Active collections coordination with real visibility",
    "Stable leadership and continuity you can rely on",
    "Stronger, more direct board communication",
    "Proactive systems that prevent problems before they escalate",
  ];

  const differentiators = [
    "Proactive, systems-driven operations",
    "Real-time responsiveness through smarter tools",
    "Stronger collections coordination at no extra cost",
    "Hands-on leadership and real board relationships",
    "Focused on long-term community stability",
    "Built specifically for Florida HOA and condominium communities",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Why communities switch
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Most boards don’t switch management until they feel they have no choice.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                  It usually starts with small frustrations. Delayed responses.
                  Missed follow-ups. Over time, confidence erodes, and the board
                  begins to question whether their community is being managed the way it should be.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="/proposal" className={primaryBtn}>
                    Request a Proposal
                  </a>
                  <a href="/services" className={secondaryBtn}>
                    Explore Services
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  What boards start noticing
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                  <li className="border-b border-white/10 pb-4">
                    Communication slows down and issues take too long
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    The board has to push repeatedly for follow-through
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Vendors and maintenance lose consistency
                  </li>
                  <li>
                    Trust in the management relationship weakens
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  What boards are dealing with
                </h2>
                <p className="mt-5 text-white/70">
                  These are the patterns we see again and again.
                </p>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.22)]">
                  <img
                    src="/whyswitch1.jpg"
                    alt="Board members in discussion"
                    className="h-[420px] w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {problems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.75rem] border border-yellow-400/20 bg-yellow-400/5 p-5 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/50 hover:bg-yellow-400/10 hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.14)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  What changes when management is done right
                </h2>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.22)]">
                  <img
                    src="/whyswitch2.jpg"
                    alt="Board members meeting with confidence"
                    className="h-[420px] w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {solutions.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.07] hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DIFFERENTIATORS */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why Stoutt Property Management is different
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-slate-900/80 hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.14)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 pt-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-10 text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                If your board is starting to question your management, it’s time to talk.
              </h2>

              <div className="mt-8 flex justify-center gap-4">
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
