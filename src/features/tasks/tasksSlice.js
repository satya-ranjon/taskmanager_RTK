import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {
    search: undefined,
  },
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { addSearch } = taskSlice.actions;
export default taskSlice.reducer;
