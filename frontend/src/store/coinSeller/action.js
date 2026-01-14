import { baseURL, key } from "../../util/Config";
import * as CoinSellerType from "./type";

// GET coinSeller UniqueId
export const getCoinSellerUniqueId = (start, limit, search) => (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  fetch(
    `${baseURL}user/getUsersUniqueId?start=${start}&limit=${limit}&search=${search || ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        key: `${key}`,
        Authorization: `${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: CoinSellerType.GET_COINSELLER_UNIQUEID,
        payload: res.data || [],
      });
    })
    .catch((error) => console.log(error));
};
