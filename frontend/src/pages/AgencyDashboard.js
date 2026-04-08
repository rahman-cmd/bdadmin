import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgencyHostStats, getBDAgencies, openAgencyDialog, getBdAdminProfile } from "../store/agencyAdmin/action";
import AgencyDialog from "../component/dialog/AgencyDialog";

export default function AgencyDashboard() {
  const dispatch = useDispatch();
  const { agencies, agencyHostStats } = useSelector((state) => state.agencyAdmin);
  const [selectedAgencyId, setSelectedAgencyId] = useState("");
  const [search, setSearch] = useState("");
  const bdAdminId = localStorage.getItem("bdAdminId");

  useEffect(() => {
    if (bdAdminId) {
      dispatch(getBdAdminProfile(bdAdminId));
    }
    dispatch(getBDAgencies(1, 100));
  }, [dispatch, bdAdminId]);

  useEffect(() => {
    if (selectedAgencyId) {
      dispatch(getAgencyHostStats(selectedAgencyId));
    }
  }, [dispatch, selectedAgencyId]);

  const filteredAgencies = agencies.filter((agency) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      String(agency?.agencyCode || "").toLowerCase().includes(q) ||
      String(agency?.name || "").toLowerCase().includes(q)
    );
  });

  // Calculate totals from all agencies list
  const totalAgencies = agencies.length;
  const totalIncome = agencies.reduce((sum, agency) => sum + (agency?.totalCoin || 0), 0);

  // Mock data for metrics (replace with actual API data)
  const metrics = {
    rewardLastMonth: 0,
    incomeLastMonth: 0,
    rewardThisMonth: 0,
    incomeThisMonth: totalIncome,
    totalAgencyAgents: totalAgencies,
    inviteCountryAgentIncome: 0,
    agencyMemberRefund: 0,
  };

  const metricCards = [
    {
      label: "Reward Last Month",
      value: `$${metrics.rewardLastMonth.toLocaleString()}`,
      icon: "💰",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      label: "Income Last Month",
      value: `$${metrics.incomeLastMonth.toLocaleString()}`,
      icon: "📊",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Reward This Month",
      value: `$${metrics.rewardThisMonth.toLocaleString()}`,
      icon: "⭐",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      label: "Income This Month",
      value: `$${metrics.incomeThisMonth.toLocaleString()}`,
      icon: "💵",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      label: "Total Agencies",
      value: metrics.totalAgencyAgents.toString(),
      icon: "👥",
      gradient: "from-indigo-500/20 to-violet-500/20",
      borderColor: "border-indigo-500/30",
    },
    {
      label: "Selected Agency Hosts",
      value: String(agencyHostStats?.totalHosts || 0),
      icon: "🧑‍🤝‍🧑",
      gradient: "from-sky-500/20 to-indigo-500/20",
      borderColor: "border-sky-500/30",
    },
    {
      label: "Country Agent Income",
      value: `$${metrics.inviteCountryAgentIncome.toLocaleString()}`,
      icon: "🌍",
      gradient: "from-teal-500/20 to-cyan-500/20",
      borderColor: "border-teal-500/30",
    },
    {
      label: "Agency Member Refund",
      value: `$${metrics.agencyMemberRefund.toLocaleString()}`,
      icon: "🔄",
      gradient: "from-red-500/20 to-rose-500/20",
      borderColor: "border-red-500/30",
    },
  ];

  return (
    <div className="min-h-screen text-white pb-4 md:pb-0 w-full min-w-0 max-w-full overflow-x-hidden">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-danger via-info to-danger bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-text-muted text-sm">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics Grid - Modern Card Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {metricCards.map((card, index) => (
          <div
            key={index}
            className={`group bg-gradient-to-br ${card.gradient} rounded-2xl p-4 md:p-5 border ${card.borderColor} shadow-panel ring-1 ring-white/5 backdrop-blur-sm transition-all duration-300 hover:ring-white/10 md:hover:scale-[1.02] md:hover:shadow-glow active:scale-[0.99]`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl md:text-3xl">{card.icon}</span>
              <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm"></div>
            </div>
            <div className="text-text-muted text-xs md:text-sm mb-1 font-medium">{card.label}</div>
            <div className="text-xl md:text-2xl font-bold text-white">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Agency Data Section */}
      <div className="mb-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Agency Data</h2>
            <p className="text-text-muted text-sm">Manage your agencies</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => dispatch(openAgencyDialog())}
              className="bg-gradient-to-r from-danger to-info text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Agency
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 md:mb-6">
          <div className="relative">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by Agency ID or Name..."
              className="w-full pl-12 pr-4 py-3 md:py-3.5 rounded-xl bg-dark-card border border-dark-border text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-danger/50 focus:border-danger transition-all text-sm md:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table - Mobile Responsive */}
        <div className="bg-dark-card/90 rounded-2xl border border-dark-border/80 overflow-hidden shadow-panel ring-1 ring-white/5 backdrop-blur-sm">
          {/* Mobile Card View */}
          <div className="block md:hidden">
            {filteredAgencies.length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                <svg width="48" height="48" className="mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-sm">No agency data available</p>
              </div>
            ) : (
              <div className="divide-y divide-dark-border">
                {filteredAgencies.map((agency) => (
                  <div key={agency._id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm mb-1">{agency.name}</div>
                        <div className="text-text-muted text-xs">ID: {agency.agencyCode}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-danger font-bold text-base">
                          ${(agency?.totalCoin || 0).toLocaleString()}
                        </div>
                        <div className="text-text-muted text-xs">Total Coin</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-dark-border">
                      <div className="text-text-muted text-xs">
                        <span className="text-white font-medium">
                          {selectedAgencyId === agency._id ? agencyHostStats?.totalHosts || 0 : 0}
                        </span>{" "}
                        Hosts
                      </div>
                      <button
                        className="text-info text-xs font-medium hover:text-info/80"
                        onClick={() => setSelectedAgencyId(agency._id)}
                      >
                        {selectedAgencyId === agency._id ? "Selected" : "View Details →"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-dark/50 border-b border-dark-border">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white">Agency ID</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white">Agency Name</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white">Member</th>
                  <th className="px-5 py-4 text-right text-sm font-semibold text-white">Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgencies.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-5 py-12 text-center text-text-muted text-sm">
                      <svg width="48" height="48" className="mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      No agency data available
                    </td>
                  </tr>
                ) : (
                  filteredAgencies.map((agency) => (
                    <tr
                      key={agency._id}
                      className="border-b border-dark-border hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm text-white font-mono">{agency.agencyCode}</td>
                      <td className="px-5 py-4 text-sm text-white">{agency.name}</td>
                      <td className="px-5 py-4 text-sm text-text">
                        <span className="inline-flex items-center gap-1">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {selectedAgencyId === agency._id ? agencyHostStats?.totalHosts || 0 : 0}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-danger font-semibold text-right">
                        ${(agency?.totalCoin || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Agency Dialog */}
      <AgencyDialog />
    </div>
  );
}
