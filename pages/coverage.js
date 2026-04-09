import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function CoveragePage() {
  const areas = [
    "Broward County",
    "Miami-Dade County",
    "Palm Beach County",
  ];

  const cities = [
    "Weston",
    "Miramar",
    "Pompano Beach",
    "Coconut Creek",
    "Tamarac",
    "Coral Springs",
    "Hallandale Beach", 
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-400">
                Coverage
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Focused on South Florida communities.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                Stoutt Property Management serves condominium and HOA communities
                across Broward, Miami-Dade, and Palm Beach counties with a hands-on,
                systems-driven, and responsive approach.
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
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((area) => (
                <div
                  key={area}
                  className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{area}</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Dedicated HOA and condominium management services tailored to
                    the needs of communities in this region.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                Local presence
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Communities we actively serve.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                Our service footprint is concentrated in key South Florida markets,
                allowing for stronger relationships, faster response times, and more
                consistent oversight.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {cities.map((city) => (
                <div
                  key={city}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                Why focus matters
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Better service comes from tighter geographic focus.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                By focusing on a defined service area, we’re able to provide more
                responsive communication, stronger vendor coordination, and more
                consistent on-site presence.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Next step
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Let’s talk about your community.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/75">
                  If your association is located in our service area, we would
                  welcome the opportunity to learn more and show how we can help.
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
