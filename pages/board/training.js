import Link from "next/link";

export default function BoardTraining() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      <main>
        <section className="relative px-6 py-16 text-center">
          <div className="mx-auto flex max-w-6xl justify-end">
            <Link
              href="/board"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Return to Board Dashboard
            </Link>
          </div>

          <p className="mt-10 mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            BOSai℠ Board Training
          </p>

          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            Board Member Training Center
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            This page introduces board members to the BOSai℠ Board Dashboard,
            association communications, approvals, financial visibility,
            education resources, and the operational workflows that support
            effective community leadership within the BOSai℠ platform.
          </p>
        </section>

        <section className="bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">Meet Glenn Stoutt</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              Before beginning dashboard training, board members are encouraged
              to watch the Founder introduction and understand the leadership,
              stewardship, service, and operational principles that form the
              foundation of the BOSai℠ ecosystem.
            </p>

            <VideoPlayer
              title="Meet the Founder: Glenn Stoutt"
              duration="5:49"
              src="https://bosai-media.s3.us-east-1.amazonaws.com/founder/glenn-stoutt-founder-introduction.mp4"
            />
          </div>
        </section>

        <section id="board-video" className="bg-slate-950 px-6 py-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">Board Dashboard Tutorial</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              This tutorial walks board members through the dashboard tools
              designed to support governance, decision-making, communications,
              approvals, financial visibility, documents, education, and
              community leadership within the BOSai℠ platform.
            </p>

            <VideoPlayer
              title="Board Dashboard Tutorial"
              duration="9:19"
              src="https://bosai-media.s3.us-east-1.amazonaws.com/training/board-dashboard-tutorial.mp4"
            />
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Board Training Topics</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Board Dashboard Overview",
                "Approval Queue",
                "Board Messages",
                "Notifications",
                "Financial Reports",
                "Documents",
                "Education Center",
                "Florida Compliance Resources",
                "Ava & Operational Support",
              ].map((topic) => (
                <div
                  key={topic}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
                >
                  <p className="font-semibold text-amber-300">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-white">Congratulations</h2>

            <p className="mt-4 text-slate-300">
              You have completed the BOSai℠ Board Member Training Center and
              now have a foundational understanding of the Board Dashboard,
              communications, approvals, notifications, financial visibility,
              education resources, and association operations.
            </p>

            <div className="mt-8 space-y-3 text-slate-300">
              <p>✓ Founder Introduction</p>
              <p>✓ Board Member Training</p>
              <p>✓ BOSai℠ Platform Overview</p>
              <p>✓ Board Leadership Resources</p>
            </div>

            <p className="mt-8 text-slate-400">
              Welcome to the BOSai℠ operating ecosystem.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function VideoPlayer({ title, duration, src }) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-6 text-white">
      <div className="mb-4 text-center">
        <p className="text-xl font-bold">{title}</p>
        <p className="mt-2 text-amber-300">Duration: {duration}</p>
      </div>

      <video
        className="w-full rounded-xl border border-slate-800 bg-black"
        controls
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
