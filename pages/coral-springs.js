export default function CoralSprings() {
  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          <a href="/" className="logo">Stoutt Property Management</a>
          <nav className="navlinks">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/broward">Broward</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="city-page">
        <section className="city-hero">
          <div className="container">
            <p className="eyebrow">Broward County</p>
            <h1>Coral Springs Property Management</h1>
            <p className="hero-copy">
              Proactive HOA and condominium management for communities that want
              stronger operations, better communication, and better financial control.
            </p>

            <div className="hero-actions">
              <a href="/contact" className="btn btn-primary">Request a Proposal</a>
              <a href="/broward" className="btn btn-secondary">Back to Broward</a>
            </div>
          </div>
        </section>

        <section className="city-section">
          <div className="container city-grid">
            <div className="city-copy">
              <p className="section-label">Why communities switch</p>
              <h2>Why associations in Coral Springs start looking for new management</h2>
              <p>
                Many boards are not looking for change just to make change. They start
                looking because too many important things begin slipping at the same time.
                Communication slows down. Follow-up becomes inconsistent. Collections lose
                momentum. Small issues stay unresolved too long and eventually become larger,
                more expensive problems.
              </p>
              <p>
                When that starts happening, boards want a company that is present, organized,
                accountable, and proactive.
              </p>
            </div>

            <div className="city-card">
              <h3>Common reasons for change</h3>
              <ul>
                <li>Slow response times to boards and residents</li>
                <li>Missed property follow-up and inspection issues</li>
                <li>Weak collections consistency</li>
                <li>Poor vendor coordination</li>
                <li>High turnover at larger management companies</li>
                <li>Lack of real board relationship-building</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="city-section city-section-alt">
          <div className="container city-grid">
            <div className="city-card">
              <h3>What Stoutt brings</h3>
              <ul>
                <li>Hands-on leadership</li>
                <li>Proactive communication</li>
                <li>Operational follow-through</li>
                <li>Stronger collections focus</li>
                <li>Systems-driven organization</li>
                <li>A relationship-first management style</li>
              </ul>
            </div>

            <div className="city-copy">
              <p className="section-label">Our approach</p>
              <h2>A more disciplined and proactive model for Coral Springs communities</h2>
              <p>
                Stoutt Property Management is built around experience, intelligent systems,
                and proactive execution. We believe communities perform better when the board
                has responsive support, clear communication, operational consistency, and a
                management company that sees issues early instead of reacting late.
              </p>
              <p>
                Our goal is simple: help your association operate more smoothly, protect the
                property, improve responsiveness, and strengthen financial stability.
              </p>
            </div>
          </div>
        </section>

        <section className="city-cta">
          <div className="container">
            <div className="cta-panel">
              <p className="section-label">Next step</p>
              <h2>Let’s review how your community is being managed now</h2>
              <p>
                We can evaluate your current structure, identify weak points, and show you
                what a stronger management approach can look like.
              </p>
              <a href="/contact" className="btn btn-primary">Schedule a Consultation</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
