import axios, { AxiosResponse } from "axios";
import { FileMetadataType } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const loadFileInfo = async (fileId: string) => {
  const response: AxiosResponse<FileMetadataType> = await api.get(
    `/files/${fileId}`
  );
  return response.data;
};

export const loadFilesList = async () => {
  const response = await api.get("/files");
  return await response.data;
};

export const uploadFile = async (
  fileData: string,
  metadata: FileMetadataType
) => {
  if (fileData.length === 0) {
    updateFile(metadata);
  }
  const file = new File([fileData], metadata.name || "filename");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("raw_metadata", JSON.stringify(metadata));
  const response = await api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return await response.data;
};

export const updateFile = async (metadata: FileMetadataType) => {
  const formData = new FormData();
  formData.append("raw_metadata", JSON.stringify(metadata));
  const response = await api.patch(`/files/${metadata.name}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return await response.data;
};

export const getAllFilters = async () => {
  const response = await api.get("/filters");
  return await response.data;
};

export const removeFilter = async (filterName: string, value: string) => {
  const response = await api.delete(`/filters/${filterName}/${value}`);
  return await response.data;
};

export const addFilter = async (filterName: string, value: string) => {
  const formData = new FormData();
  formData.append("filter_name", filterName);
  formData.append("value", value);
  const response = await api.patch(`/filters/${filterName}`, formData);
  return await response.data;
};
