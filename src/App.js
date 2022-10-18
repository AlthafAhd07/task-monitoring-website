import React, { useState } from "react";
import Header from "./components/header";
import Input from "./components/input";
import Todos from "./components/todos";
import BgDark from "./images/bg-desktop-dark.jpg";
import BgLight from "./images/bg-desktop-light.jpg";
import BgDarkSmall from "./images/bg-mobile-dark.jpg";
import BgLightSmall from "./images/bg-mobile-light.jpg";

import "./App.css";
import { useSelector } from "react-redux";
import { selectTheme } from "./features/themeSlice";
function App() {
  const theme = useSelector(selectTheme);
  const [updateTodo, setUpdateTodo] = useState(() => {
    return {
      edit: false,
      todo: "",
    };
  });
  return (
    <div className="App" data-theme={theme}>
      {/* <img src={theme === "dark" ? BgDark : BgLight} alt="background" /> */}
      <picture className="backgroundImg">
        <source
          srcSet={theme === "dark" ? BgDarkSmall : BgLightSmall}
          media="(max-width: 800px)"
        />
        <img src={theme === "dark" ? BgDark : BgLight} alt="background" />
      </picture>
      <div className="wrapper">
        <Header />
        <Input updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} />
        <Todos setUpdateTodo={setUpdateTodo} />
      </div>
    </div>
  );
}

export default App;
