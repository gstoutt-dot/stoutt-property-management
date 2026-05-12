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

export default function HomeownerDashboard() {
  const [balance, setBalance] = useState(null);
const [notifications, setNotifications] = useState([]);
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
          throw new Error(data.error || "Unable to load owner balance.");
        }

        setBalance(data.balance);
      } catch (error) {
        setLoadError(error.message || "Unable to load account details.");
      } finally {
        setLoading(false);
      }
    }

        async function loadNotifications() {
      try {
        const response = await fetch(
          `/api/notifications/list?associationId=${ASSOCIATION_ID}&audience=owner&status=pending&limit=5`
        );

        const data = await response.json();

        const items =
          data.notifications ||
          data.items ||
          data.data ||
          [];

        setNotifications(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Unable to load owner notifications:", error);
        setNotifications([]);
      }
    }

    loadBalance();
    loadNotifications();
  }, []);

  const ownerName = balance?.owner_name || "Homeowner";
  const unitNumber = balance?.unit_number || UNIT_NUMBER;
  const currentBalance = money(balance?.current_balance);
  const monthlyAssessment = money(balance?.monthly_assessment);
  const paymentStatus = balance?.payment_status || "Not available";
  const accountHealth = balance?.account_health || "Not available";
  const delinquencyLevel = balance?.delinquency_level || "current";
  const lastPaymentDate = prettyDate(balance?.last_payment_date);
  const syncTimestamp = balance?.synced_at
    ? `Synced from QuickBooks on ${prettyDate(balance.synced_at)}`
    : "QuickBooks sync timestamp not available";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Welcome, {ownerName}
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Unit {unitNumber} · Sunset Condominium Association
              </p>
            </div>

            <Link
              href="/homeowner-login"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-slate-300">
            Loading homeowner account details...
          </div>
        )}

        {loadError && (
          <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-7 text-red-200">
            {loadError}
          </div>
        )}

        {!loading && !loadError && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-7 lg:col-span-2">
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
                  Current Balance
                </p>

                <div className="mt-4 text-5xl font-bold text-yellow-300">
                  {currentBalance}
                </div>

                                                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-500/10 px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-emerald-300">
                      Payment Status
                    </p>

                    <p className="mt-1 text-lg font-semibold text-emerald-200">
                      {paymentStatus}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Monthly Assessment
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      {monthlyAssessment}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Last Payment
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      {lastPaymentDate}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/homeowner/payment-arrangement"
                    className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                  >
                    Request Payment Help
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
                <p className="text-sm text-slate-400">Account Health</p>

                <div className="mt-3 text-3xl font-bold text-emerald-300">
                  {accountHealth}
                </div>

                                <div className="mt-5 rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Delinquency Level
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white capitalize">
                    {delinquencyLevel}
                  </p>
                </div>

                <p className="mt-5 text-xs text-slate-500">{syncTimestamp}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                ["Monthly Assessment", monthlyAssessment],
                ["Last Payment Date", lastPaymentDate],
                ["QuickBooks Status", balance?.accounting_identity?.sync_status || "Connected"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <p className="text-sm text-slate-400">{label}</p>
                  <div className="mt-3 text-2xl font-bold text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-yellow-400">
                Requests & Updates
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Recent Activity</h2>
            </div>

            <Link
              href="/homeowner/work-orders"
              className="text-sm font-semibold text-yellow-300"
            >
              New Request →
            </Link>
          </div>

          <div className="mt-6 space-y-4">
                        {[
              [
                "Open Maintenance Request",
                "Under Review",
                "Kitchen sink leak reported. Management is reviewing the request.",
              ],
              [
                "Account Review Request",
                "Received",
                "Balance confirmation request received by management.",
              ],
              [
                "Statement Request",
                "Completed",
                "Your most recent account statement is available in documents.",
              ],
            ].map(([title, status, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                    {status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Notices & Messages
            </p>

            <div className="mt-5 space-y-3">
                            {(notifications.length
                ? notifications.map((item) =>
                    item.title ||
                    item.message ||
                    item.body ||
                    "New homeowner notification"
                  )
                : [
                    "Your account information is available.",
                    "Statements and documents can be accessed below.",
                    "Submit an account review request if something looks incorrect.",
                  ]
              ).map((notice) => (
                <div
                  key={notice}
                  className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300"
                >
                  {notice}
                </div>
              ))}
            </div>

            <Link
              href="/homeowner/messages"
              className="mt-5 inline-block text-sm font-semibold text-yellow-300"
            >
              View Messages →
            </Link>
          </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Documents & Statements
            </p>

            <div className="mt-4 space-y-3">
              {[
                "Monthly account statements",
                "Association notices",
                "Forms and homeowner records",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/homeowner/documents"
              className="mt-5 inline-block rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Open Documents
            </Link>
          </div>

                          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Account Actions
            </p>

            <div className="mt-4 space-y-3">
              <Link
                href="/homeowner/account-review"
                className="block rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
              >
                Request account review
              </Link>

              <Link
                href="/homeowner/payment-arrangement"
                className="block rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
              >
                Request payment arrangement
              </Link>

              <Link
                href="/homeowner/documents"
                className="block rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
              >
                Request statement or document
              </Link>
            </div>
          </div>
                
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">Need Help?</p>

            <div className="mt-4 space-y-3">
              {[
                "Ask a question about your balance",
                "Request help with a payment or statement",
                "Get help with documents, notices, or requests",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/homeowner/ava"
              className="mt-5 inline-block text-sm font-semibold text-yellow-300"
            >
              Ask Ava →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


