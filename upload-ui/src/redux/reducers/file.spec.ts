import file, {
  uploadFileRequest,
  resetState,
  loadFileInfoRequest,
} from "./file";

describe("file reducer", () => {
  it("should handle initial state", () => {
    expect(file(undefined, { type: "unknown" })).toEqual("");
  });
  it("should handle uploadFileRequest", () => {
    const actual = file("", uploadFileRequest());
    expect(actual).toEqual("");
  });
  it("should handle resetState", () => {
    const actual = file(undefined, resetState());
    expect(actual).toEqual("");
  });
  it("should handle loadFileInfoRequest", () => {
    const actual = file("", loadFileInfoRequest("test"));
    expect(actual).toEqual("");
  });
});
