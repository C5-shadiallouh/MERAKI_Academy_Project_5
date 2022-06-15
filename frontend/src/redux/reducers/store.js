import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import mealsReducer from './meals'
import categoriesReducer from "./category"
import pageSlice from "./page/pageReducer"
import cartSlice from "./cart/cart"
import comment from './comment'
import rating from './rating/rating'
import users from "./users/usersReducer"
import message from "./message/message"
export default configureStore({
    reducer:{
        auth: authReducer,
        meals: mealsReducer,
        category : categoriesReducer,
        page:pageSlice,
        carts:cartSlice,
        comments:comment,
        ratings:rating,
        users:users,
        message:message

    }
})