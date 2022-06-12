import { createSlice } from "@reduxjs/toolkit";

export const rating = createSlice({
  name: "rating",
  initialState: {
    ratings: 0,
    ratingAvg:-1
  },
  reducers: {
    setRatings: (state, action) => {
      //payload:all ratings
      state.ratings = action.payload;
    },

    getRating: (state, action) => {
        //payload:newRating
        state.ratingAvg = action.payload;
      },
  
      updateRating: (state, action) => {
        //payload:updated-Rating
        state.ratings = state.ratings.map((rating) => {
          if (rating.id == action.payload) {
            return { ...rating, ...action.payload };
          }
        });
      },
  
      deleteRating: (state, action) => {
        //payload : id
        state.ratings = state.ratings.filter((rating) => {
          return rating.id != action.payload;
        });
      }, 

   
  },
});


export const {setRatings, getRating, updateRating, deleteRating} = rating.actions;

export default rating.reducer;