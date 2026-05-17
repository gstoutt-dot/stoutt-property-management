import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function HomeownerAva() {
  const [loading, setLoading] = useState(true);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [messages, setMessages] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("Explain my balance");

  useEffect(() => {
    loadAvaContext();
  }, []);

  async function loadAvaContext() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      const userEmail = session?.user?.email;

      if (!userEmail) {
        window.location.href = "/portal/owner/login";
        return;
      }

      const profileResponse = await fetch(
        `/api/homeowner/profile?email=${encodeURIComponent(userEmail)}`
      );

      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData?.success || !profileData?.profile) {
        throw new Error(profileData?.error || "Unable to load homeowner profile.");
      }

      const profile = profileData.profile;
      setOwnerProfile(profile);

      const associationId = profile.association_id;
      const ownerUserId = profile.owner_user_id;
      const unitNumber = profile.unit_number;

      const [balanceResponse, messagesResponse, requestsResponse] =
        await Promise.all([
          fetch(
            `/api/accounting/owner-balance?associationId=${encodeURIComponent(
              associationId
            )}&ownerUserId=${encodeURIComponent(
              ownerUserId
            )}&unitNumber=${encodeURIComponent(unitNumber)}`
          ),
          fetch(
            `/api/homeowner/messages/list?associationId=${encodeURIComponent(
              associationId
            )}&ownerUserId=${encodeURIComponent(
              ownerUserId
            )}&unitNumber=${encodeURIComponent(unitNumber)}&limit=5`
          ),
          fetch(
            `/api/homeowner/service-request/list?associationId=${encodeURIComponent(
              associationId
            )}&ownerUserId=${encodeURIComponent(
              ownerUserId
            )}&unitNumber=${encodeURIComponent(unitNumber)}`
          ),
        ]);

      const balanceData = await balanceResponse.json();
      const messagesData = await messagesResponse.json();
      const requestsData = await requestsResponse.json();

      if (balanceData?.success) {
        setBalance(balanceData.balance || null);
      }

      if (messagesData?.success) {
        setMessages(messagesData.messages || []);
      }

      if (requestsData?.success) {
        setRequests(requestsData.requests || []);
      }
    } catch (err) {
      console.error("Ava homeowner context failed:", err);
      setError(err?.message || "Ava could not load your homeowner context.");
    } finally {
      setLoading(false);
    }
  }

  const latestMessage = messages?.[0] || null;
  const latestRequest = requests?.[0] || null;

  const unreadMessages = useMemo(() => {
    return (messages || []).filter((message) => !message.read_status).length;
  }, [messages]);

  const openRequests = useMemo(() => {
    return (requests || []).filter((request) => {
      const status = String(request.status || "").toLowerCase();
      return !["completed", "closed", "resolved"].includes(status);
    }).length;
  }, [requests]);

  const formattedBalance =
    balance?.current_balance !== undefined && balance?.current_balance !== null
      ? Number(balance.current_balance).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "Not available";

  const formattedAssessment =
    balance?.monthly_assessment !== undefined &&
    balance?.monthly_assessment !== null
      ? Number(balance.monthly_assessment).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "Not available";

  const quickActions = [
    {
      label: "Explain my balance",
      prompt: "Explain my balance",
      description: `Your current balance is ${formattedBalance}. Monthly assessment: ${formattedAssessment}.`,
      href: "/homeowner/payment",
    },
    {
      label: "Help me make a payment",
      prompt: "Help me make a payment",
      description:
        "Ava can guide you to the secure payment hub. Online ACH/card processing can be plugged in when activated.",
      href: "/homeowner/payment",
    },
    {
      label: "Explain my latest notice",
      prompt: "Explain my latest notice",
      description: latestMessage
        ? `Latest notice: ${latestMessage.title || latestMessage.subject || "Recent message"}`
        : "No recent notices are currently available.",
      href: "/homeowner/messages",
    },
    {
      label: "Find documents",
      prompt: "Find documents",
      description:
        "Ava can guide you to governing documents, financials, forms, and meeting records.",
      href: "/homeowner/documents",
    },
    {
      label: "Check my requests",
      prompt: "Check my requests",
      description: latestRequest
        ? `Latest request status: ${latestRequest.status || "Received"}`
        : "No recent homeowner requests are currently available.",
      href: "/homeowner/work-orders",
    },
  ];

  const selectedAction =
    quickActions.find((action) => action.prompt === selectedPrompt) ||
    quickActions[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.20),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Ava Homeowner Assistant
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Ava helps explain your balance, notices, documents, payments,
                and homeowner requests using your live homeowner dashboard
                context.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex items-center gap-4 border-b border-white/10 pb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-xl font-bold text-slate-950">
              A
            </div>

            <div>
              <p className="text-sm text-yellow-400">
                {loading ? "Loading homeowner context" : "Ava is online"}
              </p>
              <h2 className="text-2xl font-semibold">
                {ownerProfile?.owner_name
                  ? `Hello, ${ownerProfile.owner_name}`
                  : "How can I help today?"}
              </h2>
            </div>
          </div>

          {error ? (
            <div className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-sm leading-6 text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6 space-y-5">
            <div className="max-w-[88%] rounded-3xl rounded-tl-sm bg-slate-900 p-5 text-sm leading-6 text-slate-300">
              I’m Ava. I can help explain what I can see in your homeowner
              account, including your balance, payment status, notices,
              documents, and service requests. I won’t guess or invent account
              information.
            </div>

            <div className="ml-auto max-w-[88%] rounded-3xl rounded-tr-sm bg-yellow-400 p-5 text-sm leading-6 text-slate-950">
              {selectedAction?.prompt}
            </div>

            <div className="max-w-[88%] rounded-3xl rounded-tl-sm bg-slate-900 p-5 text-sm leading-6 text-slate-300">
              {loading ? (
                "I’m loading your homeowner information now."
              ) : (
                <>
                  <p>{selectedAction?.description}</p>

                  {selectedAction?.href ? (
                    <Link
                      href={selectedAction.href}
                      className="mt-4 inline-flex rounded-2xl border border-yellow-400/40 px-4 py-2 text-xs font-semibold text-yellow-300 hover:bg-yellow-400/10"
                    >
                      Open Related Page
                    </Link>
                  ) : null}
                </>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-4">
            <textarea
              rows="4"
              value={selectedPrompt}
              onChange={(event) => setSelectedPrompt(event.target.value)}
              className="w-full resize-none bg-transparent text-white outline-none placeholder:text-slate-500"
              placeholder="Ask Ava about your balance, notices, documents, payments, or requests..."
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Full conversational AI will connect here after the live homeowner
                data context is stable.
              </p>

              <button
                type="button"
                onClick={() => setSelectedPrompt(selectedPrompt)}
                className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300"
              >
                Ask Ava
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Live Homeowner Context
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Current Balance
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {loading ? "Loading..." : formattedBalance}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Monthly Assessment
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-100">
                  {loading ? "Loading..." : formattedAssessment}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Account Health
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-100">
                  {loading
                    ? "Loading..."
                    : balance?.account_health || "Not available"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Notices / Requests
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {unreadMessages} unread message(s) · {openRequests} open
                  request(s)
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Quick Actions
            </p>

            <div className="mt-5 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => setSelectedPrompt(action.prompt)}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ava Safety Guardrails
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can explain live homeowner information and guide you to the
              right portal page. Ava should not provide legal advice, financial
              advice, or emergency support. Urgent issues should be reported
              directly to management or emergency services.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Helpful Links
            </p>

            <div className="mt-5 grid gap-3">
              <Link
                href="/homeowner/payment"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Go to Payment Center
              </Link>

              <Link
                href="/homeowner/messages"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
              >
                View Messages
              </Link>

              <Link
                href="/homeowner/documents"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Open Documents
              </Link>

              <Link
                href="/homeowner/work-orders"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
              >
                Submit Work Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
