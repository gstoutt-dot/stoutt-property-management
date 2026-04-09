import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA"; 
export default function ProposalPage() {
  const benefits = [
    "Direct conversation about your community’s needs",
    "Responsive, founder-led management approach",
    "Proactive systems and stronger operational follow-through",
    "Florida condominium and HOA management focus",
    "Clear next steps for boards considering a change",
    "A structured proposal process designed to move quickly",
  ];

  const requestItems = [
    "Community name and property type",
    "Number of units or homes",
    "City and county",
    "Current management situation",
    "Primary concerns or goals",
    "Best board contact information",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_38%),linear-gradient(180deg,#020617_0%,#020617_48%,#08111f_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Request a Proposal
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Start the proposal process for your community.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
                If your board is evaluating management options, we would welcome the
                opportunity to learn about your property, understand your priorities,
                and prepare a proposal aligned with your community’s needs.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#proposal-form" className={primaryBtn}>
                  Start Your Request
                </a>
                <a href="/services" className={secondaryBtn}>
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="proposal-form"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                What we need
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                A few details help us prepare the right proposal.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                The more clearly we understand your property, your concerns, and your
                goals, the better we can tailor a response that is relevant to your board.
              </p>

              <div className="mt-8 grid gap-4">
                {requestItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white">
                  Proposal Request Form
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Complete the form below and we’ll review your request.
                </p>
              </div>

              <form
                action="https://formspree.io/f/mwvwywgp"
                method="POST"
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Community Name
                    </label>
                    <input
                      type="text"
                      name="communityName"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                      placeholder="Enter community name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-yellow/40"
                      placeholder="Enter contact name"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      Number of Units / Homes
                    </label>
                    <input
                      type="text"
                      name="units"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                      placeholder="Enter number"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Property Type
                  </label>
                  <input
                    type="text"
                    name="propertyType"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                    placeholder="Condominium, HOA, townhome, etc."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">
                    Current Situation / Main Concerns
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/40"
                    placeholder="Tell us about your community, current management situation, and what your board is looking to improve."
                  />
                </div>

                <button type="submit" className={primaryBtn}>
                  Submit Proposal Request
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/60">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                What happens next
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                We review, evaluate, and respond with purpose.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Once your request is submitted, we review the information provided and
                determine the best next step for your board. Our goal is to make the
                process clear, efficient, and relevant to your community.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Review your property and board needs",
                "Evaluate fit, priorities, and service requirements",
                "Follow up with next-step communication",
                "Prepare a proposal process aligned with your community",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Prefer to talk first?
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  We’re happy to start with a conversation.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/75">
                  Some boards prefer to speak first before submitting property details.
                  That works too.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={secondaryBtn}>
                  Schedule a Conversation
                </a>
                <a href="/services" className={primaryBtn}>
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <StickyMobileCTA />
    </div>
  );
}
