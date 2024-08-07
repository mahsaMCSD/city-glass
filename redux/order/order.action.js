import API_URL from "../../configurations/environment";
import axiosInstance from "../../configurations/axiosInstance";
import { fetchOrderDetail } from "../../services/orderService";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_FETCH_DETAIL } from "./order.types";
export const createOrder = (order) => (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const userToken = getState().user.userToken;
  const refreshToken = getState().user.refreshToken;
  console.log('userToken',userToken)
  console.log('refreshToken',refreshToken)
  const newOrder = order.orderItems.map((element) => {
    return { product_id: element._id, quantity: element.quantity };
  });

  try {
    axiosInstance(userToken, refreshToken, dispatch).get(`${API_URL}/carts`, {
      method: "POST",
      responseType: "stream",
      data: {
        payment_type: "online",
        orders: newOrder,
      },
    })
      .then((response) => {
        console.log('response',response)
        // const res = response.data.data;
        // dispatch({ type: ORDER_CREATE_SUCCESS, payload: res });
      })
      .catch((err) => {
        console.log("error401", err);
      });
  }
  catch (ex) {
    console.log('ex',ex)
  }

};
export const cartDetail = () => (dispatch, getState) => {
  const userToken = getState().user.userToken;
  const refreshToken = getState().user.refreshToken;
  const cartid = location.pathname.split('/')[2]
  fetchOrderDetail(cartid, userToken, refreshToken).then((orderDetail) =>
    dispatch({ type: ORDER_FETCH_DETAIL, payload: orderDetail })
  );
};
