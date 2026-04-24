import React, { useState } from "react";

export default function AboutUs() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Why Switch", href: "/why-switch" },
    { label: "Founder", href: "https://glennstoutt.com", external: true },
    { label: "About Us", href: "/about-us" },
    { label: "Collections", href: "/collections" },
    { label: "Coverage", href: "/coverage" },
    { label: "Homeowner Access", href: "/homeowner-login" },
  ];

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

      {/* UNIVERSAL HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="/" className="flex items-center gap-4">
  <img
    src="/public/logo.png"
    alt="Stoutt Property Management"
    className="h-12 w-auto"
  />

  <div>
    <div className="text-lg font-semibold tracking-wide text-white">
      Stoutt Property Management
    </div>

    <div className="text-xs uppercase tracking-[0.25em] text-amber-300">
      Florida HOA & Condo Management
    </div>
  </div>
</a>

            <div>
              <div className="text-lg font-semibold tracking-wide text-white">
                Stoutt Property Management
              </div>

              <div className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Florida HOA & Condo Management
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-200 hover:text-amber-300 transition"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-200 hover:text-amber-300 transition"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <a
            href="/proposal"
            className="hidden lg:inline-flex rounded-full border border-amber-300 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-300 hover:text-slate-950 transition"
          >
            Request a Proposal
          </a>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              About Stoutt Property Management
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Experience. Stewardship.
              <span className="block text-amber-300">
                Intelligent Systems.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
              Exceptional communities deserve thoughtful leadership, strong
              systems, and proactive management grounded in stewardship.
            </p>
          </div>
        </div>
      </section>

      {/* THREE CREDIBILITY CARDS */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-lg text-slate-200">
              Decades of association management experience
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-lg text-slate-200">
              Modern technology and intelligent automation
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-lg text-slate-200">
              A service philosophy built on responsiveness and accountability
            </p>
          </div>

        </div>
      </section>

      {/* FOUNDATION */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-12">
          <h2 className="text-4xl font-bold">
            A Foundation Built on Experience
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {[
              "Calm Decision-Making",
              "Proactive Planning",
              "Financial Accountability",
              "Strong Board Relationships",
              "Long-Term Stewardship"
            ].map((item)=>(
              <div
                key={item}
                className="rounded-2xl bg-amber-300/10 border border-amber-300/20 p-5 text-amber-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIATION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-bold">
            Successful outcomes rarely happen by accident.
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-300">
            Flying to a destination takes focus and concentration.
            So does building something special that lasts.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <h2 className="text-5xl font-bold">
              Built for board confidence.
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              Supported by a multidisciplinary team spanning operations,
              financial administration, resident services and intelligent systems.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <TeamSection title="Executive Leadership" people={executive}/>
            <TeamSection title="Operational Support Team" people={operations}/>
            <TeamSection
              title="Technology & Intelligent Systems"
              people={technology}
            />
          </div>

        </div>
      </section>

      {/* INTELLIGENT SYSTEMS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-300/20 p-14">

          <h2 className="text-5xl font-bold">
            Intelligent Systems Initiative
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Resident communication and service responsiveness",
              "Maintenance workflow automation",
              "Financial reporting visibility",
              "Board decision support tools",
              "Resident-facing technology integration"
            ].map((item)=>(
              <div
                key={item}
                className="rounded-2xl border border-white/10 p-6"
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

      {/* DIFFERENCE */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">

          <div className="rounded-3xl border border-white/10 p-10">
            <h2 className="text-4xl font-bold">
              Our Difference
            </h2>

            <ul className="mt-8 space-y-4 text-slate-300">
              <li>Proactive management</li>
              <li>Intelligent automation</li>
              <li>Operational accountability</li>
              <li>Modern technology support</li>
              <li>Leadership grounded in stewardship</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 p-10">
            <h2 className="text-4xl font-bold">
              Beyond Property Management
            </h2>

            <p className="mt-8 text-slate-300">
              Successful communities are strengthened through stewardship.
            </p>

            <p className="mt-6 text-xl font-semibold">
              Property management, at its best, is about people.
            </p>
          </div>

        </div>
      </section>

      {/* CLOSING */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-5xl font-bold">
            A Long-Term Partner for Your Community
          </h2>

          <p className="mt-8 text-lg text-slate-300">
            We serve as a trusted partner to the boards we represent,
            protecting the assets entrusted to us.
          </p>

          <p className="mt-10 text-4xl font-bold text-amber-300">
            We are helping build stronger ones.
          </p>

        </div>
      </section>

      {/* FOOTER CLOSE */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Designed to Scale
          </h2>

          <p className="mt-6 max-w-4xl mx-auto text-slate-300">
            Our team structure is intentionally designed to scale with
            the needs of the communities we serve.
          </p>

          <p className="mt-8 italic text-amber-300">
            Redefining Property Management Through Experience,
            Intelligent Systems and Being Proactive.
          </p>
        </div>
      </section>

    </main>
  );
}
