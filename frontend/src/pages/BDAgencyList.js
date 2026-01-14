import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBDAgencies, enableDisableAgency, openAgencyDialog } from "../store/agencyAdmin/action";
import { useNavigate, useLocation } from "react-router-dom";
import AgencyDialog from "../component/dialog/AgencyDialog";
import $ from "jquery";
import Male from "../assets/images/male.png";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import Pagination from "./Pagination";

export default function BDAgencyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { agencies, totalAgencies } = useSelector((state) => state.agencyAdmin);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getBDAgencies(activePage, rowsPerPage, search));
  }, [activePage, rowsPerPage]);

  useEffect(() => {
    setData(agencies);
  }, [agencies]);

  $(document).ready(function () {
    $("img").bind("error", function () {
      $(this).attr("src", Male);
    });
  });

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setActivePage(1);
    setRowsPerPage(value);
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
    <>
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
      <div className="w-full">
        <div className="mb-5 rounded-2xl border border-dark-border bg-dark-card shadow-xl backdrop-blur-sm">
          {/* Action Bar */}
          <div className="p-4 md:p-6 bg-dark-card/50 border-b border-dark-border rounded-t-2xl">
            <div className="flex flex-col gap-4">
              {/* Add Button */}
              <button
                type="button"
                className="w-full md:w-auto bg-gradient-to-r from-danger to-info hover:from-danger/90 hover:to-info/90 text-white text-sm md:text-base font-medium py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={handleOpen}
                id="agencyDialog"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add New Agency</span>
              </button>
              
              {/* Search Bar */}
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
                  type="search"
                  id="searchBar"
                  autoComplete="off"
                  placeholder="Search agencies by name, code, or mobile..."
                  className="w-full bg-dark-card border border-dark-border rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-danger/50 focus:border-danger px-4 pl-12 py-3 text-sm md:text-base transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      dispatch(getBDAgencies(activePage, rowsPerPage, search));
                      setActivePage(1);
                    }
                  }}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      dispatch(getBDAgencies(activePage, rowsPerPage, ""));
                      setActivePage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-3 md:p-6 text-text overflow-x-auto scrollbar-thin">
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-3">
              {data?.length > 0 ? (
                data.map((agency, index) => (
                  <div
                    key={index}
                    className="bg-dark/50 rounded-xl p-4 border border-dark-border hover:border-danger/30 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        height="50px"
                        width="50px"
                        alt="agency"
                        src={agency?.image ? agency?.image : Male}
                        className="rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-sm mb-1 truncate">{agency?.name}</div>
                        <div className="text-text-muted text-xs">Code: {agency?.agencyCode}</div>
                        <div className="text-text-muted text-xs">ID: {agency?.uniqueId}</div>
                      </div>
                      <button
                        type="button"
                        className="bg-info/20 hover:bg-info/30 text-info p-2 rounded-lg transition-colors"
                        onClick={() => handleEdit(agency)}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dark-border">
                      <div>
                        <div className="text-text-muted text-xs mb-1">Coin</div>
                        <div className="text-success font-semibold text-sm">{agency?.totalCoin || 0}</div>
                      </div>
                      <div>
                        <div className="text-text-muted text-xs mb-1">Status</div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agency?.isActive}
                            onChange={() => handleIsTop(agency?._id)}
                            className="sr-only peer"
                          />
                          <div
                            className={`
                              relative w-[60px] h-[28px] rounded-full transition-all duration-300
                              ${agency?.isActive ? "bg-info" : "bg-primary"}
                            `}
                          >
                            <div
                              className={`
                                absolute w-[22px] h-[22px] bg-white rounded-full transition-all duration-300 shadow-md top-[3px]
                                ${agency?.isActive ? "translate-x-[32px]" : "translate-x-[3px]"}
                              `}
                            ></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-text-muted">
                  <svg width="48" height="48" className="mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm">Nothing to show!!</p>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto -mx-3 md:mx-0">
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
      <AgencyDialog />
    </div>
  </>
  );
}
