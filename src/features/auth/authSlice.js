import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api-client";

const localUser = createAsyncThunk("user", async () => {
  apiClient
    .get("/user")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return "null";
    });
});

const initialState = {
  user: localUser ? localUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
