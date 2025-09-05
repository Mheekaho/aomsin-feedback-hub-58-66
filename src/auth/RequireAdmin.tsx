import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAdmin: React.FC<{ redirectTo?: string }> = ({ redirectTo = "/403" }) => {
  const { loading, isAuthenticated, role } = useAuth();

  if (loading) return null; // หรือใส่ spinner ก็ได้
  if (!isAuthenticated || role !== "admin") return <Navigate to={redirectTo} replace />;

  return <Outlet />; // ใช้กับ Route ที่มี children (หรือจะใช้ children prop ก็ได้)
};

export default RequireAdmin;
