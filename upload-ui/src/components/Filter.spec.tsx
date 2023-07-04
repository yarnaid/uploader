import React from "react";
import { render } from "../test-utils";
import Filter from "./Filter";
import { screen } from "@testing-library/react";

describe("Filter components", () => {
  const defaultFilter = {
    name: "testFilter",
    values: [
      { value: "test1", checked: true },
      { value: "test2", checked: false },
    ],
  };
  it("renders", () => {
    const { asFragment } = render(<Filter filter={defaultFilter} />);
    expect(screen.getByText(/testFilter:/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
