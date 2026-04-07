export default function Proposal() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.38em] text-cyan-300">
              Request a Proposal
            </div>
            <div className="text-2xl font-semibold">
              Stoutt Property Management
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-20">

        {/* HERO */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Thinking About Changing Management Companies?
          </h1>

          <p className="text-lg text-slate-400 leading-8">
            We’ll review your current setup and show you exactly where communication,
            operations, and financial performance can improve.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            No obligation. No pressure. Just clarity.
          </p>
        </section>

        {/* TRUST STRIP */}
        <section className="mb-12 text-center text-sm text-slate-400">
          <div className="flex flex-wrap justify-center gap-6">
            <span>✔ 82 Associations Managed</span>
            <span>✔ $500M+ Assets Overseen</span>
            <span>✔ 30+ Years Experience</span>
          </div>
        </section>

        {/* FORM */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
  <form
  action=https://formspree.io/f/mwvwywgp
  method="POST"
  className="space-y-6"
>
  <input type="hidden" name="_next" value="https://stoutt-property-management.vercel.app/proposal" />

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    className="w-full p-4 rounded-lg bg-black border border-white/10"
  />

  <input
    type="email"
    name="email"
    placeholder="Email Address"
    required
    className="w-full p-4 rounded-lg bg-black border border-white/10"
  />

  <input
    type="text"
    name="association"
    placeholder="Association Name"
    className="w-full p-4 rounded-lg bg-black border border-white/10"
  />

  <input
    type="text"
    name="units"
    placeholder="Number of Units"
    className="w-full p-4 rounded-lg bg-black border border-white/10"
  />

  <textarea
    name="issues"
    placeholder="What challenges are you currently experiencing?"
    rows="5"
    className="w-full p-4 rounded-lg bg-black border border-white/10"
  />

  <button
    type="submit"
    className="w-full rounded-full bg-white py-4 text-black font-semibold hover:scale-[1.02] transition"
  >
    Request Proposal
  </button>
</form>
</section>

      </main>
    </div>
  );
}
