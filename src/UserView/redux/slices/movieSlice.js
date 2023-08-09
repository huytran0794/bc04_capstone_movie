import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovieInfo: null,
  selectedSeatList: [],
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setSelectedSeatList: (state, action) => {
      state.selectedSeatList = action.payload;
    },
    setSelectedMovieInfo: (state, action) => {
      state.selectedMovieInfo = action.payload;
    },
  },
});

export const { setSelectedSeatList, setSelectedMovieInfo } = movieSlice.actions;

export default movieSlice.reducer;
