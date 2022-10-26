import React, { useEffect, useState } from "react";
import "./style.css";
import { auth, db } from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CrossIcon } from "../../images/icon-cross.svg";

import { login, selectAuth } from "../../features/authSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { insertTodoOnLogin, selectTodo } from "../../features/todoSlice";

const Register = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeTodos, todos } = useSelector(selectTodo);

  const { user } = useSelector(selectAuth);
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
    if (
      userData.password !== userData?.confirmPassword ||
      userData.username?.length < 4
    )
      return;

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
            navigate("/");
          });
        });
      })
      .catch((err) => {
        alert(err);
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
            placeholder="John"
            id="userName"
            name="username"
            value={userData.username || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Admin@gmial.com"
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
