import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    userId: "p",
    userData: [],
    isLogged: false,
    optionsFinished: false,
    isCompare: false,
  },
  reducers: {
    authReducer: (state, action) => {
      state.isLogged = action.payload;
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
    putUserData: (state, action) => {
      state.userData = action.payload;
    },
    changeOptionsFinished: (state, action) => {
      state.optionsFinished = action.payload;
    },
    setIsCompare: (state, action) => {
      state.isCompare = action.payload;
    },
  },
});

export const {
  authReducer,
  getUserId,
  putUserData,
  changeOptionsFinished,
  setIsCompare,
} = UserSlice.actions;

export const getUserData = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://server-yondemangacollec.onrender.com/api/user/${id}`,
        { withCredentials: true }
      );
      dispatch(putUserData(response.data));
      console.log("Données de l'utilisateur récupérées");
    } catch (err) {
      console.log(err);
    }
  };
};



export default UserSlice.reducer;
