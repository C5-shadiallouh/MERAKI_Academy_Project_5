import {createSlice} from `@reduxjs/toolkit` 

const usersSlice=createSlice({
    name:"Users",
    initialState:{
        users:[]

    },
    reducers:{

        setUser:(state,action)=>{
            state.users=action.payload

        },

       


    
    }
})


export const {setUser,deleteUserById,updateUserById,addUser}=usersSlice.actions

export default usersSlice.reducers()