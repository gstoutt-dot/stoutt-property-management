import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

const PHONE_HREF = "tel:+17546004755";

export default function AlignmentPage() {
  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition hover:-translate-y-0.5 hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  const premiumCard =
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl";

  const framework = [
    {
      step: "Step 1",
      title: "Establish Responsibilities",
      text: "Clarify fiduciary duties, governance obligations, oversight expectations, and what the board is responsible for owning.",
    },
    {
      step: "Step 2",
      title: "Define Protection Protocols",
      text: "Show how proactive management helps reduce risk through documentation, vendor oversight, financial visibility, compliance awareness, and follow-through.",
    },
    {
      step: "Step 3",
      title: "Create Operational Alignment",
      text: "Set communication standards, meeting structure, reporting cadence, escalation procedures, and board-management collaboration expectations.",
    },
    {
      step: "Step 4",
      title: "Reduce Friction Before It Forms",
      text: "Prevent misunderstandings, delayed decisions, unclear ownership, and reactive crisis management before they become daily operating problems.",
    },
    {
      step: "Step 5",
      title: "Build Better Communities Through Better Governance",
      text: "Help boards make better decisions, improve oversight, increase owner confidence, and create stronger long-term outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-5xl">
              <div className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                The Stoutt Board Alignment Framework™
              </div>

              <h1 className="mt-7 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Helping boards govern with clarity before problems begin.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Most management companies begin with tasks. Stoutt Property
                Management begins with alignment — because unclear
                responsibilities, weak communication, and misaligned expectations
                create friction long before they become visible problems.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-white/85">
                  A better educated board becomes a better governing body. A
                  better governing body makes better decisions. Better decisions
                  create stronger communities.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href={PHONE_HREF} className={secondaryBtn}>
                  Schedule a Conversation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Why alignment matters
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Education is not an add-on. It is the foundation.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-white/70">
              <p>
                Over decades of association leadership, we learned that when a
                board understands its fiduciary responsibilities, understands how
                management supports and protects the association, and understands
                where the board itself must lead — the entire relationship
                changes.
              </p>

              <p>
                Communication improves. Conflict decreases. Decisions move
                faster. Problems are prevented. Management becomes smoother. The
                community benefits.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Signature belief
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                A better educated board means a better governed community.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/70">
                This belief is at the center of how Stoutt Property Management
                approaches board relationships, governance support, and long-term
                community stewardship.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
              The framework
            </div>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              The Stoutt Board Alignment Framework™
            </h2>

            <p className="mt-5 text-base leading-8 text-white/70">
              Every strong management relationship begins with clarity. This
              framework helps boards understand their role, establish trust, and
              operate with better structure from the beginning.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {framework.map((item) => (
              <div key={item.title} className={`${premiumCard} p-8`}>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  {item.step}
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-yellow-100/90">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  What makes this different
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Most firms talk about managing properties. We focus on helping
                  boards govern well.
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-white/70">
                <p>
                  Governance problems often become management problems. When
                  responsibilities are unclear, decisions slow down,
                  communication breaks down, and small issues become daily
                  friction.
                </p>

                <p>
                  Fix governance early, and many operational problems never
                  emerge. That is why board education and alignment are
                  foundational to the Stoutt management model.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className={`${premiumCard} p-8 sm:p-10 lg:p-14`}>
            <div className="max-w-4xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                A philosophy of stewardship
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                This is not simply how we manage. It is how we think.
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Responsibility should be understood.",
                  "Leadership should be taught.",
                  "Education should reduce risk.",
                  "Systems should support people.",
                  "Trust should be built intentionally.",
                  "Stewardship should protect the future.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-yellow-100/90"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["82", "Associations Managed"],
                ["$500M+", "Assets Overseen"],
                ["CAM", "Leadership Since 1992"],
                ["Florida", "HOA & Condo Focus"],
              ].map(([value, label]) => (
                <div key={label} className={`${premiumCard} p-6 text-center`}>
                  <div className="text-3xl font-semibold text-yellow-300">
                    {value}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-yellow-100/90">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className={`${premiumCard} p-8 text-center sm:p-10 lg:p-14`}>
            <div className="mx-auto max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Begin with alignment
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                If your board is ready for stronger support, let’s start with
                clarity.
              </h2>

              <p className="mt-5 text-base leading-8 text-yellow-100/90">
                Stoutt Property Management is built for boards that want
                experienced leadership, proactive systems, and a management
                relationship grounded in education, responsibility, and trust.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/proposal" className={primaryBtn}>
                Request a Proposal
              </a>

              <a href={PHONE_HREF} className={secondaryBtn}>
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <StickyMobileCTA />
    </div>
  );
}
