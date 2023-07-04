import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileMetadataType, UploadFileType } from "../../types";

const initialState: FileMetadataType = {
  tags: [],
};

const fileSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    setFileMetadata: (state, action: PayloadAction<FileMetadataType>) => {
      return { ...state, ...action.payload };
    },
    updateFileMetadataRequest: (
      state,
      action: PayloadAction<FileMetadataType>
    ) => {
      state = action.payload;
    },
    resetState: () => initialState,
    loadFileInfoRequest: (state, action: PayloadAction<FileMetadataType>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export the auto-generated action creators
export const {
  setFileMetadata,
  updateFileMetadataRequest,
  resetState,
  loadFileInfoRequest,
} = fileSlice.actions;

export default fileSlice.reducer;
