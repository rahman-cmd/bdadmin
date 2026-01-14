import * as ActionType from "./type";

const initialState = {
  coinSeller: [],
  total: 0,
  coinSellerId: [],
};

export const coinSellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_COINSELLER:
      return {
        ...state,
        coinSeller: action.payload.coinSeller,
        total: action.payload.total,
      };
    case ActionType.GET_COINSELLER_UNIQUEID:
      return {
        ...state,
        coinSellerId: action.payload,
      };
    default:
      return state;
  }
};
