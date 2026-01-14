import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getBDAgencyHistory } from "../store/agencyAdmin/action";
import DateRangePicker from "react-bootstrap-daterangepicker";

export default function AgencyHistory() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { agencyHistory, agencyHistoryTotal } = useSelector((state) => state.agencyAdmin);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(dayjs().startOf("month").toDate());
  const [endDate, setEndDate] = useState(dayjs().endOf("month").toDate());
  const [sDate, setsDate] = useState("ALL");
  const [eDate, seteDate] = useState("ALL");
  const isDashboard = location.pathname === "/bdadmin/dashboard";

  const startAllDate = "1970-01-01";
  const endAllDate = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const startDate = dayjs().startOf("month").format("YYYY/M/DD");
    const endDate = dayjs().endOf("month").format("YYYY/M/DD");
    setsDate(startDate);
    seteDate(endDate);
    dispatch(getBDAgencyHistory(startDate, endDate, activePage, rowsPerPage));
  }, [activePage, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(agencyHistory);
  }, [agencyHistory]);

  const handleApply = (event, picker) => {
    const start = dayjs(picker.startDate).format("YYYY/M/DD");
    const end = dayjs(picker.endDate).format("YYYY/M/DD");

    setStartDate(picker.startDate);
    setEndDate(picker.endDate);
    setsDate(start);
    seteDate(end);

    dispatch(getBDAgencyHistory(start, end, activePage, rowsPerPage));
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setActivePage(1);
    setRowsPerPage(value);
  };

  // Simple pagination component
  const Pagination = () => {
    const totalPages = Math.ceil(agencyHistoryTotal / rowsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-5 flex-wrap">
        <button
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className={`px-3 md:px-4 py-2 border border-dark-border rounded-custom text-xs md:text-sm transition-colors ${
            activePage === 1
              ? "bg-gray-200 cursor-not-allowed text-gray-500"
              : "bg-dark-card hover:bg-dark-border cursor-pointer text-text"
          }`}
        >
          Previous
        </button>
        {pages.slice(Math.max(0, activePage - 3), activePage + 2).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 md:px-4 py-2 border border-dark-border rounded-custom text-xs md:text-sm transition-colors ${
              activePage === page
                ? "bg-danger text-white"
                : "bg-dark-card hover:bg-dark-border text-text"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className={`px-3 md:px-4 py-2 border border-dark-border rounded-custom text-xs md:text-sm transition-colors ${
            activePage === totalPages
              ? "bg-gray-200 cursor-not-allowed text-gray-500"
              : "bg-dark-card hover:bg-dark-border cursor-pointer text-text"
          }`}
        >
          Next
        </button>
        <span className="text-xs md:text-sm text-text-muted ml-3">
          Showing {(activePage - 1) * rowsPerPage + 1} to {Math.min(activePage * rowsPerPage, agencyHistoryTotal)} of{" "}
          {agencyHistoryTotal}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white pb-4 md:pb-0">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-danger via-info to-danger bg-clip-text text-transparent">
          Agency History
        </h1>
        <p className="text-text-muted text-sm">Track all agency transactions and earnings</p>
      </div>

      {/* Date Range Picker */}
      <div className="mb-6 flex justify-start">
        <div className="w-full md:w-auto md:min-w-[280px] relative">
          <DateRangePicker
            initialSettings={{
              startDate: undefined,
              endDate: undefined,
              ranges: {
                All: [new Date("1970-01-01"), dayjs().toDate()],
                Today: [dayjs().toDate(), dayjs().toDate()],
                Yesterday: [
                  dayjs().subtract(1, "days").toDate(),
                  dayjs().subtract(1, "days").toDate(),
                ],
                "Last 7 Days": [
                  dayjs().subtract(6, "days").toDate(),
                  dayjs().toDate(),
                ],
                "Last 30 Days": [
                  dayjs().subtract(29, "days").toDate(),
                  dayjs().toDate(),
                ],
                "This Month": [
                  dayjs().startOf("month").toDate(),
                  dayjs().endOf("month").toDate(),
                ],
                "Last Month": [
                  dayjs().subtract(1, "month").startOf("month").toDate(),
                  dayjs().subtract(1, "month").endOf("month").toDate(),
                ],
              },
              maxDate: new Date(),
              singleDatePicker: false,
              linkedCalendars: false,
            }}
            onApply={handleApply}
          >
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <input
                type="text"
                readOnly
                placeholder="Select Date Range"
                className="daterange w-full font-medium cursor-pointer bg-dark-card text-white text-sm md:text-base px-4 pl-12 py-3 rounded-xl border border-dark-border outline-none focus:ring-2 focus:ring-danger/50 focus:border-danger transition-all"
                value={
                  (sDate === startAllDate && eDate === endAllDate) ||
                  (sDate === "ALL" && eDate === "ALL")
                    ? "Select Date Range"
                    : `${dayjs(startDate).format("MM/DD/YYYY")} - ${dayjs(endDate).format("MM/DD/YYYY")}`
                }
              />
            </div>
          </DateRangePicker>
        </div>
      </div>

      {/* Date Range Display */}
      {sDate !== "ALL" && (
        <div className="mb-4 p-3 bg-info/10 border border-info/30 rounded-xl">
          <p className="text-text text-xs md:text-sm">
            <span className="text-white font-medium">Period:</span> {sDate} to {eDate}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden shadow-xl backdrop-blur-sm">
        {/* Mobile Card View */}
        <div className="block md:hidden divide-y divide-dark-border">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm mb-1">{item?.agencyName || "-"}</div>
                    <div className="text-text-muted text-xs">Code: {item?.agencyCode || "-"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-danger font-bold text-base">
                      ${item?.totalAgencyEarning ? item.totalAgencyEarning.toFixed(0) : 0}
                    </div>
                    <div className="text-text-muted text-xs">Agency Earning</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dark-border">
                  <div>
                    <div className="text-text-muted text-xs mb-1">Host Earning</div>
                    <div className="text-white font-semibold text-sm">
                      ${item?.totalHostEarning ? item.totalHostEarning.toFixed(0) : 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-text-muted text-xs mb-1">Host Count</div>
                    <div className="text-white font-semibold text-sm">{item?.hostCount || 0}</div>
                  </div>
                </div>
                {item?.createdAt && (
                  <div className="mt-3 pt-3 border-t border-dark-border">
                    <div className="text-text-muted text-xs">
                      Created: {dayjs(item.createdAt).format("DD MMM, YYYY")}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-text-muted">
              <svg width="48" height="48" className="mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-sm">Nothing to show!!</p>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-dark/50">
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border">
                  No.
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border">
                  Agency Name
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border">
                  Agency Code
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border">
                  Agency Earning
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border hidden lg:table-cell">
                  Host Earning
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border">
                  Host Count
                </th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-white border-b border-dark-border hidden lg:table-cell">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dark-border hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-text">
                      {(activePage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-5 py-4 text-sm text-white font-medium">
                      {item?.agencyName || "-"}
                    </td>
                    <td className="px-5 py-4 text-sm text-text font-mono">
                      {item?.agencyCode || "-"}
                    </td>
                    <td className="px-5 py-4 text-sm text-danger font-semibold">
                      ${item?.totalAgencyEarning ? item.totalAgencyEarning.toFixed(0) : 0}
                    </td>
                    <td className="px-5 py-4 text-sm text-white hidden lg:table-cell">
                      ${item?.totalHostEarning ? item.totalHostEarning.toFixed(0) : 0}
                    </td>
                    <td className="px-5 py-4 text-sm text-text">
                      <span className="inline-flex items-center gap-1">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {item?.hostCount || 0}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-text hidden lg:table-cell">
                      {item?.createdAt ? dayjs(item.createdAt).format("DD MMM, YYYY") : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" align="center" className="px-5 py-12 text-text-muted text-sm">
                    <svg width="48" height="48" className="mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    Nothing to show!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {agencyHistoryTotal > 0 && <div className="p-4 md:p-6 border-t border-dark-border"><Pagination /></div>}
      </div>
    </div>
  );
}
