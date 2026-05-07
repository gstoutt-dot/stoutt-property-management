import { useState } from "react";

export default function DemoAssociationSeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function runSeed() {
    setLoading(true);
    setErrorMessage("");
    setResult(null);

    try {
      const apiResponse = await fetch("/api/demo/seed-association", {
  method: "POST",
});

const response = await apiResponse.json();

      if (!response.success) {
        setErrorMessage(
          response.error?.message || "Unable to seed association."
        );

        setLoading(false);
        return;
      }

      setResult(response);
      setLoading(false);
    } catch (error) {
      console.error("Seed page failed:", error);

      setErrorMessage("Unexpected seed error.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
            Multi-Association Architecture
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            Demo Association Seeder
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            This creates a secure demo association with scoped
            board, manager, and owner profiles for testing the
            next-generation access-control architecture.
          </p>
        </div>

        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/80">
                Demo Community
              </p>

              <h2 className="mt-2 text-3xl font-semibold">
                Royal Palm Villas HOA
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                Creates:
                manager profile,
                board members,
                owner records,
                association scope,
                and secure role infrastructure.
              </p>
            </div>

            <button
              onClick={runSeed}
              disabled={loading}
              className="rounded-2xl border border-yellow-400/30 bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 hover:bg-yellow-300 disabled:opacity-40"
            >
              {loading
                ? "Creating Association..."
                : "Seed Demo Association"}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/10 p-6">
            <p className="text-red-200">{errorMessage}</p>
          </div>
        )}

        {result && (
          <>
            <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
              <h2 className="text-2xl font-semibold text-emerald-200">
                Association Successfully Created
              </h2>

              <p className="mt-4 max-w-4xl leading-8 text-slate-300">
                The platform now contains a live demo association
                with role-scoped user profiles connected to the
                new multi-association architecture.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                Created Profiles
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {(result.profiles || []).map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function ProfileCard({ profile }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
        {profile.role}
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {profile.full_name}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-slate-400">
        <p>{profile.email}</p>

        <p>
          Unit:
          {" "}
          {profile.unit_number || "N/A"}
        </p>

        <p className="break-all">
          Association ID:
          {" "}
          {profile.association_id}
        </p>
          <p className="break-all">
  Profile ID:
  {" "}
  {profile.id}
</p>
      </div>
    </div>
  );
}
