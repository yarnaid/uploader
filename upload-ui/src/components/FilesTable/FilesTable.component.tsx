import {
  Table,
  TableBody,
  TableCaption,
} from "../ui/table"
import { FilesTableHeader } from "./FilesTable.Header.component"
import { FilesTableRow } from "./FilesTable.Row.component"
import { FilesTableNewRow } from './FilesTable.NewRow.component';
import { useState } from "react";
import { useGetFilesQuery } from "../../api";

export const FilesTable = () => {
  const [isAddNewFile, setIsAddNewFile] = useState<boolean>(false);
  const { data, error, isLoading } = useGetFilesQuery();
  return <>
    <div>
      <Table>
        <TableCaption>A list of uploaded files</TableCaption>
        <FilesTableHeader isAddNewFile setIsAddNewFile={setIsAddNewFile} />
        <TableBody>
          {isAddNewFile && <FilesTableNewRow />}
          {data && data.map((file) => <FilesTableRow key={file.name} file={file} />)}
        </TableBody>
      </Table>

    </div>
  </>
}
