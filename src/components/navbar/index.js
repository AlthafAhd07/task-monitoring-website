import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectAuth } from "../../features/authSlice";
import "./navbar.css";

import { ReactComponent as ProfileIcon } from "../../images/my-account-icon.svg";
import { auth } from "../../firebase";

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
  return (
    <div className="navbar">
      {user ? (
        <UserProfile user={user} />
      ) : (
        <Link to="/login" className="navbar__link">
          Login Now
        </Link>
      )}
    </div>
  );
};

export default Navbar;
