import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import OwnerAccountLedger from "../../components/OwnerAccountLedger";

const FALLBACK_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const FALLBACK_OWNER_USER_ID = "2576c2a8-e49e-4009-9d07-10aba3c63090";
const FALLBACK_UNIT_NUMBER = "101";

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
    const router = useRouter();
  const [ownerProfile, setOwnerProfile] = useState(null);
    const [balance, setBalance] = useState(null);
const [notifications, setNotifications] = useState([]);
const [recentRequests, setRecentRequests] = useState([]);
const [loading, setLoading] = useState(true);
const [loadError, setLoadError] = useState("");

    useEffect(() => {
    async function loadHomeownerDashboard() {
      setLoading(true);
      setLoadError("");

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        let resolvedOwnerProfile = null;

        if (session?.user?.email) {
          const normalizedEmail = String(session.user.email)
            .toLowerCase()
            .trim();

          const profileResponse = await fetch(
            `/api/owner/profile?ownerEmail=${encodeURIComponent(
              normalizedEmail
            )}&authUserId=${encodeURIComponent(session.user.id || "")}`
          );

          const profileResult = await profileResponse.json();

          if (profileResponse.ok && profileResult?.success) {
            resolvedOwnerProfile = profileResult.ownerProfile;
            setOwnerProfile(profileResult.ownerProfile);
          }
        }

        const resolvedAssociationId =
          resolvedOwnerProfile?.association_id || FALLBACK_ASSOCIATION_ID;

        const resolvedOwnerUserId =
          resolvedOwnerProfile?.id || FALLBACK_OWNER_USER_ID;

        const resolvedUnitNumber =
          resolvedOwnerProfile?.unitNumber || FALLBACK_UNIT_NUMBER;

        const balanceResponse = await fetch(
          `/api/accounting/owner-balance?associationId=${resolvedAssociationId}&ownerUserId=${resolvedOwnerUserId}&unitNumber=${resolvedUnitNumber}`
        );

        const balanceData = await balanceResponse.json();

        if (!balanceResponse.ok || !balanceData.success) {
          throw new Error(balanceData.error || "Unable to load owner balance.");
        }

        setBalance(balanceData.balance);

                const requestParams = new URLSearchParams({
          associationId: resolvedAssociationId,
          ownerUserId: resolvedOwnerUserId,
          unitNumber: resolvedUnitNumber,
        });

        const requestsResponse = await fetch(
          `/api/homeowner/service-request/list?${requestParams}`
        );

        const requestsResult = await requestsResponse.json();

        setRecentRequests(
          Array.isArray(requestsResult?.requests)
            ? requestsResult.requests.slice(0, 3)
            : []
        );
        const notificationResponse = await fetch(
          `/api/notifications/list?associationId=${resolvedAssociationId}&audience=owner&status=pending&limit=5`
        );
        
        const notificationData = await notificationResponse.json();

        const items =
          notificationData.notifications ||
          notificationData.items ||
          notificationData.data ||
          [];

        setNotifications(Array.isArray(items) ? items : []);
      } catch (error) {
        setLoadError(error.message || "Unable to load account details.");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    loadHomeownerDashboard();
  }, [router]);

  const ownerName = balance?.owner_name || "Homeowner";
  const unitNumber = balance?.unit_number || ownerProfile?.unitNumber || FALLBACK_UNIT_NUMBER;
  const currentBalance = money(balance?.current_balance);
  const monthlyAssessment = money(balance?.monthly_assessment);
  const paymentStatus =
  String(balance?.payment_status || "Not available")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const accountHealth =
  String(balance?.account_health || "Not available")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const delinquencyLevel =
  String(balance?.delinquency_level || "current")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
    const lastPaymentDate = prettyDate(balance?.last_payment_date);
  const accountNumber = balance?.account_number || "Not available";
  const quickBooksStatus =
    String(balance?.accounting_identity?.sync_status || "Connected")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const syncTimestamp = balance?.synced_at
    ? `Synced from QuickBooks on ${prettyDate(balance.synced_at)}`
    : "QuickBooks sync timestamp not available";

  async function signOutHomeowner() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Homeowner sign out failed:", error);
    }

        router.replace("/portal/owner/login");
  }

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

                        <button
              type="button"
              onClick={signOutHomeowner}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Sign Out
            </button>
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
href={balance?.payment_link || "/homeowner"}
target={balance?.payment_link ? "_blank" : "_self"}
  rel={balance?.payment_link ? "noopener noreferrer" : undefined}
  className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
>
  Make Payment Coming Soon
</Link>

                  <button
                    onClick={() => {
                      document
                        .getElementById("ledger-summary")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                    className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
                  >
                    View Ledger Summary
                  </button>
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

                                      
                      <div
              id="ledger-summary"
              className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-yellow-400">
                    QuickBooks Live Balance Summary
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Financial Visibility
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    This summary reflects the homeowner balance information currently
                    mirrored from QuickBooks for Unit {unitNumber}.
                  </p>
                </div>

                <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200">
                  {quickBooksStatus}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
                  <p className="text-xs uppercase tracking-wide text-yellow-300">
                    Current Balance
                  </p>

                  <p className="mt-2 text-3xl font-bold text-yellow-300">
                    {currentBalance}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Monthly Assessment
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {monthlyAssessment}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Last Payment
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {lastPaymentDate}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <p className="text-xs uppercase tracking-wide text-emerald-300">
                    Account Health
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-200">
                    {accountHealth}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Charges
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    Monthly assessment reflected: {monthlyAssessment}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Payments
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    Last payment date: {lastPaymentDate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Delinquency Status
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {delinquencyLevel}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Account Number
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {accountNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Payment Status
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {paymentStatus}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      QuickBooks Sync
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {syncTimestamp}
                    </p>
                  </div>
                </div>
              </div>
                        </div>

                        <div className="mt-6">
                                                        <OwnerAccountLedger
                associationId={ownerProfile?.association_id || FALLBACK_ASSOCIATION_ID}
                ownerUserId={ownerProfile?.id || FALLBACK_OWNER_USER_ID}
                unitNumber={ownerProfile?.unitNumber || FALLBACK_UNIT_NUMBER}
                currentBalanceAmount={balance?.current_balance}
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

                <div className="relative px-8 py-8">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                        Homeowner Portal
                      </p>

                      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                        Work Orders & Service Requests
                      </h2>

                      <p className="mt-4 max-w-4xl text-lg text-slate-300">
                        Submit maintenance requests, track ticket status, review updates,
                        and get AI-powered assistance from Ava.
                      </p>
                    </div>

                    <Link
                      href="/homeowner/work-orders"
                      className="rounded-full bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                    >
                      New Request
                    </Link>
                  </div>
                </div>
              </div>
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
            {recentRequests.length > 0 ? (
              recentRequests.map((request) => {
                const rawStatus = String(request.status || "Received");
                const normalizedStatus = rawStatus
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());

                const progress = rawStatus.toLowerCase().includes("completed")
                  ? 100
                  : rawStatus.toLowerCase().includes("dispatched")
                  ? 75
                  : rawStatus.toLowerCase().includes("review") ||
                    rawStatus.toLowerCase().includes("manager") ||
                    rawStatus.toLowerCase().includes("board")
                  ? 50
                  : 25;

                return (
                  <Link
                    key={request.id}
                    href="/homeowner/work-orders"
                    className="block rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-yellow-400/40 hover:bg-white/[0.03]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-semibold text-white">
                        {request.title || "Open Maintenance Request"}
                      </h3>

                      <span className="rounded-full bg-yellow-400/15 px-3 py-1 text-xs font-semibold text-yellow-300">
                        {normalizedStatus}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      {request.workflow_stage ||
                        request.description ||
                        "Your request has been received by management."}
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-yellow-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </Link>
                );
              })
            ) : (
              <Link
                href="/homeowner/work-orders"
                className="block rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-yellow-400/40 hover:bg-white/[0.03]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">
                    Open Maintenance Request
                  </h3>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                    Ready
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  Submit and track homeowner service requests from your dashboard.
                </p>
              </Link>
            )}
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
href={balance?.payment_link || "/homeowner"}
target={balance?.payment_link ? "_blank" : "_self"}
  rel={balance?.payment_link ? "noopener noreferrer" : undefined}
  className="block rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
>
  Make Payment Coming Soon
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









