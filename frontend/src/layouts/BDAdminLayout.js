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
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
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
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const navItems = [
  { label: "Dashboard", path: "/bdadmin/dashboard", icon: DashboardIcon },
  { label: "Agencies", path: "/bdadmin/agencies", icon: AgencyIcon },
  { label: "Agency History", path: "/bdadmin/agencyHistory", icon: HistoryIcon },
];

export default function BDAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bdAdmin } = useSelector((state) => state.agencyAdmin);

  const item = ({ label, path, icon }, isSidebar = false) => {
    const isActive = location.pathname === path;
    return (
      <button
        key={label}
        onClick={() => navigate(path)}
        className={`
          border-none flex items-center gap-2.5 font-medium cursor-pointer transition-all
          ${isSidebar 
            ? 'flex-row justify-start w-[90%] mx-auto my-1 px-3.5 py-2 rounded-lg text-base' 
            : 'flex-col justify-center w-full my-0 mx-0.5 py-2.5 px-2 text-xs'
          }
          ${isActive 
            ? 'bg-white/10 text-white' 
            : 'bg-transparent text-[rgba(234,240,255,0.7)] hover:bg-white/5'
          }
        `}
      >
        {icon}
        <span className={`${isSidebar ? 'text-sm' : 'text-[10px] md:text-xs'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#33083e]">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-[250px] bg-sidebar border-r border-white/8 p-5 flex-col overflow-y-auto z-[1000] scrollbar-sidebar">
        <h2 className="text-danger text-xl font-bold mb-5 flex items-center justify-center py-2">
          BD Admin
        </h2>
        {bdAdmin && bdAdmin.name && (
          <div className="p-2.5 mb-5 bg-white/5 rounded-lg text-xs text-[#EAF0FF]">
            <div className="font-bold mb-1">{bdAdmin.name}</div>
            {bdAdmin.user && (
              <div className="text-text-muted text-[11px]">ID: {bdAdmin.user.uniqueId || bdAdmin.bdId}</div>
            )}
          </div>
        )}
        {navItems.map((nav) => item(nav, true))}
      </div>

      {/* Page content */}
      <div className="flex-1 w-full md:ml-[250px] pb-16 md:pb-[62px] text-[#EAF0FF] overflow-x-hidden overflow-y-auto min-h-screen bg-dark transition-all">
        <div className="p-4 md:p-[30px_10px] min-h-[calc(100vh-142px)] transition-all">
          <Outlet />
        </div>
      </div>

      {/* Bottom Tabs (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-white/8 py-2.5 z-[1000] flex md:hidden justify-around items-center shadow-lg">
        {navItems.map((nav) => item(nav, false))}
      </div>
    </div>
  );
}
