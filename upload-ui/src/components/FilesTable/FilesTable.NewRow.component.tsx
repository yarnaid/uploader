import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { FileForm } from "../FileForm/FileForm.component";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { usePostFileMutation } from "../../api";
import { UploadFileRequest } from "../../types";
import { DevTool } from "@hookform/devtools";
import { formatTags } from "./FilesTable.utils.ts";

const DEFAULT_FILENAME = "New File";

export const FilesTableNewRow = () => {
  const [fileName, setFileName] = useState<string>(DEFAULT_FILENAME);
  const methods = useForm();
  const [postFile] = usePostFileMutation();

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.filename) {
      const newFileRequest: UploadFileRequest = {
        raw_metadata: JSON.stringify({
          name: data.filename[0].name,
          size: data.filename[0].size,
          type_: data.filename[0].type,
          tags: formatTags(data),
        }),
      };
      postFile({ ...newFileRequest, file: data.filename[0] });
    }
  };
  return (
    <>
      <TableRow className="w-full">
        <TableCell colSpan={4}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex w-full flex-col">
                <h4 className="text-left text-lg text-gray-500">{fileName}</h4>
                <div className="flex w-full">
                  <Input
                    type="file"
                    className="w-full"
                    {...methods.register("filename")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFileName(e.target.files[0].name);
                      methods.register("filename").onChange(e);
                    }}
                  />
                  <Button
                    className="rounded-full bg-primary text-white"
                    type="submit"
                  >
                    Upload
                  </Button>
                </div>
                {fileName !== DEFAULT_FILENAME && (
                  <div>
                    <FileForm />
                  </div>
                )}
              </div>
            </form>
            <DevTool control={methods.control} />
          </FormProvider>
        </TableCell>
      </TableRow>
    </>
  );
};
