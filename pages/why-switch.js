import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA"; 
export default function WhySwitchPage() {
  const problems = [
    "Slow response times that frustrate boards and residents",
    "Missed inspections and inconsistent follow-through",
    "Weak collections processes and unresolved delinquencies",
    "High staff turnover and lack of continuity",
    "Little to no real relationship with the board",
    "Reactive management instead of proactive leadership",
  ];

  const solutions = [
    "Faster, more accountable response systems",
    "Consistent operational follow-through",
    "Stronger collections coordination and visibility",
    "Stable, leadership-driven management approach",
    "Hands-on board relationships",
    "Proactive systems that prevent issues early",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_38%),linear-gradient(180deg,#020617_0%,#020617_48%,#08111f_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Why communities switch
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Boards don’t switch management companies lightly.
              </h1>

              <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
                Most communities only consider a change after repeated frustrations,
                missed expectations, and a growing lack of confidence in how things are being handled.
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
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                What boards are dealing with today
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                The decision to switch usually comes after the same issues continue
                without improvement.
              </p>
            </div>

            <div className="grid gap-4">
              {problems.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-red-400/20 bg-red-400/5 p-5 text-sm leading-7 text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  What changes with the right management
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  With the right structure, leadership, and systems in place, boards
                  experience a noticeable shift in how the community operates.
                </p>
              </div>

              <div className="grid gap-4">
                {solutions.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-sm leading-7 text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why Stoutt Property Management is different
            </h2>

            <p className="mt-6 text-base leading-8 text-white/70">
              We built this company around a different model — one that combines
              experience, proactive leadership, and intelligent systems to create
              faster responses, stronger follow-through, and better visibility for boards.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              "Proactive, systems-driven operations",
              "Real-time responsiveness through smarter tools",
              "Stronger collections coordination at no extra cost",
              "Hands-on leadership and board relationships",
              "Focused on long-term community stability",
              "Built specifically for Florida HOA and condominium communities",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  If your board is considering a change, let’s have the right conversation.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75">
                  We’ll take the time to understand your community, where things are falling short,
                  and how a more proactive, systems-driven approach can improve results.
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
