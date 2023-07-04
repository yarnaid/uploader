import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FilesList from "../FilesList";
import { useSelector } from "react-redux";
import { FileType } from "../../types";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const files: FileType[] = useSelector(
    (state: { files: FileType[] }) => state.files || []
  );
  useEffect(() => {});
  return (
    <Container>
      <Row>
        <FilesList files={files} />
      </Row>
    </Container>
  );
};

export default HomePage;
