import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    search: searchReducer,
  },
});
