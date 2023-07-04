import React from "react";
import FilePage from "./FilePage";
import { render } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { queryByAttribute } from "@testing-library/react";
import { screen } from "@testing-library/react";

const getById = queryByAttribute.bind(null, "id");

describe("FilePage", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FilePage />);
    expect(baseElement).toBeTruthy();
  });
  it("should not render loading...", () => {
    const { queryByText } = render(<FilePage />);
    expect(queryByText("loading...")).toBeNull();
  });
  it("should be upload button disabled on loading", () => {
    const { getByTestId } = render(<FilePage />);
    expect(getByTestId("submit")).toBeDisabled();
  });
  it.skip("should be update button disabled after adding a file", () => {
    const dom = render(<FilePage />);
    const fileForm = getById(dom.container, "formFile");
    expect(fileForm).not.toBeNull();
    if (!fileForm) throw new Error("fileForm is null");
    expect(fileForm).not.toBeDisabled();
    userEvent.upload(
      fileForm,
      new File([""], "test.txt", { type: "text/plain", lastModified: 0 })
    );
    expect(fileForm).not.toBeDisabled();
    const title = screen.getByTestId("file-title");
    expect(title).not.toBeNull();
    expect(title.textContent).toContain("test.txt");
  });
  it.skip("should process click on upload button", () => {
    const dom = render(<FilePage />);
    const fileForm = getById(dom.container, "formFile");
    if (!fileForm) throw new Error("fileForm is null");
    userEvent.upload(fileForm, new File([""], "test.txt"));
    const submitBtn = getById(dom.container, "submit-btn");
    expect(submitBtn).not.toBeNull();
    if (!submitBtn) throw new Error("submitBtn is null");
    userEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();
  });
});
