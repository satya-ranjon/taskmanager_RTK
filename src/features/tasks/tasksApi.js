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

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const tasks = await queryFulfilled;
          if (tasks?.data?.id) {
            // update  cache pessimistically
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => [
                ...draft,
                tasks.data,
              ])
            );
          }
        } catch (err) {}
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Update cache Optimistic way
        const updateResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const findData = draft.find((t) => t.id === id);
            findData.status = data.status;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          updateResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Update cache Optimistic way
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => [
            ...draft.filter((t) => t.id !== arg),
          ])
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
