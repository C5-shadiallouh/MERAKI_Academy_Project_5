import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "" || localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
    isAdmin:"",
  },
  reducers: {
    
    loggedin: (state, action) => {
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin
      
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("isLogged", state.isLoggedIn);
    },
    logout: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      state.isAdmin =false
      localStorage.clear();
    },
  },
});
export const { loggedin, logout } = authSlice.actions;
export default authSlice.reducer;
