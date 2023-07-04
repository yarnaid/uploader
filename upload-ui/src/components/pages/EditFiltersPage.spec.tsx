import React from "react";
import { render, store } from "../../test-utils";
import Filters from "./EditFiltersPage";
import { FilterType } from "../../types";

describe("EditFiltersPage", () => {
  it("renders", () => {
    const filter: FilterType = {
      name: "test",
      values: ["test"],
    };
    store.filters = [filter]; // @ts-ignore
    const { asFragment } = render(<Filters />);
    expect(asFragment()).toMatchSnapshot();
  });
});
