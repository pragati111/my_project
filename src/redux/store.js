import { createStore, combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const STORAGE_KEY = "cart_items";

const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;

    const items = JSON.parse(serialized);
    return { cart: { items } };
  } catch (error) {
    console.warn("Failed to load cart from localStorage", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state.cart.items);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.warn("Failed to save cart to localStorage", error);
  }
};

const rootReducer = combineReducers({
  cart: cartReducer
});

export const store = createStore(rootReducer, loadState());

store.subscribe(() => {
  saveState(store.getState());
});
