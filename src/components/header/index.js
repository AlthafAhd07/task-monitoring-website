import React, { useEffect, useState } from "react";
import "./index.css";
import Dark from "../../images/icon-moon.svg";
import Light from "../../images/icon-sun.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../features/themeSlice";
import { changeTheme } from "../../features/themeSlice";
const Header = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [inAnimation, setInAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInAnimation(false);
    }, 300);
  }, [theme]);
  return (
    <div className="header">
      <h1 className="header__title">TODO</h1>
      <img
        className="header__themeIcon"
        src={theme === "light" ? Dark : Light}
        onClick={() => {
          dispatch(changeTheme());
          setInAnimation(true);
        }}
        alt=""
        data-anim={`${inAnimation} ${theme}`}
      />
    </div>
  );
};

export default Header;
