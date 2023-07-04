import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addFilter, loadAllFilters } from "../redux/reducers/filters";

function NewTag() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setInputValue("");
  };
  const handleShow = () => setShow(true);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const onAddFilter = (e: any) => {
    e.preventDefault();
    dispatch(addFilter({ name: inputValue, values: [] }));
    setShow(false);
    setInputValue("");
    dispatch(loadAllFilters());
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow} size="sm">
        New Filter(!)
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e: any) => {
              dispatch(addFilter({ name: inputValue, values: [] }));
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter a new tag name input box</Form.Label>
              <Form.Control
                type="input"
                placeholder="New tag name..."
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onAddFilter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewTag;
