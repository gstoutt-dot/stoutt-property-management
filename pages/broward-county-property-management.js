export default function BrowardCountyPropertyManagement() {
  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          <a href="/" className="logo">Stoutt Property Management</a>
          <nav className="navlinks">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/broward-county-property-management">Broward County</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="city-page">
        <section className="city-hero">
          <div className="container">
            <p className="eyebrow">South Florida Service Area</p>
            <h1>Broward County Property Management</h1>
            <p className="hero-copy">
              Stoutt Property Management provides proactive HOA and condominium
              management services throughout Broward County with a focus on
              stronger communication, better follow-through, financial discipline,
              and long-term community stability.
            </p>

            <div className="hero-actions">
              <a href="/contact" className="btn btn-primary">Request a Proposal</a>
              <a href="/services" className="btn btn-secondary">View Services</a>
            </div>
          </div>
        </section>

        <section className="city-section">
          <div className="container">
            <div className="city-copy" style={{ marginBottom: "32px" }}>
              <p className="section-label">Communities we serve</p>
              <h2>Broward County cities</h2>
              <p>
                We are building a stronger, more proactive model for associations
                across Broward County. Explore the city pages below to learn how
                Stoutt Property Management supports boards, owners, and communities
                with responsive service and disciplined execution.
              </p>
            </div>

            <div className="city-grid">
              <a href="/weston" className="city-card">
                <h3>Weston</h3>
                <p>
                  HOA and condominium management built around responsiveness,
                  operational control, and board communication.
                </p>
              </a>

              <a href="/miramar" className="city-card">
                <h3>Miramar</h3>
                <p>
                  Proactive property management for communities seeking better
                  structure, stronger follow-through, and improved service.
                </p>
              </a>

              <a href="/pompano-beach" className="city-card">
                <h3>Pompano Beach</h3>
                <p>
                  Focused management support for associations that want stronger
                  oversight, better vendor coordination, and consistency.
                </p>
              </a>

              <a href="/coconut-creek" className="city-card">
                <h3>Coconut Creek</h3>
                <p>
                  Systems-driven association management with attention to
                  communication, maintenance follow-up, and financial stability.
                </p>
              </a>

              <a href="/tamarac" className="city-card">
                <h3>Tamarac</h3>
                <p>
                  Management services designed to help boards operate more
                  efficiently and protect the long-term health of the community.
                </p>
              </a>

              <a href="/coral-springs" className="city-card">
                <h3>Coral Springs</h3>
                <p>
                  Proactive HOA and condominium management for communities that
                  want stronger operations, better communication, and better
                  financial control.
                </p>
              </a>

              <a href="/hallandale-beach" className="city-card">
                <h3>Hallandale Beach</h3>
                <p>
                  High-touch HOA and condo management for communities that expect
                  better follow-up, better systems, and a more proactive
                  management company.
                </p>
              </a>
            </div>
          </div>
        </section>

        <section className="city-section city-section-alt">
          <div className="container city-grid">
            <div className="city-copy">
              <p className="section-label">Why communities switch</p>
              <h2>Boards are looking for more than basic management</h2>
              <p>
                Many associations begin looking for a new management company when
                communication weakens, follow-through becomes inconsistent,
                collections slow down, and problems are handled too late instead
                of early. Over time, that affects confidence, operations, and the
                financial health of the community.
              </p>
              <p>
                Stoutt Property Management is built for associations that want a
                more disciplined, hands-on, and proactive management partner.
              </p>
            </div>

            <div className="city-card">
              <h3>What Stoutt brings</h3>
              <ul>
                <li>Proactive communication</li>
                <li>Hands-on leadership</li>
                <li>Operational follow-through</li>
                <li>Stronger collections focus</li>
                <li>Better vendor oversight</li>
                <li>Relationship-driven board support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="city-cta">
          <div className="container">
            <div className="cta-panel">
              <p className="section-label">Next step</p>
              <h2>Let’s talk about your Broward County community</h2>
              <p>
                If your association is exploring a change, we can review your
                current structure, identify weak points, and show you what a
                stronger management approach can look like.
              </p>
              <a href="/contact" className="btn btn-primary">Schedule a Consultation</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
