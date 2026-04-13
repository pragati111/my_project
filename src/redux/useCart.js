import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity, clearCart } from "./cartActions";

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  

  return {
    cart: items,
    addToCart: (product, configs) => dispatch(addToCart(product, configs)),
    removeFromCart: (productId, designIndex) =>
      dispatch(removeFromCart(productId, designIndex)),
    updateQuantity: (productId, designIndex, quantity) =>
      dispatch(updateQuantity(productId, designIndex, quantity)),
    clearCart: () => dispatch(clearCart()),
    getTotalQuantity: () =>
      items.reduce(
        (total, product) =>
          total +
          product.designs.reduce((sum, d) => sum + Number(d.quantity || 0), 0),
        0
      ),
    getTotalPrice: () =>
      items.reduce(
        (total, product) =>
          total +
          product.designs.reduce(
            (sum, d) => sum + Number(d.quantity || 0) * product.price,
            0
          ),
        0
      )
  };
};
