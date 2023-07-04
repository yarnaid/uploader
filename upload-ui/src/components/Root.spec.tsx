import React from "react";
import Root from "./Root";
import { render } from "../test-utils";
import { screen } from "@testing-library/react";

describe("Root", () => {
  it("renders", () => {
    const { asFragment } = render(<Root />);
    expect(screen.getAllByText(/upload/i)[0]).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
