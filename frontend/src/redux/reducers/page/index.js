import {createSlice} from `@reduxjs/toolkit` 


const pageReducer=createSlice({
    name:"page",
    initialState:{
        page:1
    },
    reducers:{
        changePage:(state,action)=>{
            state.page=action.payload
        }
    }
})

