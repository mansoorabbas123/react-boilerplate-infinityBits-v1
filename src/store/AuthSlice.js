import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Domain from "../services/Endpoint";
import { setSession } from "../services/jwt.service";
import { showMessage } from "./shared_stateSlice";

const initialState = {
  user: null,
  authLoading: false,
  authError: null,
};

export const loginService = createAsyncThunk(
  "auth/loginService",
  async (loginData, { rejectWithValue, dispatch }) => {
    // console.log(loginData);
    try {
      const { data } = await axios.post(
        `${Domain}/api/client/logIn`,
        loginData
      );
      // console.log("loginService res::", data);
      if (data.success) {
        dispatch(showMessage(data.message));
        setSession(data.userData.accessToken);
      }
      return data;
    } catch (error) {
      console.log(error);
      if (error.message && error.response.data.message) {
        dispatch(showMessage(error.response.data.message));
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginWithTokenService = createAsyncThunk(
  "auth/loginWithTokenService",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${Domain}/api/client/user_validation`);
      console.log("loginWithTokenService res::", data);
      if (data.success) {
        dispatch(showMessage(data.message));
        setSession(data.userData.accessToken);
      }
      return data;
    } catch (error) {
      console.log(error);
      if (error.message && error.response.data.message) {
        dispatch(showMessage(error.response.data.message));
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutService: (state) => {
      state.user = null;
      state.authLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginService.pending, (state, action) => {
      state.authLoading = true;
    });
    builder.addCase(loginService.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authLoading = false;
    });
    builder.addCase(loginService.rejected, (state, { payload }) => {
      state.authLoading = false;
      state.authError = payload;
    });
    builder.addCase(loginWithTokenService.pending, (state, action) => {
      state.authLoading = true;
    });
    builder.addCase(loginWithTokenService.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authLoading = false;
    });
    builder.addCase(loginWithTokenService.rejected, (state, { payload }) => {
      state.authLoading = false;
      state.authError = payload;
    });
  },
});

export default AuthSlice.reducer;
export const { logoutService } = AuthSlice.actions;
