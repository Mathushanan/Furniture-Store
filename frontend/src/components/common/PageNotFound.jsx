import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="lead">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="btn w-100"
          style={{
            backgroundColor: "#55798f",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
