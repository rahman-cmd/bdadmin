import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBDAgencies, enableDisableAgency, openAgencyDialog } from "../store/agencyAdmin/action";
import AgencyDialog from "../component/dialog/AgencyDialog";
import Male from "../assets/images/male.png";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import Pagination from "./Pagination";

export default function BDAgencyList() {
  const dispatch = useDispatch();
  const { agencies, totalAgencies } = useSelector((state) => state.agencyAdmin);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getBDAgencies(activePage, rowsPerPage, search));
  }, [activePage, rowsPerPage, dispatch]);

  useEffect(() => {
    setData(agencies);
  }, [agencies]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setActivePage(1);
    setRowsPerPage(value);
  };

  const handleSearch = () => {
    setActivePage(1);
    dispatch(getBDAgencies(1, rowsPerPage, search));
  };

  const handleOpen = () => {
    dispatch(openAgencyDialog());
  };

  const handleEdit = (data) => {
    dispatch(openAgencyDialog(data));
  };

  const handleIsTop = (id) => {
    dispatch(enableDisableAgency(id));
  };

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-danger via-info to-danger bg-clip-text text-transparent">
              Agencies
            </h1>
            <p className="text-text-muted text-sm">Manage all your agencies from one place</p>
          </div>
        </div>
      <div className="w-full min-w-0">
        <div className="mb-5 rounded-2xl border border-dark-border/80 bg-dark-card/90 shadow-panel ring-1 ring-white/5 backdrop-blur-sm">
          {/* Action Bar */}
          <div className="p-3.5 sm:p-4 md:p-6 bg-dark-card/50 border-b border-dark-border/80 rounded-t-2xl">
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Add Button */}
              <button
                type="button"
                className="w-full md:w-auto min-h-[48px] bg-gradient-to-r from-danger to-info hover:from-danger/90 hover:to-info/90 text-white text-sm md:text-base font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={handleOpen}
                id="agencyDialog"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add New Agency</span>
              </button>
              
              {/* Search: column on phones, row from sm so nothing overlaps */}
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-2.5 w-full min-w-0">
                <div className="relative flex-1 min-w-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none z-[1]"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    id="searchBar"
                    autoComplete="off"
                    enterKeyHint="search"
                    placeholder="Search by name, code, mobile..."
                    className="w-full min-w-0 min-h-[48px] bg-night-900/80 border border-dark-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger/80 pl-10 sm:pl-12 pr-3 py-3 text-base sm:text-sm md:text-base transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <div className="flex items-stretch gap-2 shrink-0 w-full sm:w-auto sm:max-w-[40%]">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="flex-1 sm:flex-initial min-w-0 min-h-[48px] bg-danger/20 hover:bg-danger/30 active:bg-danger/40 text-danger px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    Search
                  </button>
                  {search ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setActivePage(1);
                        dispatch(getBDAgencies(1, rowsPerPage, ""));
                      }}
                      className="shrink-0 flex items-center justify-center min-w-[48px] min-h-[48px] rounded-xl border border-dark-border text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                      aria-label="Clear search"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* Mobile: full-width cards, no horizontal scroll trap */}
          <div className="block md:hidden px-0 py-3 sm:px-1 text-text overflow-x-hidden">
            <div className="space-y-3">
              {data?.length > 0 ? (
                data.map((agency, index) => {
                  const rowNum = (activePage - 1) * rowsPerPage + index + 1;
                  return (
                    <div
                      key={agency?._id || index}
                      className="rounded-2xl border border-dark-border/80 bg-gradient-to-br from-night-900/90 to-night-950/95 p-4 shadow-panel ring-1 ring-white/5 backdrop-blur-sm transition-colors active:bg-white/[0.03]"
                    >
                      <div className="flex gap-3">
                        <div className="relative shrink-0">
                          <span className="absolute -left-1 -top-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-lg bg-white/10 px-1.5 text-[10px] font-bold text-white/90 ring-1 ring-white/10">
                            {rowNum}
                          </span>
                          <img
                            height="56"
                            width="56"
                            alt=""
                            src={agency?.image ? agency?.image : Male}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = Male;
                            }}
                            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[15px] font-semibold leading-snug text-white line-clamp-2">
                              {agency?.name}
                            </h3>
                            <button
                              type="button"
                              className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-info/15 text-info ring-1 ring-info/20 transition-colors hover:bg-info/25 active:scale-95"
                              onClick={() => handleEdit(agency)}
                              aria-label="Edit agency"
                            >
                              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                          <dl className="mt-2 space-y-1.5 text-xs text-text-muted">
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                              <dt className="sr-only">Code</dt>
                              <dd>
                                <span className="text-white/50">Code</span>{" "}
                                <span className="font-mono text-white/90">{agency?.agencyCode ?? "—"}</span>
                              </dd>
                            </div>
                            <div className="break-all">
                              <span className="text-white/50">Unique ID</span>{" "}
                              <span className="font-mono text-[11px] text-white/85">{agency?.uniqueId ?? "—"}</span>
                            </div>
                            <div>
                              <span className="text-white/50">Mobile</span>{" "}
                              <span className="text-white/90">{agency?.mobile ?? "—"}</span>
                            </div>
                            <div>
                              <span className="text-white/50">Created</span>{" "}
                              <span className="text-white/90">
                                {agency?.createdAt ? dayjs(agency.createdAt).format("DD MMM YYYY") : "—"}
                              </span>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wide text-text-muted">Coins</div>
                          <div className="text-lg font-bold tabular-nums text-success">{agency?.totalCoin ?? 0}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wide text-text-muted">Active</span>
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              checked={agency?.isActive}
                              onChange={() => handleIsTop(agency?._id)}
                              className="peer sr-only"
                            />
                            <div
                              className={`relative h-[30px] w-[60px] rounded-full transition-colors duration-300 ${
                                agency?.isActive ? "bg-info" : "bg-primary"
                              }`}
                            >
                              <div
                                className={`absolute top-[3px] h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                                  agency?.isActive ? "translate-x-[30px]" : "translate-x-[3px]"
                                }`}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-dark-border/80 py-14 text-center text-text-muted">
                  <svg width="48" height="48" className="mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm">Nothing to show!!</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: horizontal scroll for wide table */}
          <div className="hidden md:block p-4 md:p-6 pt-0 md:pt-2 text-text overflow-x-auto overscroll-x-contain [scrollbar-width:thin] [scrollbar-color:rgba(232,83,143,0.35)_#181821] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-danger/35 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-dark/80">
              <table className="w-full min-w-[800px] text-text border-dark-border mb-0 text-center">
                <thead>
                  <tr className="bg-dark/50">
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm">No.</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm">Agency</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm hidden md:table-cell">UniqueId</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm">Code</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm hidden lg:table-cell">Mobile</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm">Coin</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm hidden lg:table-cell">Created</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm">Active</th>
                    <th className="px-5 py-4 font-semibold text-white border-b border-dark-border text-sm">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data?.length > 0 ? (
                    data.map((agency, index) => {
                      return (
                        <tr key={index} className="border-b border-dark-border hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4 align-middle text-sm text-text">
                            {(activePage - 1) * rowsPerPage + index + 1}
                          </td>
                          <td className="px-5 py-4 align-middle">
                            <div className="flex items-center justify-start">
                              <img
                                height="45px"
                                width="45px"
                                alt="app"
                                src={agency?.image ? agency?.image : Male}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = Male;
                                }}
                                className="shadow-md border-2 border-white/20 rounded-xl object-cover"
                              />
                              <span className="ml-3 flex items-center text-sm text-white truncate max-w-[200px]">{agency?.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 align-middle text-sm text-text hidden md:table-cell font-mono">{agency?.uniqueId}</td>
                          <td className="px-5 py-4 align-middle text-sm text-white font-mono">{agency?.agencyCode}</td>
                          <td className="px-5 py-4 align-middle text-sm text-text hidden lg:table-cell">{agency?.mobile}</td>
                          <td className="px-5 py-4 align-middle text-success text-sm font-semibold">
                            {agency?.totalCoin ? agency?.totalCoin : 0}
                          </td>
                          <td className="px-5 py-4 align-middle text-sm text-text hidden lg:table-cell">
                            {dayjs(agency?.createdAt).format("DD MMM, YYYY")}
                          </td>
                          <td className="px-5 py-4 align-middle">
                            <div className="flex items-center justify-center">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={agency?.isActive}
                                  onChange={() => handleIsTop(agency?._id)}
                                  className="sr-only peer"
                                />
                                <div className={`
                                  relative w-[60px] h-[30px] rounded-full transition-all duration-300
                                  ${agency?.isActive ? 'bg-info' : 'bg-primary'}
                                `}>
                                  <div className={`
                                    absolute w-[24px] h-[24px] bg-white rounded-full transition-all duration-300 shadow-md top-[3px]
                                    ${agency?.isActive ? 'translate-x-[30px]' : 'translate-x-[3px]'}
                                  `}></div>
                                </div>
                              </label>
                            </div>
                          </td>
                          <td className="px-5 py-4 align-middle">
                            <div className="flex items-center justify-center">
                              <Tooltip title="Edit">
                                <button
                                  type="button"
                                  className="bg-info/20 hover:bg-info/30 text-info p-2 rounded-lg transition-colors"
                                  onClick={() => handleEdit(agency)}
                                >
                                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" align="center" className="px-5 py-12 text-sm text-text-muted">
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

          <div className="border-t border-dark-border/60 px-3 py-4 sm:px-4 md:px-6 md:pb-6">
            <Pagination
              activePage={activePage}
              rowsPerPage={rowsPerPage}
              userTotal={totalAgencies}
              handleRowsPerPage={handleRowsPerPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      </div>
      <AgencyDialog />
    </div>
  );
}
