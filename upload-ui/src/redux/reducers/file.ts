import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setFileMetadata } from "./metadata";

const initialState: string = "";

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileData: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
    uploadFileRequest: (state) => {
      return state;
    },
    resetState: () => initialState,
    loadFileInfoRequest: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
});

// Export the auto-generated action creators
export const {
  uploadFileRequest,
  resetState,
  loadFileInfoRequest,
  setFileData,
} = fileSlice.actions;

export default fileSlice.reducer;
