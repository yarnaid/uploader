import { createSelector } from "@reduxjs/toolkit";

export const searchFilterSelector = createSelector(
  (state) => state.searchFilter,
  (searchFilter) => searchFilter,
);
