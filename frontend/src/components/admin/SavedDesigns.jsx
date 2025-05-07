import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaPlus } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/room_design_icon.jpg";

const SavedDesigns = () => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();

  const messageClass =
    messageType === "error" ? "alert-danger" : "alert-success";

  const handleFetchDesigns = async () => {
    try {
      const fetchUrl = `${import.meta.env.VITE_API_BASE_URL}/get-designs`;
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Authorization token is missing!");
        return;
      }

      jwtDecode(token); // Optional: decode token to verify structure

      const response = await axios.get(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setDesigns(response.data);
      } else {
        setMessage("Failed to fetch the designs!");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Fetching failed: " +
          (error.response ? error.response.data : error.message)
      );
      setMessageType("error");
    }
  };

  useEffect(() => {
    handleFetchDesigns();
  }, []);

  const handleCardClick = (design) => {
    navigate("/admin/admin-dashboard", { state: { designData: design } });
  };

  const handleNewDesign = () => {
    navigate("/admin/admin-dashboard", { state: { designData: null } });
  };

  return (
    <>
      {/* Message Display */}
      {message && (
        <div
          className={`alert ${messageClass} alert-dismissible fade show w-100 w-md-50 shadow-lg rounded start-50 translate-middle-x mt-4`}
          role="alert"
        >
          <div className="d-flex align-items-center">
            {messageClass === "alert-success" && (
              <FaCheckCircle className="me-2" />
            )}
            {messageClass === "alert-danger" && (
              <FaTimesCircle className="me-2" />
            )}
            <span>{message}</span>
          </div>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setMessage(null);
              setMessageType(null);
            }}
          ></button>
        </div>
      )}

      {/* Cards Display */}
      <div className="container mt-4">
        <div className="row">
          {/* Create New Design Card */}
          <div className="col-md-4 mb-4">
            <div
              className="card shadow-sm h-100 d-flex justify-content-center align-items-center text-center p-4"
              style={{ cursor: "pointer", border: "2px dashed #0d6efd" }}
              onClick={handleNewDesign}
            >
              <FaPlus size={40} className="text-primary mb-2" />
              <h6 className="mb-0 text-primary">Create New Design</h6>
            </div>
          </div>

          {/* Existing Design Cards */}
          {designs?.map((design, index) => (
            <div
              key={index}
              className="col-md-4 mb-4"
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm h-100 d-flex flex-column">
                <div className="card-body flex-grow-1 d-flex flex-column">
                  <h5 className="card-title">
                    {design.designName || "Untitled Design"}
                  </h5>
                  <p className="card-text text-muted small mt-auto mb-0">
                    Created: {new Date(design.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                    onClick={() => handleCardClick(design)}
                  >
                    <FaEdit />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedDesigns;
