import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const UploadNavbar = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Upload Service</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto my-2 my-lg-0">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/upload" className="nav-link">
            Upload
          </Link>
          <Link to="/edit-filters" className="nav-link">
            Edit Metadata Settings
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbar;
