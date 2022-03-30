import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
  mobile: boolean;
  showLoader: boolean;
  theme: string;
}

const initialState: SettingState = {
  mobile: false,
  showLoader: false,
  theme: 'light'
};

const mySlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMobile: (state, action: PayloadAction<boolean>) => {
      state.mobile = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    showLoader: (state, action: PayloadAction<boolean>) => {
      state.showLoader = action.payload;
    }
  },
});

export const {
  setMobile,
  setTheme,
  showLoader
} = mySlice.actions;
export default mySlice.reducer;
