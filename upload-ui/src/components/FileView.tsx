import React from "react";
import { FileMetadataType } from "../types";
import FiltersList from "./FiltersList";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { FilterType } from "../types";

interface FileMetadataTypePros {
  file: FileMetadataType | null;
}
const FileView: React.FC<FileMetadataTypePros> = ({ file }) => {
  return (
    <div>
      <h1>File</h1>
      <ListGroup>
        <ListGroup.Item data-testid="file-title">
          <span>File Name:</span>
          {file?.name || "..."}
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Type:</span>
          {file?.type}
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Size:</span>
          {file?.size}
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Created:</span>
          {JSON.stringify(file?.created)}
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Updated:</span>
          {JSON.stringify(file?.updated)}
        </ListGroup.Item>
      </ListGroup>
      {<FiltersList />}
    </div>
  );
};

export default FileView;
