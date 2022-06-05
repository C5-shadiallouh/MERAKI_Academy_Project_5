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
        addUser:(state,action)=>{
          state.users.push(action.payload)
      },

      updateUserById: (state, action) => {
        state.users = state.users.map((user, index) => {
                if (user.id == action.payload) {
                  return { ...user, firstName:action.payload.firstName,lastName:action.payload.lastName,city:action.payload.city,email:action.payload.email,password:action.payload.password };
                }
                return user;
              });
            },
    
    
           
     


       


    
    }
})


export const {setUser,deleteUserById,updateUserById,addUser}=usersSlice.actions

export default usersSlice.reducers()