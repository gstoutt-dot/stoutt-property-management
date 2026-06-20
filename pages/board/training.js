import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

export default function BoardTraining() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main>
        <section className="px-6 py-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            BOSai℠ Board Training
          </p>

          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            Board Dashboard Training Center
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            This page introduces board members to the BOSai℠ Board Dashboard,
association communications, approvals, financial visibility,
education resources, and the operational workflows that support
effective community leadership within the BOSai℠ platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#board-video"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Start Board Training
            </a>

            <Link
              href="/getting-started"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-900"
            >
              BOSai℠ Welcome Center
            </Link>
          </div>
        </section>

        <section className="bg-white px-6 py-16 text-slate-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Meet Glenn Stoutt</h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              Before beginning dashboard training, board members are encouraged
to watch the Founder introduction and understand the leadership,
stewardship, service, and operational principles that form the
foundation of the BOSai℠ ecosystem.
            </p>

            <VideoPlaceholder
              title="Stoutt Property Management - Meet the Founder Glenn Stoutt"
              duration="5:49"
              note="Founder video uploaded to BOSai Media Platform. Playback connection will be added after CloudFront/S3 delivery is configured."
            />
          </div>
        </section>

        <section id="board-video" className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Board Dashboard Tutorial</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              This tutorial walks board members through the dashboard tools
designed to support governance, decision-making, communications,
approvals, financial visibility, documents, education, and
community leadership within the BOSai℠ platform.
            </p>

            <VideoPlaceholder
              title="Board Dashboard Tutorial"
              duration="9:19"
              note="board-dashboard-tutorial.mp4 is stored in the BOSai Media Platform training folder."
              dark
            />
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-16">
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
                  className="rounded-2xl border border-slate-700 bg-slate-950 p-6"
                >
                  <p className="font-semibold">{topic}</p>
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

        <section className="bg-white px-6 py-16 text-slate-900">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-3xl font-bold">Board Resources</h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              BOSai℠ supports board members with education, compliance
resources, communication tools, operational visibility, and
the tools necessary to fulfill their fiduciary responsibilities
within their community.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/board-resources"
                className="rounded-xl bg-slate-950 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
              >
                Board Resources
              </Link>

              <Link
                href="/bosai-library"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-white"
              >
                BOSai℠ Legacy Library
              </Link>

              <Link
                href="/board/dashboard"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-white"
              >
                Return to Board Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function VideoPlaceholder({ title, duration, note, dark = false }) {
  return (
    <div
      className={`mt-8 rounded-2xl border p-8 text-center ${
        dark
          ? "border-slate-700 bg-slate-900 text-white"
          : "border-slate-200 bg-slate-100 text-slate-900"
      }`}
    >
      <p className="text-xl font-bold">{title}</p>
      <p className={dark ? "mt-2 text-slate-300" : "mt-2 text-slate-600"}>
        Duration: {duration}
      </p>
      <p className={dark ? "mt-4 text-sm text-slate-400" : "mt-4 text-sm text-slate-500"}>
        {note}
      </p>
    </div>
  );
}
