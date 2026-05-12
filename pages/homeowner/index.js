import { useEffect, useState } from "react";
import Link from "next/link";

const ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const OWNER_USER_ID = "2576c2a8-e49e-4009-9d07-10aba3c63090";
const UNIT_NUMBER = "101";

function money(value) {
  const amount = Number(value || 0);
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function prettyDate(value) {
  if (!value) return "Not available";
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomeownerLedger() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadBalance() {
      try {
        const response = await fetch(
          `/api/accounting/owner-balance?associationId=${ASSOCIATION_ID}&ownerUserId=${OWNER_USER_ID}&unitNumber=${UNIT_NUMBER}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Unable to load ledger.");
        }

        setBalance(data.balance);
      } catch (error) {
        setLoadError(error.message || "Unable to load ledger.");
      } finally {
        setLoading(false);
      }
    }

    loadBalance();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            href="/homeowner"
            className="text-sm font-semibold text-yellow-300"
          >
            ← Back to Dashboard
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-yellow-400">
            Ledger & Payments
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Account Ledger
          </h1>

          <p className="mt-4 text-slate-300">
            View your balance, monthly assessment, payment status, and latest
            accounting sync information.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-slate-300">
            Loading ledger...
          </div>
        )}

        {loadError && (
          <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-7 text-red-200">
            {loadError}
          </div>
        )}

        {!loading && !loadError && balance && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-7 lg:col-span-2">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
                Current Balance
              </p>

              <div className="mt-4 text-5xl font-bold text-yellow-300">
                {money(balance.current_balance)}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Monthly Assessment</p>
                  <p className="mt-2 text-2xl font-bold">
                    {money(balance.monthly_assessment)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Last Payment Date</p>
                  <p className="mt-2 text-2xl font-bold">
                    {prettyDate(balance.last_payment_date)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Payment Status</p>
                  <p className="mt-2 text-2xl font-bold capitalize">
                    {balance.payment_status || "Not available"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-5">
                  <p className="text-sm text-slate-400">Account Health</p>
                  <p className="mt-2 text-2xl font-bold capitalize">
                    {balance.account_health || "Not available"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={balance.payment_link || "/homeowner/payment-arrangement"}
                  className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                >
                  Make Payment
                </Link>

                <Link
                  href="/homeowner/account-review"
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
                >
                  Request Account Review
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <p className="text-sm font-medium text-yellow-400">
                Accounting Sync
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">QuickBooks Status</p>
                  <p className="mt-1 text-lg font-semibold capitalize">
                    {balance.accounting_identity?.sync_status || "Connected"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Last Synced</p>
                  <p className="mt-1 text-lg font-semibold">
                    {prettyDate(balance.synced_at)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Account Number</p>
                  <p className="mt-1 text-lg font-semibold">
                    {balance.account_number || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
