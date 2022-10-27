import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import "./auth.css";
import { ReactComponent as CrossIcon } from "../../images/icon-cross.svg";

import { auth, db } from "../../firebase.js";
import { login, selectAuth } from "../../features/authSlice";
import { insertTodoOnLogin, selectTodo } from "../../features/todoSlice";
import { changeLoadingState, showToast } from "../../features/alertSlice";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { user } = useSelector(selectAuth);
  const { activeTodos, todos } = useSelector(selectTodo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  });
  function handleInputChange(e) {
    setUserData((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (userData.username?.length < 4) {
      dispatch(
        showToast({
          visible: true,
          msg: "Username should be at least 4 characters",
          type: "error",
        })
      );
      return;
    }
    if (userData.password?.length < 6) {
      dispatch(
        showToast({
          visible: true,
          msg: "password should be at least 6 characters",
          type: "error",
        })
      );
      return;
    }
    if (userData.password !== userData?.confirmPassword) {
      dispatch(
        showToast({
          visible: true,
          msg: "Confirm password Does Not match",
          type: "error",
        })
      );
      return;
    }

    dispatch(changeLoadingState(true));
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: userData.username,
        }).then(() => {
          const UserIdAddedTodos = todos?.map((item) => {
            return {
              ...item,
              userId: userAuth.user.uid,
            };
          });
          setDoc(doc(db, "todoCollection", userAuth.user.uid), {
            name: userAuth.user.displayName,
            activeTodos: activeTodos ?? 0,
            todos: UserIdAddedTodos ?? [],
          }).then(() => {
            dispatch(
              insertTodoOnLogin({
                name: userAuth.user.displayName,
                activeTodos: activeTodos ?? 0,
                todos: UserIdAddedTodos ?? [],
              })
            );
            dispatch(
              login(userAuth.user.uid, userData.username, userAuth.user.email)
            );
            dispatch(changeLoadingState(false));
            dispatch(
              showToast({
                visible: true,
                msg: "Account created Successfully.",
                type: "success",
              })
            );
            navigate("/");
          });
        });
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
        switch (err.code) {
          case "auth/email-already-in-use":
            dispatch(
              showToast({
                visible: true,
                msg: "E-mail Already taken",
                type: "error",
              })
            );
            break;

          default:
            dispatch(
              showToast({
                visible: true,
                msg: err.code,
                type: "error",
              })
            );
        }
      });
  }

  return (
    <div className="auth">
      <div className="auth__wrapper register">
        <div className="auth__cancel">
          <Link to="/">
            <CrossIcon fill="red" stroke="red" />
          </Link>
        </div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            placeholder="Althaf"
            id="userName"
            name="username"
            value={userData.username || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="althafahd07@gmail.com"
            id="email"
            name="email"
            value={userData.email || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="password"
            value={userData.password || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword || ""}
            onChange={handleInputChange}
          />
          <button type="submit">Register</button>
        </form>
        <div className="bottom__stuff">
          Already Have an Acccount : {` `} <Link to="/login">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
