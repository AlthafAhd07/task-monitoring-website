import React, { useEffect, useState } from "react";
import "./index.css";
import Check from "../global/Check";
import { useDispatch } from "react-redux";
import { createTodo, updateTodoItem } from "../../features/todoSlice";
const Input = ({ updateTodo, setUpdateTodo }) => {
  const [checked, setChecked] = useState("active");
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(updateTodo.todo.message || "");
  }, [updateTodo.edit, updateTodo.todo.id]);

  useEffect(() => {
    if (updateTodo.edit) {
      dispatch(
        updateTodoItem({
          id: updateTodo.todo.id,
          message: inputValue,
          status: checked,
        })
      );
    }
  }, [inputValue, checked]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) return;
    if (updateTodo.edit) {
      dispatch(
        updateTodoItem({
          id: updateTodo.todo.id,
          message: inputValue,
          status: checked,
        })
      );
      setUpdateTodo({ edit: false, todo: "" });
    } else {
      dispatch(createTodo(inputValue, checked));
    }

    setInputValue("");
  }
  return (
    <div className="inputContainer">
      <Check checked={checked} setChecked={setChecked} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={inputValue}
          onInput={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Input;
