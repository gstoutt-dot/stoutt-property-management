import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";
export default function CoveragePage() {
  const counties = [
    {
      name: "Broward County",
      description:
        "A core focus area for Stoutt Property Management, with service designed for condominium and HOA communities seeking stronger responsiveness, proactive leadership, and systems-driven support.",
      href: "/broward-county-property-management",
    },
    {
      name: "Miami-Dade County",
      description:
        "Strategic expansion into communities that value disciplined operations, stronger communication, and a management company built around follow-through and modern systems.",
      href: "/coverage",
    },
    {
      name: "Palm Beach County",
      description:
        "Selective growth into well-positioned communities where boards want an experienced, relationship-driven company with a more proactive operating model.",
      href: "/coverage",
    },
  ];

  const highlights = [
    "Florida-focused condominium and HOA management",
    "Primary focus on Broward County",
    "Strategic service across South Florida",
    "Proactive leadership and operational follow-through",
    "Relationship-driven support for boards",
    "Intelligent systems that improve responsiveness",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_38%),linear-gradient(180deg,#020617_0%,#020617_48%,#08111f_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Coverage Area
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Serving condominium and HOA communities across South Florida.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                Stoutt Property Management is focused on Broward County and expanding
                strategically into surrounding South Florida markets where boards want
                stronger leadership, better systems, and more responsive management.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/services" className={secondaryBtn}>
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Counties we serve
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Focused growth with service built around quality.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">
              Our approach is not about chasing volume. It is about serving communities
              where strong board relationships, proactive operations, and a disciplined
              management structure can make a real difference.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {counties.map((county) => (
              <a
                key={county.name}
                href={county.href}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
              >
                <h3 className="text-xl font-semibold text-white">{county.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {county.description}
                </p>
                <div className="mt-5 text-sm font-semibold text-cyan-300">
                  Explore Area →
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Why geography matters
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Local focus creates better management.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Strong service depends on proximity, operational awareness, vendor
                coordination, and the ability to stay engaged with the community.
                That is why our growth is intentional and focused.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "More responsive service begins with focused coverage",
                "Operational follow-through improves when markets are served intentionally",
                "Boards benefit when management is structured around proximity and accountability",
                "Smart expansion supports quality instead of diluting it",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:p-12">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Broward County priority
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Broward County remains our primary focus.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Broward is where we are concentrating our strongest immediate positioning,
                including county-level and city-level coverage pages built to connect with
                boards seeking experienced, proactive, systems-driven management.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Let’s talk
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  If your community is located in our service area, we would welcome the conversation.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/75">
                  We are building a focused South Florida management platform centered on
                  stronger leadership, intelligent systems, and better long-term support for boards.
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
