import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import "./styles.css";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { Modal, ModalFooter } from "react-bootstrap";

function AddTodo({ isOpen, close: propCLose, submitData }) {
  const initialValues = {
    className: "very-high",
    title: "Very High",
    name: "",
  };
  const [state, setState] = useState(initialValues);

  const close = () => {
    setState(initialValues);
    propCLose();
  };

  const priority = [
    {
      className: "very-high",
      title: "Very High",
    },
    {
      className: "high",
      title: "High",
    },
    {
      className: "medium",
      title: "Medium",
    },
    {
      className: "low",
      title: "Low",
    },
    {
      className: "very-low",
      title: "Very Low",
    },
  ];

  return (
    <>
      <Modal
        show={isOpen}
        onHide={close}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        data-cy="modal-add"
      >
        <Modal.Header>
          <Modal.Title className="add-header">
            <h2 data-cy="modal-add-title">Tambah List Item</h2>
            <BsXLg
              onClick={close}
              style={{ cursor: "pointer" }}
              data-cy="modal-add-close-button"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-content">
          <div className="add-content-2">
            <label data-cy="modal-add-name-title">Nama List Item</label>
            <input
              data-cy="modal-add-name-input"
              className="input-list"
              value={state.name}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <label data-cy="modal-add-priority-title">PRIORITY</label>
            <div>
              <Dropdown
                className="button-drop"
                data-cy="modal-add-priority-item"
              >
                <Dropdown.Toggle
                  id="dropdown-autoclose-true"
                  className="toggle-drop"
                >
                  <div className={state.className}> </div>
                  <span>{state.title}</span>
                </Dropdown.Toggle>
                <DropdownMenu>
                  {priority.map((item) => (
                    <Dropdown.Item
                      data-cy={`modal-add-priority-${item.className}`}
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          title: item.title,
                          className: item.className,
                        }));
                      }}
                    >
                      <div className="drop">
                        {" "}
                        <p className={item.className}></p>
                        <p>{item.title}</p>
                      </div>
                    </Dropdown.Item>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Modal.Body>
        <ModalFooter className="add-footer">
          <button
            onClick={(e) => {
              e.preventDefault();
              submitData(state.name, state.className);
              close();
            }}
            class="bton"
            data-cy="modal-add-save-button"
          >
            Simpan
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddTodo;
