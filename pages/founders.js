export default function FounderPage() {
  const founderStats = [
    { value: "82", label: "Associations Managed" },
    { value: "$500M+", label: "Assets Overseen" },
    { value: "$250M+", label: "Hurricane Recovery Coordinated" },
    { value: "40+ Years", label: "Leadership, Design & Operations Experience" },
  ];

  const timeline = [
    {
      period: "1980s",
      title: "Landscape Architecture & Design",
      text:
        "Glenn began his career in South Florida as a landscape architect and business owner, designing and installing projects in some of the region’s most prestigious communities. That early foundation shaped the way he still sees communities today: as living environments with purpose, function, and long-term value.",
    },
    {
      period: "Late 1980s",
      title: "Savannah Club Development",
      text:
        "He led major design and development work for the 860-acre Savannah Club community, including residential landscape architecture, roadways, clubhouse areas, and the 18-hole golf course — while personally overseeing project execution on site.",
    },
    {
      period: "1991–2010",
      title: "Building a Major Property Management Company",
      text:
        "Over 18 years, Glenn built and operated Stoutt Property Management into one of the largest privately owned property management firms in South Florida, overseeing 82 associations and more than $500 million in managed assets.",
    },
    {
      period: "Hurricane Andrew Era",
      title: "Restoration Leadership",
      text:
        "He coordinated complex restoration efforts across managed properties, helping direct recovery for more than $250 million in storm-related damage — a period that required discipline, leadership, and large-scale execution under pressure.",
    },
    {
      period: "2003–Present",
      title: "Keeping Dreams Alive Foundation",
      text:
        "Since 2003, Glenn has also played a key leadership role in the Keeping Dreams Alive Foundation, helping serve at-risk youth and communities across the United States. Supported in part by Stoutt Property Management, the foundation has helped fund, mentor, educate, and support more than 20,000 students and student-athletes free of charge.",
    },
    {
      period: "Second Act",
      title: "Return With Purpose",
      text:
        "After a deeply personal chapter caring for his late wife, Glenn returns with renewed purpose — combining proven experience, stronger perspective, and modern AI-driven systems to build a more proactive, relationship-centered property management company than ever before.",
    },
  ];

  const pillars = [
    {
      title: "Builder",
      description:
        "A career grounded in designing, developing, building, and improving real environments that people experience every day.",
    },
    {
      title: "Operator",
      description:
        "Decades of hands-on execution, vendor oversight, financial accountability, restoration leadership, and large-scale property operations.",
    },
    {
      title: "Leader",
      description:
        "An experienced executive, mentor, coach, and nonprofit operator who understands how to build trust, guide people, and lead through complexity.",
    },
    {
      title: "Innovator",
      description:
        "Committed to integrating intelligent systems and AI so solutions begin faster and more time can be focused on boards, residents, and relationships.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              Florida Property Management
            </div>
            <div className="text-2xl font-semibold tracking-tight">
              Stoutt Property Management
            </div>
          </div>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/services" className="hover:text-white">Services</a>
            <a href="/why-switch" className="hover:text-white">Why Switch</a>
            <a href="/founder" className="text-white">Founder</a>
            <a href="/#contact" className="hover:text-white">Contact</a>
          </nav>

          <a
            href="/#contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Request a Proposal
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
              Founder
            </div>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              The experience behind Stoutt.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Glenn Stoutt III brings more than four decades of leadership across
              design, development, operations, mentorship, and property
              management. This is not the story of someone entering the industry.
              It is the return of someone who already built at scale — and came
              back with a better model.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              After overseeing 82 associations, more than $500 million in assets,
              large-scale restoration work, community development, and decades of
              relationship-building, Glenn now brings that experience into a more
              modern, more proactive, and more intelligent version of property
              management.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/#contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Work With Stoutt
              </a>
              <a
                href="/why-switch"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
              >
                Why Communities Switch
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {founderStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="text-3xl font-semibold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Perspective
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              A different kind of operator.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Glenn’s background is unusually broad: landscape architecture,
              large-scale community development, hurricane restoration
              leadership, nonprofit operations, coaching, mentorship, and
              association management. That depth gives Stoutt a perspective few
              firms can match.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              He does not just see properties as buildings to maintain. He sees
              communities as environments that should function better, look
              better, communicate better, and create a better experience for the
              people who live there.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="text-2xl font-semibold text-white">
                  {pillar.title}
                </div>
                <p className="mt-4 leading-7 text-slate-300">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-4xl">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Founder timeline
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            A career built on vision, execution, leadership, and return.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {timeline.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {item.period}
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Philosophy
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Technology handles the process. Leadership handles the people.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Glenn’s return to property management is not about repeating the
              past. It is about building something better — using intelligent
              systems and AI to process solutions faster, while freeing more
              time to focus on boards, relationships, communication, and real
              leadership.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The philosophy is simple:
            </p>
            <div className="mt-6 rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/10 p-6 text-2xl font-semibold tracking-tight">
              “Whatever AI can’t solve, we can.”
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-slate-900 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Beyond business
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              Change one life, change a generation.
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Since 2003, Glenn has played a key leadership role in the Keeping
              Dreams Alive Foundation, helping support at-risk youth and
              communities across the United States. Supported in part by Stoutt
              Property Management, the foundation has helped more than 20,000
              students and student-athletes through mentorship, education,
              resources, and opportunity — free of charge.
            </p>
            <a
              href="https://kdafoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Visit KDA Foundation
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-slate-900 p-8 lg:p-10">
          <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Next step
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">
            Built on experience. Refined for what’s next.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            If your community wants stronger leadership, intelligent systems,
            real follow-through, and a management company built from proven
            experience, Stoutt is ready for that next chapter.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Request a Proposal
            </a>
            <a
              href="/services"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
