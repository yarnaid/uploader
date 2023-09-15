import { FileMetadataType } from "../../types";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table"
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import moment from "moment";

export const FilesTableRow = (props: { file: FileMetadataType }) => {
  const { name, created_at, updated_at, type_ } = props.file;
  return <>
    <TableRow>
      <TableCell className="font-medium"><p className="flex"><PencilSquareIcon className="w-6 h-6" /><span>{name}</span></p></TableCell>
      <TableCell>{moment(created_at).format("YYYY.MM.DD HH:mm:ss")}</TableCell>
      <TableCell>{moment(updated_at).format("YYYY.MM.DD HH:mm:ss")}</TableCell>
      <TableCell className="text-right">
        <Badge className="bg-secondary text-primary">
          {type_}
        </Badge>
      </TableCell>
    </TableRow>

  </>
}
