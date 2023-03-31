import apiSlice from "../api/apiSlice";

const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `/team`,
    }),
  }),
});

export const { useGetTeamsQuery } = teamsApi;
