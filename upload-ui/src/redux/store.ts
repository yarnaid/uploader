import { configureStore } from "@reduxjs/toolkit";
import { uploadApi } from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";
import "./searchFilter.slice.ts";
import { searchFilterSlice } from "./searchFilter.slice.ts";

export const store = configureStore({
  reducer: {
    [uploadApi.reducerPath]: uploadApi.reducer,
    searchFilter: searchFilterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(uploadApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
