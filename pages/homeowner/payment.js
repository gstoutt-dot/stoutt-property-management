import Link from "next/link";

const balanceItems = [
  { label: "Monthly Assessment", amount: "$350.00" },
  { label: "Late Fee", amount: "$25.00" },
  { label: "Pool Special Assessment", amount: "$110.00" },
];

export default function HomeownerPaymentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Stoutt Property Management"
              className="h-16 w-auto object-contain lg:h-20"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/homeowner-dashboard">Dashboard</Link>
            <Link href="/homeowner/ledger">Ledger</Link>
            <Link href="/homeowner/payment" className="text-amber-300">
              Payments
            </Link>
            <Link href="/homeowner/documents">Documents</Link>
          </nav>

          <Link
            href="/homeowner-login"
            className="rounded-full border border-amber-400/40 bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Sign Out
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Secure Payments
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Make a Payment
              </h1>
              <p className="mt-3 text-lg text-white/65">
                Environ Towers I — Unit 1204
              </p>
            </div>

            <Link
              href="/homeowner/ledger"
              className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Back to Ledger
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Current Balance Due
                </p>
                <h2 className="mt-4 text-5xl font-semibold text-white">
                  $485.00
                </h2>

                <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
                  {balanceItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-white/10 px-5 py-4 last:border-b-0"
                    >
                      <span className="text-white/70">{item.label}</span>
                      <span className="font-semibold text-white">
                        {item.amount}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between bg-white/[0.06] px-5 py-5">
                    <span className="font-semibold text-white">Total Due</span>
                    <span className="text-xl font-semibold text-amber-300">
                      $485.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Payment Amount
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {["Pay Full Balance", "Pay Current Assessment", "Custom Amount"].map(
                    (option) => (
                      <button
                        key={option}
                        className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-left text-sm font-semibold text-white transition hover:border-amber-400/50 hover:bg-slate-900"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Custom Amount
                  </label>
                  <input
                    type="text"
                    placeholder="$0.00"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Payment Method
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <button className="rounded-2xl border border-amber-400/40 bg-amber-400 px-5 py-5 text-left text-sm font-semibold text-slate-950">
                    ACH Bank Transfer
                    <span className="mt-2 block text-xs font-medium text-slate-800">
                      Recommended / lower cost
                    </span>
                  </button>

                  <button className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-5 text-left text-sm font-semibold text-white transition hover:border-amber-400/50">
                    Credit or Debit Card
                    <span className="mt-2 block text-xs font-medium text-white/50">
                      Convenience fee may apply
                    </span>
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Account Holder Name
                    </label>
                    <input className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Routing Number
                    </label>
                    <input className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Account Number
                    </label>
                    <input className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400" />
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-amber-400/25 bg-amber-400 p-7 text-slate-950">
                <p className="text-sm font-bold uppercase tracking-[0.25em]">
                  Review Payment
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <strong>$485.00</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Method</span>
                    <strong>ACH</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <strong>$0.00</strong>
                  </div>
                  <div className="border-t border-slate-950/20 pt-4 flex justify-between text-lg">
                    <span>Total</span>
                    <strong>$485.00</strong>
                  </div>
                </div>

                <button className="mt-7 w-full rounded-full bg-slate-950 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02]">
                  Submit Payment
                </button>

                <p className="mt-4 text-xs leading-5 text-slate-800">
                  Card payments may include a processing fee. ACH payments may
                  have lower or no processing fees.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Payment Security
                </p>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  Payment information will be processed through a secure payment
                  provider. Ava will never ask for full banking or card numbers
                  by voice.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
