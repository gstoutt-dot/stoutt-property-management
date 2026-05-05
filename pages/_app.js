import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const protectedRoutes = [
  "/portal",
  "/portal/owner-hub",
  "/portal/manager-hub",
  "/portal/workflow-engine",
  "/portal/workflow-engine-live",
  "/portal/owner",
  "/portal/manager",
  "/board",
  "/board/command-center",
  "/board/action-center",
  "/software-dashboard",
];

function PortalGate({ children }) {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const path = router.pathname;

    const isProtected = protectedRoutes.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    if (!isProtected) {
      setCheckingAccess(false);
      return;
    }

    const loggedIn = localStorage.getItem("spmPortalLoggedIn");

    if (loggedIn !== "true") {
      router.replace("/homeowner-login");
      return;
    }

    setCheckingAccess(false);
  }, [router.pathname, router]);

  if (checkingAccess) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-xl font-bold text-amber-300">
              S
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
              Verifying Access
            </p>
            <h1 className="mt-3 text-2xl font-semibold">
              Stoutt Property Management
            </h1>
          </div>
        </section>
      </main>
    );
  }

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <PortalGate>
      <Component {...pageProps} />
    </PortalGate>
  );
}
