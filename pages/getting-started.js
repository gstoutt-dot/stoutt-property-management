import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main>
        <section className="px-6 py-20 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            BOSai℠ Getting Started
          </p>

          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            Welcome to the BOSai℠ Onboarding Experience
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            Leadership. Stewardship. Service. The BOSai℠ platform brings
            boards, managers, homeowners, education, communications, documents,
            accounting, and Ava together into one operating ecosystem.
          </p>

          <div className="mt-10">
            <a
              href="#training-center"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:bg-amber-300"
            >
              Begin Your Journey
            </a>
          </div>
        </section>

        <section className="bg-white px-6 py-16 text-slate-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Meet Glenn Stoutt</h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              Founder of Stoutt Property Management and creator of the BOSai℠
              Method, Glenn Stoutt introduces the purpose, background, and
              leadership philosophy behind the platform.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center">
              <p className="font-semibold">
                Founder Introduction Video
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Stoutt Property Management - Meet the Founder Glenn Stoutt
                <br />
                5:49
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Video file uploaded to BOSai Media Platform. Playback connection
                will be added after CloudFront/S3 delivery is configured.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">The BOSai℠ Method</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              BOSai℠ is built on leadership, stewardship, service, alignment,
              transparency, education, and operational excellence.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-5">
              {[
                "Leadership",
                "Stewardship",
                "Service",
                "Alignment",
                "Operational Excellence",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center"
                >
                  <p className="font-semibold text-amber-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">What Makes BOSai℠ Different</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              BOSai℠ is more than property management software. It is an
              operating system for community association leadership,
              communication, financial visibility, education, and service.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Role-based dashboards",
                "Ava AI support",
                "Integrated notifications",
                "Board education",
                "Financial visibility",
                "Scalable software architecture",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-700 bg-slate-950 p-6"
                >
                  <p className="font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="training-center" className="bg-white px-6 py-16 text-slate-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Training Center</h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              Select the training path that matches your role in the BOSai℠
              operating ecosystem.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <TrainingCard
                title="Board Members"
                duration="9:19"
                description="Learn how the Board Dashboard supports oversight, approvals, education, communications, and association leadership."
                href="/board/training"
                button="Open Board Training"
              />

              <TrainingCard
                title="Managers"
                duration="32:32"
                description="Learn how the Manager Dashboard supports daily operations, notifications, work orders, documents, and association workflows."
                href="/manager/training"
                button="Open Manager Training"
              />

              <TrainingCard
                title="Homeowners"
                duration="18:12"
                description="Learn how homeowners access account information, documents, messages, notifications, and Ava support."
                href="/homeowner/training"
                button="Open Homeowner Training"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold">The BOSai℠ Legacy Library</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              The BOSai℠ Legacy Library provides the educational foundation
              behind the method, platform, operations model, financial
              intelligence, enterprise structure, and leadership legacy.
            </p>

            <div className="mt-8">
              <Link
                href="/bosai-library"
                className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
              >
                Explore the BOSai℠ Legacy Library
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Coming Soon
            </p>
            <h2 className="text-3xl font-bold">BOSai Software</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              The future BOSai Software platform will extend this operating
              ecosystem into a standalone software company serving boards,
              managers, CAMs, homeowners, and community associations.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Board Portal",
                "Manager Portal",
                "CAM Portal",
                "Homeowner Portal",
                "Ava AI",
                "Training Library",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-700 bg-slate-950 p-6"
                >
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TrainingCard({ title, duration, description, href, button }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
        {duration}
      </p>
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-slate-700">{description}</p>

      <div className="mt-6">
        <Link
          href={href}
          className="inline-block rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}
