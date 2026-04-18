import Head from "next/head";
import Image from "next/image";

export default function BoardTemplate() {
  const page = {
    associationName: "Association Name Here",
    shortName: "Association Name",
    cityState: "City, Florida",
    address: "1234 Example Street, City, Florida 33000",
    units: "000 Units",
    office: "On-Site Office",
    amenity1: "Pool",
    amenity2: "Tennis Court",
    pageTitle: "Association Name Here | Board Decision Overview",
    metaDescription:
      "Board-specific overview for Association Name Here by Stoutt Property Management.",
    founderStoryUrl: "https://glennstoutt.com",
    proposalUrl: "/proposal",

    heroLead:
      "A management decision is not simply about changing vendors. It is about choosing the level of leadership, accountability, follow-through, and operating discipline that will shape the experience of the community.",

    topMessage1:
      "Most management companies send a proposal. We build a decision environment. This page exists to show how years of operating experience, combined with intelligent systems, can materially change the way a property is managed.",
    topMessage2:
      "Properly implemented technology does not simply help solve problems faster. It helps prevent many of them from developing in the first place. What once required days of delay, follow-up, and uncertainty can now begin moving toward resolution within minutes.",
    topMessageClose: "Why wait for the old way to catch up?",

    leadershipIntro:
      "Glenn Stoutt previously led Sundance Property Management, managing 82 associations and overseeing more than $500 million in assets. That matters not simply as history, but because it reflects operating depth, board experience, and the ability to lead communities with steadiness and professionalism.",

    whyThisMatters:
      "In a community like this, the decision is not just about selecting a management company. It is about selecting a leadership partner capable of restoring consistency, reducing operational burden, and elevating how the property functions day to day.",

    propertyReality:
      "In a community like this, management is not theoretical. It becomes visible in the consistency of maintenance, the speed of response, the coordination of vendors, and the amount of burden the board quietly carries.",

    transitionText:
      "If a property has experienced management turnover, financial transition, operational inconsistency, or a lack of follow-through, stability becomes more than a preference. It becomes essential.",

    statement1:
      "This is where the difference between reactive management and disciplined, proactive management becomes clear.",

    planIntro:
      "The objective in the first 90 days is straightforward: stabilize operations, re-establish standards, improve visibility, and create measurable momentum the board and residents can feel.",

    statement2:
      "The difference in a well-managed community is not theoretical. It becomes visible through consistency, responsiveness, and follow-through.",

    finalClose:
      "This is not simply a change in management. It is a transition into a more disciplined, proactive operating standard designed to reduce board burden and improve how the community functions day to day.",
  };

  const operationalPressurePoints = [
    "Amenity oversight must remain consistent",
    "Routine inspections need to happen on schedule",
    "Visible follow-through shapes resident confidence",
    "Minor issues can quickly become larger frustrations",
  ];

  const responsePoints = [
    "Maintenance items should move quickly",
    "Communication should be clean and direct",
    "Recurring issues should not keep recycling",
    "Execution should feel organized, not reactive",
  ];

  const first30 = [
    "Complete full property walkthrough",
    "Establish inspection rhythm for common areas and amenities",
    "Review active maintenance items and open issues",
    "Audit vendor relationships and performance",
    "Coordinate with the financial management team",
    "Set board communication protocol",
    "Evaluate the operating role of the on-site office",
  ];

  const second30 = [
    "Activate routine inspection systems",
    "Reset vendor expectations and accountability",
    "Introduce response-time discipline",
    "Streamline maintenance workflow",
    "Improve reporting clarity to the board",
    "Strengthen alignment between operations and accounting",
    "Deliver initial visible property improvements",
  ];

  const third30 = [
    "Fully establish follow-through routines",
    "Maintain higher amenity standards",
    "Create a reliable communication rhythm",
    "Improve overall resident experience",
    "Identify longer-term planning priorities",
    "Restore stronger operational stability",
    "Set the foundation for continued improvement",
  ];

  return (
    <>
      <Head>
        <title>{page.pageTitle}</title>
        <meta name="description" content={page.metaDescription} />
      </Head>

      <main className="page">
        <section className="hero">
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />

          <div className="wrap">
            <div className="hero-top">
              <div className="hero-copy">
                <div className="eyebrow">{page.associationName}</div>

                <h1>
                  Board Decision
                  <br />
                  Overview
                </h1>

                <p className="lead">{page.heroLead}</p>
              </div>

              <div className="hero-logo">
                <Image
                  src="/logo.png"
                  alt="Stoutt Property Management"
                  width={420}
                  height={140}
                  priority
                />
              </div>
            </div>

            <div className="message-block">
              <p>{page.topMessage1}</p>
              <p>{page.topMessage2}</p>
              <p className="message-close">{page.topMessageClose}</p>
            </div>

            <div className="property-strip">
              <div className="property-pill">{page.address}</div>
              <div className="property-pill">{page.units}</div>
              <div className="property-pill">{page.office}</div>
              <div className="property-pill">{page.amenity1}</div>
              <div className="property-pill">{page.amenity2}</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">Leadership Perspective</div>
              <h2>
                This company is being built by someone who has already done the
                work at scale.
              </h2>
              <p>{page.leadershipIntro}</p>
            </div>

            <div className="grid-2">
              <article className="card glow-card">
                <div className="card-label">Experience</div>
                <h3>Proven in real operating environments.</h3>
                <p>
                  Boards want calm, experienced leadership when issues escalate.
                  They want a management partner who has seen complexity before,
                  knows how to prioritize, and understands that standards and
                  response time shape trust.
                </p>
              </article>

              <article className="card glow-card">
                <div className="card-label">Operating Style</div>
                <h3>Built on focus, stewardship, and disciplined execution.</h3>
                <p>
                  Stoutt Property Management is positioned around proactive
                  management, cleaner accountability, stronger systems, and a
                  service standard meant to reflect well on both the board and
                  the community it represents.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">Why This Matters</div>
              <h2>
                Boards do not hire history. They hire what that history
                produces.
              </h2>
              <p>{page.whyThisMatters}</p>
            </div>

            <div className="grid-3">
              <article className="card glow-card">
                <div className="card-label">For the Board</div>
                <h3>More confidence in leadership.</h3>
                <p>
                  The founder’s depth helps reassure directors that they are
                  selecting a company led by someone who understands operations,
                  communication standards, board dynamics, and reputation
                  management.
                </p>
              </article>

              <article className="card glow-card">
                <div className="card-label">For the Property</div>
                <h3>Higher standards become visible.</h3>
                <p>
                  Communities feel management quality in the details:
                  inspections, follow-up, professionalism, consistency, and how
                  quickly issues begin moving toward resolution.
                </p>
              </article>

              <article className="card glow-card">
                <div className="card-label">For the Future</div>
                <h3>Proven judgment supported by modern systems.</h3>
                <p>
                  What makes Stoutt Property Management different is the
                  combination of long operating experience with a deliberate move
                  toward intelligent, AI-enabled systems that very few
                  competitors are prepared to execute well.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">Property Reality</div>
              <h2>
                Where management quality becomes visible at {page.shortName}.
              </h2>
              <p>{page.propertyReality}</p>
            </div>

            <div className="grid-2">
              <article className="card glow-card">
                <div className="card-label">Operational Pressure Points</div>
                <h3>Small gaps become visible quickly.</h3>
                <ul className="gold-list">
                  {operationalPressurePoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card glow-card">
                <div className="card-label">Response + Follow-Through</div>
                <h3>Speed and clarity define perception.</h3>
                <ul className="gold-list">
                  {responsePoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="grid-2 top-gap">
              <article className="card glow-card">
                <div className="card-label">Leadership Continuity</div>
                <h3>Stability matters more when transitions have happened.</h3>
                <p>{page.transitionText}</p>
              </article>

              <article className="card glow-card">
                <div className="card-label">Financial Alignment</div>
                <h3>Operations and accounting must move together.</h3>
                <p>
                  When a community has recently changed financial partners or is
                  working through accounting adjustments, coordination between
                  operations and financial management becomes especially
                  important.
                </p>
              </article>
            </div>

            <div className="grid-2 top-gap">
              <article className="card glow-card">
                <div className="card-label">On-Site Presence</div>
                <h3>The office should function, not just exist.</h3>
                <p>
                  An on-site office should operate as an extension of
                  management, supporting residents, reinforcing standards, and
                  improving communication throughout the property.
                </p>
              </article>

              <article className="card glow-card">
                <div className="card-label">Board Burden</div>
                <h3>Directors should not have to carry operations.</h3>
                <p>
                  When management is not fully proactive, board members begin
                  absorbing responsibilities that should be handled
                  professionally. Over time, that becomes inefficient and
                  unsustainable.
                </p>
              </article>
            </div>

            <div className="statement-line">{page.statement1}</div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">90-Day Execution Plan</div>
              <h2>The first 90 days at {page.shortName}.</h2>
              <p>{page.planIntro}</p>
            </div>

            <div className="grid-3">
              <article className="card glow-card">
                <div className="card-label">Days 1–30</div>
                <h3>Stabilize and assess.</h3>
                <ul className="gold-list">
                  {first30.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card glow-card">
                <div className="card-label">Days 31–60</div>
                <h3>Implement and improve.</h3>
                <ul className="gold-list">
                  {second30.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card glow-card">
                <div className="card-label">Days 61–90</div>
                <h3>Stabilize and elevate.</h3>
                <ul className="gold-list">
                  {third30.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="statement-line">{page.statement2}</div>
          </div>
        </section>

        <section className="section final-section">
          <div className="wrap">
            <div className="final-panel">
              <div className="section-kicker">Next Step</div>
              <h2>
                If the board is evaluating management as a leadership decision,
                this is the level of execution to expect.
              </h2>
              <p>{page.finalClose}</p>

              <div className="actions">
                <a className="btn btn-gold" href={page.proposalUrl}>
                  Request a Proposal
                </a>
                <a className="btn btn-dark" href={page.founderStoryUrl}>
                  View Founder Story
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at top center, rgba(212, 175, 55, 0.13), transparent 24%),
            linear-gradient(180deg, #050b14 0%, #08111d 38%, #0b1522 100%);
          color: #f5f7fb;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        .wrap {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero,
        .section {
          position: relative;
        }

        .hero {
          padding: 110px 0 72px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .section {
          padding: 78px 0;
        }

        .section-alt {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.015) 0%,
            rgba(255, 255, 255, 0.025) 100%
          );
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hero-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(100px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-glow-1 {
          width: 320px;
          height: 320px;
          top: 30px;
          left: -40px;
          background: rgba(212, 175, 55, 0.18);
        }

        .hero-glow-2 {
          width: 260px;
          height: 260px;
          top: 0;
          right: 6%;
          background: rgba(212, 175, 55, 0.1);
        }

        .eyebrow,
        .section-kicker,
        .card-label {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 700;
          color: #d4af37;
        }

        .eyebrow {
          font-size: 0.78rem;
          margin-bottom: 18px;
        }

        .section-kicker {
          font-size: 0.76rem;
          margin-bottom: 14px;
        }

        .card-label {
          font-size: 0.72rem;
          margin-bottom: 14px;
        }

        h1,
        h2,
        h3 {
          margin: 0;
          color: #f8fafc;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        h1 {
          max-width: 760px;
          font-size: clamp(2.65rem, 5vw, 4.8rem);
          line-height: 0.98;
          margin-bottom: 20px;
        }

        h2 {
          max-width: 900px;
          font-size: clamp(2rem, 3vw, 3.15rem);
          line-height: 1.06;
          margin-bottom: 18px;
        }

        h3 {
          font-size: 1.35rem;
          line-height: 1.18;
          margin-bottom: 14px;
        }

        p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.78);
        }

        .lead {
          max-width: 860px;
          font-size: 1.16rem;
          line-height: 1.95;
          color: rgba(255, 255, 255, 0.84);
        }

        .hero-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
        }

        .hero-copy {
          flex: 1 1 700px;
          max-width: 760px;
        }

        .hero-logo {
          flex: 0 0 auto;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding-top: 8px;
        }

        .hero-logo :global(img) {
          width: 320px;
          height: auto;
          opacity: 0.98;
        }

        .message-block {
          max-width: 900px;
          margin-top: 28px;
          padding: 24px 26px;
          border-radius: 24px;
          border: 1px solid rgba(212, 175, 55, 0.22);
          background:
            linear-gradient(180deg, rgba(212, 175, 55, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.2),
            0 0 30px rgba(212, 175, 55, 0.08);
        }

        .message-block p {
          margin: 0 0 14px;
          color: rgba(255, 255, 255, 0.84);
        }

        .message-block p:last-child {
          margin-bottom: 0;
        }

        .message-close {
          color: #f1d27a !important;
          font-weight: 700;
          font-size: 1.08rem;
        }

        .property-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .property-pill {
          padding: 11px 16px;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.24);
          background: rgba(212, 175, 55, 0.08);
          color: #f2e2a0;
          font-size: 0.92rem;
          line-height: 1;
          white-space: nowrap;
        }

        .section-head {
          max-width: 930px;
          margin-bottom: 34px;
        }

        .grid-2,
        .grid-3 {
          display: grid;
          gap: 24px;
        }

        .grid-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .grid-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .top-gap {
          margin-top: 24px;
        }

        .card {
          position: relative;
          border-radius: 28px;
          padding: 30px 28px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.03) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .glow-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.55),
            rgba(212, 175, 55, 0.12),
            rgba(255, 255, 255, 0.06)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .glow-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          top: -60px;
          right: -40px;
          border-radius: 999px;
          background: rgba(212, 175, 55, 0.12);
          filter: blur(55px);
          pointer-events: none;
        }

        .gold-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0;
        }

        .gold-list li {
          position: relative;
          padding-left: 18px;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.72;
          font-size: 1rem;
        }

        .gold-list li::before {
          content: "";
          position: absolute;
          top: 11px;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4af37, #f0d37a);
          box-shadow: 0 0 14px rgba(212, 175, 55, 0.55);
        }

        .statement-line {
          margin-top: 34px;
          max-width: 980px;
          font-size: 1.08rem;
          line-height: 1.8;
          font-weight: 600;
          color: #f1d27a;
        }

        .final-section {
          padding-top: 78px;
          padding-bottom: 110px;
        }

        .final-panel {
          position: relative;
          padding: 38px 34px;
          border-radius: 32px;
          border: 1px solid rgba(212, 175, 55, 0.22);
          background:
            radial-gradient(circle at top right, rgba(212, 175, 55, 0.12), transparent 30%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.03) 100%);
          box-shadow:
            0 22px 50px rgba(0, 0, 0, 0.24),
            0 0 40px rgba(212, 175, 55, 0.08);
          overflow: hidden;
        }

        .final-panel h2 {
          max-width: 930px;
        }

        .final-panel p {
          max-width: 860px;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 28px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 56px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 0.98rem;
          font-weight: 700;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-gold {
          color: #08111d;
          background: linear-gradient(135deg, #d4af37 0%, #f0d37a 100%);
          box-shadow: 0 14px 30px rgba(212, 175, 55, 0.28);
        }

        .btn-dark {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.045);
        }

        @media (max-width: 980px) {
          .grid-2,
          .grid-3 {
            grid-template-columns: 1fr;
          }

          .hero {
            padding-top: 92px;
            padding-bottom: 64px;
          }

          .section,
          .final-section {
            padding: 68px 0;
          }

          .hero-top {
            flex-direction: column;
            gap: 28px;
          }

          .hero-copy {
            max-width: 100%;
          }

          .hero-logo {
            justify-content: flex-start;
          }

          .hero-logo :global(img) {
            width: 240px;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            width: min(100% - 24px, 1180px);
          }

          h1 {
            font-size: 2.5rem;
          }

          h2 {
            font-size: 1.9rem;
          }

          .card,
          .final-panel,
          .message-block {
            border-radius: 24px;
            padding: 26px 22px;
          }

          .actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .property-pill {
            white-space: normal;
          }
        }
      `}</style>
    </>
  );
}
