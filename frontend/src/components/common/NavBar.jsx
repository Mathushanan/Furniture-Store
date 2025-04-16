import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.png"; // Adjust the path as necessary
import { IoMdLogIn } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { AuthContext } from "../../utils/authContext"; // Adjust the path as necessary

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { user } = useContext(AuthContext); // 👈 Now using global state

  return (
    <div className="px-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand on the left */}
          <a
            className="navbar-brand fw-bold fs-4 d-flex align-items-center"
            href="/"
          >
            <img src={logo} alt="Logo" className="me-2" height="30" />
            Furniture<span style={{ color: "#058bd2" }}>Store</span>
          </a>

          {/* Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            {!user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "home" ? "active text-primary" : ""
                    }`}
                    href="/#products"
                    onClick={() => handleTabClick("home")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "about" ? "active text-primary" : ""
                    }`}
                    href="/#about"
                    onClick={() => handleTabClick("about")}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "services" ? "active text-primary" : ""
                    }`}
                    href="/#services"
                    onClick={() => handleTabClick("services")}
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "contact" ? "active text-primary" : ""
                    }`}
                    href="/#footer"
                    onClick={() => handleTabClick("contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>

          {/* Login button on the right */}
          <div className="d-none d-lg-block">
            {/* logout */}
            {!user ? (
              <a className="btn btn-primary px-4 py-2 shadow-sm" href="/login">
                Login
                <IoMdLogIn className="ms-2" size={20} />
              </a>
            ) : (
              <a className="btn btn-primary px-4 py-2 shadow-sm" href="/logout">
                Logout
                <IoMdLogOut className="ms-2" size={20} />
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
