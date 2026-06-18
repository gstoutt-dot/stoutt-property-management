import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const routeAccess = [
  { path: "/admin", roles: ["admin"] },
  { path: "/admin/operations/new", roles: ["admin"] },

  { path: "/portal/manager-hub", roles: ["manager", "admin"] },
  { path: "/portal/manager", roles: ["manager", "admin"] },
  { path: "/portal/workflow-engine-live", roles: ["manager", "admin"] },
  { path: "/portal/workflow-engine", roles: ["manager", "admin"] },

  { path: "/board/command-center", roles: ["board", "manager", "admin"] },
  { path: "/board/action-center", roles: ["board", "manager", "admin"] },
  { path: "/board", roles: ["board", "manager", "admin"] },

  { path: "/portal/owner-hub", roles: ["owner", "manager", "board", "admin"] },
  { path: "/portal/owner", roles: ["owner", "manager", "board", "admin"] },
  { path: "/portal", roles: ["owner", "manager", "board", "admin"] },

  { path: "/software-dashboard", roles: ["owner", "manager", "board", "admin"] },
];

function getDashboardForRole(role) {
  if (role === "admin") return "/admin";
  if (role === "manager") return "/portal/manager-hub";
  if (role === "board") return "/board";
  if (role === "owner") return "/portal/owner";
  return "/admin-login";
}

function AccessDenied({ onReturn }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-xl font-bold text-amber-300">
            S
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Access Restricted
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            This area is not assigned to your role.
          </h1>

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
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const cleanPath = router.asPath.split("?")[0].split("#")[0];

    const publicRoutes = ["/portal/owner/login", "/admin-login"];

    if (publicRoutes.includes(cleanPath)) {
      setDenied(false);
      setCheckingAccess(false);
      return;
    }

    const matchingRoute = routeAccess
      .filter(
        (route) =>
          cleanPath === route.path || cleanPath.startsWith(`${route.path}/`)
      )
      .sort((a, b) => b.path.length - a.path.length)[0];

    if (!matchingRoute) {
      setDenied(false);
      setCheckingAccess(false);
      return;
    }

    setCheckingAccess(true);

    const loggedIn = window.localStorage.getItem("spmPortalLoggedIn");
const role = window.localStorage.getItem("spmPortalRole");

if (loggedIn === "true") {
  window.localStorage.setItem(
    "spmPortalSessionExtendedUntil",
    String(Date.now() + 8 * 60 * 60 * 1000)
  );
}

const extendedUntil = Number(
  window.localStorage.getItem("spmPortalSessionExtendedUntil") || 0
);

if (loggedIn !== "true" && Date.now() > extendedUntil) {
  setCheckingAccess(false);
  router.replace("/admin-login");
  return;
}

if (loggedIn !== "true" && Date.now() <= extendedUntil) {
  window.localStorage.setItem("spmPortalLoggedIn", "true");
}

    if (!role || !matchingRoute.roles.includes(role)) {
      setDenied(true);
      setCheckingAccess(false);
      return;
    }

    setDenied(false);
    setCheckingAccess(false);
  }, [router.isReady, router.asPath, router]);

  if (checkingAccess) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
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
    const role =
      typeof window !== "undefined"
        ? window.localStorage.getItem("spmPortalRole")
        : null;

    return <AccessDenied onReturn={() => router.push(getDashboardForRole(role))} />;
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
