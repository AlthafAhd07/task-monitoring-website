import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useDetectKeyboardOpen from "use-detect-keyboard-open";

import "./navbar.css";
import { ReactComponent as ProfileIcon } from "../../images/my-account-icon.svg";

import { auth } from "../../firebase";
import { logout, selectAuth } from "../../features/authSlice";

function UserProfile({ user }) {
  const dispatch = useDispatch();

  function handleLogOut() {
    auth.signOut();
    dispatch(logout());
  }
  return (
    <div className="user__profile">
      <p>{user?.displayName}</p>
      <ProfileIcon className="profile__icon" />
      <small className="profile__logout" onClick={handleLogOut}>
        Logout
      </small>
    </div>
  );
}
const Navbar = () => {
  const { user } = useSelector(selectAuth);

  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <div className="navbar">
      {!isKeyboardOpen && user ? (
        <UserProfile user={user} />
      ) : (
        <Link to="/login" className="navbar__link">
          <div className="navbar__linkWrapper">Login Now</div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
