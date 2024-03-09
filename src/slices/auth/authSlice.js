import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  token: token ? JSON.parse(token) : null,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.token = action.payload;
    },
    removeToken(state) {
      console.log("removing token");
      state.token = null;
      localStorage.clear("token");
    },
    setUser(state, { payload }) {
      state.user = payload;
      console.log(payload);
      if (state.user) state.user.role = payload?.role || "user";
      if (!state.avatar) state.avatar = "https://i.stack.imgur.com/l60Hf.png";
      localStorage.setItem("user", JSON.stringify(payload));
    },
  },
});

export default authSlice.reducer;
export const { setToken, removeToken, setUser } = authSlice.actions;
