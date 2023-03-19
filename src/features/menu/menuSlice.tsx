import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface FoodState {
  type: string[];
  typeCalled: string[];
  foods: [];
}

const initialState: FoodState = {
  type: [],
  foods: [],
  typeCalled: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addTypeByApi: (state, action) => {
      state.type = action.payload;
    },
    addTypeCalled: (state, action) => {
      if (!state.typeCalled?.find((e) => e === action.payload))
        state.typeCalled.push(action.payload);
    },
    addFoodByApi: (state, action) => {
      state.foods.push(...action.payload);
    },
  },
});

export const { addTypeByApi, addFoodByApi, addTypeCalled } = menuSlice.actions;

// export const selectCounter = (state: RootState) => state.counter.count;

export default menuSlice.reducer;
