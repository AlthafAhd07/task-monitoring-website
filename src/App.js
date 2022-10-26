import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "./features/themeSlice";

import Main from "./components/main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

import BgDark from "./images/bg-desktop-dark.jpg";
import BgLight from "./images/bg-desktop-light.jpg";
import BgDarkSmall from "./images/bg-mobile-dark.jpg";
import BgLightSmall from "./images/bg-mobile-light.jpg";

import { auth, db } from "./firebase";
import { login } from "./features/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { insertTodoOnLogin, selectTodo } from "./features/todoSlice";
function App() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login(authUser.uid, authUser.displayName, authUser.email));
        getDoc(doc(db, "todoCollection", authUser.uid)).then((res) => {
          dispatch(insertTodoOnLogin(res.data()));
        });
      } else {
        return;
      }
    });
  }, []);

  return (
    <div className="App" data-theme={theme}>
      <picture className="backgroundImg">
        <source
          srcSet={theme === "dark" ? BgDarkSmall : BgLightSmall}
          media="(max-width: 800px)"
        />
        <img src={theme === "dark" ? BgDark : BgLight} alt="background" />
      </picture>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
