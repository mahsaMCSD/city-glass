import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_GET_PROFILE,
  CHANGE_DEFAULT_ACTIVE_KEY,
  CHANGE_USERTOKEN,
} from "./user.types";

import API_URL from "../../configurations/environment";
import axios from "axios";
import store, { persistor } from "../store";
import { saveShippingAddress } from "../cart/cart.actions";
import uuid from 'react-uuid'
import axiosInstance from "../../configurations/axiosInstance";
import { useRouter } from 'next/router';
export const signin = (mobileNumber, confirmCode) => (dispatch) => {
  try {
    axios({
      headers: { "x-client-id": "website" },
      method: "post",
      url: `${API_URL}/tokens`,
      responseType: "stream",
      data: { phone: `${mobileNumber}`, code: +confirmCode },
    })
      .then((response) => {
        const res = response.data.data;
        localStorage.setItem("userToken", res.access_token);
        localStorage.setItem("refreshToken", res.refresh_token);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: res });
        axios({
          headers: { "x-client-id": "website", "Authorization": `Bearer ${res.access_token}` },
          method: "get",
          url: `${API_URL}/users/self/addresses`,
          responseType: "stream",
        })
          .then((response) => {
            const res = response.data.data.addresses;
            dispatch(saveShippingAddress(res));
            res.map(r => r['id'] = uuid())
          })
          .catch((err) => {
            console.log("error", err);
          });
      })
      .catch((err) => {
        console.log("error", err);
      });
  } catch (error) {
    console.log("error", error);
    ({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signout = () => (dispatch) => {
  persistor.purge();
  if (typeof window !== "undefined") {
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("mobileNumber");
  }
  dispatch({ type: USER_SIGNOUT });
};
export const getProfile = (userToken,refreshToken) => (dispatch) => {

  
  try {
    axiosInstance(userToken,refreshToken,dispatch)
      .get(`${API_URL}/users/self`)
      .then((res) => dispatch({ type: USER_GET_PROFILE, payload: res.data.data }))
      .catch((err) => console.log('err', err))
  } catch (ex) {
    console.log(ex);
  }
};

export const changeDefaultActiveKey = (item) => (dispatch) => {
  dispatch({
    type: CHANGE_DEFAULT_ACTIVE_KEY,
    payload: item,
  });
};

export const changeUserToken = (item) => (dispatch) => {
  dispatch({
    type: CHANGE_USERTOKEN,
    payload: item,
  });
};

