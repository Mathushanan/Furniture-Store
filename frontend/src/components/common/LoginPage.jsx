import React, { useState, useContext } from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.jpg";
import { AuthContext } from "../../utils/authContext.jsx";

const LoginPage = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/login`;

      const response = await axios.post(loginUrl, {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        const userType = decodedToken.UserType;

        setUser(true); // 👈 update context
        setRole(userType);

        navigate(userType === "admin" ? "/admin" : "/customer");
      }
    } catch (error) {
      setMessage(
        "Login failed: " +
          (error.response ? error.response.data : error.message)
      );
      setMessageType("error");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div
        className="row shadow rounded overflow-hidden mt-5"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={login}
            alt="Login Visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 bg-white p-5">
          <h3 className="mb-4 text-start">Welcome Back</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "", border: "none" }}
            >
              <FaSignInAlt className="me-2" /> Log In
            </button>
            <div className="text-center mt-3">
              <a href="#" className="text-primary">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
