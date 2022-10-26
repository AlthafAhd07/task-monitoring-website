import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  activeTodos: 0,
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: {
      reducer(state, action) {
        state.todos.unshift(action.payload);
        state.activeTodos =
          action.payload.status === "active"
            ? state.activeTodos + 1
            : state.activeTodos;
        if (action.payload.userId) {
          updateDoc(doc(db, "todoCollection", action.payload.userId), {
            activeTodos: increment(action.payload.status === "active" ? 1 : 0),
            todos: arrayUnion(action.payload),
          });
        }
      },
      prepare(message, status, userId) {
        return {
          payload: {
            id: nanoid(),
            message,
            status,
            userId,
          },
        };
      },
    },
    updateTodoStatus: (state, action) => {
      state.activeTodos =
        action.payload.status === "completed"
          ? state.activeTodos - 1
          : state.activeTodos + 1;
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            status: action.payload.status,
          };
        } else {
          return todo;
        }
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.activeTodos =
        action.payload.status === "completed"
          ? state.activeTodos
          : state.activeTodos - 1;
      if (!!action.payload.userId) {
        updateDoc(doc(db, "todoCollection", action.payload.userId), {
          activeTodos: increment(
            action.payload.status === "completed" ? 0 : -1
          ),
          todos: arrayRemove(action.payload),
        });
      }
    },
    clearCompleted: (state, action) => {
      const filtered = state.todos.filter(
        (todo) => todo.status !== "completed"
      );
      state.todos = filtered;
      if (!!action.payload.id) {
        setDoc(
          doc(db, "todoCollection", action.payload.id),
          {
            name: action.payload.username,
            activeTodos: state.activeTodos,
            todos: filtered,
          },
          { merge: true }
        );
      }
    },
    updateTodoItem: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            id: action.payload.id,
            message: action.payload.message,
            status: action.payload.status,
          };
        } else {
          return todo;
        }
      });
    },
    insertTodoOnLogin: (state, action) => {
      state.activeTodos = action.payload?.activeTodos;
      state.todos = action.payload?.todos;
    },
  },
});

export const {
  createTodo,
  updateTodoStatus,
  deleteTodo,
  clearCompleted,
  updateTodoItem,
  insertTodoOnLogin,
} = todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
