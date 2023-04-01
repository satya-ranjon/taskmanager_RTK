import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projectSlice",
  initialState: {
    projectId: undefined,
  },
  reducers: {
    addProjectId: (state, action) => {
      const ID = action.payload?.map((p) => {
        return p.id;
      });
      state.projectId = [...ID];
    },
    filterAddProject: (state, action) => {
      state.projectId.push(action.payload);
    },
    filterRemoveProject: (state, action) => {
      state.projectId = state.projectId.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { addProjectId, filterAddProject, filterRemoveProject } =
  projectSlice.actions;
export default projectSlice.reducer;
