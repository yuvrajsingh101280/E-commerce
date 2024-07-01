import React from "react";
import { Navigate } from "react-router-dom";

const protectedRouteForUser = ({ chilren }) => {
  const user = JSON.parse(localStorage.getItem("users"));

  if (user?.role === "user") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default protectedRouteForUser;
