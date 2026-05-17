import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import OwnerAccountLedger from "../../components/OwnerAccountLedger";

const FALLBACK_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const FALLBACK_OWNER_USER_ID =
  "2576c2a8-e49e-4009-9d07-10aba3c63090";

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

  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

function relativeTime(dateString) {
  if (!dateString) return "Recently updated";

  const now = new Date();
  const then = new Date(dateString);

  const diffMs = now - then;

  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) {
    return "Updated just now";
  }

  if (minutes < 60) {
    return `Updated ${minutes} minute${
      minutes === 1 ? "" : "s"
    } ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Updated ${hours} hour${
      hours === 1 ? "" : "s"
    } ago`;
  }

  const days = Math.floor(hours / 24);

  return `Updated ${days} day${
    days === 1 ? "" : "s"
  } ago`;
}

export default function HomeownerDashboard() {
  const router = useRouter();

  const [ownerProfile, setOwnerProfile] =
    useState(null);

  const [balance, setBalance] =
    useState(null);

  const [notifications, setNotifications] =
    useState([]);

  const [recentRequests, setRecentRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");

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
          const normalizedEmail = String(
            session.user.email
          )
            .toLowerCase()
            .trim();

          const profileResponse = await fetch(
            `/api/owner/profile?ownerEmail=${encodeURIComponent(
              normalizedEmail
            )}&authUserId=${encodeURIComponent(
              session.user.id || ""
            )}`
          );

          const profileResult =
            await profileResponse.json();

          if (
            profileResponse.ok &&
            profileResult?.success
          ) {
            resolvedOwnerProfile =
              profileResult.ownerProfile;

            setOwnerProfile(
              profileResult.ownerProfile
            );
          }
        }

        const resolvedAssociationId =
          resolvedOwnerProfile?.association_id ||
          FALLBACK_ASSOCIATION_ID;

        const resolvedOwnerUserId =
          resolvedOwnerProfile?.id ||
          FALLBACK_OWNER_USER_ID;

        const resolvedUnitNumber =
          resolvedOwnerProfile?.unitNumber ||
          FALLBACK_UNIT_NUMBER;

        const balanceResponse = await fetch(
          `/api/accounting/owner-balance?associationId=${resolvedAssociationId}&ownerUserId=${resolvedOwnerUserId}&unitNumber=${resolvedUnitNumber}`
        );

        const balanceData =
          await balanceResponse.json();

        if (
          !balanceResponse.ok ||
          !balanceData.success
        ) {
          throw new Error(
            balanceData.error ||
              "Unable to load owner balance."
          );
        }

        setBalance(balanceData.balance);

        const requestParams =
          new URLSearchParams({
            associationId:
              resolvedAssociationId,

            ownerUserId:
              resolvedOwnerUserId,

            unitNumber:
              resolvedUnitNumber,
          });

        const requestsResponse = await fetch(
          `/api/homeowner/service-request/list?${requestParams}`
        );

        const requestsResult =
          await requestsResponse.json();

        setRecentRequests(
          Array.isArray(
            requestsResult?.requests
          )
            ? requestsResult.requests.slice(0, 4)
            : []
        );

        const notificationResponse =
          await fetch(
            `/api/notifications/list?associationId=${resolvedAssociationId}&audience=owner&status=pending&limit=6`
          );

        const notificationData =
          await notificationResponse.json();

        const items =
          notificationData.notifications ||
          notificationData.items ||
          notificationData.data ||
          [];

        setNotifications(
          Array.isArray(items) ? items : []
        );
      } catch (error) {
        setLoadError(
          error.message ||
            "Unable to load account details."
        );

        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    loadHomeownerDashboard();
  }, [router]);

  const ownerName =
    balance?.owner_name || "Homeowner";

  const unitNumber =
    balance?.unit_number ||
    ownerProfile?.unitNumber ||
    FALLBACK_UNIT_NUMBER;

  const currentBalance = money(
    balance?.current_balance
  );

  const monthlyAssessment = money(
    balance?.monthly_assessment
  );

  const paymentStatus = String(
    balance?.payment_status ||
      "Not available"
  )
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

  const accountHealth = String(
    balance?.account_health ||
      "Not available"
  )
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

  const delinquencyLevel = String(
    balance?.delinquency_level ||
      "current"
  )
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

  const lastPaymentDate = prettyDate(
    balance?.last_payment_date
  );

  const accountNumber =
    balance?.account_number ||
    "Not available";

  const quickBooksStatus = String(
    balance?.accounting_identity
      ?.sync_status || "Connected"
  )
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

  const syncTimestamp = balance?.synced_at
    ? relativeTime(balance.synced_at)
    : "QuickBooks sync unavailable";

  const unreadNotificationCount =
    notifications.length;

  const openRequestCount = useMemo(() => {
    return recentRequests.filter(
      (request) => {
        const status = String(
          request.status || ""
        ).toLowerCase();

        return ![
          "completed",
          "closed",
          "resolved",
        ].includes(status);
      }
    ).length;
  }, [recentRequests]);

  async function signOutHomeowner() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(
        "Homeowner sign out failed:",
        error
      );
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

              <div className="mt-4 flex flex-wrap items-center gap-3 text-slate-300">
                <span>
                  Unit {unitNumber}
                </span>

                <span className="text-slate-600">
                  •
                </span>

                <span>
                  Sunset Condominium
                  Association
                </span>

                <span className="text-slate-600">
                  •
                </span>

                <span className="text-emerald-300">
                  {syncTimestamp}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/homeowner/ava"
                className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20"
              >
                Ask Ava
              </Link>

              <button
                type="button"
                onClick={signOutHomeowner}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
              >
                Sign Out
              </button>
            </div>
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
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/15 via-yellow-400/5 to-transparent p-8 shadow-2xl shadow-yellow-500/5">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
                Current Balance
              </p>

              <div className="mt-5 text-5xl font-bold tracking-tight text-yellow-300">
                {currentBalance}
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                Your homeowner balance is currently mirrored from the live
                QuickBooks accounting environment connected to your association.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
              {quickBooksStatus}
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
              <p className="text-xs uppercase tracking-wide text-emerald-300">
                Payment Status
              </p>

              <p className="mt-2 text-xl font-semibold text-emerald-100">
                {paymentStatus}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Monthly Assessment
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {monthlyAssessment}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Last Payment
              </p>

              <p className="mt-2 text-xl font-semibold text-white">
                {lastPaymentDate}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/homeowner/payment"
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
            >
              Make Payment
            </Link>

            <Link
              href="/homeowner/account-review"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Request Account Review
            </Link>

            <button
              onClick={() => {
                document
                  .getElementById("ledger-summary")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              View Ledger Summary
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-yellow-400">
                  Account Health
                </p>

                <div className="mt-3 text-3xl font-bold text-emerald-300">
                  {accountHealth}
                </div>
              </div>

              <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                {delinquencyLevel}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Account Number
                </p>

                <p className="mt-2 font-semibold text-white">
                  {accountNumber}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  QuickBooks Sync
                </p>

                <p className="mt-2 font-semibold text-white">
                  {syncTimestamp}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-yellow-400">
                Homeowner Activity
              </p>

              <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
                Live
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">
                    Unread Notices
                  </p>

                  <span className="text-lg font-bold text-yellow-300">
                    {unreadNotificationCount}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">
                    Open Requests
                  </p>

                  <span className="text-lg font-bold text-yellow-300">
                    {openRequestCount}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">
                    Ava Assistant
                  </p>

                  <span className="text-sm font-semibold text-emerald-300">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
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
              This summary reflects homeowner financial information currently
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
      </div>

      <div className="mt-6">
        <OwnerAccountLedger
          associationId={
            ownerProfile?.association_id ||
            FALLBACK_ASSOCIATION_ID
          }
          ownerUserId={
            ownerProfile?.id ||
            FALLBACK_OWNER_USER_ID
          }
          unitNumber={
            ownerProfile?.unitNumber ||
            FALLBACK_UNIT_NUMBER
          }
          currentBalanceAmount={
            balance?.current_balance
          }
        />
      </div>
    </>
  )}
</section>
</main>
);
}









