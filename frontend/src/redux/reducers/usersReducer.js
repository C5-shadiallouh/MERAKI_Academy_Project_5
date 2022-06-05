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
            state = state.users.filter((elem, index) => {
              return elem.id !== action.payload;
            });
          },

       

})