import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface BookingState {
  userInfo: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
  dateCheckIn?: moment.Moment;
  timeCheckIn?: string;
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
  specialRequired?: string;
}

const initialState: BookingState = {
  userInfo: {
    fullName: "kien",
    phoneNumber: "1231231231",
    email: "kien@gmail.com",
  },
  table: {},
  dateCheckIn: moment([]).add(1, "day"),
  timeCheckIn: "9:00",

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

    setTimeCheckIn: (state, action) => ({
      ...state,
      timeCheckIn: action.payload,
    }),
    setDateCheckIn: (state, action) => ({
      ...state,
      dateCheckIn: action.payload,
    }),

    setSpecialRequired: (state, action) => ({
      ...state,
      specialRequired: action.payload,
    }),

    changeUserInfo: (state, action) => {},
  },
});

export const {
  changeAgree,
  setSelectedTable,
  changeUserInfo,
  changeDefaultDateTime,
  setTimeCheckIn,
  setDateCheckIn,
  setSpecialRequired,
} = bookingSlice.actions;

export default bookingSlice.reducer;
