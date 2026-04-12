// Cart Actions
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

export const addToCart = (product, configs) => ({
  type: ADD_TO_CART,
  payload: { product, configs }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, designIndex, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, designIndex, quantity }
});

export const clearCart = () => ({
  type: CLEAR_CART
});
