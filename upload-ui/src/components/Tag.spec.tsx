import React from "react";
import { screen } from "@testing-library/react";
import Tag from "./Tag";
import { render } from "../test-utils";
import userEvent from "@testing-library/user-event";

describe("Tag", () => {
  it("renders a tag with a plus sign if it is not checked", () => {
    render(<Tag name="test" value="test" checked={true} />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Tag name="" value="" checked={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("changes class on click", () => {
    const fn = jest.fn();
    render(
      <Tag name="testName" value="testValue" checked={true} testFn={fn} />
    );
    expect(screen.getByText(/testValue/i)).toHaveClass("badge bg-primary");
    userEvent.click(screen.getByText(/testValue/i));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
