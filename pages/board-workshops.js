import SiteHeader from "../components/SiteHeader";

export default function BoardWorkshopsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Board Education
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Board Workshops Built for Stronger Community Leadership
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/70">
              Stoutt Property Management helps HOA and condominium board members
              understand their responsibilities, improve decision-making, and lead
              their communities with greater confidence.
            </p>

<div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
  <p className="text-lg leading-8 text-white/85">
    Florida Board Education Requirements continue to evolve.

    Stoutt Property Management helps train boards to stay current,
    informed, and prepared through practical training, compliance
    awareness, and proactive support.
  </p>
</div>

<div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/proposal"
                className="rounded-full bg-yellow-400 px-7 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Request a Proposal
              </a>

              <a
                href="/board-education"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Education & Compliance
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Board Roles & Responsibilities",
              text: "Clear guidance on how board members can govern effectively, stay organized, and avoid common operational mistakes.",
            },
            {
              title: "Meeting Preparation",
              text: "Support for agendas, board packets, owner questions, vendor discussions, and smoother meeting flow.",
            },
            {
              title: "Budget & Collections Awareness",
              text: "Practical education around budgets, assessments, delinquencies, reserves, and financial stewardship.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 leading-7 text-white/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-10">
          <h2 className="text-3xl font-semibold">Designed for Real Board Challenges</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            These workshops are not generic lectures. They are designed around
            the real-world issues association boards face: slow responses,
            unclear responsibilities, compliance pressure, owner concerns,
            collections, vendor follow-up, and long-term community planning.
          </p>
        </div>
      </section>
    <section className="px-6 pb-24">
  <div className="mx-auto max-w-5xl">
    <h2 className="mb-8 text-3xl font-semibold">
      Related Board Resources
    </h2>

    <div className="grid gap-6 md:grid-cols-3">
      <a
        href="/board-education"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
      >
        <h3 className="text-xl font-semibold">
          Education & Compliance
        </h3>

        <p className="mt-3 text-white/65">
          Guidance for board responsibilities, governance awareness, and compliance expectations.
        </p>
      </a>

      <a
        href="/board-workshops"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
      >
        <h3 className="text-xl font-semibold">
          Board Workshops
        </h3>

        <p className="mt-3 text-white/65">
          Practical workshops designed to help board members lead with confidence.
        </p>
      </a>

      <a
        href="/compliance-alerts"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:bg-white/8"
      >
        <h3 className="text-xl font-semibold">
          Compliance Alerts
        </h3>

        <p className="mt-3 text-white/65">
          Proactive updates and reminders to help boards stay ahead of important requirements.
        </p>
      </a>
    </div>
  </div>
</section>
    </main>
  );
}
