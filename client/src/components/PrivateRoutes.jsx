// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  // Get token and role from localStorage
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role mismatch
  if (role && userRole !== role) return <Navigate to="/" replace />;

  // Authorized
  return children;
};

export default PrivateRoute;
