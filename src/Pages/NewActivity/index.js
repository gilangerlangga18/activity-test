import React, { useEffect, useRef, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { MdOutlineSwapVert } from "react-icons/md";
import { AiOutlineLeft } from "react-icons/ai";
import "./styles.css";
import TodoList from "../../Component/TodoList";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../Context/GlobalContext";
import AddTodo from "../../Component/AddTodo";

function NewActivity() {
  const ref = useRef(null);
  const { id } = useParams();
  const {
    getActivityById,
    updateActvtyTitle,
    addNewToDoItem,
    getListToDoItem,
  } = useGlobalContext();
  const navigate = useNavigate();

  const clickHome = () => {
    navigate("/");
  };
  const [state, setState] = useState([]);
  const [activity, setActivity] = useState({
    title: "",
    isChangeName: false,
    isOpenModal: false,
  });

  useEffect(() => {
    getActivityById(id).then((results) => {
      setActivity((prev) => ({
        ...prev,
        title: results.title,
      }));
    });
    getListToDoItem(id).then((results) => {
      setState(results);
    });
  }, []);

  const deleteItem = (id) => {
    setState(state.filter((item) => item.id !== id));
  };

  const changeTitleToggle = () => {
    setActivity((prev) => ({
      ...prev,
      isChangeName: !prev.isChangeName,
    }));
  };

  const addNewTodo = async (title, priority) => {
    const results = await addNewToDoItem(id, title, priority);
    setState([...state, results]);
  };

  const clickPlus = () => {
    setActivity((prev) => ({
      ...prev,
      isOpenModal: true,
    }));
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="todo-header">
            <div className="todo-content">
              <AiOutlineLeft
                data-cy="todo-back-button"
                className="icon-back"
                onClick={clickHome}
              />
              {activity.isChangeName ? (
                <input
                  value={activity.title}
                  name="editName"
                  onChange={(e) => {
                    setActivity((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                  onBlur={() => {
                    changeTitleToggle();
                    updateActvtyTitle(id, activity.title);
                  }}
                  autoFocus
                />
              ) : (
                <h1 data-cy="todo-title">{activity.title}</h1>
              )}

              <BsPencil
                className="icon-pencil"
                data-cy="todo-edit-button"
                onClick={() => {
                  if (!activity.isChangeName) {
                    changeTitleToggle();
                  }
                }}
              />
            </div>
            <div className="todo-btn">
              {state.length > 0 && (
                <MdOutlineSwapVert
                  className="todo-drop"
                  data-cy="todo-sort-button"
                />
              )}
              <div data-cy="todo-add-button" onClick={clickPlus}>
                <button class="bton" data-cy="todo-add-button">
                  <span class="icon-plus"> +</span> Tambah
                </button>
              </div>
            </div>
          </div>
          <div className="todo-list">
            {state.length > 0 ? (
              <>
                {state.map((item) => (
                  <TodoList
                    state={item}
                    onDelete={(id) => {
                      deleteItem(id);
                    }}
                  />
                ))}
              </>
            ) : (
              <img
                data-cy="todo-empty-state"
                src="../../image/todo-empty-state.svg"
                onClick={clickPlus}
              />
            )}
          </div>
        </div>
      </div>
      <AddTodo
        isOpen={activity.isOpenModal}
        close={() => {
          setActivity((prev) => ({
            ...prev,
            isOpenModal: false,
          }));
        }}
        submitData={addNewTodo}
      />
    </>
  );
}

export default NewActivity;
