import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  addItemToShippingAddress,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
  shippingAddress: [],
};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        ),
      };
    case CartActionTypes.CART_EMPTY:
      return { ...state, cartItems: [] };
    case CartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: addItemToShippingAddress(
          state.shippingAddress,
          action.payload
        ),
      };
    case CartActionTypes.CART_EDIT_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload[0],
      };
   
    case CartActionTypes.CLEAR_ITEM_SHIPPINGADDRESS:
      return {
        ...state,
        shippingAddress: action.payload[0],
      };
    default:
      return state;
  }
};

export default cartReducer;
