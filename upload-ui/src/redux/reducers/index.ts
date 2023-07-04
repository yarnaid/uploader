import { combineReducers } from "redux";
import files from "./files";
import file from "./file";
import filters from "./filters";
import tags from "./tags";
import metadata from "./metadata";

const rootReducer = combineReducers({
  files,
  file,
  filters,
  tags,
  metadata,
});

export default rootReducer;
