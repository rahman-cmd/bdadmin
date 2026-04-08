/** Minimal styles for bootstrap-daterangepicker (not covered by Tailwind) */
export const vendorGlobalStyles = `
  .daterangepicker,
  .daterangepicker .calendar-table,
  .daterangepicker td.off {
    color: #9a9cab !important;
    background-color: #1f1f2b !important;
    border: 1px solid #262635 !important;
  }
  .daterangepicker td.active,
  .daterangepicker td.in-range,
  .daterangepicker td.available:hover,
  .daterangepicker th.available:hover {
    background-color: #181821 !important;
    border-color: transparent !important;
    color: #e8eaf0 !important;
  }
  .daterangepicker .applyBtn {
    background: linear-gradient(90deg, #e8538f, #ada6f2) !important;
    border: none !important;
    color: #fff !important;
  }
  .daterangepicker .cancelBtn {
    color: #9a9cab !important;
  }
`;
