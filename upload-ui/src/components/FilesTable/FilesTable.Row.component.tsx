import { FileMetadataType } from "../../types";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { MouseEventHandler } from "react";
import { EditRow } from "./FilesTable.EditRow.component.tsx";

export const FilesTableRow = (props: {
  file: FileMetadataType;
  onClick?: MouseEventHandler;
  rowToEdit: string;
}) => {
  const { name, created_at, updated_at, type_ } = props.file;
  return (
    <>
      <TableRow
        onClick={props.onClick}
        className="cursor-pointer even:bg-secondary"
      >
        <TableCell className="font-medium">
          <p className="flex">
            <PencilSquareIcon className="h-6 w-6" />
            <span>{name}</span>
          </p>
        </TableCell>
        <TableCell className="text-right">
          {moment.utc(created_at).local().format("YYYY.MM.DD HH:mm:ss")}
        </TableCell>
        <TableCell className="text-right">
          {moment.utc(updated_at).local().format("YYYY.MM.DD HH:mm:ss")}
        </TableCell>
        <TableCell className="text-left">
          <Badge className="bg-secondary text-primary">{type_}</Badge>
        </TableCell>
      </TableRow>
      {props.file.name === props.rowToEdit && <EditRow file={props.file} />}
    </>
  );
};
