import axios from "axios";
import axiosInstance from "../configurations/axiosInstance";
import API_URL from "../configurations/environment";

export const fetchOrderList = async (userToken, refreshToken) => {
  let orderList = null;
  try {
    axiosInstance(userToken, refreshToken)
      .get(`${API_URL}/users/self/carts`)
      .then((res) => {
        const data = res.data.data;
        orderList = res.data.data;
      })
      .catch((err) => console.log('err', err))
  } catch (ex) {
    console.log(ex);
  }
  return orderList;
};

export const fetchOrderDetail = async (orderId, userToken,refreshToken) => {
  let orderDetail = null;
  try {
    axiosInstance(userToken, refreshToken, dispatch).get(`${API_URL}/users/self/carts/${orderId}`, {
      method: "get",
      responseType: "stream"
    })
    .then((response) => {
      const data = response.data.data;
      orderDetail = data;
    })
    .catch((err) => {
      console.log("error", err);
    });
  }
  catch (ex) {
    console.log(ex)
  }  
  return orderDetail;
};
