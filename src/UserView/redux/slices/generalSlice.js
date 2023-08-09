import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = generalSlice.actions;

export default generalSlice.reducer;
