import Link from "next/link";

export default function HomeownerWorkOrders() {
  const openRequests = [
    {
      id: "WO-1047",
      title: "Pool light not working",
      category: "Common Area",
      status: "In Review",
      priority: "Medium",
      date: "Apr 28, 2026",
      update: "Ava reviewed the request and routed it to management.",
    },
    {
      id: "WO-1039",
      title: "Irrigation leak near building entrance",
      category: "Landscape",
      status: "Vendor Assigned",
      priority: "High",
      date: "Apr 26, 2026",
      update: "Vendor dispatch pending confirmation.",
    },
    {
      id: "WO-1028",
      title: "Gate access keypad issue",
      category: "Access Control",
      status: "Scheduled",
      priority: "Medium",
      date: "Apr 22, 2026",
      update: "Technician visit scheduled.",
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
                Homeowner Portal
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Work Orders & Service Requests
              </h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                Submit maintenance requests, track ticket status, review updates,
                and get AI-powered assistance from Ava.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-yellow-400">
                Submit New Request
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Tell us what needs attention
              </h2>
            </div>
            <div className="rounded-2xl bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
              AI Assisted
            </div>
          </div>

          <form className="mt-6 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300">Request Type</label>
                <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-400">
                  <option>Common Area Maintenance</option>
                  <option>Landscape / Irrigation</option>
                  <option>Lighting / Electrical</option>
                  <option>Gate / Access Control</option>
                  <option>Plumbing</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-300">Priority</label>
                <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-400">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300">Request Title</label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
                placeholder="Example: Pool light not working"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Description</label>
              <textarea
                rows="5"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
                placeholder="Describe the issue, location, timing, and any helpful details."
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300">Location</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
                  placeholder="Building, unit, common area, etc."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Photo Upload</label>
                <div className="mt-2 rounded-2xl border border-dashed border-white/15 bg-slate-900 px-4 py-3 text-sm text-slate-400">
                  Upload photo coming soon
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-yellow-400 px-5 py-4 font-semibold text-slate-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300"
            >
              Submit Service Request
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Emergency Instructions
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              For urgent safety or property emergencies
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              For fire, medical, police, active leaks, elevator entrapment, or
              immediate life-safety concerns, call 911 or the appropriate
              emergency service first. Then submit a request so management can
              document and coordinate follow-up.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Ask Ava for Maintenance Help
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Not sure who handles it?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can help determine whether an issue may be homeowner,
              association, vendor, or management responsibility based on the
              association’s documents and rules.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Request Timeline
            </p>

            <div className="mt-5 space-y-4">
              {[
  "Request submitted",
  "Ava reviews issue details",
  "Management verifies responsibility",
  "BOD approval if required",
  "Vendor assigned if needed",
  "Resident receives status updates",
].map((item, index) => (
  <div key={item} className="flex gap-4">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-slate-950">
      {index + 1}
    </div>

    <div>
      <p className="font-medium">{item}</p>

      <p className="text-sm text-slate-400">
        Step {index + 1} of the service request process
      </p>
    </div>
  </div>
))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-yellow-400">
              Open Requests
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Active ticket status
            </h2>
          </div>
          <p className="text-sm text-slate-400">3 open requests</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {openRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-yellow-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{request.id}</p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {request.title}
                  </h3>
                </div>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {request.priority}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Category</span>
                  <span>{request.category}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Status</span>
                  <span className="text-yellow-300">{request.status}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Submitted</span>
                  <span>{request.date}</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
                {request.update}
              </div>

              <button className="mt-5 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/50 hover:text-yellow-300">
                View Ticket Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
