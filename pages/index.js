export default function StouttPropertyManagementWebsite() {
  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/why-switch", label: "Why Switch" },
    { href: "/founder", label: "Founder" }, 
    { href: "/collections", label: "Collections" },
    { href: "#about", label: "About" },
    { href: "#coverage", label: "Coverage" },
    { href: "#contact", label: "Contact" },
  ];

  const currentYear = new Date().getFullYear();
  const services = [
    {
      title: "Community Association Management",
      description:
        "Hands-on operational leadership for condominium and HOA boards with proactive site presence, vendor coordination, and real relationship-driven management.",
    },
    {
      title: "Financial & Accounting Management",
      description:
        "Disciplined collections, transparent reporting, budgeting, and financial controls designed to strengthen association balance sheets and long-term stability.",
    },
    {
      title: "Project & Property Design Oversight",
      description:
        "A unique perspective rooted in landscape architecture — managing properties as living environments with purpose, function, and long-term value.",
    },
    {
      title: "AI-Powered Management Systems",
      description:
        "Advanced AI tools for communication, work orders, document intelligence, and operational efficiency — delivering faster, smarter service at scale.",
    },
  ];

  const differentiators = [
    "Proactive management — never reactive",
    "AI-powered communication and service delivery",
    "Low turnover, relationship-driven leadership",
    "Stronger collections with attorney-integrated processes",
    "Design-driven property perspective (not just maintenance)",
    "Board education and strategic guidance",
  ];

  const stats = [
    { value: "82", label: "Associations Managed" },
    { value: "$500M+", label: "Assets Overseen" },
    { value: "18 Years", label: "Operating Stoutt Property Management" },
    { value: "40+ Years", label: "Total Industry Experience" },
  ];

  const locations = [
    "Broward County",
    "Miami-Dade County",
    "Palm Beach County",
  ];

  const founderStats = [
    { value: "82", label: "Associations Managed" },
    { value: "$500M+", label: "Assets Overseen" },
    { value: "$250M+", label: "Hurricane Recovery Coordinated" },
    { value: "40+ Years", label: "Leadership, Design & Operations Experience" },
  ];

  const founderTimeline = [
    {
      period: "1980s",
      title: "Landscape Architecture & Design",
      text:
        "Glenn began his career in South Florida as a landscape architect and business owner, designing and installing projects in some of the region’s most prestigious communities.",
    },
    {
      period: "Late 1980s",
      title: "Savannah Club Development",
      text:
        "He led major design and development work for the 860-acre Savannah Club community, including residential landscape architecture, roadways, clubhouse areas, and the 18-hole golf course — while personally overseeing project execution on site.",
    },
    {
      period: "18 Years",
      title: "Building Stoutt Property Management",
      text:
        "Glenn built Stoutt Property Management into one of the largest privately owned property management firms in South Florida, overseeing 82 associations and more than $500 million in managed assets.",
    },
    {
      period: "Hurricane Andrew Era",
      title: "Restoration Leadership",
      text:
        "He coordinated complex restoration efforts across managed properties, helping direct recovery for more than $250 million in storm-related damage.",
    },
    {
      period: "Second Act",
      title: "Return with Purpose",
      text:
        "Now Glenn returns with deeper perspective, stronger purpose, and a modern AI-enabled vision for a more proactive, relationship-centered model of property management.",
    },
  ];

  const founderPillars = [
    {
      title: "Builder",
      description:
        "A career grounded in designing, building, and improving real environments that people experience every day.",
    },
    {
      title: "Operator",
      description:
        "Decades of hands-on execution, vendor oversight, financial accountability, and large-scale property operations.",
    },
    {
      title: "Leader",
      description:
        "An experienced executive, mentor, coach, and nonprofit operator who understands how to build trust and guide people.",
    },
    {
      title: "Innovator",
      description:
        "Committed to using intelligent systems and AI to solve problems faster and free more time for real customer relationships.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-300">Florida Property Management</div>
            <div className="text-2xl font-semibold tracking-tight">Stoutt Property Management</div>
          </div>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
            Request a Proposal
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Redefining Property Management Through Experience, Intelligent Systems and being Proactive.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Stoutt Property Management delivers next-generation condominium and HOA management across South Florida — combining decades of experience with AI-powered efficiency, proactive leadership, and a design-driven approach to community living.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#contact" className="rounded-full bg-white px-6 py-3 text-slate-950 font-semibold">
            Schedule a Call
          </a>
          <a href="#services" className="rounded-full border border-white/20 px-6 py-3">
            Explore Services
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 p-6">
              <div className="text-3xl font-semibold">{stat.value}</div>
              <div className="text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <h2 className="text-3xl font-semibold">Why Stoutt is Different</h2>
        <p className="mt-4 text-slate-300 leading-8">
          The property management industry changed after COVID — but not for the better. Companies became reactive, less present, and disconnected from the communities they serve. High manager turnover, poor communication, weak collections, and delayed service became the norm.
        </p>
        <p className="mt-4 text-slate-300 leading-8">
          Stoutt was built to correct that. We combine 40+ years of experience with modern AI systems to deliver faster responses, better communication, and stronger operational control — while maintaining real relationships with boards and residents.
        </p>
      </section>

      <section id="why" className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl font-semibold">Why Boards Are Switching to Stoutt</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Proactive Site Management",
                desc: "Regular on-site presence, inspections, and real engagement — not remote, reactive management.",
              },
              {
                title: "AI-Powered Response Time",
                desc: "Faster communication, automated workflows, and intelligent systems that reduce delays and missed requests.",
              },
              {
                title: "Stronger Collections",
                desc: "Attorney-integrated processes that improve recovery rates and stabilize association finances at no extra charge to the association.",
              },
              {
                title: "Low Turnover, High Accountability",
                desc: "Stable leadership and consistent management — not revolving-door property managers.",
              },
              {
                title: "Design-Driven Perspective",
                desc: "Properties managed as living environments, not just buildings — improving long-term value and resident experience.",
              },
              {
                title: "Board Education & Partnership",
                desc: "We empower boards with knowledge, structure, and clarity so decisions are made with confidence.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <h2 className="text-4xl font-semibold">AI-Enhanced Property Management</h2>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Stoutt integrates advanced AI systems into daily operations — from homeowner communication and work order management to document intelligence and reporting. This allows us to operate faster, more accurately, and more consistently than traditional management companies.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "Instant response to homeowner inquiries",
            "Automated work order tracking and escalation",
            "Document-based AI answering governing questions",
            "Operational visibility for boards in real time",
          ].map((item) => (
            <div key={item} className="border border-white/10 p-4 rounded-lg">{item}</div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl font-semibold">Full-Service Property Management</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="border border-white/10 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-slate-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-details" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <h2 className="text-4xl font-semibold">What We Actually Do — In Detail</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">Operations & Site Management</h3>
            <ul className="mt-4 space-y-2 text-slate-300 text-sm">
              <li>• Routine on-site inspections (not remote oversight)</li>
              <li>• Vendor management and accountability</li>
              <li>• Work order tracking and completion verification</li>
              <li>• Preventative maintenance planning</li>
            </ul>
          </div>
          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">Financial & Collections</h3>
            <ul className="mt-4 space-y-2 text-slate-300 text-sm">
              <li>• Budget preparation and reserve planning</li>
              <li>• Monthly financial reporting for boards</li>
              <li>• Aggressive, structured collections process</li>
              <li>• Attorney-integrated recovery systems (no added cost)</li>
            </ul>
          </div>
          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">Board & Governance Support</h3>
            <ul className="mt-4 space-y-2 text-slate-300 text-sm">
              <li>• Meeting preparation and attendance</li>
              <li>• Board education and decision support</li>
              <li>• Compliance with Florida statutes</li>
              <li>• Clear communication with residents</li>
            </ul>
          </div>
          <div className="border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-semibold">AI & Technology Integration</h3>
            <ul className="mt-4 space-y-2 text-slate-300 text-sm">
              <li>• AI-powered homeowner communication</li>
              <li>• Instant response systems</li>
              <li>• Smart document and covenant analysis</li>
              <li>• Real-time operational visibility</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Beyond Property Management</div>
            <h2 className="mt-4 text-4xl font-semibold">Building communities beyond the properties we manage.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Stoutt Property Management has always been about more than operations. Through the Keeping Dreams Alive Foundation, we help support, feed, mentor, and educate at-risk youth across the United States — with a strong focus in South Florida.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Over 20,000 students and student-athletes have gone through these programs completely free of charge. This commitment reflects our belief that strong communities are built not just through management, but through leadership, mentorship, and giving back.
            </p>
            <div className="mt-6">
              <a href="https://kdafoundation.org" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-6 py-3 text-white font-semibold hover:bg-white/10">
                Visit KDA Foundation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="coverage" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <h2 className="text-4xl font-semibold">Serving South Florida</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {locations.map((location) => (
            <div key={location} className="border border-white/10 p-4 rounded-lg">
              {location}
            </div>
          ))}
        </div>
      </section>

      <section id="founder" className="bg-white/[0.02] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Founder</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">The experience behind Stoutt.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Glenn Stoutt III brings more than four decades of leadership across design, development, operations, mentorship, and property management. Over 18 years, he built Stoutt Property Management into one of the largest privately owned property management firms in South Florida, overseeing 82 associations and more than $500 million in assets.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                His background is unusually broad: landscape architecture, large-scale community development, hurricane restoration leadership, nonprofit operations, coaching, mentorship, and association management. That depth gives Stoutt a perspective few firms can match.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                After a deeply personal chapter caring for his late wife, Glenn returns with renewed purpose — combining proven experience with intelligent systems and an even stronger commitment to being present, proactive, and relationship-driven.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                Since 2003, Glenn has also played a key leadership role in the Keeping Dreams Alive Foundation, helping serve at-risk youth and communities across the United States. Supported in part by Stoutt Property Management, the foundation has provided funding, mentorship, education, and resources to more than 20,000 students and student-athletes — completely free of charge — reinforcing a lifelong commitment to giving back and building future leaders.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-white px-6 py-3 text-slate-950 font-semibold">
                  Work With Stoutt
                </a>
                <a href="#why" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white">
                  Why Stoutt
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {founderStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {founderPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
                <div className="text-2xl font-semibold text-white">{pillar.title}</div>
                <p className="mt-4 leading-7 text-slate-300">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Founder Timeline</div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">A career built on vision, execution, and return.</h3>
            <div className="mt-10 grid gap-6 lg:grid-cols-5">
              {founderTimeline.map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{item.period}</div>
                  <h4 className="mt-3 text-2xl font-semibold text-white">{item.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-slate-900 p-8 lg:p-10">
            <div className="max-w-4xl">
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">A personal philosophy</div>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight">Change one life, change a generation.</h3>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Glenn’s leadership has always extended beyond operations. Through nonprofit work, mentorship, coaching, and decades of relationship building, he has remained committed to helping people grow, communities thrive, and boards lead with confidence. That philosophy is built into Stoutt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-slate-900 p-8 lg:p-10">
          <h2 className="text-4xl font-semibold">Request a Proposal</h2>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Tell us about your community and we’ll prepare a tailored management proposal designed to improve operations, communication, and financial performance.
          </p>

          <form className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="sr-only" htmlFor="association-name">Association Name</label>
            <input id="association-name" name="associationName" type="text" placeholder="Association Name" required className="p-3 rounded-lg bg-white/5 border border-white/10" />

            <label className="sr-only" htmlFor="contact-name">Contact Name</label>
            <input id="contact-name" name="contactName" type="text" placeholder="Contact Name" required className="p-3 rounded-lg bg-white/5 border border-white/10" />

            <label className="sr-only" htmlFor="email-address">Email Address</label>
            <input id="email-address" name="email" type="email" placeholder="Email Address" required className="p-3 rounded-lg bg-white/5 border border-white/10" />

            <label className="sr-only" htmlFor="phone-number">Phone Number</label>
            <input id="phone-number" name="phone" type="tel" placeholder="Phone Number" className="p-3 rounded-lg bg-white/5 border border-white/10" />

            <label className="sr-only" htmlFor="number-of-units">Number of Units</label>
            <input id="number-of-units" name="units" type="text" placeholder="Number of Units" className="p-3 rounded-lg bg-white/5 border border-white/10" />

            <label className="sr-only" htmlFor="property-location">Property Location</label>
            <input id="property-location" name="location" type="text" placeholder="Property Location (City)" className="p-3 rounded-lg bg-white/5 border border-white/10" />

            <label className="sr-only" htmlFor="community-type">Community Type</label>
            <select id="community-type" name="communityType" className="p-3 rounded-lg bg-slate-950 border border-white/10 text-slate-300">
              <option value="">Community Type</option>
              <option value="condominium">Condominium</option>
              <option value="hoa">HOA</option>
              <option value="mixed">Mixed / Master Association</option>
            </select>

            <label className="sr-only" htmlFor="current-management">Current Management Status</label>
            <select id="current-management" name="currentManagement" className="p-3 rounded-lg bg-slate-950 border border-white/10 text-slate-300">
              <option value="">Current Management Status</option>
              <option value="self-managed">Self-Managed</option>
              <option value="management-company">Currently With Another Company</option>
              <option value="developer-transition">Developer Transition</option>
            </select>

            <label className="sr-only" htmlFor="challenges">Current Challenges or Goals</label>
            <textarea id="challenges" name="challenges" placeholder="Tell us about your current challenges or goals" className="md:col-span-2 p-3 rounded-lg bg-white/5 border border-white/10 min-h-[120px]" />

            <div className="md:col-span-2 text-sm text-slate-400">
              By submitting this form, your board or association representative can request a tailored proposal from Stoutt Property Management.
            </div>

            <button type="submit" className="md:col-span-2 mt-2 rounded-full bg-white px-6 py-3 text-slate-950 font-semibold">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-base font-semibold text-white">Stoutt Property Management</div>
            <div className="mt-1">Serving Broward, Miami-Dade, and Palm Beach Counties.</div>
          </div>
          <div className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="https://kdafoundation.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              KDA Foundation
            </a>
          </div>
          <div>© {currentYear} Stoutt Property Management. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

