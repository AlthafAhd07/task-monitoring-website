import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";

import "./auth.css";
import { ReactComponent as CrossIcon } from "../../images/icon-cross.svg";

import { auth, db } from "../../firebase.js";
import { login, selectAuth } from "../../features/authSlice";
import { insertTodoOnLogin, selectTodo } from "../../features/todoSlice";
import { changeLoadingState, showToast } from "../../features/alertSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector(selectAuth);
  const { activeTodos, todos } = useSelector(selectTodo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    if (email.length < 1 || password.length < 1) {
      dispatch(
        showToast({
          visible: true,
          msg: "Please fill all fields",
          type: "error",
        })
      );
      return;
    }
    dispatch(changeLoadingState(true));

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const UserIdAddedTodos = todos?.map((item) => {
          return {
            ...item,
            userId: user.uid,
          };
        });

        updateDoc(doc(db, "todoCollection", user.uid), {
          // activeTodos: increment(activeTodos),
          todos: arrayUnion(...UserIdAddedTodos),
        }).then(() => {
          getDoc(doc(db, "todoCollection", user.uid)).then((res) => {
            const newActiveTodoCount = res.data().todos.reduce((a, b, i) => {
              if (i === 1) {
                let count = 0;
                if (a.status === "active") {
                  count += 1;
                }
                if (b.status === "active") {
                  count += 1;
                }
                return count;
              } else {
                if (b.status === "active") {
                  return a + 1;
                } else {
                  return a;
                }
              }
            });
            updateDoc(doc(db, "todoCollection", user.uid), {
              activeTodos: newActiveTodoCount,
            });

            dispatch(
              insertTodoOnLogin({
                ...res.data(),
                activeTodos: newActiveTodoCount,
              })
            );
          });
        });

        dispatch(login(user.uid, user.displayName, user.email));
        dispatch(changeLoadingState(false));
        dispatch(
          showToast({
            visible: true,
            msg: "Login Success.",
            type: "success",
          })
        );
        navigate("/");
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
        switch (err.code) {
          case "auth/wrong-password":
            dispatch(
              showToast({
                visible: true,
                msg: "Wrong password",
                type: "error",
              })
            );
            break;
          case "auth/user-not-found":
            dispatch(
              showToast({
                visible: true,
                msg: "User Not Found",
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
      <div className="auth__wrapper">
        <div className="auth__cancel">
          <Link to="/">
            <CrossIcon fill="red" stroke="red" />
          </Link>
        </div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="althafahd07@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="bottom__stuff">
          New to here : {` `} <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
