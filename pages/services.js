import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

const services = [
  {
    title: "Full-Service Association Management",
    description:
      "Experienced management for Florida condominium and HOA communities with structured oversight, consistent follow-through, and leadership that helps boards operate with greater confidence.",
    bullets: [
      "Day-to-day community operations",
      "Board and resident communication",
      "Property oversight and issue tracking",
      "Vendor coordination and performance follow-up",
    ],
  },
  {
    title: "Financial Management & Board Reporting",
    description:
      "Clear financial visibility and disciplined processes that support stronger decision-making, improve accountability, and protect the long-term health of the community.",
    bullets: [
      "Budget support and financial coordination",
      "Monthly reporting and board-ready summaries",
      "Invoice review and payment coordination",
      "Financial controls and transparency",
    ],
  },
  {
    title: "Maintenance & Vendor Coordination",
    description:
      "Proactive systems for tracking property issues, coordinating vendors, and making sure maintenance items do not sit unresolved or fall through the cracks.",
    bullets: [
      "Maintenance request coordination",
      "Vendor scheduling and follow-up",
      "Property condition oversight",
      "Repair tracking and status communication",
    ],
  },
  {
    title: "Board Meeting & Governance Support",
    description:
      "Professional support for board processes, meeting preparation, and governance execution so boards can stay focused, organized, and informed.",
    bullets: [
      "Meeting preparation and coordination",
      "Agenda and board support",
      "Governance process guidance",
      "Structured communication and documentation",
    ],
  },
  {
    title: "Collections Coordination",
    description:
      "Consistent collections follow-up designed to improve cash flow, reduce stagnation, and support the association’s financial position without unnecessary friction.",
    bullets: [
      "Ongoing collections tracking",
      "Board visibility into account status",
      "Process-driven follow-up",
      "Stronger collections support at no extra charge",
    ],
  },
  {
    title: "Responsive Communication Systems",
    description:
      "A management approach built around responsiveness, visibility, and operational consistency, supported by intelligent systems that help keep communication moving.",
    bullets: [
      "Timely board communication",
      "Resident inquiry coordination",
      "Issue escalation and follow-through",
      "Systems that support faster response times",
    ],
  },
];

const differentiators = [
  {
    title: "Experienced Leadership",
    text: "Built on decades of real-world association and property management experience, with an understanding of what boards need when operations, vendors, finances, and communication all have to work together.",
  },
  {
    title: "Proactive Systems",
    text: "We emphasize structure, visibility, and follow-up so your community is not operating in a reactive cycle of missed items, delayed responses, and unresolved issues.",
  },
  {
    title: "Florida HOA & Condo Focus",
    text: "Our services are built specifically for Florida associations, with an operating model designed around the realities boards face in condominium and HOA management.",
  },
];

export default function ServicesPage() {
  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-400">
                  Services
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Association management built for boards that expect more.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                  Stoutt Property Management delivers Florida condominium and HOA
                  management with stronger systems, proactive oversight, and
                  responsive execution. Our goal is simple: help boards operate
                  more effectively, protect their communities, and feel confident
                  in the management behind them.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="/proposal" className={primaryBtn}>
                    Request a Proposal
                  </a>
                  <a href="/proposal" className={secondaryBtn}>
                    Schedule a Conversation
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  What boards are looking for
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                  <li className="border-b border-white/10 pb-4">
                    Faster communication and fewer unresolved issues
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Stronger financial visibility and accountability
                  </li>
                  <li className="border-b border-white/10 pb-4">
                    Better vendor coordination and maintenance follow-through
                  </li>
                  <li>
                    A management company that is proactive, responsive, and
                    organized
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                Our approach
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Management services designed to create stability, visibility, and follow-through.
              </h2>
            </div>

            <div className="text-base leading-8 text-white/70">
              <p>
                Communities do not need more confusion, more delay, or more
                excuses. They need management that communicates clearly, follows
                through consistently, and uses systems that support the board
                instead of creating more friction.
              </p>
              <p className="mt-5">
                Our services are built to help boards strengthen operations,
                improve responsiveness, support financial discipline, and keep
                important items moving.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:border-yellow-500/30 hover:bg-white/[0.06]"
                >
                  <h3 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-7 text-white/80"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFERENTIATORS */}
        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                Why Stoutt Property Management
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                More than standard property management.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                We are building a management company around experience,
                operational discipline, and intelligent systems that support
                faster response, stronger oversight, and better board service.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-400">
                  Next step
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Let’s talk about what your community needs most.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75">
                  If your board is evaluating management support, we would
                  welcome the opportunity to learn about your property, your
                  priorities, and where better systems, stronger leadership, and
                  more responsive management can help.
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
