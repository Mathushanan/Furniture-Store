import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomePage from "./components/common/HomePage";
import LoginPage from "./components/common/LoginPage";
import CustomerRoutes from "./components/admin/AdminRoutes";
import AdminRoutes from "./components/customer/CustomerRoutes";
import LogoutPage from "./components/common/LogoutPage";
import { useState, useEffect } from "react";
import verifyJwtToken from "./utils/verifyJwtToken";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PageNotFound from "./components/common/PageNotFound";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import React Icons
import Navbar from "./components/common/NavBar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const newToken = localStorage.getItem("authToken");
    if (newToken) {
      const { valid, userType, stateMessage } = verifyJwtToken(newToken);
      setUser(valid);
      setRole(userType);
      if (stateMessage.type === "error") {
        setMessage(stateMessage.message);
        setMessageType(stateMessage.type);
      }
    } else {
      setUser(null);
      setRole(null);
      setMessage(null);
      setMessageType(null);
    }
  }, [token]);

  const messageClass =
    messageType === "error" ? "alert-danger" : "alert-success";

  return (
    <>
      <div className="fixed-top">
        <Navbar />
      </div>

      <div className="d-flex border">
        <Router>
          <div className="flex-grow-1">
            <div className="me-3 routes-div">
              {/* Message Display Section */}
              {message && (
                <div
                  className={`alert ${messageClass} alert-dismissible fade show start-50 translate-middle-x mt-4 w-50 shadow-lg rounded`}
                  role="alert"
                >
                  {/* Optional Icon based on message type */}
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

              <Routes>
                {!user ? (
                  <>
                    <Route path="/" element={<HomePage />} />

                    <Route
                      path="/login"
                      element={
                        <LoginPage
                          setRole={setRole}
                          setUser={setUser}
                          setMessage={setMessage}
                          setMessageType={setMessageType}
                        />
                      }
                    />
                    {/* Redirect to Login Page for other routes if no user */}
                    <Route path="*" element={<PageNotFound />} />
                  </>
                ) : (
                  <>
                    {/* Redirect to Login Page for other routes if no user */}
                    <Route path="*" element={<PageNotFound />} />
                    {/* Redirect from "/" to the respective dashboard */}
                    <Route
                      path="/"
                      element={
                        role === "admin" ? (
                          <Navigate to="/admin" replace />
                        ) : role === "customer" ? (
                          <Navigate to="/customer" replace />
                        ) : (
                          <HomePage />
                        )
                      }
                    />
                    {role === "admin" && (
                      <Route
                        path="/admin/*"
                        element={
                          <ProtectedRoute>
                            <AdminRoutes />
                          </ProtectedRoute>
                        }
                      />
                    )}
                    {role === "customer" && (
                      <Route
                        path="/customer/*"
                        element={
                          <ProtectedRoute>
                            <CustomerRoutes />
                          </ProtectedRoute>
                        }
                      />
                    )}

                    <Route
                      path="/logout"
                      element={
                        <LogoutPage setRole={setRole} setUser={setUser} />
                      }
                    />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
