import Link from "next/link";

export default function HomeownerTraining() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main>
        <section className="relative px-6 py-16 text-center">
          <div className="mx-auto flex max-w-6xl justify-end">
            <Link
              href="/homeowner"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Return to Homeowner Dashboard
            </Link>
          </div>

          <p className="mt-10 mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            BOSai℠ Homeowner Training
          </p>

          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            Homeowner Welcome & Training Center
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            This page introduces homeowners to the BOSai℠ Homeowner Dashboard,
            account access, messages, notices, documents, payments, financial
            visibility, and Ava support tools designed to help homeowners stay
            informed and connected within their community.
          </p>
        </section>

        <section className="bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">Meet Glenn Stoutt</h2>

            <p className="mt-4 max-w-3xl text-slate-300">
              Before beginning dashboard training, homeowners are encouraged
              to watch the Founder introduction and understand the service,
              stewardship, transparency, and communication principles that
              form the foundation of the BOSai℠ ecosystem.
            </p>

            <VideoPlayer
              title="Meet the Founder: Glenn Stoutt"
              duration="5:49"
              src="https://bosai-media.s3.us-east-1.amazonaws.com/founder/glenn-stoutt-founder-introduction.mp4"
            />
          </div>
        </section>

        <section id="homeowner-video" className="bg-slate-950 px-6 py-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">
              Homeowner Dashboard Tutorial
            </h2>

            <p className="mt-4 max-w-3xl text-slate-300">
              This tutorial walks homeowners through the dashboard tools
              designed to provide account visibility, notices, documents,
              payments, communications, community information, and Ava support
              within the BOSai℠ platform.
            </p>

            <VideoPlayer
              title="Homeowner Dashboard Tutorial"
              duration="18:12"
              src="https://bosai-media.s3.us-east-1.amazonaws.com/training/homeowner-dashboard-tutorial.mp4"
            />
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">
              Homeowner Training Topics
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Dashboard Overview",
                "Account Information",
                "Messages",
                "Notices & Alerts",
                "Documents",
                "Payments",
                "Financial Visibility",
                "Ava Support",
                "Community Updates",
                "Profile Management",
                "Communication Tools",
                "Getting Help",
              ].map((topic) => (
                <div
                  key={topic}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
                >
                  <p className="font-semibold text-amber-300">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-white">
              Congratulations
            </h2>

            <p className="mt-4 text-slate-300">
              You have completed the BOSai℠ Homeowner Training Center and now
              have a foundational understanding of the Homeowner Dashboard,
              account visibility, communications, documents, notices,
              payments, and Ava support.
            </p>

            <div className="mt-8 space-y-3 text-slate-300">
              <p>✓ Founder Introduction</p>
              <p>✓ Homeowner Training</p>
              <p>✓ BOSai℠ Platform Overview</p>
              <p>✓ Homeowner Resources & Support</p>
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
        <p className="mt-2 text-amber-300">
          Duration: {duration}
        </p>
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
