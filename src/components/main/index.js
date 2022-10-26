import React, { useState } from "react";
import Navbar from "../navbar";
import Header from "../header";
import Input from "../input";
import Todos from "../todos";
import "./main.css";

const Main = () => {
  const [updateTodo, setUpdateTodo] = useState(() => {
    return {
      edit: false,
      todo: "",
    };
  });

  return (
    <div className="wrapper">
      <Navbar />
      <Header />
      <Input updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} />
      <Todos setUpdateTodo={setUpdateTodo} />
    </div>
  );
};

export default Main;
