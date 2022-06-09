import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import mealsReducer from './meals'
import categoriesReducer from "./category"
import pageSlice from "./page/pageReducer"
import cartSlice from "./cart/cart"
export default configureStore({
    reducer:{
        auth: authReducer,
        meals: mealsReducer,
        category : categoriesReducer,
        page:pageSlice,
        carts:cartSlice
    }
})