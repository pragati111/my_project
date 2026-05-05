import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "./cartActions";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

export const useCart = () => {
  const { user, token } = useAuth();
  const API = "https://my-project-backend-ee4t.onrender.com";
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const getAdjustment = (product, config) => {
  let extra = 0;

  product.customizations?.forEach((field) => {
    const selected = config[field.label];

    if (!selected) return;

    if (Array.isArray(selected)) {
      selected.forEach((val) => {
        const opt = field.options?.find((o) => o.label === val);
        extra += opt?.priceAdjustment || 0;
      });
    } else {
      const opt = field.options?.find((o) => o.label === selected);
      extra += opt?.priceAdjustment || 0;
    }
  });

  return extra;
};

  return {
    cart: items,
    addToCart: async (product, configs) => {
      // 1️⃣ Redux update (instant UI)
      dispatch(addToCart(product, configs));

      // 2️⃣ Backend call
      if (!user?.id) return;

      try {
        await axios.post(
          `${API}/api/cart/add`,
          {
            userId: user.id,
            productId: product._id || product.id,
            configs: configs.map((c) => ({
              quantity: c.quantity || 1,
              config: c.config ? c.config : c,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (err) {
        console.error("Backend add to cart failed", err);
      }
    },
    removeFromCart: async (productId, designIndex) => {
      // 1️⃣ Redux update (instant UI)
      dispatch(removeFromCart(productId, designIndex));

      // 2️⃣ Backend call
      if (!user?.id) return;

      try {
        await axios.post(
          `${API}/api/cart/remove`,
          {
            userId: user.id,
            productId,
            designIndex,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (err) {
        console.error("Backend remove failed", err);
      }
    },
    updateQuantity: async (productId, designIndex, quantity) => {
      // 1️⃣ Redux update (instant UI)
      dispatch(updateQuantity(productId, designIndex, quantity));

      // 2️⃣ Backend call
      if (!user?.id) return;

      try {
        await axios.put(
          `${API}/api/cart/update`,
          {
            userId: user.id,
            productId,
            designIndex,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (err) {
        console.error("Backend update failed", err);
      }
    },
    clearCart: () => dispatch(clearCart()),
    getTotalQuantity: () =>
      items.reduce(
        (total, product) =>
          total +
          product.designs.reduce((sum, d) => sum + Number(d.quantity || 0), 0),
        0,
      ),
    getTotalPrice: () =>
  items.reduce((total, product) => {
    return (
      total +
      product.designs.reduce((sum, d) => {
        const adjustment = getAdjustment(product, d.config);
        return (
          sum +
          (Number(product.price) + adjustment) *
            Number(d.quantity || 0)
        );
      }, 0)
    );
  }, 0),
  };
};
