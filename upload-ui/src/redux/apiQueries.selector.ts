import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const apiQueriesSelector = createSelector(
  (state: RootState) => state,
  (store) => store.uploadApi.queries,
);
