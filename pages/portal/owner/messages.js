import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

export default function OwnerMessages() {
  const router = useRouter();
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOwnerProfile();
  }, []);

  async function loadOwnerProfile() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user?.email) {
        router.replace("/portal/owner/login");
        return;
      }

      const response = await fetch(
        `/api/owner/profile?ownerEmail=${encodeURIComponent(
          user.email
        )}&authUserId=${encodeURIComponent(user.id || "")}`
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        router.replace("/portal/owner/login");
        return;
      }

      setOwnerProfile(result.ownerProfile);
    } catch (error) {
      console.error("Owner messages profile load failed:", error);
      router.replace("/portal/owner/login");
    }

    setLoading(false);
  }

  const messages = [
    {
      id: "MSG-001",
      subject: "Account and request updates",
      status: "Available",
      preview:
        "Owner messages and management updates will appear here as communication workflows are activated.",
    },
    {
      id: "MSG-002",
      subject: "Financial and service notifications",
      status: "Available",
      preview:
        "Balance updates, service progress, and management responses can be organized here for homeowner visibility.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
              Owner Communication Center
            </p>

            <h1 className="mt-2 text-2xl font-semibold">Messages</h1>
          </div>

          <Link
            href="/portal/owner"
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20"
          >
            Owner Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6">
          <h2 className="text-3xl font-semibold">
            Homeowner Messages
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Secure communication area for management updates, owner notices,
            request follow-up, financial messages, and association communication.
          </p>

          <p className="mt-4 text-sm text-yellow-200">
            {loading
              ? "Loading owner profile..."
              : `Signed in as ${ownerProfile?.ownerName || "Homeowner"}`}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">
                    {message.id} · {message.status}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {message.subject}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {message.preview}
                  </p>
                </div>

                <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
