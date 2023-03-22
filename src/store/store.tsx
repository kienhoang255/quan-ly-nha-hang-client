import { configureStore } from "@reduxjs/toolkit";
import counter from "../features/counter/counterSlice";
import menu from "../features/menu/menuSlice";
import booking from "../features/booking/bookingSlice";
import table from "../features/table/tableSlice";
import user from "../features/user/userSlice";
import bill from "../features/bill/billSlice";
import tab from "../features/tab/tabSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    counter,
    menu,
    booking,
    table,
    user,
    bill,
    tab,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
