import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

import "./todos.css";
import { ReactComponent as CrossIcon } from "../../images/close-line-icon.svg";
import { ReactComponent as PenIcon } from "../../images/edit-pen-icon.svg";
import { updateTodoStatus, deleteTodo } from "../../features/todoSlice";

import { db } from "../../firebase";
import Check from "../global/Check";

const TodoItem = ({ todo, setUpdateTodo }) => {
  const [checked, setChecked] = useState(todo.status);

  const firstRender = useRef(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status !== checked) {
      setChecked(todo.status);
    }
  }, [todo?.status]);

  function checkIncActiveTodoValue() {
    if (todo.status === checked) {
      return 0;
    }
    if (todo.status === "active" && checked === "completed") {
      return -1;
    }
    if (todo.status === "completed" && checked === "active") {
      return 1;
    }
    return 0;
  }

  function handleUpdateToFirebase() {
    updateDoc(doc(db, "todoCollection", todo.userId), {
      todos: arrayRemove(todo),
    });

    updateDoc(doc(db, "todoCollection", todo.userId), {
      activeTodos: increment(checkIncActiveTodoValue()),
      todos: arrayUnion({
        ...todo,
        status: checked,
      }),
    });
  }
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(updateTodoStatus({ id: todo.id, status: checked }));

    const timeoutFun = setTimeout(() => {
      handleUpdateToFirebase();
    }, 1000);
    return () => clearTimeout(timeoutFun);
  }, [checked]);

  return (
    <div className="todos__item">
      <div className="todo__left">
        <Check checked={checked} setChecked={setChecked} />
        <p>{todo.message}</p>
      </div>
      <div className="todo__options">
        <PenIcon
          className="todo__penIcon"
          onClick={() => setUpdateTodo({ edit: true, todo: todo })}
          id="imgSvgIcon"
        />
        <CrossIcon
          className="todo__crossIcon"
          onClick={() => dispatch(deleteTodo(todo))}
          id="imgSvgIcon"
        />
      </div>
    </div>
  );
};

export default TodoItem;
