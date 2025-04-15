import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser, setRole, setMessage, setMessageType }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*const loginUrl = process.env.VITE_API_BASE_URL
        ? `${process.env.VITE_API_BASE_URL}/login`
        : "http://localhost:7225/api/login"; // Default fallback*/

      const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/login`;

      const response = await axios.post(loginUrl, {
        email: email,
        password: password,
      });

      if (response.status == 200 && response.data?.token) {
        localStorage.setItem("authToken", response.data.token);

        const decodedToken = jwtDecode(response.data.token);

        const userType = decodedToken.UserType;

        // Set user and role in the parent component (App)
        setUser(true);
        setRole(userType);

        if (userType == "admin") {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      }
    } catch (error) {
      setMessage(
        "Login failed: " + error.response ? error.response.data : error.message
      );
      setMessageType("error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h3 className="text-start mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 text-start">
            <input
              type="email"
              className="form-control fs-6 h-80"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group mb-3 text-start">
            <input
              type="password"
              className="form-control fs-6 h-80"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="form-group mb-3">
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#55798f",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaSignInAlt style={{ marginRight: "8px" }} /> Log In
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-muted">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
