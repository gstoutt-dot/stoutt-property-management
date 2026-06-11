import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const FALLBACK_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const FALLBACK_OWNER_USER_ID = "2576c2a8-e49e-4009-9d07-10aba3c63090";
const FALLBACK_UNIT_NUMBER = "101";

export default function HomeownerAva() {
  const [loading, setLoading] = useState(true);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [messages, setMessages] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const [conversation, setConversation] = useState([
    {
      role: "ava",
      message:
        "Hello. I’m Ava, your homeowner assistant. I can help explain balances, notices, documents, payments, and homeowner requests using your live homeowner information.",
      actions: [],
    },
  ]);

  useEffect(() => {
    loadAvaContext();
  }, []);

  async function loadAvaFallbackContext(profile) {
    const associationId = profile.association_id;
    const ownerUserId = profile.id;
    const unitNumber = profile.unitNumber;

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

    if (balanceData?.success) setBalance(balanceData.balance || null);
    if (messagesData?.success) setMessages(messagesData.messages || []);
    if (requestsData?.success) setRequests(requestsData.requests || []);
  }

  async function loadAvaContext() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      const fallbackProfile = {
        association_id: FALLBACK_ASSOCIATION_ID,
        id: FALLBACK_OWNER_USER_ID,
        unitNumber: FALLBACK_UNIT_NUMBER,
        ownerName: "Homeowner",
      };

      if (!session?.user?.email) {
        setOwnerProfile(fallbackProfile);
        await loadAvaFallbackContext(fallbackProfile);
        return;
      }

      const profileResponse = await fetch(
        `/api/owner/profile?ownerEmail=${encodeURIComponent(
          session.user.email
        )}&authUserId=${encodeURIComponent(session.user.id || "")}`
      );

      const profileData = await profileResponse.json();

      if (
        !profileResponse.ok ||
        !profileData?.success ||
        !profileData?.ownerProfile
      ) {
        console.error("Ava owner profile lookup failed:", profileData);
        setOwnerProfile(fallbackProfile);
        await loadAvaFallbackContext(fallbackProfile);
        return;
      }

      const profile = profileData.ownerProfile;
      setOwnerProfile(profile);

      await loadAvaFallbackContext({
        association_id: profile.association_id,
        id: profile.id,
        unitNumber: profile.unitNumber,
      });
    } catch (err) {
      console.error("Ava homeowner context failed:", err);
      setError(err?.message || "Ava could not load your homeowner context.");

      const fallbackProfile = {
        association_id: FALLBACK_ASSOCIATION_ID,
        id: FALLBACK_OWNER_USER_ID,
        unitNumber: FALLBACK_UNIT_NUMBER,
        ownerName: "Homeowner",
      };

      setOwnerProfile(fallbackProfile);
      await loadAvaFallbackContext(fallbackProfile);
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

  function pushAvaResponse(message, actions = []) {
    setConversation((current) => [
      ...current,
      {
        role: "ava",
        message,
        actions,
      },
    ]);
  }

  async function getAccountingResponse() {
  if (!ownerProfile?.unitNumber) {
    return `Your current balance is ${formattedBalance}.`;
  }

  const response = await fetch("/api/ava/get-owner-balance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      associationId: ownerProfile.association_id || FALLBACK_ASSOCIATION_ID,
      unitNumber: ownerProfile.unitNumber,
      callerName:
        ownerProfile.ownerName ||
        ownerProfile.owner_name ||
        balance?.owner_name ||
        "",
      callerEmail:
        ownerProfile.email ||
        ownerProfile.owner_email ||
        "",
      callerPhone:
        ownerProfile.phone ||
        ownerProfile.owner_phone ||
        "",
    }),
  });

  const data = await response.json();

  if (!response.ok || !data?.ava_accounting_response) {
    throw new Error(data?.error || "Unable to load Ava accounting response.");
  }

  if (data?.balance) {
    setBalance(data.balance);
  }

  return data.ava_accounting_response;
}

  async function getKnowledgeResponse(promptText) {
  const associationId =
    ownerProfile?.association_id || FALLBACK_ASSOCIATION_ID;

  if (!associationId) {
    return "I could not load the association knowledge base right now.";
  }

  const response = await fetch("/api/ava/knowledge-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      associationId,
      question: promptText,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || "Unable to search association knowledge.");
  }

  return (
    data?.answer ||
    "I do not see a clear answer in the association knowledge base. Management can review this and follow up directly."
  );
}

  async function handleAskAva() {
    const rawPrompt = String(selectedPrompt || "").trim();
    const prompt = rawPrompt.toLowerCase();

    if (!rawPrompt) {
  pushAvaResponse(
    `Your current balance is ${formattedBalance}. If something looks incorrect, management can review your account through the account review workflow.`,
    [
      { label: "Open Payment Center", href: "/homeowner/payment" },
      {
        label: "Request Account Review",
        href: "/homeowner/account-review",
      },
    ]
  );

  setSelectedPrompt("");
  return;
}

setSelectedPrompt("");

const isAccountingQuestion =
      prompt.includes("balance") ||
      prompt.includes("payment") ||
      prompt.includes("assessment") ||
      prompt.includes("due") ||
      prompt.includes("account review") ||
      prompt.includes("review my account") ||
      prompt.includes("account issue") ||
      prompt.includes("balance wrong") ||
      prompt.includes("wrong balance") ||
      prompt.includes("payment missing") ||
      prompt.includes("payment not showing") ||
      prompt.includes("missing payment") ||
      prompt.includes("statement") ||
      prompt.includes("late fee") ||
      prompt.includes("late fees") ||
      prompt.includes("violation fee") ||
      prompt.includes("violation fees") ||
      prompt.includes("delinquency") ||
      prompt.includes("charge") ||
      prompt.includes("charges") ||
      prompt.includes("fee") ||
      prompt.includes("fees") ||
      prompt.includes("assessment issue") ||
      prompt.includes("account help");

    if (isAccountingQuestion) {
      try {
        const accountingResponse = await getAccountingResponse();

        pushAvaResponse(accountingResponse, [
          { label: "Open Payment Center", href: "/homeowner/payment" },
          { label: "Request Account Review", href: "/homeowner/account-review" },
        ]);
      } catch (accountingError) {
        console.error("Ava accounting response failed:", accountingError);

        pushAvaResponse(
  `Your current balance is ${formattedBalance}. If something looks incorrect, management can review your account through the account review workflow.`,
  [
    { label: "Open Payment Center", href: "/homeowner/payment" },
    {
      label: "Request Account Review",
      href: "/homeowner/account-review",
    },
  ]
);
      }

      return;
    }

        const isKnowledgeQuestion =
      prompt.includes("document") ||
      prompt.includes("documents") ||
      prompt.includes("rules") ||
      prompt.includes("rule") ||
      prompt.includes("forms") ||
      prompt.includes("policy") ||
      prompt.includes("policies") ||
      prompt.includes("pet") ||
      prompt.includes("pets") ||
      prompt.includes("dog") ||
      prompt.includes("cat") ||
      prompt.includes("parking") ||
      prompt.includes("park") ||
      prompt.includes("pool") ||
      prompt.includes("clubhouse") ||
      prompt.includes("amenity") ||
      prompt.includes("amenities") ||
      prompt.includes("rental") ||
      prompt.includes("rent") ||
      prompt.includes("lease") ||
      prompt.includes("architectural") ||
      prompt.includes("modification") ||
      prompt.includes("noise") ||
      prompt.includes("quiet") ||
      prompt.includes("maintenance responsibility") ||
      prompt.includes("responsible") ||
      prompt.includes("declaration") ||
      prompt.includes("bylaws") ||
      prompt.includes("governing") ||
      prompt.includes("management company") ||
      prompt.includes("property management") ||
      prompt.includes("stoutt") ||
      prompt.includes("who manages") ||
      prompt.includes("who do i contact") ||
      prompt.includes("contact management");

    if (isKnowledgeQuestion) {
      try {
        const knowledgeResponse = await getKnowledgeResponse(rawPrompt);

        pushAvaResponse(knowledgeResponse, [
          { label: "Open Documents", href: "/homeowner/documents" },
          { label: "Create Maintenance Request", href: "/homeowner/work-orders" },
        ]);
      } catch (knowledgeError) {
        console.error("Ava knowledge response failed:", knowledgeError);

        pushAvaResponse(
          "I could not search the association knowledge base right now. Management can review this and follow up directly.",
          [
            { label: "Open Documents", href: "/homeowner/documents" },
            { label: "Create Maintenance Request", href: "/homeowner/work-orders" },
          ]
        );
      }

      return;
    }

    if (prompt.includes("message") || prompt.includes("notice")) {
      pushAvaResponse(
        latestMessage
          ? `You currently have ${unreadMessages} unread notice(s).`
          : "There are currently no recent notices available.",
        [{ label: "View Messages", href: "/homeowner/messages" }]
      );

      return;
    }

    if (
      prompt.includes("request") ||
      prompt.includes("maintenance") ||
      prompt.includes("work order")
    ) {
      pushAvaResponse(
        latestRequest
          ? `Your latest homeowner request is currently marked as "${
              latestRequest.status || "Received"
            }".`
          : "You currently do not have any active homeowner requests.",
        [{ label: "Create Maintenance Request", href: "/homeowner/work-orders" }]
      );

      return;
    }

    if (prompt.includes("management") || prompt.includes("help")) {
      pushAvaResponse(
        "I can help route you to the correct homeowner workflow or management resource.",
        [
          { label: "View Messages", href: "/homeowner/messages" },
          { label: "Open Work Orders", href: "/homeowner/work-orders" },
        ]
      );

      return;
    }

    if (prompt.includes("emergency") || prompt.includes("urgent")) {
      pushAvaResponse(
        "For emergencies or urgent property issues, please contact management or emergency services directly instead of relying only on the portal."
      );

      return;
    }

    pushAvaResponse(
      "Ava is still learning. Please try asking about balances, payments, notices, documents, or homeowner requests."
    );
  }

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
                {ownerProfile?.ownerName || ownerProfile?.owner_name
                  ? `Hello, ${
                      ownerProfile?.ownerName || ownerProfile?.owner_name
                    }`
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
            {conversation.map((entry, index) => (
              <div
                key={`${entry.role}-${index}`}
                className={
                  entry.role === "user"
                    ? "ml-auto max-w-[88%] rounded-3xl rounded-tr-sm bg-yellow-400 p-5 text-sm leading-6 text-slate-950"
                    : "max-w-[88%] rounded-3xl rounded-tl-sm bg-slate-900 p-5 text-sm leading-6 text-slate-300"
                }
              >
                <p>{entry.message}</p>

                {entry.actions?.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {entry.actions.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className="rounded-2xl border border-yellow-400/30 px-4 py-2 text-xs font-semibold text-yellow-300 hover:bg-yellow-400/10"
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {loading ? (
              <div className="max-w-[88%] rounded-3xl rounded-tl-sm bg-slate-900 p-5 text-sm leading-6 text-slate-300">
                I’m loading your homeowner information now.
              </div>
            ) : null}
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
                Ava only explains live homeowner information currently available
                inside SPM.
              </p>

              <button
                type="button"
                onClick={handleAskAva}
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
                  {loading ? "Loading..." : balance?.account_health || "Not available"}
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
        </div>
      </section>
    </main>
  );
}
