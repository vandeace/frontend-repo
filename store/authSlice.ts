import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem("token", action.payload.accessToken);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated === action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setAuth } =
  authSlice.actions;
export default authSlice.reducer;
