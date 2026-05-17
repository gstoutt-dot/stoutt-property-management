import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function AccountReviewRequest() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [requestType, setRequestType] = useState("Balance question");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadOwnerProfile();
  }, []);

  async function loadOwnerProfile() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userEmail = session?.user?.email;

      if (!userEmail) {
        window.location.href = "/portal/owner/login";
        return;
      }

      const response = await fetch(
        `/api/owner/profile?ownerEmail=${encodeURIComponent(
          userEmail
        )}&authUserId=${encodeURIComponent(session.user.id || "")}`
      );

      const data = await response.json();

      if (!response.ok || !data?.success || !data?.ownerProfile) {
        throw new Error(data?.error || "Unable to load homeowner profile.");
      }

      setOwnerProfile(data.ownerProfile);
    } catch (err) {
      console.error("Account review profile load failed:", err);
      setError(err?.message || "Unable to load homeowner profile.");
    } finally {
      setLoading(false);
    }
  }

  async function submitAccountReview() {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const cleanMessage = String(message || "").trim();

      if (!cleanMessage) {
        setError("Please describe what you would like management to review.");
        return;
      }

      if (!ownerProfile?.association_id || !ownerProfile?.unitNumber) {
        setError("Homeowner profile is missing association or unit details.");
        return;
      }

      const response = await fetch("/api/homeowner/service-request/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          associationId: ownerProfile.association_id,
          ownerUserId: ownerProfile.id,
          unitNumber: ownerProfile.unitNumber,
          ownerName: ownerProfile.owner_name || ownerProfile.ownerName || "",
          ownerEmail: ownerProfile.owner_email || ownerProfile.ownerEmail || "",
          requestType: "Account Review",
          priority: "Normal",
          title: `Account Review: ${requestType}`,
          description: cleanMessage,
          location: `Unit ${ownerProfile.unitNumber}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Unable to submit account review.");
      }

      setSuccess(
        "Your account review request was submitted to management successfully."
      );

      setMessage("");
      setRequestType("Balance question");
    } catch (err) {
      console.error("Submit account review failed:", err);
      setError(err?.message || "Unable to submit account review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link href="/homeowner" className="text-sm font-semibold text-yellow-300">
            ← Back to Dashboard
          </Link>

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-yellow-400">
            Homeowner Account Review
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Request Account Review
          </h1>

          <p className="mt-4 text-slate-300">
            Use this page to request help reviewing your balance, payment
            history, statement, assessment, or account status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <p className="text-sm font-medium text-yellow-400">
            Review Request Details
          </p>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
              Loading homeowner profile...
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              {success}
            </div>
          ) : null}

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="text-sm text-slate-300">Request Type</span>
              <select
                value={requestType}
                onChange={(event) => setRequestType(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
              >
                <option>Balance question</option>
                <option>Payment not showing</option>
                <option>Statement request</option>
                <option>Assessment question</option>
                <option>Late fee or delinquency question</option>
                <option>Other account question</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Message</span>
              <textarea
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Describe what you would like management to review..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <button
              type="button"
              onClick={submitAccountReview}
              disabled={submitting || loading}
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Account Review Request"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
