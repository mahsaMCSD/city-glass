import CartActionTypes from "./cart.types";
export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});
export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});
export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const editShippingAddress = (item) => (dispatch) => {
  dispatch({
    type: CartActionTypes.CART_EDIT_SHIPPING_ADDRESS,
    payload: item,
  });
};
export const saveShippingAddress = (item) => (dispatch) => {
  dispatch({
    type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: item,
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("shippingAddress", JSON.stringify(item));
  }
};

export const removeItemFromAddress = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_SHIPPINGADDRESS,
  payload: item,
});
