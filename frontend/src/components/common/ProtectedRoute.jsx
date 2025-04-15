import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import verifyJwtToken from "../../utils/verifyJwtToken";

const ProtectedRoute = ({ children }) => {
  // check whether scope is valid & receive message
  const token = localStorage.getItem("authToken");
  const { valid, role, stateMessage } = verifyJwtToken(token);

  // if not valid navigate to login page
  if (!valid) {
    return <Navigate to="/login" state={{ stateMessage }} replace />;
  }

  // will return its own children or make it visible
  return children;
};

// ensure the types of passed parameters
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
