import axios from "axios";
import { Toast } from "../../util/Toast";
import {
  SET_BD_ADMIN,
  UNSET_BD_ADMIN,
  CREATE_AGENCY,
  UPDATE_AGENCY_NAME,
  GET_BD_AGENCIES,
  DELETE_AGENCY,
  SEARCH_AGENCY_BY_CODE,
  GET_AGENCY_HOST_STATS,
  OPEN_AGENCY_DIALOG,
  CLOSE_AGENCY_DIALOG,
  GET_BD_AGENCY_HISTORY,
  ENABLE_DISABLE_AGENCY,
} from "./types";
import { key } from "../../util/Config";

// BD Admin Login (with uniqueId and bdId - similar to agency)
export const login = (data) => (dispatch) => {
  axios
    .post(`bdAdmin/login?key=${key}`, data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "You have successfully logged in.");
        setTimeout(() => {
          window.location.href = "/bdadmin/dashboard";
        }, 100);
        dispatch({ type: SET_BD_ADMIN, payload: res.data.token });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      Toast("error", error.response?.data?.message || "Login failed");
    });
};

// Get BD Admin Profile
export const getProfile = () => (dispatch) => {
  axios
    .get(`bdAdmin/profile?key=${key}`)
    .then((res) => {
      if (res.data.status) {
        // Profile loaded
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

// Create Agency
export const createAgency = (data) => (dispatch) => {
  axios
    .post(`bdAdmin/agency/create?key=${key}`, data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Agency created successfully");
        dispatch({ type: CREATE_AGENCY, payload: res.data.data });
        dispatch({ type: CLOSE_AGENCY_DIALOG });
        // Refresh agency list
        dispatch(getBDAgencies(1, 20));
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      Toast("error", error.response?.data?.message || "Failed to create agency");
    });
};

// Update Agency Name
export const updateAgencyName = (agencyId, name) => (dispatch) => {
  axios
    .patch(`bdAdmin/agency/updateName?key=${key}`, { agencyId, name })
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Agency name updated successfully");
        dispatch({ type: UPDATE_AGENCY_NAME, payload: res.data.data });
        // Refresh agency list
        dispatch(getBDAgencies(1, 20));
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      Toast("error", error.response?.data?.message || "Failed to update agency name");
    });
};

// Get BD Agencies
export const getBDAgencies = (page = 1, limit = 20, search = "") => (dispatch) => {
  const searchParam = search ? `&search=${search}` : "";
  axios
    .get(`bdAdmin/agency/getBDAgencies?key=${key}&start=${page}&limit=${limit}${searchParam}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_BD_AGENCIES,
          payload: {
            agencies: res.data.data,
            total: res.data.total,
          },
        });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log("error", error.message);
      Toast("error", "Failed to load agencies");
    });
};

// Search Agency by Code
export const searchAgencyByCode = (code) => (dispatch) => {
  axios
    .get(`bdAdmin/agency/searchByCode?key=${key}&code=${code}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: SEARCH_AGENCY_BY_CODE,
          payload: res.data.data,
        });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log("error", error.message);
      Toast("error", "Failed to search agency");
    });
};

// Delete Agency
export const deleteAgency = (agencyId) => (dispatch) => {
  if (window.confirm("Are you sure you want to delete this agency?")) {
    axios
      .delete(`bdAdmin/agency/delete?key=${key}&agencyId=${agencyId}`)
      .then((res) => {
        if (res.data.status) {
          Toast("success", "Agency deleted successfully");
          dispatch({ type: DELETE_AGENCY, payload: agencyId });
          // Refresh the list
          dispatch(getBDAgencies(1, 20));
        } else {
          Toast("error", res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast("error", error.response?.data?.message || "Failed to delete agency");
      });
  }
};

// Get Agency Host Stats
export const getAgencyHostStats = (agencyId) => (dispatch) => {
  axios
    .get(`bdAdmin/agency/hostStats?key=${key}&agencyId=${agencyId}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_AGENCY_HOST_STATS,
          payload: res.data.data,
        });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log("error", error.message);
      Toast("error", "Failed to load host stats");
    });
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: UNSET_BD_ADMIN });
  window.location.href = "/bdadmin";
};

// Open Agency Dialog
export const openAgencyDialog = (data = null) => (dispatch) => {
  dispatch({ type: OPEN_AGENCY_DIALOG, payload: data });
};

// Close Agency Dialog
export const closeAgencyDialog = () => (dispatch) => {
  dispatch({ type: CLOSE_AGENCY_DIALOG });
};

// Enable or Disable Agency
export const enableDisableAgency = (agencyId) => (dispatch) => {
  axios
    .patch(`bdAdmin/agency/activeOrNot?key=${key}&agencyId=${agencyId}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: ENABLE_DISABLE_AGENCY, payload: res.data.data });
        Toast("success", "Agency status updated successfully");
        // Refresh agency list
        dispatch(getBDAgencies(1, 20));
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      Toast("error", error.response?.data?.message || "Failed to update agency status");
    });
};

// Get BD Admin Agency History
export const getBDAgencyHistory = (startDate, endDate, start, limit) => (dispatch) => {
  axios
    .get(`bdAdmin/agency/history?key=${key}&startDate=${startDate}&endDate=${endDate}&start=${start}&limit=${limit}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_BD_AGENCY_HISTORY,
          payload: {
            agencyResults: res.data.agencyResults || [],
            total: res.data.total || 0,
          },
        });
      } else {
        Toast("error", res.data.message || "Failed to load agency history");
      }
    })
    .catch((error) => {
      console.log("error", error.message);
      Toast("error", "Failed to load agency history");
    });
};
