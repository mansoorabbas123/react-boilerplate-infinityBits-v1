import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import shared_stateSlice from "./shared_stateSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shared_state: shared_stateSlice,
  },
});
