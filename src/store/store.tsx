import { configureStore } from "@reduxjs/toolkit";
import counter from "../features/counter/counterSlice";
import menu from "../features/menu/menuSlice";
import booking from "../features/booking/bookingSlice";
import table from "../features/table/tableSlice";
import user from "../features/user/userSlice";
import bill from "../features/bill/billSlice";

export const store = configureStore({
  reducer: {
    counter,
    menu,
    booking,
    table,
    user,
    bill,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
