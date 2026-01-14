import React from "react";

const Pagination = (props) => {
  const { activePage, rowsPerPage, userTotal, handleRowsPerPage, handlePageChange } = props;
  
  const totalPages = Math.ceil(userTotal / rowsPerPage);
  
  const handlePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
  };

  const handleRowsChange = (value) => {
    handleRowsPerPage(parseInt(value));
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-4">
      {/* Rows selector */}
      <div className="flex items-center gap-2">
        <span className="text-text text-sm md:text-base">Rows</span>
        <select
          className="bg-dark-card border border-dark-border text-text text-sm md:text-base px-3 py-1.5 md:py-2 rounded-custom focus:outline-none focus:ring-0 cursor-pointer"
          value={rowsPerPage}
          onChange={(e) => handleRowsChange(e.target.value)}
        >
          <option value="5" className="bg-dark-card text-text">5</option>
          <option value="10" className="bg-dark-card text-text">10</option>
          <option value="25" className="bg-dark-card text-text">25</option>
          <option value="50" className="bg-dark-card text-text">50</option>
          <option value="100" className="bg-dark-card text-text">100</option>
          <option value="200" className="bg-dark-card text-text">200</option>
          <option value="500" className="bg-dark-card text-text">500</option>
          <option value="1000" className="bg-dark-card text-text">1000</option>
          <option value="5000" className="bg-dark-card text-text">5000</option>
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={() => handlePage(1)}
          disabled={activePage === 1}
          className={`p-2 rounded transition-colors ${
            activePage === 1
              ? "text-text-muted cursor-not-allowed opacity-50"
              : "text-text hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
          title="First Page"
        >
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
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePage(activePage - 1)}
          disabled={activePage === 1}
          className={`p-2 rounded transition-colors ${
            activePage === 1
              ? "text-text-muted cursor-not-allowed opacity-50"
              : "text-text hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
          title="Previous Page"
        >
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Page Info */}
        <span className="text-text text-sm md:text-base px-2 md:px-4">
          Page {activePage} of {totalPages || 1}
        </span>

        {/* Next Page */}
        <button
          onClick={() => handlePage(activePage + 1)}
          disabled={activePage >= totalPages}
          className={`p-2 rounded transition-colors ${
            activePage >= totalPages
              ? "text-text-muted cursor-not-allowed opacity-50"
              : "text-text hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
          title="Next Page"
        >
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
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePage(totalPages)}
          disabled={activePage >= totalPages}
          className={`p-2 rounded transition-colors ${
            activePage >= totalPages
              ? "text-text-muted cursor-not-allowed opacity-50"
              : "text-text hover:text-white hover:bg-white/10 cursor-pointer"
          }`}
          title="Last Page"
        >
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
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
