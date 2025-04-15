import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = ({ setUser, setRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token
    localStorage.removeItem("authToken");

    // Reset user and role state
    setUser(false);
    setRole(null);

    // Redirect to login page after logout
    navigate("/login");
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
