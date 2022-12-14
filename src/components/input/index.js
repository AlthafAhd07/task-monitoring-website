import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

import "./input.css";
import Check from "../global/Check";

import { db } from "../../firebase";
import { selectAuth } from "../../features/authSlice";
import { createTodo, updateTodoItem } from "../../features/todoSlice";
const Input = ({ updateTodo, setUpdateTodo }) => {
  const { user } = useSelector(selectAuth);

  const [checked, setChecked] = useState("active");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(updateTodo.todo.message || "");
    setChecked(updateTodo.todo.status || "active");
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

  function checkIncActiveTodoValue() {
    if (updateTodo.todo.status === checked) {
      return 0;
    }
    if (updateTodo.todo.status === "active" && checked === "completed") {
      return -1;
    }
    if (updateTodo.todo.status === "completed" && checked === "active") {
      return 1;
    }
    return 0;
  }

  function handleUpdateToFirebase() {
    updateDoc(doc(db, "todoCollection", user.uid), {
      todos: arrayRemove(updateTodo.todo),
    });

    updateDoc(doc(db, "todoCollection", user.uid), {
      activeTodos: increment(checkIncActiveTodoValue()),
      todos: arrayUnion({
        ...updateTodo.todo,
        message: inputValue,
        status: checked,
      }),
    });
  }
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
      if (user) {
        handleUpdateToFirebase();
      }
      setUpdateTodo({ edit: false, todo: "" });
    } else {
      dispatch(createTodo(inputValue, checked, user.uid));
    }

    setInputValue("");
  }
  return (
    <div className="inputContainer">
      <Check checked={checked} setChecked={setChecked} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new task..."
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
