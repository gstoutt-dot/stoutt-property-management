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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#020617_0%,#020617_55%,#08111f_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Why communities switch
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Most boards don’t switch management until they feel they have no choice.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                  It usually starts with small frustrations. Delayed responses.
                  Missed follow-ups. Issues that should have been handled sooner.
                  Over time, confidence erodes, and the board begins to question
                  whether the community is being managed the way it should be.
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
                    Communication slows down and simple issues take too long
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    The board has to push repeatedly just to get follow-through
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Vendors, maintenance, and collections lose consistency
                  </li>
                  <li>
                    Trust in the management relationship begins to weaken
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  The pattern
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  What boards are dealing with before they decide to make a change
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                  These are the patterns we see again and again when communities
                  start considering a change. Rarely is it just one issue. It is
                  usually the accumulation of too many unresolved problems over too
                  much time.
                </p>
              </div>

              <div className="grid gap-4">
                {problems.map((item) => (
                  <div
                    key={item}
className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-slate-900/80 hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.14)]"                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  The shift
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  What changes when management is done right
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                  With the right structure, leadership, and systems in place,
                  boards feel the difference quickly. Communication improves.
                  Issues move faster. Accountability becomes clearer. The
                  community starts operating with more consistency and less
                  friction.
                </p>
              </div>

              <div className="grid gap-4">
                {solutions.map((item) => (
                  <div
                    key={item}
className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-slate-900/80 hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.14)]"                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DECISION BRIDGE */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              The decision moment
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              At some point, every board asks the same question.
            </h2>

            <p className="mt-6 text-xl leading-8 text-white/80">
              “Are we getting the level of management our community actually needs?”
            </p>

            <p className="mt-6 text-base leading-8 text-white/70">
              If that question has come up more than once, it may be time to take
              a closer look at what better management could look like.
            </p>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="border-y border-white/10 bg-slate-900/50 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Why Stoutt Property Management
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Built specifically to solve the problems boards are tired of dealing with.
              </h2>

              <p className="mt-6 text-base leading-8 text-white/70">
                Stoutt Property Management was built specifically to solve the
                problems boards experience with traditional management companies:
                slow response, inconsistent follow-through, weak accountability,
                and reactive management.
              </p>

              <p className="mt-5 text-base leading-8 text-white/70">
                Our approach combines experienced leadership, structured systems,
                and smarter tools to deliver faster response, stronger execution,
                and better visibility for your board.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => (
                <div
                  key={item}
className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-sm leading-7 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-slate-900/80 hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.14)]"                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Next step
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  If your board is starting to question your current management, it’s time to talk.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75">
                  We’ll take the time to understand your community, where things
                  are falling short, and how a more proactive, systems-driven
                  approach can improve response, visibility, and overall results.
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
