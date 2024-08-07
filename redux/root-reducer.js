import { combineReducers } from "redux";
import userReducer from "../redux/user/user.reducer";
import cartReducer from "../redux/cart/cart.reducer";
import orderReducer from "../redux/order/order.reducer";
import productReducer from "../redux/product/product.reducer";
import paginationReducer from "../redux/pagination/pagination.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import SetTransform from "./transforms";
import { USER_SIGNOUT } from "./user/user.types";
const PersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user", "product"],
};
const appReducer  = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  product: productReducer,
  pagination: paginationReducer,
  transforms: [SetTransform],
});
const rootReducer = (state, action) => {
  if (action.type === USER_SIGNOUT) {
    storage.removeItem('persist:root')
    return appReducer(undefined, action);
}
return appReducer(state, action);
}

export default persistReducer(PersistConfig, rootReducer);
