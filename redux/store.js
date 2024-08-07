import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../redux/root-reducer";
import { persistStore } from "redux-persist";

const middlewares = [logger];

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares, thunk)
);
export const persistor = persistStore(store);
export default { store, persistor };
