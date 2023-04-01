import apiSlice from "../api/apiSlice";
import { addProjectId } from "./projectsSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addProjectId(data));
          if (data) {
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
