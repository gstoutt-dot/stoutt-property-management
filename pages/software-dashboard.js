import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const routeAccess = [
  {
    path: "/portal/manager-hub",
    roles: ["manager", "admin"],
  },
  {
    path: "/portal/manager",
    roles: ["manager", "admin"],
  },
  {
    path: "/portal/workflow-engine-live",
    roles: ["manager", "admin"],
  },
  {
    path: "/portal/workflow-engine",
    roles: ["manager", "admin"],
  },
  {
    path: "/board/command-center",
    roles: ["board", "manager", "admin"],
  },
  {
    path: "/board/action-center",
    roles: ["board", "manager", "admin"],
  },
  {
    path: "/board",
    roles: ["board", "manager", "admin"],
  },
  {
    path: "/portal/owner-hub",
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    path: "/portal/owner",
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    path: "/portal",
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    path: "/software-dashboard",
    roles: ["owner", "manager", "board", "admin"],
  },
];

function AccessDenied({ onReturn }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-xl font-bold text-amber-300">
            S
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Access Restricted
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            This area is not assigned to your role.
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Return to your dashboard to view the portals available to your
            current login.
          </p>

          <button
            onClick={onReturn}
            className="mt-6 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
          >
            Return to Dashboard
          </button>
        </div>
      </section>
    </main>
  );
}

function PortalGate({ children }) {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const path = router.pathname;

    const matchingRoute = routeAccess.find(
      (route) => path === route.path || path.startsWith(`${route.path}/`)
    );

    if (!matchingRoute) {
      setDenied(false);
      setCheckingAccess(false);
      return;
    }

    const loggedIn = localStorage.getItem("spmPortalLoggedIn");
    const role = localStorage.getItem("spmPortalRole");

    if (loggedIn !== "true") {
      router.replace("/homeowner-login");
      return;
    }

    if (!matchingRoute.roles.includes(role)) {
      setDenied(true);
      setCheckingAccess(false);
      return;
    }

    setDenied(false);
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

  if (denied) {
    return <AccessDenied onReturn={() => router.push("/software-dashboard")} />;
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
