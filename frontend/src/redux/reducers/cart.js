import {createSlice} from `@reduxjs/toolkit`

const cartSlice=createSlice({
    name:`Cart`,
    initialState:{
        carts:localStorage.getItem("cartItem")?localStorage.getItem("cartItem"):[]
    },

    reducers:{

        setCart:(state,action)=>{
            state.carts=action.payload
            localStorage.setItem(action.payload)
        },


        addItem:(state,action)=>{
            state.carts.push(action.payload)
            localStorage.setItem(`cartItem`,state.carts)
        },


        deleteItemById:(state,action)=>{
            state.carts=state.carts.filter((cart,index)=>{
                return cart.id !==action.payload
            })
            localStorage.removeItem(`cartItem`,action.payload)
        },

        updateById:(state,action)=>{
            state.carts = state.carts.map((cart, index) => {
            if (cart.id == action.payload) {
              return { ...cart, quantity:action.payload.quantity };
            }
            return cart;
          });

          localStorage.setItem(`cartItem`,action.payload)
        },

        














    }

})