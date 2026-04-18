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
  };

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
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #050b14;
          color: #f5f7fb;
          font-family: Inter, sans-serif;
        }

        .wrap {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .hero {
          padding: 110px 0 72px;
        }

        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 48px;
        }

        .hero-copy {
          max-width: 760px;
        }

        .hero-logo img {
          width: 320px;
          height: auto;
          opacity: 0.98;
        }

        .eyebrow {
          color: #d4af37;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.78rem;
        }

        h1 {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .lead {
          font-size: 1.16rem;
          color: rgba(255, 255, 255, 0.84);
        }

        .message-block {
          margin-top: 28px;
        }

        .property-strip {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        .property-pill {
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(212, 175, 55, 0.1);
          color: #f2e2a0;
        }

        @media (max-width: 980px) {
          .hero-top {
            flex-direction: column;
          }

          .hero-logo img {
            width: 240px;
          }
        }
      `}</style>
    </>
  );
}
