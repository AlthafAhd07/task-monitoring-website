import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TinyTransition from "react-tiny-transition";

import { login } from "./features/authSlice";
import { selectTheme } from "./features/themeSlice";

import "./App.css";
import BgDark from "./images/bg-desktop-dark.jpg";
import BgLight from "./images/bg-desktop-light.jpg";
import BgDarkSmall from "./images/bg-mobile-dark.jpg";
import BgLightSmall from "./images/bg-mobile-light.jpg";

import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import { insertTodoOnLogin } from "./features/todoSlice";
import { selectAlert } from "./features/alertSlice";

import Main from "./components/main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Welcome from "./components/welcomeAlert";
import Loading from "./components/global/alert/Loading";
import Toast from "./components/global/alert/Toast";

import useDelayUnmount from "./hooks/useDelayUnmount";
function App() {
  const theme = useSelector(selectTheme);

  const [showGreeting, setShowGreeting] = useState(false);
  const { loading, toast } = useSelector(selectAlert);

  const dispatch = useDispatch();

  // custom hook for unmount animation
  const showToast = useDelayUnmount(toast.visible, 900);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      setShowGreeting(true);
      setTimeout(() => {
        setShowGreeting(false);
      }, 10000);
      localStorage.setItem("visited", true);
    } else {
      return;
    }
  }, []);

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

      <TinyTransition duration={500}>
        {showGreeting && <Welcome setShowGreeting={setShowGreeting} />}
      </TinyTransition>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <TinyTransition duration={300}>{loading && <Loading />}</TinyTransition>

      {showToast && <Toast />}
    </div>
  );
}

export default App;
