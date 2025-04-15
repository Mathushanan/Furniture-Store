import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/authContext.jsx"; // Make sure this path is correct

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setUser, setRole } = useContext(AuthContext); // Use the context to update the state

  useEffect(() => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("authToken");

    // Reset the user and role state via context
    setUser(false); // Set the user state to false, meaning logged out
    setRole(null); // Reset the role to null

    // Redirect to login page after a short delay

    navigate("/login"); // Redirect to the login page
  }, [navigate, setUser, setRole]);

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="p-4 text-center">
        <h3>Logging out...</h3>
      </div>
    </div>
  );
};

export default LogoutPage;
