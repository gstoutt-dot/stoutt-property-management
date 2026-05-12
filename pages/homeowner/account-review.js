import Link from "next/link";

export default function AccountReviewRequest() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            href="/homeowner"
            className="text-sm font-semibold text-yellow-300"
          >
            ← Back to Dashboard
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-yellow-400">
            Homeowner Account Review
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Request Account Review
          </h1>

          <p className="mt-4 text-slate-300">
            Use this page to request help reviewing your balance, payment
            history, statement, assessment, or account status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <p className="text-sm font-medium text-yellow-400">
            Review Request Details
          </p>

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="text-sm text-slate-300">Request Type</span>
              <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none">
                <option>Balance question</option>
                <option>Payment not showing</option>
                <option>Statement request</option>
                <option>Assessment question</option>
                <option>Late fee or delinquency question</option>
                <option>Other account question</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Message</span>
              <textarea
                rows={6}
                placeholder="Describe what you would like management to review..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <button
              type="button"
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
            >
              Submit Account Review Request
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
