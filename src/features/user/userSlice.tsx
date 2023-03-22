import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  _id?: string;
  username?: string;
  email?: string;
  phone?: any;
  address?: string;
  sex?: string;
  birth?: string;
}

const initialState: UserState = {
  _id: "",
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        _id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
        sex: action.payload.sex,
        birth: action.payload.birth,
      };
    },
    removeUser: (state, action) => {
      return {};
    },
    setUsername: (state, action) => ({ ...state, username: action.payload }),
    setPhone: (state, action) => ({ ...state, phone: action.payload }),
    setEmail: (state, action) => ({ ...state, email: action.payload }),
  },
});

export const { setUser, removeUser, setUsername, setPhone, setEmail } =
  userSlice.actions;

export default userSlice.reducer;
