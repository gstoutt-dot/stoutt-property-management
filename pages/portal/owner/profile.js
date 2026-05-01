// File: /portal/owner/profile.js

import Link from "next/link";

const ownerProfile = {
  name: "Michael Reynolds",
  email: "michael.reynolds@example.com",
  phone: "(954) 555-1842",
  mailingAddress: "1842 Harbor Palm Drive, Unit 204, Fort Lauderdale, FL 33301",
  propertyAddress: "1842 Harbor Palm Drive, Unit 204",
  association: "Harbor Palm Villas HOA",
  emergencyContact: "Laura Reynolds",
  emergencyPhone: "(954) 555-9031",
};

const preferences = [
  {
    label: "Assessment Notices",
    value: "Email",
  },
  {
    label: "Violation Notices",
    value: "Email + SMS",
  },
  {
    label: "Maintenance Updates",
    value: "Email + Portal",
  },
  {
    label: "Board Meeting Notices",
    value: "Email",
  },
];

export default function OwnerProfile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Owner Profile</h1>
            <p className="mt-2 text-white/60">
              Manage contact information, mailing details, and communication preferences.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            Save Changes
          </button>
        </div>

        {/* Profile Hero */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Owner Record</p>
              <h2 className="mt-3 text-3xl font-bold">{ownerProfile.name}</h2>
              <p className="mt-2 text-white/60">{ownerProfile.propertyAddress}</p>
              <p className="mt-1 text-white/50">{ownerProfile.association}</p>
            </div>

            <div className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
              Verified Owner
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Contact Info */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="mt-1 text-sm text-white/50">Primary information used for account communication.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Full Name</p>
                <p className="mt-2 font-semibold">{ownerProfile.name}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Email</p>
                <p className="mt-2 font-semibold">{ownerProfile.email}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Phone</p>
                <p className="mt-2 font-semibold">{ownerProfile.phone}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Association</p>
                <p className="mt-2 font-semibold">{ownerProfile.association}</p>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Mailing Address</p>
                <p className="mt-2 font-semibold">{ownerProfile.mailingAddress}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Emergency Contact</h2>
            <p className="mt-1 text-sm text-white/50">Used only when urgent property-related contact is needed.</p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Name</p>
                <p className="mt-2 font-semibold">{ownerProfile.emergencyContact}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Phone</p>
                <p className="mt-2 font-semibold">{ownerProfile.emergencyPhone}</p>
              </div>

              <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition">
                Update Emergency Contact
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Communication Preferences</h2>
              <p className="mt-1 text-sm text-white/50">Choose how you receive important association updates.</p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
              Edit Preferences
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {preferences.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-yellow-400 transition">
                <p className="text-sm text-white/50">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-yellow-300">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
