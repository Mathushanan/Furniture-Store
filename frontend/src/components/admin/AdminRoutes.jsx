import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard.jsx";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="admin-dashboard" />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
