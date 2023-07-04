import {
  takeLatest,
  takeEvery,
  put,
  call,
  fork,
  select,
} from "redux-saga/effects";
import {
  loadFileInfo,
  loadFilesList,
  uploadFile,
  getAllFilters,
  updateFile,
  addFilter,
  removeFilter,
} from "../api";
import { loadFilesListRequest, setFiles } from "./reducers/files";
import {
  addFilter as addFilterAction,
  loadAllFilters,
  removeFilter as removeFilterAction,
  setAllFilters,
} from "./reducers/filters";
import { setAllTags } from "./reducers/tags";
import { setFileData, uploadFileRequest } from "./reducers/file";
import {
  loadFileInfoRequest,
  setFileMetadata,
  updateFileMetadataRequest,
} from "./reducers/metadata";
import { FileMetadataType, FileType, FilterType } from "../types";

interface ChangeFilterType {
  type: string;
  payload: FilterType;
}

export function* handleAddFilter({
  payload: { name, values },
}: ChangeFilterType) {
  yield call(addFilter, name, values[0]);
}

export function* handleRemoveFilter({
  payload: { name, values },
}: ChangeFilterType) {
  yield call(removeFilter, name, values[0]);
}

export function* handleGetAllFilters() {
  const filters: FilterType[] = yield call(getAllFilters);
  yield put(setAllFilters(filters));
}

interface updateFileRequestType {
  type: typeof uploadFileRequest.type;
  payload: FileMetadataType;
}

export function* handleUpdateFile({ payload }: updateFileRequestType) {
  yield call(updateFile, payload);
}

export function* handleUploadFileRequest() {
  const { file, metadata }: { file: string; metadata: FileMetadataType } =
    yield select((state) => state);
  const fileData = file;
  yield call(uploadFile, fileData, metadata);
}

export function* handleLoadFile({
  payload,
}: ReturnType<typeof loadFileInfoRequest>) {
  const filename: string = payload?.name || "404";
  const metadata: FileMetadataType = yield call(loadFileInfo, filename);
  yield put(setFileMetadata(metadata));
  yield put(setAllTags(metadata.tags));
}

export function* handleLoadFilesList() {
  const files: FileType[] = yield call(loadFilesList);
  yield put(setFiles(files));
}

export function* watchLoadFiles() {
  yield takeLatest(loadFilesListRequest.type, handleLoadFilesList);
}

export function* watchLoadFile() {
  yield takeLatest(loadFileInfoRequest.type, handleLoadFile);
}

export function* watchGetAllFilters() {
  yield takeLatest(loadAllFilters.type, handleGetAllFilters);
}

export function* watchUploadFileRequest() {
  yield takeEvery(uploadFileRequest.type, handleUploadFileRequest);
}

export function* watchUpdateFile() {
  yield takeEvery(setFileMetadata.type, handleUpdateFile);
}

export function* watchAddFilter() {
  yield takeEvery(addFilterAction.type, handleAddFilter);
}

export function* watchRemoveFilter() {
  yield takeEvery(removeFilterAction.type, handleRemoveFilter);
}

export default function* rootSaga() {
  console.log("rootSaga");
  yield fork(watchLoadFiles);
  yield fork(watchLoadFile);
  yield fork(watchGetAllFilters);
  yield fork(watchUploadFileRequest);
  yield fork(watchUpdateFile);
  yield fork(watchAddFilter);
  yield fork(watchRemoveFilter);
}
