import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_BD_ADMIN } from "./store/agencyAdmin/types";
import { login } from "./store/agencyAdmin/action";

// pages
import BDAgencyList from "./pages/BDAgencyList";
import AgencyDashboard from "./pages/AgencyDashboard";
import AgencyHistory from "./pages/AgencyHistory";

// layout
import BDAdminLayout from "./layouts/BDAdminLayout";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.agencyAdmin);
  const token = localStorage.getItem("TOKEN");
  const key = localStorage.getItem("KEY");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && key) {
      dispatch({ type: SET_BD_ADMIN, payload: token });
    }
  }, [token, key, dispatch]);

  // Handle URL parameters for login (similar to agency)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const uniqueId = queryParams.get("uniqueId");
    const bdId = queryParams.get("bdId");

    // If URL has id parameter, store it and navigate to dashboard (like agency)
    if (id) {
      localStorage.setItem("bdAdminId", id);
      // Only redirect to dashboard if we're on root or /bdadmin path
      if (location.pathname === "/" || location.pathname === "/bdadmin") {
        navigate("/bdadmin/dashboard", { replace: true });
      }
    } else if (localStorage.getItem("bdAdminId") && (location.pathname === "/" || location.pathname === "/bdadmin")) {
      // Only redirect if we're on root or /bdadmin path, not if already on a specific route
      navigate("/bdadmin/dashboard", { replace: true });
    }

    // If URL has uniqueId and bdId, attempt login (like agency with uniqueId and agencyCode)
    if (uniqueId && bdId && !isAuth) {
      dispatch(login({ uniqueId, bdId }));
    }
  }, [location.search, dispatch, navigate, isAuth]); // Only depend on location.search, not full location

  return (
    <div className="App">
      <Suspense fallback={""}>
        <Routes>
          {/* Protected routes - similar to agency */}
          <Route path="/bdadmin" element={<BDAdminLayout />}>
            <Route path="dashboard" element={<AgencyDashboard />} />
            <Route path="agencies" element={<BDAgencyList />} />
            <Route path="agencyHistory" element={<AgencyHistory />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/bdadmin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
