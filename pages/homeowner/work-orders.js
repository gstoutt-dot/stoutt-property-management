import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function HomeownerWorkOrders() {
  const router = useRouter();
  const [ownerProfile, setOwnerProfile] = useState(null);

    const [requestType, setRequestType] = useState(
    "Common Area Maintenance"
  );

  const [priority, setPriority] = useState("Normal");

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [submitMessage, setSubmitMessage] = useState("");

  const [submitError, setSubmitError] = useState("");
const [liveRequests, setLiveRequests] = useState([]);
const [requestsLoading, setRequestsLoading] = useState(true);

async function loadServiceRequests() {
  try {
    setRequestsLoading(true);

    const response = await fetch(
      "/api/homeowner/service-request/list?associationId=622aaf96-ae1c-4f98-b0b2-00cc9178c2a2&ownerUserId=2576c2a8-e49e-4009-9d07-10aba3c63090&unitNumber=101"
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Unable to load service requests.");
    }

    setLiveRequests(data.requests || []);
  } catch (error) {
    console.error("Unable to load homeowner service requests:", error);
    setLiveRequests([]);
  } finally {
    setRequestsLoading(false);
  }
}

useEffect(() => {
  async function loadOwnerProfile() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.email) {
        router.replace("/portal/owner/login");
        return;
      }

      const normalizedEmail = String(session.user.email)
        .toLowerCase()
        .trim();

      const profileResponse = await fetch(
        `/api/owner/profile?ownerEmail=${encodeURIComponent(
          normalizedEmail
        )}&authUserId=${encodeURIComponent(session.user.id || "")}`
      );

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok || !profileResult?.success) {
        router.replace("/portal/owner/login");
        return;
      }

      setOwnerProfile(profileResult.ownerProfile);
    } catch (error) {
      console.error("Unable to load homeowner profile:", error);
      router.replace("/portal/owner/login");
    }
  }

  loadOwnerProfile();
}, [router]);

useEffect(() => {
  if (!ownerProfile?.association_id) return;

  loadServiceRequests();
}, [ownerProfile?.association_id, ownerProfile?.id, ownerProfile?.unitNumber]);

async function submitRequest() {
    try {
      setSubmitting(true);
      setSubmitError("");
      setSubmitMessage("");

      const response = await fetch(
        "/api/homeowner/service-request/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            associationId:
              "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",
            ownerUserId:
              "2576c2a8-e49e-4009-9d07-10aba3c63090",
            unitNumber: "101",
            ownerName: "Robert Mitchell",
            ownerEmail: "unit101@sunsetcondo.com",
            requestType,
            priority,
            title,
            description,
            location,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to submit service request."
        );
      }

      setSubmitMessage(
        "Service request submitted successfully."
      );

      setTitle("");
      setDescription("");
      setLocation("");
setPriority("Normal");
setRequestType("Common Area Maintenance");

await loadServiceRequests();
    } catch (error) {
      setSubmitError(
        error.message || "Unable to submit request."
      );
    } finally {
      setSubmitting(false);
    }
  }
  const openRequests = [
    {
      id: "WO-1047",
      title: "Pool light not working",
      category: "Common Area",
      status: "In Review",
      priority: "Medium",
      date: "Apr 28, 2026",
      update: "Ava reviewed the request and routed it to management.",
    },
    {
      id: "WO-1039",
      title: "Irrigation leak near building entrance",
      category: "Landscape",
      status: "Vendor Assigned",
      priority: "High",
      date: "Apr 26, 2026",
      update: "Vendor dispatch pending confirmation.",
    },
    {
      id: "WO-1028",
      title: "Gate access keypad issue",
      category: "Access Control",
      status: "Scheduled",
      priority: "Medium",
      date: "Apr 22, 2026",
      update: "Technician visit scheduled.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Work Orders & Service Requests
              </h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                Submit maintenance requests, track ticket status, review updates,
                and get AI-powered assistance from Ava.
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

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-yellow-400">
                Submit New Request
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Tell us what needs attention
              </h2>
            </div>
            <div className="rounded-2xl bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
              AI Assisted
            </div>
          </div>

          <form
  className="mt-6 space-y-5"
  onSubmit={(e) => {
    e.preventDefault();
    submitRequest();
  }}
>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300">Request Type</label>
                <select
  value={requestType}
  onChange={(e) => setRequestType(e.target.value)}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-400"
>
  <option>Common Area Maintenance</option>
  <option>Landscape / Irrigation</option>
  <option>Lighting / Electrical</option>
  <option>Gate / Access Control</option>
  <option>Plumbing</option>
  <option>Other</option>
</select>
              </div>

              <div>
                <label className="text-sm text-slate-300">Priority</label>
                <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-400"
>
  <option>Normal</option>
  <option>High</option>
  <option>Emergency</option>
</select>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300">Request Title</label>
              <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
  placeholder="Example: Pool light not working"
/>
            </div>

            <div>
              <label className="text-sm text-slate-300">Description</label>
              <textarea
  rows="5"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
  placeholder="Describe the issue, location, timing, and any helpful details."
/>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300">Location</label>
                <input
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
  placeholder="Building, unit, common area, etc."
/>
              </div>

              <div>
                <label className="text-sm text-slate-300">Photo Upload</label>
                <div className="mt-2 rounded-2xl border border-dashed border-white/15 bg-slate-900 px-4 py-3 text-sm text-slate-400">
                  Upload photo coming soon
                </div>
              </div>
            </div>

            <button
  type="submit"
  disabled={submitting}
  className="w-full rounded-2xl bg-yellow-400 px-5 py-4 font-semibold text-slate-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
>
  {submitting ? "Submitting..." : "Submit Service Request"}
</button>
    {submitting && (
  <p className="text-sm text-slate-400">
    Submitting request...
  </p>
)}

{submitMessage && (
  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
    {submitMessage}
  </div>
)}

{submitError && (
  <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
    {submitError}
  </div>
)}
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Emergency Instructions
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              For urgent safety or property emergencies
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              For fire, medical, police, active leaks, elevator entrapment, or
              immediate life-safety concerns, call 911 or the appropriate
              emergency service first. Then submit a request so management can
              document and coordinate follow-up.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Ask Ava for Maintenance Help
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Not sure who handles it?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can help determine whether an issue may be homeowner,
              association, vendor, or management responsibility based on the
              association’s documents and rules.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Request Timeline
            </p>

            <div className="mt-5 space-y-4">
              {[
  "Request submitted",
  "Ava reviews issue details",
  "Management verifies responsibility",
  "BOD approval if required",
  "Vendor assigned if needed",
  "Resident receives status updates",
].map((item, index) => (
  <div key={item} className="flex gap-4">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-slate-950">
      {index + 1}
    </div>

    <div>
      <p className="font-medium">{item}</p>

      <p className="text-sm text-slate-400">
        Step {index + 1} of the service request process
      </p>
    </div>
  </div>
))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
  <div className="mb-5 flex items-end justify-between gap-4">
    <div>
      <p className="text-sm font-medium text-yellow-400">
        Open Requests
      </p>
      <h2 className="mt-2 text-2xl font-semibold">
        Active ticket status
      </h2>
    </div>

    <p className="text-sm text-slate-400">
      {requestsLoading
        ? "Loading requests..."
        : `${liveRequests.length} open request${
            liveRequests.length === 1 ? "" : "s"
          }`}
    </p>
  </div>

  {requestsLoading ? (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
      Loading homeowner service requests...
    </div>
  ) : liveRequests.length > 0 ? (
    <div className="grid gap-5 lg:grid-cols-3">
      {liveRequests.map((request) => (
        <div
          key={request.id}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-yellow-400/40 hover:bg-white/[0.06]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">
                {String(request.id || "").slice(0, 8).toUpperCase()}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {request.title}
              </h3>
            </div>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {request.priority || "Normal"}
            </span>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Category</span>
              <span>{request.request_type || "Service Request"}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Status</span>
              <span className="text-yellow-300">
                {request.status || "Received"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Submitted</span>
              <span>
                {request.created_at
                  ? new Date(request.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently"}
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
            {request.workflow_stage || "Owner Submitted"}
          </div>

          <button className="mt-5 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/50 hover:text-yellow-300">
            View Ticket Details
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
      No service requests have been submitted yet.
    </div>
  )}
</section>
    </main>
  );
}
