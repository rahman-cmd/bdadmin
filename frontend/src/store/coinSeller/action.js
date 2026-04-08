import axios from "axios";
import { key } from "../../util/Config";
import * as CoinSellerType from "./type";

// GET coinSeller UniqueId
export const getCoinSellerUniqueId = (start, limit, search) => (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  axios
    .get("user/getUsersUniqueId", {
      params: {
        key,
        start,
        limit,
        search: search || "",
      },
      headers: token
        ? {
            Authorization: token,
          }
        : {},
    })
    .then((res) => {
      dispatch({
        type: CoinSellerType.GET_COINSELLER_UNIQUEID,
        payload: res.data?.data || [],
      });
    })
    .catch((error) => console.log(error));
};
