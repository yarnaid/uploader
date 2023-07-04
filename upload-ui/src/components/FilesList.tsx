import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FileType } from "../types";
import { loadFilesListRequest } from "../redux/reducers/files";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

interface FilesListProps {
  files: FileType[];
}

const columnHelper = createColumnHelper<FileType>();

const columns: ColumnDef<FileType, any>[] = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => <a href={`/files/${info.getValue()}`}>{info.getValue()}</a>,
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("updated", {
    header: () => "Updated",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("created", {
    header: () => "Created",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("size", {
    header: () => "Size",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
];

const FilesList: React.FC<FilesListProps> = ({ files }) => {
  const dispatch = useDispatch();

  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    dispatch(loadFilesListRequest());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Files</h1>
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default FilesList;
