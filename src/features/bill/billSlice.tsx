import { createSlice } from "@reduxjs/toolkit";

interface BillState {}

const initialState: any = [];

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBill: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { setBill } = billSlice.actions;

export default billSlice.reducer;
