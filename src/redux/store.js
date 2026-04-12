import { createStore, combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer
});

export const store = createStore(rootReducer);
