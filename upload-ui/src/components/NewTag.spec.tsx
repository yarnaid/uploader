import React from "react";
import NewTag from "./NewTag";
import { render, store } from "../test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addFilter } from "../redux/reducers/filters";

describe("NewTag", () => {
  it("renders", () => {
    const { asFragment } = render(<NewTag name="test" />);
    expect(screen.getByText(/\+/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("opens modal on click", () => {
    render(<NewTag name="test" />);
    userEvent.click(screen.getByText(/\+/));
    expect(screen.getByText(/Add Tag/i)).toBeInTheDocument();
  });
  it("closes modal on close", () => {
    render(<NewTag name="test" />);
    const addButton = screen.getByText(/\+/i);
    userEvent.click(addButton);
    const closeButton = screen.getByText("Close");
    userEvent.click(closeButton);
    expect(screen.queryByText("Add Filter")).not.toBeInTheDocument();
  });
  it("adds a filter on submit", () => {
    render(<NewTag name="test" />);
    const addButton = screen.getByText(/\+/i);
    userEvent.click(addButton);
    const input = screen.getByPlaceholderText(/New tag value/i);
    userEvent.type(input, "test");
    const submitButton = screen.getByText(/Save Changes/i);
    userEvent.click(submitButton);
    expect(screen.queryByText("Add Filter")).not.toBeInTheDocument();
    const expectedAction = {
      type: addFilter.type,
      payload: { name: "test", values: ["test"] },
    };
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
