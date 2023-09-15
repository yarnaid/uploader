import * as z from "zod";

export const filterSchema = z.object({
  name: z.string(),
  values: z.array(z.string()),
});
export const filtersSchema = z.array(filterSchema);

export type FilterType = z.infer<typeof filterSchema>;
export type FiltersType = z.infer<typeof filtersSchema>;

export const fileMetadataSchema = z.object({
  name: z.string().nullable().optional(),
  type_: z.string().nullable().optional(),
  size: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  tags: z.array(filterSchema).nullable().optional(),
  file: z.string().nullable().optional(),
});

export type FileMetadataType = z.infer<typeof fileMetadataSchema>;

export type UploadFileRequest = {
  file?: File;
  raw_metadata?: string;
};
