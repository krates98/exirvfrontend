import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isMod = action.payload.isMod;
      state.isAdmin = action.payload.isAdmin;
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isMod = action.payload.isMod;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;
