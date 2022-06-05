import {createSlice} from `@reduxjs/toolkit`

const cartSlice=createSlice({
    name:`Cart`,
    initialState:{
        cart:localStorage.getItem("cartItem")?localStorage.getItem("cartItem"):[]
    },

    reducers:{

        setCart:(state,action)=>{
            state.cart=action.payload
            localStorage.setItem(action.payload)
        },


        addItem:(state,action)=>{
            state.cart.push(action.payload)
        }














    }

})