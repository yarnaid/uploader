import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addFilter } from "../redux/reducers/filters";

interface NewTagProps {
  name: string;
}

function NewTag({ name }: NewTagProps) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onAddFilter = () => {
    setShow(false);
    setInputValue("");
    dispatch(addFilter({ name: name, values: [inputValue] }));
  };

  return (
    <>
      <Button variant="success" onClick={handleShow} size="sm">
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={() => {
              dispatch(addFilter({ name: name, values: [inputValue] }));
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Enter the value for the tag{" "}
                <code>
                  <b>{name}</b>
                </code>{" "}
                into the input box
              </Form.Label>
              <Form.Control
                type="input"
                placeholder="New tag value..."
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
                // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                //   onAddFilter();
                // }}
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
