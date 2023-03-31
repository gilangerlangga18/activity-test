import { createContext, useContext, useState } from "react";
import axios from "axios";

const baseUrl = "https://todo.api.devcode.gethired.id";
const email = "gilang.erlangga1806@gmail.com";

const GlobalContext = createContext({});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = (props) => {
  const initialValues = {
    todo: [],
  };
  const [state, setState] = useState(initialValues);

  const firstGetData = async () => {
    // Call API
    const results = await axios.get(
      baseUrl + "/activity-groups?email=" + email
    );

    setState((prev) => ({
      ...prev,
      todo: results.data.data,
    }));
  };

  const addToDo = async () => {
    // Call API
    const results = await axios.post(baseUrl + "/activity-groups", {
      email,
      title: "New Activity",
    });
    setState((prev) => ({
      ...prev,
      todo: [results.data, ...prev.todo],
    }));
  };

  const deleteActivity = async (id) => {
    const updatedTodo = state.todo.filter((item) => item.id !== id);
    setState((prev) => ({
      ...prev,
      todo: updatedTodo,
    }));
    // Call API
    await axios.delete(baseUrl + "/activity-groups/" + id);
  };

  const updateActvtyTitle = async (id, title) => {
    const itemIndex = state.todo.findIndex((item) => item.id === id);
    setState((prev) => ({
      ...prev,
      todo: [
        ...prev.todo.slice(0, itemIndex),
        { ...prev.todo[itemIndex], title },
        ...prev.todo.slice(itemIndex + 1),
      ],
    }));
    // Call API
    await axios.patch(baseUrl + "/activity-groups/" + id, {
      title,
    });
  };

  const getActivityById = async (id) => {
    if (state.todo.length > 0) {
      const item = state.todo.find((item) => item.id === parseInt(id));
      return item;
    } else {
      // Call API
      const results = await axios.get(baseUrl + "/activity-groups/" + id);
      return results.data;
    }
  };

  const getListToDoItem = async (id) => {
    // Call API
    const results = await axios.get(
      baseUrl + "/todo-items?activity_group_id=" + id
    );
    return results.data.data;
  };

  const addNewToDoItem = async (id, title, priority) => {
    // Call API
    const results = await axios.post(baseUrl + "/todo-items", {
      activity_group_id: id,
      title,
      priority,
    });
    return results.data;
  };

  const deleteTodo = async (id) => {
    // Call API
    await axios.delete(baseUrl + "/todo-items/" + id);
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        addToDo,
        firstGetData,
        deleteActivity,
        updateActvtyTitle,
        getActivityById,
        getListToDoItem,
        addNewToDoItem,
        deleteTodo,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
