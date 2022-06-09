import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: `Cart`,
  initialState: {
    carts: [],
    totalAmount: 0,
    totalQuantity: 0,
  },

  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload;
    },

    addtoCart: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (itemIndex >= 0) {
        state.totalQuantity += 1;
      } else {
        state.totalQuantity = 1;
        state.carts.push(action.payload);
      }
    },

    RemoveFromCart: (state, action) => {
      state.carts = state.carts.filter((cart, index) => {
        return cart.id !== action.payload.id;
      });
    },

    removeAllItem: (state, action) => {
      state.carts = [];
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (state.carts[itemIndex].quantity > 1) {
        state.carts[itemIndex].quantity -= 1;
      } else if (state.carts[itemIndex].quantity === 1) {
        state.carts = state.carts.filter((cart) => {
          return cart.id !== action.payload.id;
        });
      }
    },
  },
});

export const {
  setCart,
  addtoCart,
  RemoveFromCart,
  removeAllItem,
  decreaseCart,
} = cartSlice.actions;

export default cartSlice.reducer;
