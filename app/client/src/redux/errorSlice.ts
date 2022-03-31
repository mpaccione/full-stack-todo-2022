import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  errorMessage: String;
  successMessage: String;
}

const initialState: ErrorState = {
  errorMessage: "",
  successMessage: "",
};

const mySlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = "";
    }
  },
});

export const {
  clearErrorMessage,
  clearSuccessMessage,
  setErrorMessage,
  setSuccessMessage,
} = mySlice.actions;
export default mySlice.reducer;
