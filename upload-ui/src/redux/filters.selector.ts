import { createSelector } from "@reduxjs/toolkit";
import { apiQueriesSelector } from "./apiQueries.selector";
import { FiltersType } from "../types";

export const filtersSelector = createSelector(
  apiQueriesSelector,
  (state) => state["getFilters(undefined)"]?.data as FiltersType,
);
