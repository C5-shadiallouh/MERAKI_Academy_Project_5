import {createSlice} from `@reduxjs/toolkit`

const cartSlice=createSlice({
    name:`Cart`,
    initialState:{
       carts:[]
    },

    reducers:{

        setCart:(state,action)=>{
            state.carts=action.payload
        },


        addItem:(state,action)=>{
           
            state.carts.push(action.payload)
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


        removeAllItem:(state,action)=>{
            state.carts=[]
            localStorage.removeItem(`cartItem`)
        }
    }

})


export const {setCart,addItem,deleteItemById,removeAllItem,updateById}=cartSlice.actions

export default cartSlice.reducers