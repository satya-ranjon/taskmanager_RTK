import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),

  devTools: !(import.meta.env.MODE === "production"),
});

export default store;
