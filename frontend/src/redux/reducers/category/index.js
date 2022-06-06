import { createSlice } from "@reduxjs/toolkit";
const categoriesSlice = createSlice({
    name: "meals",
  initialState: {
    categories: [],
  },
  reducer: {
    setCategories: (state, action) => {
     
      state.categories = action.payload;
    },
}})
export const {setCategories} =categoriesSlice.actions
export default categoriesSlice.reducer