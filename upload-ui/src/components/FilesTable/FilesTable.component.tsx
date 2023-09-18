import { Table, TableBody, TableCaption } from "../ui/table";
import { FilesTableHeader } from "./FilesTable.Header.component";
import { FilesTableRow } from "./FilesTable.Row.component";
import { FilesTableNewRow } from "./FilesTable.NewRow.component";
import { useState } from "react";
import { useGetFilesQuery } from "../../api";
import Fuse from "fuse.js";
import { useSelector } from "react-redux";
import { searchFilterSelector } from "../../redux/searchFilter.selector.ts";
import { FileMetadataType } from "../../types.ts";

export const FilesTable = () => {
  const [isAddNewFile, setIsAddNewFile] = useState<boolean>(false);
  const { data, error, isLoading } = useGetFilesQuery();
  const [rowToEdit, setRowToEdit] = useState<string>("");
  const searchQuery = useSelector(searchFilterSelector);

  const options = {
    includeScore: true,
    useExtendedSearch: true,
    keys: ["name", "created_at", "type_"],
  };

  const fuse = new Fuse<FileMetadataType>(data ? data : [], options);
  const filteredData = searchQuery
    ? fuse.search(searchQuery).map((item) => {
        return item.item;
      })
    : data;
  return (
    <>
      <div>
        <Table>
          <TableCaption>A list of uploaded files</TableCaption>
          <FilesTableHeader isAddNewFile setIsAddNewFile={setIsAddNewFile} />
          <TableBody>
            {isAddNewFile && <FilesTableNewRow />}
            {filteredData &&
              filteredData.map((file) => (
                <FilesTableRow
                  rowToEdit={rowToEdit}
                  onClick={() => setRowToEdit(file.name || "")}
                  key={file.name}
                  file={file}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
