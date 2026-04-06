export default function HallandaleBeach() {
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
            <p className="eyebrow">Broward County</p>
            <h1>Hallandale Beach Property Management</h1>
            <p className="hero-copy">
              High-touch HOA and condo management for communities that expect better follow-up,
              better systems, and a more proactive management company.
            </p>

            <div className="hero-actions">
              <a href="/contact" className="btn btn-primary">Request a Proposal</a>
              <a
                href="/broward-county-property-management"
                className="btn btn-secondary"
              >
                Back to Broward County
              </a>
            </div>
          </div>
        </section>

        <section className="city-section">
          <div className="container city-grid">
            <div className="city-copy">
              <p className="section-label">Why communities switch</p>
              <h2>Why boards in Hallandale Beach start exploring new management</h2>
              <p>
                Boards usually begin looking for a new management company after repeated
                frustration. Communication becomes inconsistent. Issues stay open too long.
                Vendor oversight weakens. Financial follow-through is not strong enough.
                Residents feel it. Board members feel it. Confidence starts to drop.
              </p>
              <p>
                At that point, communities want more than basic administration. They want
                leadership, responsiveness, structure, and dependable execution.
              </p>
            </div>

            <div className="city-card">
              <h3>Common reasons for change</h3>
              <ul>
                <li>Delayed responses to owner and board concerns</li>
                <li>Reactive instead of proactive management</li>
                <li>Weak vendor oversight</li>
                <li>Inconsistent communication</li>
                <li>Collections and follow-up not moving fast enough</li>
                <li>Too little personal attention from management</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="city-section city-section-alt">
          <div className="container city-grid">
            <div className="city-card">
              <h3>What Stoutt brings</h3>
              <ul>
                <li>Proactive property management</li>
                <li>Hands-on operational oversight</li>
                <li>Clear board communication</li>
                <li>Stronger accountability systems</li>
                <li>Focused collections support</li>
                <li>Long-term community-minded leadership</li>
              </ul>
            </div>

            <div className="city-copy">
              <p className="section-label">Our approach</p>
              <h2>Management built on experience, discipline, and follow-through</h2>
              <p>
                Stoutt Property Management combines hands-on experience with intelligent
                systems and a proactive operating style. We believe associations should not
                have to chase their management company for answers, updates, or action.
              </p>
              <p>
                We work to create stability, improve responsiveness, strengthen operations,
                and help boards feel supported by a management company that is truly engaged.
              </p>
            </div>
          </div>
        </section>

        <section className="city-cta">
          <div className="container">
            <div className="cta-panel">
              <p className="section-label">Next step</p>
              <h2>See what a stronger management structure could look like</h2>
              <p>
                Let’s review your current management approach and identify opportunities to
                improve service, operations, and financial performance.
              </p>
              <a href="/contact" className="btn btn-primary">Schedule a Consultation</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
