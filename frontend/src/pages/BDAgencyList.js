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
      <div className="mb-4 md:mb-8 p-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="order-2 md:order-1 mb-2 md:mb-0">
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">Agency</h3>
          </div>
          <div className="order-1 md:order-2">
            <nav aria-label="breadcrumb" className="flex items-center">
              <ol className="flex flex-wrap p-0 m-0 list-none bg-transparent rounded-none">
                <li className="flex items-center">
                  <a href="/bdadmin/dashboard" className="text-danger hover:text-danger text-sm md:text-base">
                    Dashboard
                  </a>
                </li>
                <li className="flex items-center before:content-['/'] before:px-2 before:text-text">
                  <span className="text-white text-sm md:text-base" aria-current="page">Agency</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="mb-5 rounded-custom border-none bg-dark-card shadow-[0_0_1.25rem_rgba(31,45,61,0.08)]">
          <div className="p-3 md:p-5 bg-dark-card border-b border-dark-border rounded-t-custom">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between my-2 md:my-3">
              <div className="w-full md:w-auto mb-2 md:mb-0">
                <button
                  type="button"
                  className="w-full md:w-auto bg-danger hover:bg-danger/90 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                  onClick={handleOpen}
                  id="agencyDialog"
                >
                  <i className="fa fa-plus mr-1"></i>
                  <span>New</span>
                </button>
              </div>
              <div className="w-full md:w-auto mt-2 md:mt-0">
                <form action="">
                  <div className="flex items-center mb-0 md:mb-3 border border-dark-border rounded-full bg-dark-card">
                    <input
                      type="search"
                      id="searchBar"
                      autoComplete="off"
                      placeholder="What're you searching for?"
                      aria-describedby="button-addon4"
                      className="flex-1 bg-transparent border-0 rounded-full text-white placeholder:text-text focus:outline-none focus:ring-0 px-3 md:px-4 py-2 text-sm"
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
                    <div className="border-0">
                      <button
                        type="button"
                        id="button-addon4"
                        className="text-danger hover:text-danger/80 px-2 md:px-3 py-2"
                        onClick={() => {
                          dispatch(getBDAgencies(activePage, rowsPerPage, search));
                          setActivePage(1);
                        }}
                      >
                        <i className="fas fa-search text-sm md:text-base"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="p-3 md:p-6 text-text overflow-x-auto scrollbar-thin">
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full min-w-[800px] text-text border-dark-border mb-0 text-center">
                <thead>
                  <tr>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm">No.</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm">Agency</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm hidden md:table-cell">UniqueId</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm">Code</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm hidden lg:table-cell">Mobile</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm">Coin</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm hidden lg:table-cell">Created</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm">Active</th>
                    <th className="px-2 md:px-5 py-2 md:py-4 font-semibold text-white border-b-2 border-dark-border text-xs md:text-sm">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data?.length > 0 ? (
                    data.map((agency, index) => {
                      return (
                        <tr key={index} className="border-t border-dark-border even:bg-white/2">
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border text-xs md:text-sm">
                            {(activePage - 1) * rowsPerPage + index + 1}
                          </td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border">
                            <div className="flex items-center justify-start">
                              <img
                                height="40px"
                                width="40px"
                                alt="app"
                                src={agency?.image ? agency?.image : Male}
                                className="shadow-[0_5px_15px_0_rgb(105_103_103_/_0%)] border-2 border-white rounded-[10px] object-cover block md:h-[50px] md:w-[50px]"
                              />
                              <span className="ml-1 md:ml-2 flex items-center text-xs md:text-sm truncate max-w-[100px] md:max-w-none">{agency?.name}</span>
                            </div>
                          </td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border text-xs md:text-sm hidden md:table-cell">{agency?.uniqueId}</td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border text-xs md:text-sm">{agency?.agencyCode}</td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border text-xs md:text-sm hidden lg:table-cell">{agency?.mobile}</td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border text-success text-xs md:text-sm">
                            {agency?.totalCoin ? agency?.totalCoin : 0}
                          </td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border text-xs md:text-sm hidden lg:table-cell">
                            {dayjs(agency?.createdAt).format("DD MMM, YYYY")}
                          </td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border">
                            <div className="flex items-center justify-center">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={agency?.isActive}
                                  onChange={() => handleIsTop(agency?._id)}
                                />
                                <span className="slider">
                                  <p
                                    className="text-xs text-black font-medium absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                                    style={{
                                      marginLeft: `${agency?.isActive ? "-24px" : "35px"}`,
                                    }}
                                  >
                                    {agency?.isActive ? "Yes" : "No"}
                                  </p>
                                </span>
                              </label>
                            </div>
                          </td>
                          <td className="px-2 md:px-5 py-2 md:py-4 align-middle border-t border-dark-border">
                            <div className="flex items-center justify-center">
                              <Tooltip title="Edit">
                                <button
                                  type="button"
                                  className="bg-[#ada6f2] hover:bg-[#ada6f2]/90 text-white text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 rounded-md transition-colors shadow-sm"
                                  onClick={() => handleEdit(agency)}
                                >
                                  <i className="fa fa-edit text-sm md:text-base"></i>
                                </button>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" align="center" className="px-2 md:px-5 py-4 text-xs md:text-sm">
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
    </>
  );
}
