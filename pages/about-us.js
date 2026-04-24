import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function AboutUs() {
  const glowCard =
    "rounded-3xl border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_1px_rgba(234,179,8,0.6),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl";

  const executive = [
    ["Glenn Stoutt", "Founder / Manager"],
    ["Lisa Solon", "Vice President"],
    ["Michael Harrington", "Director of Community Operations"],
    ["Andrea Whitmore", "Senior Association Manager"],
    ["David Reynolds", "Director of Financial Services"],
  ];

  const operations = [
    ["Karen Ellis", "Compliance and Governance Administrator"],
    ["James Holloway", "Director of Maintenance Coordination"],
    ["Sophia Bennett", "Controller"],
    ["Robert Delgado", "Director of Vendor Relations"],
    ["Melissa Grant", "Resident Services Administrator"],
  ];

  const technology = [
    ["Jonathan Mercer", "Chief Technology Officer"],
    ["Ethan Caldwell", "Director of Software Development"],
    ["Rachel Monroe", "Systems Integration Manager"],
    ["Daniel Foster", "AI Solutions Architect"],
    ["Natalie Brooks", "Cybersecurity and Data Protection Manager"],
    ["Christopher Vaughn", "Cloud Infrastructure Engineer"],
    ["Olivia Carter", "Resident Portal Administrator"],
    ["Benjamin Pierce", "Business Intelligence and Reporting Analyst"],
    ["Megan Sullivan", "Automation and Workflow Specialist"],
  ];

  const TeamSection = ({ title, people }) => (
    <div className={`${glowCard} p-8`}>
      <h3 className="mb-6 text-2xl font-semibold text-white">{title}</h3>

      <div className="grid gap-5">
        {people.map(([name, role]) => (
          <div
            key={name}
            className="rounded-2xl border border-yellow-400/15 bg-slate-900/70 p-5 shadow-[0_0_22px_rgba(234,179,8,0.08)]"
          >
            <div className="text-lg font-semibold text-white">{name}</div>
            <div className="mt-1 text-sm text-slate-300">{role}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.20),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-300">
              About Stoutt Property Management
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Experience. Stewardship.
              <span className="block text-yellow-300">
                Intelligent Systems.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
              Exceptional communities deserve thoughtful leadership, strong
              systems, and proactive management grounded in stewardship.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-10 shadow-[0_0_55px_rgba(234,179,8,0.18)] backdrop-blur-xl">
              <img
                src="/logo.png"
                alt="Stoutt Property Management"
                className="mx-auto w-72 max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            "Decades of association management experience",
            "Modern technology and intelligent automation",
            "A service philosophy built on responsiveness and accountability",
          ].map((item) => (
            <div key={item} className={`${glowCard} p-8`}>
              <p className="text-lg leading-8 text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className={`mx-auto max-w-7xl p-12 ${glowCard}`}>
          <h2 className="text-4xl font-bold">A Foundation Built on Experience</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {[
              "Calm Decision-Making",
              "Proactive Planning",
              "Financial Accountability",
              "Strong Board Relationships",
              "Long-Term Stewardship",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-yellow-400/20 bg-yellow-300/10 p-5 text-yellow-100 shadow-[0_0_22px_rgba(234,179,8,0.10)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className={`mx-auto max-w-5xl p-12 text-center ${glowCard}`}>
          <h2 className="text-5xl font-bold">
            Successful outcomes rarely happen by accident.
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            Flying to a destination takes focus and concentration. So does
            building something special that lasts.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-5xl font-bold">Built for board confidence.</h2>

            <p className="mt-6 text-lg text-slate-300">
              Supported by a multidisciplinary team spanning operations,
              financial administration, resident services and intelligent systems.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <TeamSection title="Executive Leadership" people={executive} />
            <TeamSection title="Operational Support Team" people={operations} />
            <TeamSection
              title="Technology & Intelligent Systems"
              people={technology}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className={`mx-auto max-w-7xl p-14 ${glowCard}`}>
          <h2 className="text-5xl font-bold">Intelligent Systems Initiative</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Resident communication and service responsiveness",
              "Maintenance workflow automation",
              "Financial reporting visibility",
              "Board decision support tools",
              "Resident-facing technology integration",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-yellow-400/15 bg-white/[0.03] p-6 shadow-[0_0_22px_rgba(234,179,8,0.08)]"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-12 text-3xl font-bold text-yellow-300">
            Technology should support relationships — not replace them.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className={`${glowCard} p-10`}>
            <h2 className="text-4xl font-bold">Our Difference</h2>

            <ul className="mt-8 space-y-4 text-slate-300">
              <li>Proactive management</li>
              <li>Intelligent automation</li>
              <li>Operational accountability</li>
              <li>Modern technology support</li>
              <li>Leadership grounded in stewardship</li>
            </ul>
          </div>

          <div className={`${glowCard} p-10`}>
            <h2 className="text-4xl font-bold">Beyond Property Management</h2>

            <p className="mt-8 text-slate-300">
              Successful communities are strengthened through stewardship.
            </p>

            <p className="mt-6 text-xl font-semibold">
              Property management, at its best, is about people.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className={`mx-auto max-w-5xl p-12 text-center ${glowCard}`}>
          <h2 className="text-5xl font-bold">
            A Long-Term Partner for Your Community
          </h2>

          <p className="mt-8 text-lg text-slate-300">
            We serve as a trusted partner to the boards we represent, protecting
            the assets entrusted to us.
          </p>

          <p className="mt-10 text-4xl font-bold text-yellow-300">
            We are helping build stronger ones.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className={`mx-auto max-w-7xl p-10 text-center ${glowCard}`}>
          <h2 className="text-4xl font-bold">Designed to Scale</h2>

          <p className="mx-auto mt-6 max-w-4xl text-slate-300">
            Our team structure is intentionally designed to scale with the needs
            of the communities we serve.
          </p>

          <p className="mt-8 italic text-yellow-300">
            Redefining Property Management Through Experience, Intelligent
            Systems and Being Proactive.
          </p>
        </div>
      </section>

      <StickyMobileCTA />
    </main>
  );
}
