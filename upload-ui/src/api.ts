import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FileMetadataType,
  FiltersType,
  UploadFileRequest,
} from "./types.ts";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getFilters: builder.query<FiltersType, void>({
      query: () => `filters`,
    }),
    getFiles: builder.query<FileMetadataType[], void>({
      query: () => `files`,
    }),
    postFile: builder.mutation<{ filename: string }, UploadFileRequest>({
      query: (body) => {
        const bodyFormData = new FormData();
        if (body.file) {
          bodyFormData.append("file", body.file);
        }
        bodyFormData.append("raw_metadata", body.raw_metadata || "{}");
        console.log(body, bodyFormData);
        return {
          url: `files`,
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const { useGetFiltersQuery, usePostFileMutation, useGetFilesQuery } =
  uploadApi;
