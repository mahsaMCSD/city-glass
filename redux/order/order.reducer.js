import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_FETCH_DETAIL,
  ORDER_CREATE_FAIL,
} from "./order.types";

const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_FETCH_DETAIL:
      return { loading: false, orderDetail: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export default orderCreateReducer;
