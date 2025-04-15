import React from "react";
import logo from "../../assets/logo.png"; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center px-5">
        {/* Brand on the left */}
        <a
          className="navbar-brand fw-bold fs-4 d-flex align-items-center"
          href="/"
        >
          {/* Optional logo image */}
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
          {/* Centered nav links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Login button on the right */}
        <div className="d-none d-lg-block">
          <a className="btn btn-primary px-4 py-2 shadow-sm" href="/login">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
