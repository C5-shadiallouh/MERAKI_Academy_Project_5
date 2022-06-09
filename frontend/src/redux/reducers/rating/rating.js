import { createSlice } from "@reduxjs/toolkit";

export const rating = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
  },
  reducers: {
    setRatings: (state, action) => {
      //payload:all ratings
      state.ratings = action.payload;
    },

    addRating: (state, action) => {
        //payload:newRating
        state.ratings.push(action.payload);
      },
  
      

   
  },
});


export const {setRatings, addRating, updateRating, deleteRating} = rating.actions;

export default rating.reducer;