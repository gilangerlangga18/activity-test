import React, { useEffect, useState } from "react";
import Card from "../../Component/Card";
import "./styles.css";
import { useGlobalContext } from "../../Context/GlobalContext";
import AlertSucces from "../../Component/AlertSucces";

function Home() {
  const {
    state: { todo },
    firstGetData,
    addToDo,
  } = useGlobalContext();

  const [alert, setAlert] = useState({
    isOpenSUccess: false,
  });

  useEffect(() => {
    firstGetData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="todo-header">
          <h1 data-cy="activity-title">Activity</h1>
          <div onClick={addToDo} data-cy="activity-add-button">
            <button class="bton ">
              <span class="icon-plus"> +</span> Tambah
            </button>
          </div>
        </div>
        <div className="map-card">
          {todo.length > 0 ? (
            <>
              {" "}
              {todo.map((title) => (
                <Card
                  title={title}
                  openSuccess={() => {
                    setAlert((prev) => ({
                      ...prev,
                      isOpenSUccess: true,
                    }));
                  }}
                />
              ))}
            </>
          ) : (
            <img
              src="../../../image/activity-empty-state.svg"
              onClick={addToDo}
              data-cy="activity-empty-state"
            />
          )}
        </div>
      </div>

      <AlertSucces
        isOpen={alert.isOpenSUccess}
        close={() => {
          setAlert((prev) => ({
            ...prev,
            isOpenSUccess: false,
          }));
        }}
      />
    </>
  );
}

export default Home;
