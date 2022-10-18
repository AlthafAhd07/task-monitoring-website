import { createSlice, nanoid } from "@reduxjs/toolkit";

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
      },
      prepare(message, status) {
        return {
          payload: {
            id: nanoid(),
            message,
            status,
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
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.status !== "completed");
    },
    updateTodoItem: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            id: action.payload.id,
            message: action.payload.message,
            status: action.payload.status,
          };
        } else {
          return todo;
        }
      });
    },
  },
});

export const {
  createTodo,
  updateTodoStatus,
  deleteTodo,
  clearCompleted,
  updateTodoItem,
} = todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
