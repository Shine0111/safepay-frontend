import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./searchService";

const initialState = {
  resultProducts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getResultProducts = createAsyncThunk(
  "search/by-category",
  async (category_id, thunkAPI) => {
    try {
      return await searchService.getResultProducts(category_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResultProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResultProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.resultProducts = action.payload;
      })
      .addCase(getResultProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
