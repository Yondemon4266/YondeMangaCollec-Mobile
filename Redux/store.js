import { configureStore } from "@reduxjs/toolkit";
import AllUsersReducer from "./AllUsersSlice";
import UserReducer from "./UserSlice";
export default configureStore({
  reducer: {
    AllUsers: AllUsersReducer,
    User: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableStateInvariant: true,
    }),
});
