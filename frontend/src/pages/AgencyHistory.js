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
    <div className="min-h-screen bg-dark text-text p-4 md:p-5 pb-20 md:pb-24">
      {/* Header Navigation */}
      <div className="flex items-center justify-between md:justify-center p-4 md:p-5 bg-dark border-b border-dark-border mb-4 md:mb-5">
        {!isDashboard && (
          <button
            onClick={() => navigate(-1)}
            className="md:hidden bg-transparent border-none cursor-pointer p-2 flex items-center"
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
              className="text-white"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="m-0 text-lg md:text-xl font-semibold text-white flex-1 text-center md:text-center">
          Agency History
        </h1>
        {!isDashboard && <div className="md:hidden w-10" />}
      </div>

      {/* Date Range Picker */}
      <div className="mb-4 flex justify-end">
        <div className="w-full md:w-auto md:min-w-[215px] relative">
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
            <input
              type="text"
              readOnly
              placeholder="Select Date Range"
              className="daterange w-full font-medium cursor-pointer bg-dark-card text-text text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 rounded-custom border border-dark-border outline-none"
              value={
                (sDate === startAllDate && eDate === endAllDate) ||
                (sDate === "ALL" && eDate === "ALL")
                  ? "Select Date Range"
                  : `${dayjs(startDate).format("MM/DD/YYYY")} - ${dayjs(endDate).format("MM/DD/YYYY")}`
              }
            />
          </DateRangePicker>
        </div>
      </div>

      {/* Date Range Display */}
      {sDate !== "ALL" && (
        <p className="pl-2 md:pl-2.5 mb-4 text-text-muted text-xs md:text-sm">
          {sDate} to {eDate}
        </p>
      )}

      {/* Table */}
      <div className="bg-dark-card rounded-custom border border-dark-border overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border">
                  No.
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border">
                  Agency Name
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border hidden md:table-cell">
                  Agency Code
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border">
                  Agency Earning
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border hidden lg:table-cell">
                  Host Earning
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border">
                  Host Count
                </th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-text border-b border-dark-border hidden lg:table-cell">
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
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text">
                      {(activePage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text">
                      {item?.agencyName || "-"}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text hidden md:table-cell">
                      {item?.agencyCode || "-"}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text">
                      {item?.totalAgencyEarning ? item.totalAgencyEarning.toFixed(0) : 0}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text hidden lg:table-cell">
                      {item?.totalHostEarning ? item.totalHostEarning.toFixed(0) : 0}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text">
                      {item?.hostCount || 0}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-text hidden lg:table-cell">
                      {item?.createdAt ? dayjs(item.createdAt).format("DD MMM, YYYY") : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" align="center" className="px-4 py-10 text-text-muted text-sm">
                    Nothing to show!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {agencyHistoryTotal > 0 && <div className="p-4"><Pagination /></div>}
      </div>
    </div>
  );
}
