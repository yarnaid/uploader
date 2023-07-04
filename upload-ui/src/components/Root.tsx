import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { UploadNavbar } from "./UploadNavbar";
import FilePage from "./pages/FilePage";
import HomePage from "./pages/HomePage";
import { useDispatch } from "react-redux";
import { resetState as resetFilesState } from "../redux/reducers/files";
import { resetState as resetFileState } from "../redux/reducers/file";
import Filters from "./pages/EditFiltersPage";
import { loadAllFilters } from "../redux/reducers/filters";
import { resetState as resetTagsState } from "../redux/reducers/tags";

function Root() {
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    dispatch(resetFilesState());
    dispatch(resetFileState());
    dispatch(resetTagsState());
    dispatch(loadAllFilters());
  }, [dispatch, location]);

  return (
    <>
      <UploadNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/files" element={<HomePage />} />
        <Route path="/files/:fileId" element={<FilePage />} />
        <Route path="/upload" element={<FilePage />} />
        <Route path="/edit-filters" element={<Filters />} />
      </Routes>
    </>
  );
}

export default Root;
