import Link from "next/link";

export default function ArchitecturalReviewRequests() {
  const requests = [
    {
      id: "ARC-3012",
      title: "Impact window replacement",
      status: "BOD Review",
      submitted: "Apr 25, 2026",
      deadline: "May 15, 2026",
      update: "Application received. Waiting for board review.",
    },
    {
      id: "ARC-3007",
      title: "Front door color change",
      status: "More Info Needed",
      submitted: "Apr 21, 2026",
      deadline: "May 8, 2026",
      update: "Color sample and contractor details requested.",
    },
    {
      id: "ARC-2998",
      title: "Patio tile replacement",
      status: "Approved",
      submitted: "Apr 10, 2026",
      deadline: "Completed",
      update: "Request approved with standard conditions.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Architectural Review Requests
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Submit exterior modification requests, upload supporting
                documents, and track board or committee approval status.
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

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Open Requests", "2"],
            ["Pending Info", "1"],
            ["Approved", "1"],
            ["Denied", "0"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 text-4xl font-bold text-yellow-400">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-yellow-400">
              Architectural Requests
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Current Submissions
            </h2>
          </div>

          <div className="space-y-5">
            {requests.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{item.id}</p>
                    <h3 className="mt-2 text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {item.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Submitted</span>
                    <span>{item.submitted}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Decision</span>
                    <span>{item.deadline}</span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
                  {item.update}
                </div>

                <button className="mt-5 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                  View Request Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Submit New Request
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Start an architectural application
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm text-slate-300">Request Type</label>
                <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-400">
                  <option>Window / Door Replacement</option>
                  <option>Paint Color Change</option>
                  <option>Patio / Flooring Modification</option>
                  <option>Fence / Screen Enclosure</option>
                  <option>Landscape Modification</option>
                  <option>Other Exterior Change</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-300">Project Title</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
                  placeholder="Example: Replace front entry door"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">
                  Project Description
                </label>
                <textarea
                  rows="5"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
                  placeholder="Describe the proposed work, materials, colors, contractor, and location."
                />
              </div>

              <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900 px-4 py-4 text-sm text-slate-400">
                Upload plans, photos, permits, color samples, contractor
                documents, or supporting files coming soon.
              </div>

              <button className="w-full rounded-2xl bg-yellow-400 px-5 py-4 font-semibold text-slate-950 hover:bg-yellow-300">
                Submit Architectural Request
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Review Timeline
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Application submitted",
                "Documents checked for completeness",
                "Management review",
                "BOD / ARC committee review",
                "Decision issued",
                "Owner receives approval conditions",
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-medium">{step}</p>
                    <p className="text-sm text-slate-400">
                      Step {index + 1} of architectural review process
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ask Ava Before You Submit
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Not sure what needs approval?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can review the association rules, architectural standards, and
              governing documents to help explain what may be required before
              work begins.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
