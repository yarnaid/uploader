export type FileType = {
  name: string;
  size: number;
  type?: string;
  updated?: Date;
  created?: Date;
  url: string;
};

export type FilterType = {
  name: string;
  values: string[];
};

export const isFilterType = (obj: any): obj is FilterType => {
  return obj && obj.name && obj.values;
};

export type FileMetadataType = {
  name?: string;
  size?: number;
  type?: string;
  url?: string;
  source?: string;
  created?: string;
  updated?: string;
  tags: FilterType[];
};

export const isFileMetadataType = (obj: any): obj is FileMetadataType => {
  return obj && obj.tags;
};

export type UploadFileType = {
  file: File | null;
  metadata: FileMetadataType | null;
};

export const isUploadFileType = (obj: any): obj is UploadFileType => {
  return obj && obj.file && obj.metadata;
};
