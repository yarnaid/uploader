import React from "react";
import { render } from "../test-utils";
import { screen } from "@testing-library/react";
import TagsList from "./TagsList";

describe("TagsList", () => {
  const value = "test tag1";
  const value2 = "test tag2";
  const tags = [
    { value: value, checked: true },
    { value: value2, checked: false },
  ];
  it("renders 2 tags", () => {
    const { asFragment } = render(<TagsList tags={tags} name="test" />);
    expect(screen.getByText(/test tag2/i)).toBeInTheDocument();
    expect(screen.getByText(/test tag2/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
