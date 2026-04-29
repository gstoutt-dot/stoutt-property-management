import Link from "next/link";

export default function BoardViolationsReview() {
  const cases = [
    {
      id: "V-2204",
      property: "Unit 204",
      issue: "Landscape Maintenance Notice",
      status: "Pending Board Review",
      deadline: "May 5, 2026",
      recommendation: "Courtesy extension recommended",
    },
    {
      id: "V-2198",
      property: "Unit 118",
      issue: "Parking Violation Warning",
      status: "Fine Consideration",
      deadline: "May 2, 2026",
      recommendation: "Review owner response before decision",
    },
    {
      id: "V-2187",
      property: "Unit 311",
      issue: "Unapproved Exterior Modification",
      status: "Hearing Eligible",
      deadline: "May 10, 2026",
      recommendation: "Schedule committee or board hearing",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Board Member Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Violations Review
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Review compliance cases, owner responses, hearing status,
                recommendations, and board decision actions.
              </p>
            </div>

            <Link
              href="/board"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Pending Review", "12"],
            ["Owner Responses", "4"],
            ["Hearing Eligible", "3"],
            ["Fine Decisions", "2"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 text-3xl font-bold text-yellow-400">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-yellow-400">
              Compliance Cases
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Board Review Queue
            </h2>
          </div>

          <div className="space-y-5">
            {cases.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      {item.id} • {item.property}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {item.issue}
                    </h3>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {item.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">Deadline</span>
                    <span>{item.deadline}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">Recommendation</span>
                    <span className="text-right text-yellow-300">
                      {item.recommendation}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
                    Review Case
                  </button>

                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                    View Owner Response
                  </button>

                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                    Ask Ava
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Board Decision Actions
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Issue courtesy extension",
                "Mark corrected / resolved",
                "Request additional information",
                "Schedule hearing",
                "Recommend fine",
                "Escalate to legal review",
              ].map((action) => (
                <button
                  key={action}
                  className="block w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Review Timeline
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Violation notice issued",
                "Owner response received",
                "Management prepares summary",
                "Board / committee review",
                "Decision recorded",
                "Owner notified",
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-medium">{step}</p>
                    <p className="text-sm text-slate-400">
                      Step {index + 1} of board compliance review
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ava Board Assistant
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Summarize cases before the meeting
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can summarize the notice history, owner response, applicable
              governing language, deadlines, and recommended next steps for
              board review.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava for Case Summary
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
