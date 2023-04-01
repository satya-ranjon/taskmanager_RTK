import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
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
    updateTaskStatus: builder.mutation({
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
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          // Update cache
          if (res?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                let findData = draft?.find((t) => t.id === id);
                findData.taskName = res?.data?.taskName;
                findData.teamMember = res?.data?.teamMember;
                findData.project = res?.data?.project;
                findData.deadline = res?.data?.deadline;
              })
            );
          }
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} = tasksApi;
