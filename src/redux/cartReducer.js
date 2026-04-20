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
      const existing = state.items.find((p) => p.productId === product.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((p) =>
            p.productId === product.id
              ? {
                  ...p,
                  designs: [...p.designs, ...configs],
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
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            designs: configs,
          },
        ],
      };
    }

    case REMOVE_FROM_CART: {
      const payload = action.payload || {};
      const productId = payload.productId ?? payload;
      const designIndex = payload.designIndex;

      return {
        ...state,
        items: state.items
          .map((p) =>
            p.productId === productId
              ? {
                  ...p,
                  designs: p.designs.filter((_, idx) => idx !== designIndex),
                }
              : p,
          )
          .filter((p) => p.designs.length > 0),
      };
    }

    case UPDATE_QUANTITY: {
      const { productId, designIndex, quantity } = action.payload;
      const nextQuantity = Math.max(1, Number(quantity) || 1);
      return {
        ...state,
        items: state.items.map((p) =>
          p.productId === productId
            ? {
                ...p,
                designs: p.designs.map((d, idx) =>
                  idx === designIndex ? { ...d, quantity: nextQuantity } : d,
                ),
              }
            : p,
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
