import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./styles.css";
import { Modal } from "react-bootstrap";

function AlertSucces({ isOpen, close }) {
  return (
    <Modal
      data-cy="modal-information"
      show={isOpen}
      onHide={close}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body onClick={close}>
        <div className="alert-Succes">
          <AiOutlineInfoCircle
            className="icon-info"
            data-cy="modal-information-icon"
          />
          <span data-cy="modal-information-title">
            Activity Berhasil Dihapus
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AlertSucces;
