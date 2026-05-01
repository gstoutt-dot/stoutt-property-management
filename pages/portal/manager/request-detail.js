import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

export default function ManagerRequestDetail() {
  const timeline = [
    ["9:42 AM", "Ava received owner call and created intake record."],
    ["9:44 AM", "Request routed to Manager Intake Review."],
    ["9:51 AM", "Manager verification pending."],
  ];

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Manager Review File</p>
              <h1 className={bosTheme.title}>Pool Light Work Order</h1>
              <p className={bosTheme.subtitle}>
                Review the intake record, confirm responsibility, document the
                manager recommendation, and prepare the item for Board action.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/intake-review"
                className={bosTheme.secondaryButton}
              >
                Intake Review
              </Link>

              <Link
                href="/portal/manager/board-ready"
                className={bosTheme.primaryButton}
              >
                Send to Board Queue
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <div className="flex flex-wrap gap-2">
              <span className={bosTheme.badgeNeutral}>REQ-1048</span>
              <span className={bosTheme.badgeGold}>Work Order</span>
              <span className={bosTheme.badgeAmber}>High Priority</span>
              <span className={bosTheme.badgeGreen}>Ava Voice Intake</span>
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Pool light out near east gate
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Resident reported that the pool light near the east gate is out
              and the area is dark after sunset. Manager should verify whether
              the pool lighting is association responsibility, inspect the area,
              and determine if a vendor dispatch is required.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Resident</p>
                <p className={bosTheme.detailValue}>Maria Hernandez</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Unit</p>
                <p className={bosTheme.detailValue}>Unit 214</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Association</p>
                <p className={bosTheme.detailValue}>Harbor Pointe HOA</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Received</p>
                <p className={bosTheme.detailValue}>Today · 9:42 AM</p>
              </div>
            </div>
          </div>

          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Manager Decision
            </p>

            <div className="mt-5 space-y-3">
              <button className={bosTheme.goldButton}>Approve for Vendor</button>
              <button className={bosTheme.whiteButton}>Mark Board Ready</button>
              <button className={bosTheme.outlineButton}>
                Request More Info
              </button>
              <button className={bosTheme.outlineButton}>
                Assign Inspection
              </button>
            </div>
          </aside>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className={bosTheme.card}>
            <h2 className="text-xl font-semibold">Manager Notes</h2>

            <textarea
              className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-yellow-400/40"
              placeholder="Add manager review notes, inspection findings, or recommendation..."
            />

            <div className="mt-4 flex justify-end">
              <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-300">
                Save Notes
              </button>
            </div>
          </div>

          <div className={bosTheme.card}>
            <h2 className="text-xl font-semibold">Activity Timeline</h2>

            <div className="mt-5 space-y-4">
              {timeline.map(([time, text]) => (
                <div
                  key={time}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-xs text-yellow-400">{time}</p>
                  <p className="mt-1 text-sm text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
