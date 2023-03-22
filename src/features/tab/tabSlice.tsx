import { createSlice } from "@reduxjs/toolkit";

interface TabState {}

const initialState: TabState = 0;

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab: (state, action) => action.payload,
  },
});

export const { setTab } = tabSlice.actions;

export default tabSlice.reducer;
