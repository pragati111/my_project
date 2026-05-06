import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_QUANTITY,
  SET_CART,
} from "./cartActions";

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, configs } = action.payload;
      const productId = product._id || product.id; // 🔥 FIX

      const existing = state.items.find((p) => p.productId === productId);

      if (existing) {
        return {
          ...state,
          items: state.items.map((p) =>
            p.productId === productId
              ? {
                  ...p,
                  designs: [...p.designs, ...configs].filter(
  (d, i, arr) => arr.findIndex(x => x._id === d._id) === i
),
                }
              : p,
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: productId,
            name: product.productName || product.name,
            price: product.price,
            image: product.image || product.images?.[0] || "",
            customizations: product.customizations || [], // 🔥 ADD THIS
            designs: configs,
          },
        ],
      };
    }

    case REMOVE_FROM_CART: {
  const { productId, designId } = action.payload;

  return {
    ...state,
    items: state.items
      .map((p) =>
        p.productId === productId
          ? {
              ...p,
              designs: p.designs.filter((d) => d._id !== designId),
            }
          : p
      )
      .filter((p) => p.designs.length > 0),
  };
}

    case UPDATE_QUANTITY: {
  const { productId, designId, quantity } = action.payload;
  const nextQuantity = Math.max(1, Number(quantity) || 1);

  return {
    ...state,
    items: state.items.map((p) =>
      p.productId === productId
        ? {
            ...p,
            designs: p.designs.map((d) =>
              d._id === designId
                ? { ...d, quantity: nextQuantity }
                : d
            ),
          }
        : p
    ),
  };
}
    case SET_CART:
      return {
        ...state,
        items: action.payload,
      };
    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};
