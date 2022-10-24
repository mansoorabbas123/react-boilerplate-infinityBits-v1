import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  alertState: {
    open: false,
    vertical: "top",
    horizontal: "center",
  },
};

const shared_stateSlice = createSlice({
  name: "shared_stateSlice",
  initialState,
  reducers: {
    showMessage: (state, { payload }) => {
      state.message = payload;
      state.alertState.open = true;
    },
    hideMessage: (state, { payload }) => {
      state.alertState.open = false;
    },
  },
});

export default shared_stateSlice.reducer;
export const { showMessage, hideMessage } = shared_stateSlice.actions;
