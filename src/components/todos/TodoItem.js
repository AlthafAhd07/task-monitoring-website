import React, { useEffect, useRef, useState } from "react";
import Check from "../global/Check";
import "./index.css";
import { ReactComponent as CrossIcon } from "../../images/close-line-icon.svg";
import { ReactComponent as PenIcon } from "../../images/edit-pen-icon.svg";
import { useDispatch } from "react-redux";
import { updateTodoStatus, deleteTodo } from "../../features/todoSlice";

const TodoItem = ({ todo, setUpdateTodo }) => {
  const [checked, setChecked] = useState(todo.status);
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  useEffect(() => {
    if (todo.status !== checked) {
      setChecked(todo.status);
    }
  }, [todo?.status]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(updateTodoStatus({ id: todo.id, status: checked }));
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
          onClick={() => dispatch(deleteTodo({ id: todo.id, status: checked }))}
          id="imgSvgIcon"
        />
      </div>
    </div>
  );
};

export default TodoItem;
