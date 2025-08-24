import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { api } from "./api";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
