import React from "react";

import "./style.css";
import { ReactComponent as CrossIcon } from "../../images/icon-cross.svg";
const Welcome = ({ setShowGreeting }) => {
  return (
    <div className="welcome">
      <div className="welcome__wrapper">
        <CrossIcon
          className="welcome__exitIcon"
          onClick={() => setShowGreeting(false)}
        />
        <h1>Welcome</h1>
        <div className="welcome__firstPart">
          <p>Here you can</p>
          <ul>
            <li>Create</li>
            <li>Update</li>
            <li>Delete</li>
          </ul>
          <span>TASKS</span>
        </div>
        <main className="welcome__main">
          <h3>Save Your Progress by Login</h3>
          <p>Don't use your own E-mail or password</p>
          <div>
            <p className="useInstead">
              Instead you can use any random email and password like
            </p>
            <ul>
              <li>abc123@gmail.com</li>
              <li>123456</li>
            </ul>
          </div>
        </main>
        <h6>Thanks for Visiting</h6>
      </div>
    </div>
  );
};

export default Welcome;
