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
        key={label}
        onClick={() => navigate(path)}
        className={`
          border-none flex items-center font-medium cursor-pointer transition-all duration-200 ease-in-out
          ${isSidebar 
            ? 'flex-row justify-start w-full px-4 py-3 rounded-xl text-base mb-1' 
            : 'flex-col justify-center w-full py-2 px-1 text-[10px] active:scale-95'
          }
          ${isActive 
            ? isSidebar
              ? 'bg-gradient-to-r from-danger/20 to-info/20 text-white shadow-lg' 
              : 'text-danger'
            : isSidebar
              ? 'bg-transparent text-[rgba(234,240,255,0.7)] hover:bg-white/10 hover:text-white' 
              : 'text-[rgba(234,240,255,0.6)]'
          }
        `}
      >
        <span className={isActive && !isSidebar ? 'text-danger' : ''}>{icon}</span>
        <span className={`${isSidebar ? 'text-sm ml-3' : 'text-[10px] mt-1 font-medium'} truncate`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-dark via-[#1a1a2e] to-dark">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-sidebar/95 to-sidebar backdrop-blur-xl border-r border-white/10 p-6 flex-col overflow-y-auto z-[1000] scrollbar-sidebar shadow-2xl">
        <div className="mb-8">
          <h2 className="text-danger text-2xl font-bold mb-2 flex items-center justify-center py-2 bg-gradient-to-r from-danger to-info bg-clip-text text-transparent">
            BD Admin
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-danger/50 to-transparent"></div>
        </div>
        
        {bdAdmin && bdAdmin.name && (
          <div className="p-4 mb-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl text-xs text-[#EAF0FF] backdrop-blur-sm border border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-danger to-info flex items-center justify-center text-white font-bold text-sm">
                {bdAdmin.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm mb-1 truncate">{bdAdmin.name}</div>
                {bdAdmin.user && (
                  <div className="text-text-muted text-[10px] truncate">ID: {bdAdmin.user.uniqueId || bdAdmin.bdId}</div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-1">
          {navItems.map((nav) => item(nav, true))}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 w-full md:ml-[280px] pb-20 md:pb-5 text-[#EAF0FF] overflow-x-hidden overflow-y-auto min-h-screen bg-gradient-to-br from-dark via-[#1a1a2e] to-dark transition-all">
        <div className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)] transition-all">
          <Outlet />
        </div>
      </div>

      {/* Bottom Navigation Bar (mobile only) - Modern App-like Design */}
      <div className="fixed bottom-0 left-0 right-0 bg-sidebar/95 backdrop-blur-xl border-t border-white/10 py-2 z-[1000] flex md:hidden justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.3)] safe-area-pb">
        {navItems.map((nav) => item(nav, false))}
      </div>
    </div>
  );
}
