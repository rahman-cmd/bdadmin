import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 md:w-6 md:h-6"
    aria-hidden
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AgencyIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 md:w-6 md:h-6"
    aria-hidden
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HistoryIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 md:w-6 md:h-6"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const navItems = [
  { label: "Dashboard", path: "/bdadmin/dashboard", icon: DashboardIcon },
  { label: "Agencies", path: "/bdadmin/agencies", icon: AgencyIcon },
  { label: "History", path: "/bdadmin/agencyHistory", icon: HistoryIcon },
];

export default function BDAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bdAdmin } = useSelector((state) => state.agencyAdmin);

  const item = ({ label, path, icon }, isSidebar = false) => {
    const isActive = location.pathname === path;
    return (
      <button
        type="button"
        key={label}
        onClick={() => navigate(path)}
        className={`
          border-none flex items-center font-medium cursor-pointer transition-all duration-200 ease-out
          ${isSidebar
            ? "flex-row justify-start w-full px-4 py-3 rounded-xl text-base mb-1.5"
            : "flex-col justify-center min-h-[52px] min-w-[64px] py-2 px-1 text-[10px] active:scale-95"
          }
          ${isActive
            ? isSidebar
              ? "bg-gradient-to-r from-danger/25 to-info/20 text-white shadow-[0_0_24px_-8px_rgba(232,83,143,0.35)] ring-1 ring-white/10"
              : "text-danger"
            : isSidebar
              ? "bg-transparent text-white/75 hover:bg-white/10 hover:text-white"
              : "text-white/55"
          }
        `}
      >
        <span className={isActive && !isSidebar ? "text-danger" : ""}>{icon}</span>
        <span
          className={`${isSidebar ? "text-sm ml-3 font-medium" : "text-[10px] mt-1 font-medium"} truncate max-w-full`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex min-h-[100dvh] min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-night-950">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-[1000] h-screen w-[280px] flex-col overflow-y-auto bg-sidebar-mesh backdrop-blur-2xl border-r border-white/10 shadow-panel p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/5 backdrop-blur-sm">
          <h2 className="text-center text-xl font-bold tracking-tight bg-gradient-to-r from-danger via-info to-danger bg-clip-text text-transparent">
            BD Admin
          </h2>
          <p className="mt-1 text-center text-[11px] text-text-muted">Control panel</p>
          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-danger/60 to-transparent" />
        </div>

        {bdAdmin && bdAdmin.name && (
          <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-4 text-xs text-[#EAF0FF] shadow-inner backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-danger to-info text-sm font-bold text-white shadow-glow">
                {bdAdmin.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">{bdAdmin.name}</div>
                {bdAdmin.user && (
                  <div className="truncate text-[10px] text-text-muted">
                    ID: {bdAdmin.user.uniqueId || bdAdmin.bdId}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1">{navItems.map((nav) => item(nav, true))}</nav>
      </aside>

      {/* Main */}
      <div className="flex min-h-[100dvh] min-h-screen w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-mesh md:ml-[280px] pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] md:pb-8">
        <div className="mx-auto w-full max-w-[1600px] px-3 pt-[max(0.5rem,env(safe-area-inset-top,0px))] pb-4 sm:px-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8">
          <Outlet />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[1000] flex max-w-[100vw] items-center justify-around border-t border-white/10 bg-[#1a0d2e]/92 px-1 py-1.5 shadow-nav backdrop-blur-2xl md:hidden rounded-t-2xl pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
        aria-label="Main navigation"
      >
        {navItems.map((nav) => item(nav, false))}
      </nav>
    </div>
  );
}
