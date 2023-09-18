import { TableRow, TableCell } from "../ui/table.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { filtersSelector } from "../../redux/filters.selector.ts";
import { Button } from "../ui/button.tsx";
import { MouseEventHandler } from "react";
import { FileMetadataType } from "../../types.ts";
import { FileTags } from "../FileForm/FileTags.tsx";
import { useForm } from "react-hook-form";
import { usePatchFileMutation } from "../../api.ts";
import { formatTags } from "./FilesTable.utils.ts";

export const EditRow = (props: {
  file: FileMetadataType;
  onClick?: MouseEventHandler;
  className?: string;
}) => {
  const methods = useForm({
    defaultValues: {
      tags: props.file.tags.reduce((acc, tag) => {
        acc[tag.name] = tag.values.map((value) => ({ value, label: value }));
        return acc;
      }, {}),
    },
  });
  const filters = useSelector((state: RootState) => filtersSelector(state));
  const [patchFile] = usePatchFileMutation();

  const onSubmit = (data: any) => {
    patchFile({
      raw_metadata: JSON.stringify({
        name: props.file.name,
        tags: formatTags(data),
      }),
      name: props.file.name || "",
    });
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={4}>
          <div className="flex flex-col">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex flex-row justify-start">
                <h4 className="inline-block text-left text-lg">
                  {props.file.name}
                </h4>
                <Button className="rounded-full bg-primary text-white">
                  Save
                </Button>
              </div>
              <FileTags filters={filters} control={methods.control} />
            </form>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
