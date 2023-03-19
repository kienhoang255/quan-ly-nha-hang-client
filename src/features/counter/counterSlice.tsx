import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment } = counterSlice.actions;

export const selectCounter = (state: RootState) => state.counter.count;

export default counterSlice.reducer;
