// File: /portal/owner/amenities.js

import Link from "next/link";

const amenityRequests = [
  {
    id: "AMN-5021",
    amenity: "Clubhouse",
    requestDate: "May 18, 2026",
    time: "6:00 PM - 9:00 PM",
    status: "Pending Review",
    purpose: "Family gathering",
  },
  {
    id: "AMN-5012",
    amenity: "Pool Pavilion",
    requestDate: "Apr 27, 2026",
    time: "12:00 PM - 3:00 PM",
    status: "Approved",
    purpose: "Birthday lunch",
  },
  {
    id: "AMN-4989",
    amenity: "Tennis Court",
    requestDate: "Apr 12, 2026",
    time: "8:00 AM - 9:30 AM",
    status: "Completed",
    purpose: "Owner reservation",
  },
];

const amenities = [
  {
    name: "Clubhouse",
    availability: "Reservation Required",
    deposit: "$250 refundable deposit",
  },
  {
    name: "Pool Pavilion",
    availability: "Reservation Required",
    deposit: "$100 refundable deposit",
  },
  {
    name: "Tennis Court",
    availability: "Open Scheduling",
    deposit: "No deposit required",
  },
  {
    name: "Fitness Room",
    availability: "Owner Access Only",
    deposit: "No reservation needed",
  },
];

function statusClass(status) {
  if (status === "Pending Review") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  if (status === "Approved") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return "border-white/10 bg-white/5 text-white/70";
}

export default function OwnerAmenities() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Amenity Requests</h1>
            <p className="mt-2 text-white/60">
              Request amenity reservations, review access rules, and track approval status.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            + New Amenity Request
          </button>
        </div>

        {/* Hero */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Reservation Support</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Amenity access made simple</h2>
          <p className="mt-3 max-w-3xl text-yellow-50/80">
            Submit reservation requests through the portal so management can verify availability,
            confirm requirements, and route approvals consistently.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Pending Requests</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Approved Reservations</p>
            <p className="mt-2 text-4xl font-bold">1</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Available Amenities</p>
            <p className="mt-2 text-4xl font-bold">4</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Requests */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Reservation History</h2>
                <p className="mt-1 text-sm text-white/50">Recent and upcoming amenity requests.</p>
              </div>

              <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                View Calendar
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {amenityRequests.map((request) => (
                <div key={request.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm text-white/50">{request.id} • {request.amenity}</p>
                      <h3 className="mt-1 text-xl font-semibold">{request.purpose}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Date</p>
                          <p className="mt-1 text-sm text-white/80">{request.requestDate}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Time</p>
                          <p className="mt-1 text-sm text-white/80">{request.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(request.status)}`}>
                        {request.status}
                      </span>
                      <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenity Directory */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Amenity Directory</h2>
            <p className="mt-1 text-sm text-white/50">Available community amenities and reservation rules.</p>

            <div className="mt-6 space-y-4">
              {amenities.map((amenity) => (
                <div key={amenity.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-yellow-400 transition">
                  <h3 className="font-semibold">{amenity.name}</h3>
                  <p className="mt-2 text-sm text-white/50">{amenity.availability}</p>
                  <p className="mt-1 text-sm text-yellow-300">{amenity.deposit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
