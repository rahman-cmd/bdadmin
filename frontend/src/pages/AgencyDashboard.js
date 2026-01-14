import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgencyHostStats, getBDAgencies, openAgencyDialog, getBdAdminProfile } from "../store/agencyAdmin/action";
import { useLocation } from "react-router-dom";
import AgencyDialog from "../component/dialog/AgencyDialog";

const T = {
  pageBg: "#FFFFFF",
  text: "#000000",
  sub: "#666666",
  border: "#E0E0E0",
  card: "#FFFFFF",
  radius: 8,
  metricsBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientBtn: "linear-gradient(135deg, #E8538F 0%, #667eea 100%)",
};

export default function AgencyDashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { agencies, agencyHostStats, dialog } = useSelector((state) => state.agencyAdmin);
  const [selectedAgencyId, setSelectedAgencyId] = useState("");
  const isDashboard = location.pathname === "/bdadmin/dashboard";
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

  // Calculate totals from all agencies
  const totalAgencies = agencies.length;
  const totalHosts = agencies.reduce((sum, agency) => sum + (agencyHostStats?.totalHosts || 0), 0);
  const totalIncome = agencies.reduce((sum, agency) => sum + (agencyHostStats?.currentAgencyProgress || 0), 0);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.pageBg,
        color: T.text,
        paddingBottom: "80px",
      }}
    >
      {/* Header Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isDashboard ? "center" : "space-between",
          padding: "16px 20px",
          background: T.pageBg,
          borderBottom: `1px solid ${T.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
        }}
      >
        {isDashboard ? (
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: T.text }}>
            BD Admin
          </h1>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => window.history.back()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: T.text }}>BD</h1>
          </div>
        )}
      </div>

      {/* Key Metrics Section */}
      <div
        style={{
          background: T.metricsBg,
          margin: "20px",
          borderRadius: T.radius,
          padding: "20px",
          color: "#FFFFFF",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
              Reward last month:
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>${metrics.rewardLastMonth}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
              Income last month:
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>${metrics.incomeLastMonth}</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
              Reward this month:
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>${metrics.rewardThisMonth}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
              Income this month:
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>${metrics.incomeThisMonth}</div>
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
            Total number of agency agents:
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{metrics.totalAgencyAgents}</div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
            Invite country agent income this month:
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            ${metrics.inviteCountryAgentIncome}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "4px" }}>
            Agency member refund:
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>${metrics.agencyMemberRefund}</div>
        </div>
      </div>

      {/* Agency Data Section */}
      <div style={{ margin: "0 20px 20px" }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: T.text }}>
            Agency Data
          </h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => dispatch(openAgencyDialog())}
              style={{
                background: T.gradientBtn,
                color: "#FFFFFF",
                border: "none",
                padding: "10px 20px",
                borderRadius: T.radius,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Add Agency
            </button>
            <button
              style={{
                background: "#FFFFFF",
                color: T.text,
                border: `1px solid ${T.border}`,
                padding: "10px 20px",
                borderRadius: T.radius,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Today
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "12px",
                color: T.sub,
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Enter Agency ID"
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                fontSize: "14px",
                outline: "none",
                background: T.card,
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: T.card,
            borderRadius: T.radius,
            border: `1px solid ${T.border}`,
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F5F5F5" }}>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: T.text,
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    Agency ID
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: T.text,
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    Agency Name
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: T.text,
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    Member
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "right",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: T.text,
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    Income
                  </th>
                </tr>
              </thead>
              <tbody>
                {agencies.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: T.sub,
                        fontSize: "14px",
                      }}
                    >
                      No agency data available
                    </td>
                  </tr>
                ) : (
                  agencies.map((agency) => (
                    <tr
                      key={agency._id}
                      style={{
                        borderBottom: `1px solid ${T.border}`,
                      }}
                    >
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: T.text }}>
                        {agency.agencyCode}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: T.text }}>
                        {agency.name}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: T.sub }}>
                        {agencyHostStats?.totalHosts || 0}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          color: "#E8538F",
                          textAlign: "right",
                          fontWeight: "500",
                        }}
                      >
                        ${(agencyHostStats?.currentAgencyProgress || 0).toLocaleString()}
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
