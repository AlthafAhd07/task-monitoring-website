import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./style.css";
import { auth } from "../../firebase.js";
// import { login } from "../../features/userAuth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CrossIcon } from "../../images/icon-cross.svg";
import { Link, useNavigate } from "react-router-dom";
import { login, selectAuth } from "../../features/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectAuth);
  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
        navigate("/");
      })
      .catch((err) => {
        alert(err);
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
            placeholder="Admin@gmial.com"
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
