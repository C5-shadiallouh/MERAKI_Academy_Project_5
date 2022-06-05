import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "" || localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    loggedin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("isLogged", state.isLoggedIn);
    },
    logout: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});
export const { loggedin, logout } = authSlice.actions;
export default authSlice.reducer;
