import React from "react";

import "./check.css";
import { ReactComponent as CheckIcon } from "../../images/icon-check.svg";
const Check = ({ checked, setChecked }) => {
  return (
    <div
      className="input__checkBox"
      onClick={() =>
        setChecked((old) => (old === "active" ? "completed" : "active"))
      }
      data-checked={checked}
    >
      {checked === "completed" && <CheckIcon />}
    </div>
  );
};

export default Check;
