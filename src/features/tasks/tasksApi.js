import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
