import React from "react";
import { render } from "../test-utils";
import { screen } from "@testing-library/react";
import FilesList from "./FilesList";
import { FileType } from "../types";

describe("FilesList", () => {
  const files: FileType[] = [
    {
      name: "test",
      size: 1,
      url: "test",
    },
  ];
  it("renders", () => {
    const { asFragment } = render(<FilesList files={files} />);
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders a file", () => {
    render(<FilesList files={files} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
  });
});
