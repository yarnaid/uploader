import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileType } from "../../types";

const initialState: FileType[] = [];

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    loadFilesListRequest: (state) => {
      state;
    },
    setFiles: (state, action: PayloadAction<FileType[]>) => {
      return action.payload;
    },
    resetState: () => initialState,
  },
});

// Export the auto-generated action creators
export const { setFiles, resetState, loadFilesListRequest } =
  filesSlice.actions;

export default filesSlice.reducer;
