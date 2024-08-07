import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_GET_PROFILE,
  CHANGE_DEFAULT_ACTIVE_KEY,
  CHANGE_USERTOKEN
} from "./user.types";

const INITIAL_STATE = {
  userToken: "",
  refreshToken: "",
  userInfo: [],
  defaultActiveKey: "",
  userAddresses: []
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      }; 
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_PROFILE:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_SIGNOUT:
      return (window.location = "/");
    case CHANGE_DEFAULT_ACTIVE_KEY:
      return {
        ...state,
        defaultActiveKey: action.payload,
      };
    case CHANGE_USERTOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
