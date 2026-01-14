import { combineReducers } from "redux";
import agencyAdminReducer from "./agencyAdmin/reducer";
import spinnerReducer from "./spinner/reducer";
import { coinSellerReducer } from "./coinSeller/reducer";

export default combineReducers({
  agencyAdmin: agencyAdminReducer,
  spinner: spinnerReducer,
  coinSeller: coinSellerReducer,
});
