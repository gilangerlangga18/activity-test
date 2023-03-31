import React, { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "../AlertDaelete";

function Card({ title, openSuccess }) {
  const navigate = useNavigate();
  const NewActivity = () => {
    navigate("/detail/" + title.id);
  };

  const [alert, setAlert] = useState({
    isOpenModal: false,
  });

  const clickPlus = () => {
    setAlert((prev) => ({
      ...prev,
      isOpenModal: true,
    }));
  };
  return (
    <>
      <div className="col-3">
        <div className="activity-card">
          <div
            class="activity-body"
            onClick={NewActivity}
            data-cy="activity-item"
          >
            <h4 data-cy="activity-item-title">{title.title} </h4>
          </div>
          <div class="card-footer">
            <p data-cy="activity-item-date"> {title.created_at}</p>
            <BsFillTrash3Fill
              data-cy="activity-item-delete-button"
              onClick={clickPlus}
            />
          </div>
        </div>
      </div>
      <DeleteAlert
        isOpen={alert.isOpenModal}
        close={() => {
          setAlert((prev) => ({
            ...prev,
            isOpenModal: false,
          }));
        }}
        onSuccess={() => {
          setAlert((prev) => ({
            ...prev,
            isOpenModal: false,
          }));
          openSuccess();
        }}
        title={title}
      />
    </>
  );
}

export default Card;
