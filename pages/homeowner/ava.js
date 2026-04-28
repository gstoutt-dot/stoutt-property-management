import Link from "next/link";

export default function HomeownerAva() {
  const quickActions = [
    "Explain my balance",
    "Check a work order",
    "Ask about a rule",
    "Start a maintenance request",
    "Review an ARC request",
    "Contact management",
  ];

  const activity = [
    "Explained pool maintenance notice",
    "Checked work order WO-1047",
    "Summarized ARC application requirements",
    "Located Rules & Regulations document",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.20),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Ava AI Assistant
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Ask questions, understand association rules, check account
                activity, review notices, and get help with common homeowner
                requests.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex items-center gap-4 border-b border-white/10 pb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-bold text-slate-950">
              A
            </div>

            <div>
              <p className="text-sm text-yellow-400">Ava is online</p>
              <h2 className="text-2xl font-semibold">
                How can I help today?
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="max-w-[85%] rounded-3xl rounded-tl-sm bg-slate-900 p-5 text-sm leading-6 text-slate-300">
              Hello. I’m Ava, your association assistant. I can help explain
              notices, locate documents, check service requests, review balances,
              and guide you to the right next step.
            </div>

            <div className="ml-auto max-w-[85%] rounded-3xl rounded-tr-sm bg-yellow-400 p-5 text-sm leading-6 text-slate-950">
              Can you help me understand whether I need approval before changing
              my front door color?
            </div>

            <div className="max-w-[85%] rounded-3xl rounded-tl-sm bg-slate-900 p-5 text-sm leading-6 text-slate-300">
              Yes. Exterior color changes commonly require review under the
              architectural standards. I can check the association documents,
              identify the relevant section, and help you start the request.
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-4">
            <textarea
              rows="4"
              className="w-full resize-none bg-transparent text-white outline-none placeholder:text-slate-500"
              placeholder="Ask Ava anything about your association, account, documents, notices, or requests..."
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Ava may escalate requests to management when needed.
              </p>

              <button className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
                Send Message
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Quick Actions
            </p>

            <div className="mt-5 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Association Knowledge Base
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Ava can reference association documents
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can assist using uploaded governing documents, rules,
              architectural standards, FAQs, meeting notices, and account-related
              information when available.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Recent Ava Activity
            </p>

            <div className="mt-5 space-y-4">
              {activity.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Escalate to Management
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              If Ava cannot resolve the question, she can route the request to
              management for review and follow-up.
            </p>

            <button className="mt-5 w-full rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
              Request Management Follow-Up
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
