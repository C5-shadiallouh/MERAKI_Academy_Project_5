import {createSlice} from `@reduxjs/toolkit`

const userSlice =createSlice({
    name:`users`,
    initialState:{
users:[]
    },
    reducers:{
        setUsers:(state,action)=>{
            state.users=action.payload
        },

        addUser:(state,action)=>{
            state.users.push(action.payload)
        },
        deleteUserById: (state, action) => {
            state.users = state.users.filter((elem, index) => {
              return elem.id !== action.payload;
            });
          },

        updateUserById: (state, action) => {
      state.users = state.users.map((user, index) => {
        if (user.id == action.payload) {
          return { ...user, firstName:action.payload.firstName,lastName:action.payload.lastName,city:action.payload.city,email:action.payload.email};
        }
        return user;
      });
    },
        }
})


export const {setUsers,addUser,updateUserById,deleteUserById}=userSlice.actions

export default userSlice.reducers()