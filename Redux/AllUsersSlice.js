import { createSlice } from "@reduxjs/toolkit";

export const AllUsersSlice = createSlice({
  name: "AllUsers",
  initialState: {
    AllUsersData: [],
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.AllUsersData = action.payload;
    },
  },
});

export const { getAllUsers } = AllUsersSlice.actions;

export default AllUsersSlice.reducer;
