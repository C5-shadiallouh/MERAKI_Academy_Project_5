import { createSlice } from "@reduxjs/toolkit";

export const rating = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
  },
  
});


export const {setRatings, addRating, updateRating, deleteRating} = rating.actions;

export default rating.reducer;