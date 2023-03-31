import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import "./styles.css";
import { Modal } from "react-bootstrap";
import { useGlobalContext } from "../../Context/GlobalContext";

function DeleteAlertTodo({ isOpen, close, title, onSuccess }) {
  const { deleteTodo } = useGlobalContext();

  return (
    <Modal
      data-cy="modal-delete"
      show={isOpen}
      onHide={close}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      className="delete-body"
    >
      <Modal.Body className="delete-container">
        <div className="delete-content">
          <div className="delete-header">
            {" "}
            <BsExclamationTriangle
              className="icon-alert"
              data-cy="modal-delete-icon"
            />
          </div>
          <div className="dealete-body" data-cy="modal-delete-title">
            {" "}
            Apakah Kamu Yakin Untuk Menghapus List Item "
            <span>{title.title}</span>"
          </div>
          <div className="delete-footer">
            <button
              className="bton button-batal"
              onClick={close}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </button>
            <button
              className=" bton button-hapus"
              onClick={() => {
                deleteTodo(title.id);
                onSuccess(title.id);
              }}
              data-cy="modal-delete-confirm-button"
            >
              {" "}
              Hapus
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteAlertTodo;
