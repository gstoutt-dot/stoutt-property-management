export default function AboutUs() {
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
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
      <h3 className="mb-6 text-2xl font-semibold text-white">{title}</h3>
      <div className="grid gap-5">
        {people.map(([name, role]) => (
          <div
            key={name}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
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
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              About Stoutt Property Management
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Experience. Stewardship.
              <span className="block text-amber-300">Intelligent Systems.</span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
              Stoutt Property Management was founded on a belief that
              exceptional communities deserve more than routine administration —
              they deserve thoughtful leadership, strong systems, and proactive
              management grounded in stewardship.
            </p>
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
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-xl"
            >
              <p className="text-lg leading-8 text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 md:p-14">
          <h2 className="text-3xl font-bold md:text-5xl">
            A Foundation Built on Experience
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-9 text-slate-300">
            The principles behind Stoutt Property Management were shaped through
            decades of managing associations, overseeing substantial community
            assets, and building systems designed to support both boards and
            residents.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              "Calm, disciplined decision-making",
              "Proactive planning",
              "Financial accountability",
              "Strong board relationships",
              "Long-term stewardship",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm font-medium text-amber-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Precision in Leadership
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Successful outcomes rarely happen by accident.
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            Aviation has long represented preparation, systems, focus, and sound
            judgment. The same principles apply to community management.
          </p>

          <p className="mt-8 text-2xl font-semibold text-white">
            Flying to a destination takes focus and concentration. So does
            building something special that lasts.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Our Team
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              Built for board confidence.
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-300">
              Supported by a multidisciplinary team spanning community
              operations, financial administration, resident services, and
              intelligent systems infrastructure.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <TeamSection title="Executive Leadership" people={executive} />
            <TeamSection title="Operational Support Team" people={operations} />
            <TeamSection
              title="Technology & Intelligent Systems Support"
              people={technology}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-slate-900 to-slate-950 p-10 shadow-2xl md:p-16">
          <h2 className="text-4xl font-bold md:text-6xl">
            Intelligent Systems Initiative
          </h2>

          <p className="mt-8 max-w-5xl text-lg leading-9 text-slate-300">
            Stoutt Property Management is advancing an Intelligent Systems
            Initiative focused on next-generation tools for association
            operations, including AI-supported service systems, workflow
            automation, and the phased development of a proprietary management
            platform designed specifically for HOA and condominium environments.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Resident communication and service responsiveness",
              "Maintenance tracking and intelligent workflow automation",
              "Financial reporting and operational visibility",
              "Board decision support through data-driven tools",
              "Integration between management operations and resident-facing technologies",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-12 text-3xl font-bold text-amber-300">
            Technology should support relationships — not replace them.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10">
            <h2 className="text-4xl font-bold">Our Difference</h2>
            <ul className="mt-8 space-y-4 text-lg leading-8 text-slate-300">
              <li>Proactive management rather than reactive administration</li>
              <li>Stronger systems supported by intelligent automation</li>
              <li>Financial oversight with operational accountability</li>
              <li>Responsive service supported by modern technology</li>
              <li>Leadership grounded in stewardship and relationships</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10">
            <h2 className="text-4xl font-bold">Beyond Property Management</h2>
            <p className="mt-8 text-lg leading-9 text-slate-300">
              We believe successful communities are built through more than
              operations alone. They are strengthened through stewardship.
            </p>
            <p className="mt-6 text-lg leading-9 text-slate-300">
              That belief extends beyond management through a broader commitment
              to community impact and helping keep dreams alive through
              meaningful service beyond the properties we manage.
            </p>
            <p className="mt-6 text-xl font-semibold text-white">
              Because property management, at its best, is about people.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold md:text-6xl">
            A Long-Term Partner for Your Community
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            Our objective is simple: to serve as a trusted partner to the boards
            we represent, protect the assets entrusted to us, and help
            communities operate at their highest potential.
          </p>

          <p className="mt-10 text-4xl font-bold text-amber-300">
            We are helping build stronger ones.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center md:p-14">
          <h2 className="text-4xl font-bold">Designed to Scale</h2>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-9 text-slate-300">
            Our team structure is intentionally designed to scale with the needs
            of the communities we serve. As our portfolio grows, our systems,
            support infrastructure, and intelligent technology initiatives are
            designed to grow with it — ensuring consistent service, operational
            strength, and long-term continuity for every association we manage.
          </p>

          <p className="mt-10 text-xl italic text-amber-300">
            Redefining Property Management Through Experience, Intelligent
            Systems and Being Proactive.
          </p>
        </div>
      </section>
    </main>
  );
}
