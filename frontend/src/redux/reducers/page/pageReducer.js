import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    page:1
  },
  reducers: {
    
    changePage: (state, action) => {
    state.page = action.payload
      
      
    },
    
  },
});
export const { changePage } = pageSlice.actions;
export default pageSlice.reducer;
