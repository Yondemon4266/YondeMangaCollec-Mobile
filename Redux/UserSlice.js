import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    userId: "",
    userData: [],
    isLogged: false,
  },
  reducers: {
    authReducer: (state, action) => {
      state.isLogged = action.payload;
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { authReducer, getUserId, getUserData } = UserSlice.actions;

export default UserSlice.reducer;
