import React, { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import "./styles.css";
import { BsPencil } from "react-icons/bs";
import DeleteAlertTodo from "../AlertDaeleteTodo";

function TodoList({ state, onDelete }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="detail-content" data-cy="todo-item">
        <div className="content-item-list">
          <div className="form-check">
            <div className="form-check-a">
              <input
                class="form-check-input"
                type={"checkbox"}
                data-cy="todo-item-checkbox"
              />
              <div
                data-cy="todo-item-priority-indicator"
                className={`label-indicator ${state.priority}`}
              ></div>
              <div>
                {" "}
                <span data-cy="todo-item-title">{state.title}</span>
              </div>
              <BsPencil
                className="icon-pencil"
                data-cy="todo-item-edit-button"
              />
            </div>
          </div>
          <div>
            {" "}
            <BsFillTrash3Fill
              className="icon-basket"
              onClick={() => setModal(true)}
              data-cy="todo-item-delete-button"
            />
          </div>
        </div>
      </div>
      <DeleteAlertTodo
        close={() => setModal(false)}
        isOpen={modal}
        title={state}
        onSuccess={(id) => {
          onDelete(id);
          setModal(false);
        }}
      />
    </>
  );
}

export default TodoList;
