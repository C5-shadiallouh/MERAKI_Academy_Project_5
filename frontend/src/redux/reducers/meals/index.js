import { createSlice } from "@reduxjs/toolkit";

const meals = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    total:0,
    quantity:0,
  },
  reducers: {
    setMeals: (state, action) => {
      //payload:all meals
      state.meals = action.payload;
    },

    getTotal:(state,action)=>{
      //payload:
      state.total = action.payload;
    },

    addNewMeal: (state, action) => {
      //payload:newMeal
      state.meals.push(action.payload);
    },

    updateMeal: (state, action) => {
      //payload:updatedMeal
      state.meals = state.meals.map((meal) => {
        if (meal.id == action.payload) {
          return { ...meals, ...action.payload };
        }
      });
    },

    deleteMeal: (state, action) => {
      //payload : id
      state.meals = state.meals.filter((meal) => {
        return meal.id != action.payload;
      });
    },

    setMealByID:(state, action) => {
        //payload:id
        state.meals = action.payload
    },

    setMealsByCategory:(state, action)=>{
        //payload:meals of category
        state.meals = action.payload
    },

    setPaginatedMeals:(state, action) => {
        //payload:paginated meals
        state.meals = action.payload
    },

    setPaginatedByCategory:(state, action)=> {
        //payload: paginated by category
        state.meals = action.payload
    },

    setPriceRange:(state, action) => {
        //payload: meals of this range
        state.meals = action.payload
    },

    setPriceASC:(state, action)=>{
         //payload: price ASC
         state.meals = action.payload
    },

    setPriceDESC:(state, action)=>{
        //payload: price DESC
        state.meals = action.payload
   },
  },
});

export const { setMeals, addNewMeal, updateMeal, deleteMeal, setMealByID, setMealsByCategory, setPaginatedMeals, setPaginatedByCategory, setPriceRange, setPriceASC, setPriceDESC} = meals.actions;

export default meals.reducer;
