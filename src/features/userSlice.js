import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  name: "",
  isMod: "",
  isAdmin: "",
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isMod = action.payload.mod;
      state.isAdmin = action.payload.admin;
    },
    unsetUserInfo: (state, action) => {
      state.id = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isMod = action.payload.isMod;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;
