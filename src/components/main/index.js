import React, { useState } from "react";

import "./main.css";

import Navbar from "../navbar";
import Header from "../header";
import Input from "../input";
import Todos from "../todos";

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
      <Todos updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} />
    </div>
  );
};

export default Main;
