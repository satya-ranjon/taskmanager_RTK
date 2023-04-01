import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import projectReducer from "../features/projects/projectsSlice";
import tasksReducer from "../features/tasks/tasksSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    projectsid: projectReducer,
    tasks: tasksReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),

  devTools: !(import.meta.env.MODE === "production"),
});

export default store;
