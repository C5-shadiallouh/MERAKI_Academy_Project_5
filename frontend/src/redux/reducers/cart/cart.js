import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: `Cart`,
  initialState: {
    carts: [],
    totalAmount: 0,
    totalQuantity: 1,
  },

  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload;
    },
    setQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },

    

    

  
    
  },
});

export const {
  setCart,
  setQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
