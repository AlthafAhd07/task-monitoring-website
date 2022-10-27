import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Toast.css";
import { ReactComponent as CrossIcon } from "../../../images/close-line-icon.svg";

import { selectAlert, showToast } from "../../../features/alertSlice";
const Toast = () => {
  const { toast } = useSelector(selectAlert);

  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.visible === true) {
      setTimeout(() => {
        dispatch(showToast({ visible: false }));
      }, 5000);
    }
  }, [toast.visible]);

  return (
    <div
      className="toast"
      data-name={toast.visible}
      style={{
        backgroundColor: `${
          toast.type === "success" ? "rgb(9, 158, 54)" : "rgb(214, 10, 10)"
        }`,
      }}
    >
      <CrossIcon
        className="toast__crossIcon"
        onClick={() => {
          dispatch(showToast({ visible: false }));
        }}
      />
      <p>{toast.msg}</p>
    </div>
  );
};

export default Toast;
