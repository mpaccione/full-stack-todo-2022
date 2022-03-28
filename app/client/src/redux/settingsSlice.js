import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobile: false,
  showLoader: false,
  theme: 'light'
};

const mySlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMobile: (state, action) => {
      state.mobile = action.payload;
      return state;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      return state;
    },
    showLoader: (state, action) => {
      state.loader = action.payload;
      return state;
    }
  },
});

export const {
  setMobile,
  setTheme,
  showLoader
} = mySlice.actions;
export default mySlice.reducer;
