import { createSlice } from "@reduxjs/toolkit";
const categories = createSlice({
    name: "meals",
  initialState: {
    categories: [],
  },
  reducer: {
    setCategories: (state, action) => {
     
      state.meals = action.payload;
    },
}})
export const {setCategories} =categories.actions
export default categories.reducer