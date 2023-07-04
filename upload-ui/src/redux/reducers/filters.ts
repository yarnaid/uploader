import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType } from "../../types";

const initialState: FilterType[] = [];

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAllFilters: (state, action: PayloadAction<FilterType[]>) => {
      return action.payload;
    },
    removeFilter: (state, action: PayloadAction<FilterType>) => {
      const indexToRemove = state.findIndex(
        (filter) => filter.name === action.payload.name
      );
      if (indexToRemove !== -1) {
        const values = state[indexToRemove].values.filter(
          (value) => !action.payload.values.includes(value)
        );
        if (values.length === 0) {
          state.splice(indexToRemove, 1);
        } else {
          state[indexToRemove].values = values;
        }
      }
    },
    loadAllFilters: (state) => {
      state;
    },
    addFilter: (state, action: PayloadAction<FilterType>) => {
      const index = state.findIndex(
        (filter) => filter.name === action.payload.name
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        for (const value of action.payload.values) {
          if (!state[index].values.includes(value)) {
            state[index].values.push(value);
          }
        }
      }
    },
  },
});

// Export the auto-generated action creators
export const { setAllFilters, removeFilter, addFilter, loadAllFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
