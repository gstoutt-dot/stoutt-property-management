import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import NotificationBell from "../../../components/NotificationBell";
import OwnerBalanceCard from "../../../components/OwnerBalanceCard";

const DEMO_OWNER_PROFILE = {
  associationName: "Sunset Condominium Association",
  ownerName: "Robert Mitchell",
  streetAddress: "Sunset Condominium Association",
  city: "Hollywood",
  state: "FL",
  zip: "33021",
  phone: "(954) 555-0101",
  email: "unit101@sunsetcondo.com",
  association_id: "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2",
  id: "2576c2a8-e49e-4009-9d07-10aba3c63090",
  unitNumber: "101",
};

const ownerStatusFlow = [
  { key: "received", label: "Received", progress: 25 },
  { key: "under_review", label: "Under Review", progress: 50 },
  { key: "dispatched", label: "Dispatched", progress: 75 },
  { key: "completed", label: "Completed", progress: 100 },
];

function getOwnerStatus(item) {
  const status = String(item?.status || "").toLowerCase().trim();

  if (status === "completed" || item?.vendor_status === "completed") {
    return "completed";
  }

  if (status === "dispatched" || item?.dispatched) {
    return "dispatched";
  }

  if (
    status === "manager_review" ||
    status === "board_review" ||
    status === "board_approved" ||
    status === "needs_clarification"
  ) {
    return "under_review";
  }

  return "received";
}

function getCurrentStepIndex(item) {
  const ownerStatus = getOwnerStatus(item);
  const index = ownerStatusFlow.findIndex((step) => step.key === ownerStatus);
  return index >= 0 ? index : 0;
}

function getProgress(item) {
  const index = getCurrentStepIndex(item);
  return ownerStatusFlow[index]?.progress || 25;
}

function getOwnerNextStep(item) {
  const ownerStatus = getOwnerStatus(item);

  if (ownerStatus === "completed") {
    return "This request has been completed.";
  }

  if (ownerStatus === "dispatched") {
    return "A vendor or service provider has been dispatched.";
  }

  if (ownerStatus === "under_review") {
    return "Management is reviewing and coordinating the next step.";
  }

  return "Your request has been received.";
}

function getOwnerPublicUpdate(item) {
  const ownerStatus = getOwnerStatus(item);

  if (ownerStatus === "completed") {
    return "Your request has been completed. Thank you for allowing us to assist you.";
  }

  if (ownerStatus === "dispatched") {
    return "Your request has moved forward and service coordination is underway.";
  }

  if (ownerStatus === "under_review") {
    return "Your request is currently under review by management.";
  }

  return "Your request has been received and is now in the management queue.";
}

function ProfileCard({ label, value, wide }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/20 p-4 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-300">
        {value || "Not available"}
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-300">{value}</div>
    </div>
  );
}

function TimelineStep({ active, complete, label, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`h-4 w-4 rounded-full border ${
            active
              ? "border-yellow-400 bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.45)]"
              : "border-white/20 bg-white/10"
          }`}
        />

        {!isLast && (
          <div
            className={`h-8 w-px ${complete ? "bg-yellow-400" : "bg-white/15"}`}
          />
        )}
      </div>

      <div
        className={
          active ? "pb-4 text-sm text-slate-200" : "pb-4 text-sm text-slate-500"
        }
      >
        {label}
      </div>
    </div>
  );
}

export default function OwnerPortal() {
  const [items, setItems] = useState([]);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    request_type: "maintenance",
    title: "",
    description: "",
    priority: "medium",
    best_contact_time: "",
    amenity_selected: "",
    amenity_date: "",
  });

  useEffect(() => {
  fetchOwnerProfile();
}, []);

useEffect(() => {
  if (!ownerProfile?.association_id) return;

  fetchItems();

  const interval = setInterval(() => {
    fetchItems(false);
  }, 5000);

  return () => clearInterval(interval);
}, [ownerProfile?.association_id, ownerProfile?.id, ownerProfile?.unitNumber]);

  async function fetchOwnerProfile() {
  setProfileLoading(true);

  try {
    /*
      TEMP PRODUCTION ACCESS LOOKUP

      During presentation/demo phase we resolve the
      provisioned owner access record directly.

      NEXT PHASE:
      Replace this with authenticated session lookup.
    */

    const demoOwnerEmail = "unit101@sunsetcondo.com";

    const { data: accessRecord, error: accessError } = await supabase
      .from("owner_access_provisioning_records")
      .select("*")
      .eq("owner_email", demoOwnerEmail)
      .single();

    if (accessError || !accessRecord) {
      console.error("Owner access lookup failed", accessError);

      setOwnerProfile(DEMO_OWNER_PROFILE);
      setProfileLoading(false);
      return;
    }

    const hydratedProfile = {
      associationName: accessRecord.association_name,
      ownerName: accessRecord.owner_name,
      streetAddress: accessRecord.street_address,
      city: accessRecord.city,
      state: accessRecord.state,
      zip: accessRecord.zip,
      phone: accessRecord.owner_phone,
      email: accessRecord.owner_email,
      association_id: accessRecord.association_id,
      id: accessRecord.owner_user_id,
      unitNumber: accessRecord.unit_number,
    };

    setOwnerProfile(hydratedProfile);
  } catch (err) {
    console.error("Owner profile hydration failed", err);

    setOwnerProfile(DEMO_OWNER_PROFILE);
  }

  setProfileLoading(false);
}

  async function fetchItems(showLoading = true) {
  if (!ownerProfile?.association_id) return;

  if (showLoading) setLoading(true);

  const { data, error } = await supabase
    .from("bos_actions")
    .select("*")
    .eq("association_id", ownerProfile.association_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Owner request lookup failed", error);
    setItems([]);
    if (showLoading) setLoading(false);
    return;
  }

  const ownerFilteredItems = (data || []).filter((item) => {
    const itemOwnerUserId = String(item.owner_user_id || "").trim();
    const itemOwnerEmail = String(item.owner_email || "").toLowerCase().trim();
    const itemUnit = String(item.unit || "").trim();
    const itemUnitNumber = String(item.unit_number || "").trim();

    const profileOwnerUserId = String(ownerProfile.id || "").trim();
    const profileOwnerEmail = String(ownerProfile.email || "").toLowerCase().trim();
    const profileUnitNumber = String(ownerProfile.unitNumber || "").trim();

    return (
      itemOwnerUserId === profileOwnerUserId ||
      itemOwnerEmail === profileOwnerEmail ||
      itemUnit === profileUnitNumber ||
      itemUnitNumber === profileUnitNumber
    );
  });

  setItems(ownerFilteredItems);

  if (showLoading) setLoading(false);
}

  function fullAddress(profile) {
    if (!profile) return "";

    const address = [
      profile.streetAddress,
      profile.city,
      profile.state,
      profile.zip,
    ]
      .filter(Boolean)
      .join(", ");

    return profile.unitNumber
      ? `${address} | Unit ${profile.unitNumber}`
      : address;
  }

  async function submitRequest(e) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage("Please enter both a title and description.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("bos_actions").insert([
      {
        request_type: form.request_type,
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        association_id: ownerProfile.association_id,
association_name: ownerProfile.associationName,
owner_user_id: ownerProfile.id,
owner_name: ownerProfile.ownerName,
owner_email: ownerProfile.email,
unit: ownerProfile.unitNumber,
unit_number: ownerProfile.unitNumber,
property_address: fullAddress(ownerProfile),
owner_phone: ownerProfile.phone,
        best_contact_time: form.best_contact_time.trim(),
        amenity_selected: form.amenity_selected,
        amenity_date: form.amenity_date,
        status: "open",
        source: "Owner Portal",
      },
    ]);

    if (error) {
  setErrorMessage(error.message);
  setSubmitting(false);
  return;
}

await fetch("/api/notifications/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    associationId: ownerProfile?.association_id,
    recipientRole: "manager",
    notificationType: "owner_request_submitted",
    title: "New owner request submitted",
    message: `${ownerProfile?.ownerName} submitted a new request.`,
    priority: form.priority || "normal",
  }),
});

setSuccessMessage("Request submitted successfully.");

    setForm({
      request_type: "maintenance",
      title: "",
      description: "",
      priority: "medium",
      best_contact_time: "",
      amenity_selected: "",
      amenity_date: "",
    });

    await fetchItems();
    setSubmitting(false);
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => item.status !== "rejected");
  }, [items]);

  const notifiedItems = visibleItems.filter(
    (item) => item.owner_notified
  );

  const activeItems = visibleItems.filter(
    (item) => getOwnerStatus(item) !== "completed"
  );

  const requestTypeLabels = {
  maintenance: "Maintenance Request",

  architectural: "Architectural Review",

  amenity: "Amenity Reservation",

  financial_balance_question: "Balance Question",

  financial_statement_request: "Statement Request",

  financial_payment_review: "Payment Review",

  financial_payment_arrangement:
    "Payment Arrangement Inquiry",

  violation: "Violation Question",

  documents: "Document Request",

  general: "General Request",
};

  const ownerStatusCopy = {
    received: "Received",
    under_review: "Under Review",
    dispatched: "Dispatched",
    completed: "Completed",
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              Owner Request Portal
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Request Status Center
            </h1>

            <p className="mt-3 text-slate-400">
              Submit requests and track live status updates.
            </p>
          </div>

         <div className="flex items-center gap-3">
  <NotificationBell
  associationId={ownerProfile?.association_id}
  recipientRole="owner"
  recipientUserId={ownerProfile?.id}
  label="Owner Updates"
/>

  <button
    onClick={() => fetchItems()}
    className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
  >
    Refresh Status
  </button>
</div>
        </div>

        </div>

<OwnerBalanceCard
  associationId={ownerProfile?.association_id}
  ownerUserId={ownerProfile?.id}
  unitNumber={ownerProfile?.unitNumber}
/>

<div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Submit a Request
            </h2>
          </div>

          <form onSubmit={submitRequest} className="space-y-6">

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Prepopulated Owner Profile
                  </h3>
                </div>

                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Locked
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <ProfileCard
                  label="Association"
                  value={ownerProfile?.associationName}
                />

                <ProfileCard
                  label="Owner Name"
                  value={ownerProfile?.ownerName}
                />

                <ProfileCard
                  label="Email"
                  value={ownerProfile?.email}
                />

                <ProfileCard
                  label="Phone"
                  value={ownerProfile?.phone}
                />

                <ProfileCard
                  label="Property Address"
                  value={fullAddress(ownerProfile)}
                  wide
                />

              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="grid gap-4 md:grid-cols-2">

                <div>
                  <label className={labelClass}>Request Type</label>
                  <select
                    value={form.request_type}
                    onChange={(e) =>
                      setForm({ ...form, request_type: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="maintenance">Maintenance Request</option>
                    <option value="architectural">Architectural Review</option>
                    <option value="amenity">Amenity Reservation</option>
                    <option value="financial_balance_question">
  Balance Question
</option>

<option value="financial_statement_request">
  Statement Request
</option>

<option value="financial_payment_review">
  Payment Review
</option>

<option value="financial_payment_arrangement">
  Payment Arrangement Inquiry
</option>
                    <option value="violation">Violation Question</option>
                    <option value="documents">Document Request</option>
                    <option value="general">General Request</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Request Title</label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Short request title"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Best Time to Contact</label>
                  <input
                    value={form.best_contact_time}
                    onChange={(e) =>
                      setForm({ ...form, best_contact_time: e.target.value })
                    }
                    placeholder="Example: Weekdays after 3 PM"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Describe your request..."
                    rows={5}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl border border-yellow-400/30 bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 hover:bg-yellow-300"
            >
              {submitting ? "Submitting Request..." : "Submit Request"}
            </button>
          </form>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Active Requests</div>
            <div className="mt-2 text-3xl font-semibold">
              {activeItems.length}
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <div className="text-sm text-yellow-300">Service Visibility</div>
            <div className="mt-2 text-xl font-semibold">Live Updates</div>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            <div className="text-sm text-emerald-300">Owner Updates Sent</div>
            <div className="mt-2 text-3xl font-semibold">
              {notifiedItems.length}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">My Requests</h2>
          </div>

          <div className="divide-y divide-white/10">

  {!loading && visibleItems.length === 0 && (
    <div className="px-6 py-10">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <h3 className="text-lg font-semibold text-white">
          No owner requests found
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Requests submitted from this portal will appear here once they are linked
          to your association, unit, and owner profile.
        </p>
      </div>
    </div>
  )}

  {visibleItems.map((item) => {
              const ownerStatus = getOwnerStatus(item);
              const currentIndex = getCurrentStepIndex(item);
              const progress = getProgress(item);

              return (
                <div key={item.id} className="px-6 py-6">

                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                      {ownerStatusCopy[ownerStatus]}
                    </span>

                    {item.owner_notified && (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        Update Sent
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {getOwnerPublicUpdate(item)}
                  </p>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <InfoCard
                      label="Request Type"
                      value={
                        requestTypeLabels[item.request_type] || "General Request"
                      }
                    />

                    <InfoCard
                      label="Submitted"
                      value={
                        item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "—"
                      }
                    />

                    <InfoCard
                      label="Next Step"
                      value={getOwnerNextStep(item)}
                    />

                  </div>

                  <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-black/30 p-5">

                    <div className="mb-5 flex items-center justify-between">
                      <h4 className="font-semibold text-white">
                        Status Timeline
                      </h4>

                      <span className="text-xs font-medium text-yellow-300">
                        {progress}%
                      </span>
                    </div>

                    <div className="space-y-0">
                      {ownerStatusFlow.map((step, index) => (
                        <TimelineStep
                          key={step.key}
                          active={index <= currentIndex}
                          complete={index < currentIndex}
                          label={step.label}
                          isLast={index === ownerStatusFlow.length - 1}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              );
            })}

      </div>
    </div>
  </div>
);
}




