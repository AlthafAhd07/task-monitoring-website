import { useState } from "react";
import useAvoidFirstRenderEffect from "./useAvoidFirstRenderEffect";

const useDelayUnmount = (param, delayTime = 300) => {
  const [show, setShow] = useState(false);

  //custom hook
  useAvoidFirstRenderEffect(delayFun, param);
  function delayFun() {
    if (param === false) {
      setTimeout(() => {
        setShow(false);
      }, delayTime);
    }
    if (param === true) {
      setShow(true);
    }
  }
  return show;
};

export default useDelayUnmount;
