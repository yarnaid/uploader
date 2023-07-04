import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FileView from "../FileView";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FileMetadataType, FilterType } from "../../types";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadFileRequest, setFileData } from "../../redux/reducers/file";
import {
  setFileMetadata,
  updateFileMetadataRequest,
  loadFileInfoRequest,
  resetState,
} from "../../redux/reducers/metadata";
import { resetState as resetTags } from "../../redux/reducers/tags";

interface FilePageProps {}

const FilePage: React.FC<FilePageProps> = () => {
  const location = useLocation();
  const filename = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const metadata = useSelector(
    (state: { metadata: FileMetadataType }) => state.metadata
  );
  const tags = useSelector((state: { tags: FilterType[] }) => state.tags);
  const file = useSelector(
    (state: { file: { file: File } }) => state.file.file
  );
  const [disabled, setDisabled] = React.useState(file ? false : true);

  useEffect(() => {
    if (!filename) {
      dispatch(resetState());
      dispatch(resetTags());
    }
    filename && dispatch(loadFileInfoRequest({ name: filename, tags: [] }));
  }, [dispatch, filename]);

  const onUploadFileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!metadata) throw new Error("metadata is null");
    const newMetadata = { ...metadata };
    newMetadata.created = new Date().toISOString();
    const form = e.currentTarget.form as HTMLFormElement;
    const fileInput = form.querySelector("#formFile") as HTMLInputElement;
    if (!fileInput) return;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (!file) return;
    newMetadata.size = file?.size || 0;
    newMetadata.type = file?.type || "";
    newMetadata.name = file?.name || "";
    newMetadata.tags = tags;
    console.log("uploadFile", { file, metadata: newMetadata });
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        dispatch(setFileData(reader.result));
        dispatch(uploadFileRequest());
      }
    };
    reader.readAsBinaryString(file);
    navigate(`/files/${newMetadata.name}`);
  };

  const onUpdateFileInfoClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!metadata) return;
    const newMetadata = { ...metadata };
    newMetadata.tags = tags;
    newMetadata.updated = new Date().toISOString();

    dispatch(setFileMetadata(newMetadata));
  };

  const onFileFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!metadata) throw new Error("metadata is null");
    const newMetadata = { ...metadata };
    if (!file) throw new Error("file is null");
    newMetadata.size = file.size || 0;
    newMetadata.type = file.type || "";
    newMetadata.name = file.name || "";
    newMetadata.created = new Date().toISOString();
    setDisabled(false);
    newMetadata.tags = tags;

    dispatch(setFileMetadata(newMetadata));
  };

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Row>
          <FileView file={metadata} />
        </Row>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={onFileFieldChange} />
        </Form.Group>
        <Button
          data-testid="submit"
          id="submit-btn"
          variant="primary"
          onClick={onUploadFileClick}
          disabled={disabled}
        >
          upload
        </Button>
        <Button
          id="update-btn"
          variant="primary"
          onClick={onUpdateFileInfoClick}
        >
          update
        </Button>
      </form>
    </Container>
  );
};

export default FilePage;
