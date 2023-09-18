import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setSearchFilter: (_, action) => {
      return action.payload;
    },
  },
});

export const { setSearchFilter } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
