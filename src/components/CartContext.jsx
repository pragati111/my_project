import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, configs) => {
    setCart((prev) => {
      const existing = prev.find(p => p.productId === product.id);

      if (existing) {
        return prev.map(p =>
          p.productId === product.id
            ? {
                ...p,
                designs: [...p.designs, ...configs]
              }
            : p
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          designs: configs
        }
      ];
    });
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, product) =>
      total +
      product.designs.reduce((sum, d) => sum + Number(d.quantity || 0), 0),
      0
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
}