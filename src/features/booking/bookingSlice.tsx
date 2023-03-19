import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface BookingState {
  userInfo: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    timeCheckIn?: string;
    dateCheckIn?: moment.Moment;
  };
  table?: {
    numOfPeople?: number;
    name?: string;
    status?: string;
    stage?: number;
    _id?: string;
  };
  agreeLicense: {
    privacy: boolean;
    cancel: boolean;
  };
  defaultDateTime: any;
}

const initialState: BookingState = {
  userInfo: {
    fullName: "kien",
    phoneNumber: "1231231231",
    email: "kien@gmail.com",
  },
  table: {},
  agreeLicense: {
    privacy: false,
    cancel: false,
  },
  defaultDateTime: "",
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    changeAgree: (state, action) => {
      state.agreeLicense = action.payload;
    },

    setSelectedTable: (state, action) => {
      state.table = action.payload;
    },

    changeDefaultDateTime: (state, action) => {
      state.defaultDateTime = action.payload;
    },

    changeUserInfo: (state, action) => {},
  },
});

export const {
  changeAgree,
  setSelectedTable,
  changeUserInfo,
  changeDefaultDateTime,
} = bookingSlice.actions;

export default bookingSlice.reducer;
