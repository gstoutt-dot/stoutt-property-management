import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";
export default function CollectionsPage() {
  const strengths = [
    "Disciplined follow-up and communication",
    "Clearer visibility into unresolved balances",
    "Stronger coordination that supports board decisions",
    "Processes designed to protect association cash flow",
    "Consistent, professional handling of delinquency matters",
    "No extra charge to the association for stronger collections positioning",
  ];

  const outcomes = [
    "Better financial stability for the community",
    "Improved follow-through on outstanding balances",
    "More confidence for boards reviewing receivables",
    "A more structured process instead of reactive collection handling",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300";

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
              <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Collections
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Stronger collections at no extra charge to the association.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                Delinquencies affect cash flow, planning, operations, and overall
                community stability. Stoutt Property Management brings a more disciplined,
                visible, and proactive collections process that supports boards and helps
                protect the financial position of the association.
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
            {strengths.map((item) => (
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
          <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Why collections matter
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Financial discipline protects the entire community.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                When delinquent accounts are not handled consistently, the entire
                association feels it. Collections are not just about balances — they
                affect reserve planning, operations, vendor relationships, and the
                board’s ability to lead effectively.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Unresolved delinquencies can weaken cash flow",
                "Inconsistent follow-up creates avoidable delays",
                "Boards need visibility into collection status",
                "A structured process supports stronger decisions",
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

        <section className="bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Our approach
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                A more proactive and accountable collections process.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                We help boards strengthen collections through more consistent
                coordination, better follow-through, and clearer visibility into what
                remains unresolved. The goal is not just activity — it is meaningful
                financial support for the association.
              </p>
            </div>

            <div className="grid gap-4">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-sm leading-7 text-white/75"
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
                Positioning that matters
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Stronger collections support is part of stronger management.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Many management companies treat collections as a side issue. We do not.
                We believe better processes, better follow-through, and better board
                visibility are all part of responsible property management.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Start the conversation
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Let’s talk about how stronger collections can support your community.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/75">
                  If your board is looking for more structure, better follow-through,
                  and stronger financial discipline, we would welcome the opportunity to talk.
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
