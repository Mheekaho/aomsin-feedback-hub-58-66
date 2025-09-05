import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AppAuthContext";

const AdminRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-kanit">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (!currentUser.isAdmin) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;