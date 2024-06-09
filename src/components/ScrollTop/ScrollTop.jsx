import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;
