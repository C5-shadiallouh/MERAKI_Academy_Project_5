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
    setTotal: (state, action) => {
      state.totalAmount = action.payload;
    },
    

    

    

  
    
  },
});

export const {
  setCart,
  setQuantity,
  setTotal
} = cartSlice.actions;

export default cartSlice.reducer;
