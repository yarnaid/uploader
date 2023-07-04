import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType } from "../../types";

const initialState: FilterType[] = [];

const fileSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    resetState: () => initialState,
    addTag: (state, action: PayloadAction<FilterType>) => {
      const index = state.findIndex((tag) => tag.name === action.payload.name);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index].values = [
          ...state[index].values,
          ...action.payload.values,
        ];
      }
    },
    removeTag: (state, action: PayloadAction<FilterType>) => {
      const index = state.findIndex((tag) => tag.name === action.payload.name);
      if (index !== -1) {
        state[index].values = state[index].values.filter(
          (value) => !action.payload.values.includes(value)
        );
      }
    },
    setAllTags: (state, action: PayloadAction<FilterType[]>) => {
      return action.payload;
    },
  },
});

// Export the auto-generated action creators
export const { resetState, addTag, removeTag, setAllTags } = fileSlice.actions;

export default fileSlice.reducer;
