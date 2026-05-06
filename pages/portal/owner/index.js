import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const DEMO_OWNER_PROFILE = {
  associationName: "Royal Palm Villas HOA",
  ownerName: "Michael Bennett",
  streetAddress: "1842 Palm Ridge Drive",
  city: "Hollywood",
  state: "FL",
  zip: "33021",
  phone: "(954) 555-0148",
  email: "demo.owner1@stouttpm.com",
  unitNumber: "",
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

  if (ownerStatus === "completed") return "This request has been completed.";
  if (ownerStatus === "dispatched") return "A vendor or service provider has been dispatched.";
  if (ownerStatus === "under_review") return "Management is reviewing and coordinating the next step.";

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

export default function OwnerPortal() {
  const [items, setItems] = useState([]);
  const [ownerProfile, setOwnerProfile] = useState(DEMO_OWNER_PROFILE);
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
    fetchItems();

    const interval = setInterval(() => {
      fetchItems(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function fetchOwnerProfile() {
    setProfileLoading(true);
    setOwnerProfile(DEMO_OWNER_PROFILE);
    setProfileLoading(false);
  }

  async function fetchItems(showLoading = true) {
    if (showLoading) setLoading(true);

    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setItems(data || []);
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

    return profile.unitNumber ? `${address} | Unit ${profile.unitNumber}` : address;
  }

  async function submitRequest(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!ownerProfile) {
      setErrorMessage("Owner profile could not be loaded.");
      return;
    }

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage("Please enter both a title and description.");
      return;
    }

    if (form.request_type === "amenity" && !form.amenity_selected.trim()) {
      setErrorMessage("Please enter the amenity requested.");
      return;
    }

    if (form.request_type === "amenity" && !form.amenity_date) {
      setErrorMessage("Please select the amenity reservation date.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("bos_actions").insert([
      {
        request_type: form.request_type,
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        association_name: ownerProfile.associationName,
        owner_name: ownerProfile.ownerName,
        owner_email: ownerProfile.email,
        property_address: fullAddress(ownerProfile),
        owner_phone: ownerProfile.phone,
        best_contact_time: form.best_contact_time.trim(),
        amenity_selected:
          form.request_type === "amenity" ? form.amenity_selected.trim() : "",
        amenity_date: form.request_type === "amenity" ? form.amenity_date : null,
        status: "open",
        source: "Owner Portal",
      },
    ]);

    if (error) {
      setErrorMessage(error.message || "Request could not be submitted.");
      setSubmitting(false);
      return;
    }

    setForm({
      request_type: "maintenance",
      title: "",
      description: "",
      priority: "medium",
      best_contact_time: "",
      amenity_selected: "",
      amenity_date: "",
    });

    setSuccessMessage("Request submitted successfully.");
    await fetchItems();
    setSubmitting(false);
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => item.status !== "rejected");
  }, [items]);

  const notifiedItems = visibleItems.filter((item) => item.owner_notified);
  const activeItems = visibleItems.filter((item) => getOwnerStatus(item) !== "completed");

  const requestTypeLabels = {
    maintenance: "Maintenance Request",
    architectural: "Architectural Review",
    amenity: "Amenity Reservation",
    financial: "Financial / Account Request",
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
    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/10";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              Owner Request Portal
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Request Status Center
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Submit requests and view simple live updates from Stoutt Property Management.
            </p>
          </div>

          <button
            onClick={() => fetchItems()}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
          >
            Refresh Status
          </button>
        </div>

        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Submit a Request</h2>
            <p className="mt-2 text-sm text-slate-400">
              Owner and property information is prepopulated from the account profile.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              {successMessage}
            </div>
          )}

          <form onSubmit={submitRequest} className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Prepopulated Owner Profile
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    These fields come from the owner account record and travel with every request.
                  </p>
                </div>

                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Locked
                </span>
              </div>

              {profileLoading ? (
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                  Loading owner profile...
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <ProfileCard label="Association" value={ownerProfile?.associationName} />
                  <ProfileCard label="Owner Name" value={ownerProfile
