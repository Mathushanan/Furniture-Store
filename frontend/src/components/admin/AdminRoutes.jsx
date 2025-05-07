import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard.jsx";
import SavedDesigns from "./SavedDesigns.jsx";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="saved-designs" />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/saved-designs" element={<SavedDesigns />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
