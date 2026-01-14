import setToken from "../../util/SetToken";
import { jwtDecode } from "jwt-decode";
import { key } from "../../util/Config";
import setDevKey from "../../util/SetDevKey";
import {
  SET_BD_ADMIN,
  UNSET_BD_ADMIN,
  UPDATE_BD_ADMIN_PROFILE,
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

const initialState = {
  isAuth: false,
  bdAdmin: {},
  agencies: [],
  totalAgencies: 0,
  agencyHostStats: null,
  searchedAgency: null,
  dialog: false,
  dialogData: null,
  agencyHistory: [],
  agencyHistoryTotal: 0,
};

const agencyAdminReducer = (state = initialState, action) => {
  let decoded;

  switch (action.type) {
    case SET_BD_ADMIN:
      if (action.payload) {
        try {
          decoded = jwtDecode(action.payload);
        } catch (error) {
          console.error("Token decode error:", error);
          return state;
        }
      }
      if (action.payload) {
        setToken(action.payload);
        setDevKey(key);
        localStorage.setItem("BD_ADMIN", JSON.stringify(decoded));
        localStorage.setItem("TOKEN", action.payload);
        localStorage.setItem("KEY", key);

        return {
          ...state,
          isAuth: true,
          bdAdmin: decoded || {},
        };
      }
      return state;

    case UNSET_BD_ADMIN:
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("KEY");
      localStorage.removeItem("BD_ADMIN");

      setDevKey(null);
      setToken(null);
      return {
        ...state,
        isAuth: false,
        bdAdmin: {},
        agencies: [],
        totalAgencies: 0,
        agencyHostStats: null,
        searchedAgency: null,
      };

    case UPDATE_BD_ADMIN_PROFILE:
      return {
        ...state,
        bdAdmin: {
          ...state.bdAdmin,
          ...action.payload,
        },
      };

    case CREATE_AGENCY:
      return {
        ...state,
        agencies: [action.payload, ...state.agencies],
        totalAgencies: state.totalAgencies + 1,
      };

    case UPDATE_AGENCY_NAME:
      return {
        ...state,
        agencies: state.agencies.map((agency) =>
          agency._id === action.payload._id ? action.payload : agency
        ),
      };

    case GET_BD_AGENCIES:
      return {
        ...state,
        agencies: action.payload.agencies,
        totalAgencies: action.payload.total,
      };

    case DELETE_AGENCY:
      return {
        ...state,
        agencies: state.agencies.filter((agency) => agency._id !== action.payload),
        totalAgencies: state.totalAgencies - 1,
      };

    case SEARCH_AGENCY_BY_CODE:
      return {
        ...state,
        searchedAgency: action.payload,
      };

    case GET_AGENCY_HOST_STATS:
      return {
        ...state,
        agencyHostStats: action.payload,
      };

    case OPEN_AGENCY_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_AGENCY_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case GET_BD_AGENCY_HISTORY:
      return {
        ...state,
        agencyHistory: action.payload.agencyResults || [],
        agencyHistoryTotal: action.payload.total || 0,
      };

    case ENABLE_DISABLE_AGENCY:
      return {
        ...state,
        agencies: state.agencies.map((agency) =>
          agency._id === action.payload._id ? action.payload : agency
        ),
      };

    default:
      return state;
  }
};

export default agencyAdminReducer;
