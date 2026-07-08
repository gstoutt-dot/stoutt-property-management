import { useState } from "react";
import { useRouter } from "next/router";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function ProposalPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const benefits = [
    "Experienced HOA and condominium association leadership",
    "Proactive systems built for stronger communication and follow-through",
    "Collections strength and operational discipline",
    "A proposal process designed to be clear, responsive, and professional",
  ];

  const serviceOptions = [
    "Full Service Management",
    "Financial Management",
    "Collections Support",
    "Board Guidance",
    "Operational Oversight",
    "Proposal Review / Transition Help",
  ];

  const trustCards = [
    {
      title: "Professional First Impression",
      text: "Your proposal page should feel as strong and credible as the service you intend to deliver.",
    },
    {
      title: "Clear Intake Structure",
      text: "The form captures the essential information without feeling cold, heavy, or overwhelming.",
    },
    {
      title: "Built to Convert",
      text: "This page supports trust, clarity, and momentum so interested boards actually take the next step.",
    },
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const servicesRequested = formData.getAll("servicesNeeded").join(", ");

    const messageDetails = `
Title / Role: ${formData.get("role") || ""}
Property Type: ${formData.get("propertyType") || ""}
Best Time to Contact: ${formData.get("bestTime") || ""}

Current Challenges / Request:
${formData.get("message") || ""}
`;

    const payload = {
      name: formData.get("fullName") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      association_name: formData.get("associationName") || "",
      property_address: "",
      city: formData.get("location") || "",
      state: "",
      zip_code: "",
      number_of_units: formData.get("units") || "",
      current_management_status: formData.get("propertyType") || "",
      services_requested: servicesRequested,
      biggest_challenge: formData.get("message") || "",
      message: messageDetails,
    };

    try {
      const response = await fetch("/api/spm/request-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit proposal request.");
      }

      router.push("/thank-you");
    } catch (error) {
      console.error("SPM proposal submit error:", error);
      setErrorMessage(
        "Something went wrong while submitting your proposal request. Please try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-0 top-[18%] h-[420px] w-[420px] rounded-full bg-amber-300/5 blur-3xl" />
        <div className="absolute left-0 bottom-[10%] h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-yellow-200">
                Request a Proposal
              </div>

              <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
                Start the conversation with a management company built differently.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                Tell us about your association, your current challenges, and what
                you are looking for in a management partner. We will review your
                needs and follow up with a thoughtful, tailored proposal.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/35 hover:bg-white/[0.07] hover:shadow-[0_0_24px_rgba(250,204,21,0.10)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                      <p className="text-sm leading-7 text-white/75">{item}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300/80">
                  What to expect
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    ["01", "Submit your community details"],
                    ["02", "We review your needs and priorities"],
                    ["03", "We follow up and prepare a tailored proposal"],
                  ].map(([num, text]) => (
                    <div key={num} className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-sm font-semibold text-yellow-200">
                        {num}
                      </div>
                      <p className="text-sm leading-7 text-white/75">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-yellow-400/20 bg-yellow-400/10 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
                  Confidential and no obligation
                </div>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  Your information is reviewed privately and used only to
                  evaluate your request and follow up regarding management
                  services.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-yellow-400/10 to-transparent blur-2xl" />

              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:p-7">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 sm:p-6 lg:p-7">
                  <div className="mb-6">
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300/80">
                      Proposal Request Form
                    </div>

                    <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      Tell us about your association
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                      Complete the form below and we will follow up to discuss
                      your community, current challenges, and the level of
                      support you need.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Title / Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Board member, president, manager, etc."
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="(000) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Association Name
                        </label>
                        <input
                          type="text"
                          name="associationName"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Community / association name"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Community Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="City / County"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Property Type
                        </label>
                        <select
                          name="propertyType"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          defaultValue=""
                        >
                          <option value="" className="bg-slate-900 text-white">
                            Select one
                          </option>
                          <option value="Condominium" className="bg-slate-900 text-white">
                            Condominium
                          </option>
                          <option value="HOA" className="bg-slate-900 text-white">
                            HOA
                          </option>
                          <option value="Townhome" className="bg-slate-900 text-white">
                            Townhome
                          </option>
                          <option value="Mixed Community" className="bg-slate-900 text-white">
                            Mixed Community
                          </option>
                          <option value="Other" className="bg-slate-900 text-white">
                            Other
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Number of Units
                        </label>
                        <input
                          type="text"
                          name="units"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Approximate number of units"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Services Needed
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {serviceOptions.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
                          >
                            <input
                              type="checkbox"
                              name="servicesNeeded"
                              value={item}
                              className="h-4 w-4 rounded border-white/20 bg-transparent accent-yellow-400"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Current Challenges / What You’re Looking For
                      </label>
                      <textarea
                        name="message"
                        rows={6}
                        required
                        className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                        placeholder="Tell us about your community, current management concerns, response issues, collections needs, service expectations, or anything else you would like us to know."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Best Time to Contact You
                      </label>
                      <input
                        type="text"
                        name="bestTime"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                        placeholder="Morning, afternoon, specific days, etc."
                      />
                    </div>

                    {errorMessage && (
                      <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-4 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(234,179,8,0.3)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? "Submitting..." : "Submit Proposal Request"}
                    </button>

                    <p className="text-center text-xs leading-6 text-white/45">
                      Your information is kept confidential and used only to
                      review your request and follow up regarding management
                      services.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {trustCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/35 hover:shadow-[0_0_30px_rgba(234,179,8,0.12)]"
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <StickyMobileCTA />
    </div>
  );
}
