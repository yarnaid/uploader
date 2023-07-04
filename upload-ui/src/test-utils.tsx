import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import {
  FileMetadataType,
  FilterType,
  FileType,
  UploadFileType,
} from "./types";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { RootState, AppStore } from "./redux/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const mockStore = configureMockStore();

const initialState: {
  files: { files: FileType[] };
  filters: FilterType[];
  file: string;
  tags: FilterType[];
  metadata: FileMetadataType;
} = {
  files: { files: [] },
  filters: [],
  file: "",
  tags: [],
  metadata: { tags: [] },
};

export const store: any = mockStore(initialState);

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => render(ui, { wrapper: AllTheProviders, ...options });
export * from "@testing-library/react";

export { customRender as render };
