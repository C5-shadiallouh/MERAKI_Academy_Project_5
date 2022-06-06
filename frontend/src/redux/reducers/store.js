import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import mealsReducer from './meals'
export default configureStore({
    reducer:{
        auth: authReducer,
        meals: mealsReducer
    }
})