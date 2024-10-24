import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Praviteroute = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);
  console.log({ auth });
  const location = useLocation();

  return !auth ? (
    <Navigate to="/login" state={location.pathname} replace />
  ) : (
    children
  );
};

export default Praviteroute;
