import { useEffect, useRef } from "react";

const useAvoidFirstRenderEffect = (fun, dependancy) => {
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fun();
  }, [dependancy]);
};

export default useAvoidFirstRenderEffect;
