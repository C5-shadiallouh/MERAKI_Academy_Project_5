import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: `Cart`,
  initialState: {
    carts: [],
    totalAmount: 0,
  },

  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload;
    },

    addtoCart: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => {
        item.id === action.payload.id;
      });
      if (itemIndex >= 0) {
        state.carts[itemIndex].quantity += 1;
      } else {
        const item = { ...action.payload, quantity: 1 };
        state.carts.push(item);
      }
    },

    RemoveFromCart: (state, action) => {
      state.carts = state.carts.filter((cart, index) => {
        return cart.id !== action.payload;
      });
      localStorage.removeItem(`cartItem`, action.payload);
    },

    updateById: (state, action) => {
      state.carts = state.carts.map((cart, index) => {
        if (cart.id == action.payload) {
          return { ...cart, quantity: action.payload.quantity };
        }
        return cart;
      });

      localStorage.setItem(`cartItem`, action.payload);
    },

    removeAllItem: (state, action) => {
      state.carts = [];
    },

    getTotal: (state, action) => {
      state.carts.reduce((cartTotal, cartItem) => {
        const { price, quantity } = cartItem;
        const itemTotal = price * quantity;
        cart;
      });
    },
  },
});

export const { setCart, addtoCart, RemoveFromCart, removeAllItem, updateById } =
  cartSlice.actions;

export default cartSlice.reducer;
