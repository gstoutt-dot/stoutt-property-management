import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";

export default function ManagerTraining() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main>
        <section className="px-6 py-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            BOSai℠ Manager Training
          </p>

          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            Manager Dashboard Training Center
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            This page introduces managers to the BOSai℠ Manager Dashboard,
            daily operations, work orders, notifications, communications,
            vendors, documents, financial visibility, and association workflows.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#manager-video"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Start Manager Training
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
              Before beginning dashboard training, managers are encouraged to
              watch the Founder introduction and understand the leadership,
              stewardship, service, and operational philosophy behind BOSai℠.
            </p>

            <VideoPlaceholder
              title="Stoutt Property Management - Meet the Founder Glenn Stoutt"
              duration="5:49"
              note="Founder video uploaded to BOSai Media Platform. Playback connection will be added after CloudFront/S3 delivery is configured."
            />
          </div>
        </section>

        <section id="manager-video" className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Manager Dashboard Tutorial</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              This tutorial walks managers through the operational dashboard
              tools designed to support association management, daily workflow,
              homeowner communication, vendor coordination, notifications,
              documents, and financial awareness.
            </p>

            <VideoPlaceholder
              title="Manager Dashboard Tutorial"
              duration="32:32"
              note="manager-dashboard-tutorial.mp4 is stored in the BOSai Media Platform training folder."
              dark
            />
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Manager Training Topics</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Manager Dashboard Overview",
                "Work Orders",
                "Notifications",
                "Communications",
                "Vendor Management",
                "Documents",
                "Violation Workflows",
                "Accounting Visibility",
                "Association Management",
                "Operational Records",
                "Board Coordination",
                "Homeowner Support",
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

        <section className="bg-white px-6 py-16 text-slate-900">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-3xl font-bold">Manager Resources</h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              BOSai℠ supports managers with operational visibility, role-based
              dashboard tools, homeowner communication systems, vendor
              coordination, document access, and association-specific workflows.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/getting-started"
                className="rounded-xl bg-slate-950 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
              >
                BOSai℠ Welcome Center
              </Link>

              <Link
                href="/bosai-library"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-white"
              >
                BOSai℠ Legacy Library
              </Link>

              <Link
                href="/manager/dashboard"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-white"
              >
                Return to Manager Dashboard
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
      <p
        className={
          dark ? "mt-4 text-sm text-slate-400" : "mt-4 text-sm text-slate-500"
        }
      >
        {note}
      </p>
    </div>
  );
}
