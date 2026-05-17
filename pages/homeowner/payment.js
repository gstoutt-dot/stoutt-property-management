import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

const FALLBACK_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const FALLBACK_OWNER_USER_ID = "2576c2a8-e49e-4009-9d07-10aba3c63090";
const FALLBACK_UNIT_NUMBER = "101";

function money(value) {
  return Number(value || 0).toLocaleString("en-US", {
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

export default function HomeownerPaymentPage() {
  const router = useRouter();
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadPaymentData() {
      setLoading(true);
      setLoadError("");

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        let resolvedOwnerProfile = null;

        if (session?.user?.email) {
          const normalizedEmail = String(session.user.email).toLowerCase().trim();

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
        } else {
          router.replace("/portal/owner/login");
          return;
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
          throw new Error(balanceData.error || "Unable to load payment details.");
        }

        setBalance(balanceData.balance);
      } catch (error) {
        setLoadError(error.message || "Unable to load payment details.");
      } finally {
        setLoading(false);
      }
    }

    loadPaymentData();
  }, [router]);

  const ownerName = balance?.owner_name || "Homeowner";
  const unitNumber = balance?.unit_number || ownerProfile?.unitNumber || FALLBACK_UNIT_NUMBER;
  const currentBalance = money(balance?.current_balance);
  const monthlyAssessment = money(balance?.monthly_assessment);
  const lastPaymentDate = prettyDate(balance?.last_payment_date);
  const paymentLink = balance?.payment_link || "";

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
                Make a Payment
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Unit {unitNumber} · {ownerName}
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-slate-300">
            Loading payment details...
          </div>
        )}

        {loadError && (
          <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-7 text-red-200">
            {loadError}
          </div>
        )}

        {!loading && !loadError && (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-7">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
                Amount Due
              </p>

              <div className="mt-4 text-5xl font-bold text-yellow-300">
                {currentBalance}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Monthly Assessment
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {monthlyAssessment}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/70 p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Last Payment
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {lastPaymentDate}
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm leading-6 text-slate-300">
                  Online payments are being prepared for secure ACH and card processing.
                  This page is now the payment hub where SPM will plug in the live
                  processor once banking and merchant setup are complete.
                </p>
              </div>

              {paymentLink ? (
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                >
                  Continue to Secure Payment
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-6 rounded-full bg-yellow-400/60 px-6 py-4 text-sm font-semibold text-slate-950 opacity-70"
                >
                  Online Payment Activation Pending
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm font-medium text-yellow-400">
                  Payment Options Being Prepared
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "ACH bank transfer",
                    "Debit or credit card",
                    "Auto-pay enrollment",
                    "Payment confirmation receipts",
                    "QuickBooks ledger reconciliation",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm font-medium text-yellow-400">
                  Need Assistance?
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  If you have a question about your balance, statement, or payment
                  setup, submit an account review request or ask Ava for help.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/homeowner/messages"
                    className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
                  >
                    View Messages
                  </Link>

                  <Link
                    href="/homeowner/ava"
                    className="rounded-full border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950"
                  >
                    Ask Ava
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
