// This component is now deprecated - use AppLayout instead
// Keeping for backward compatibility, but it just renders children
import React from "react";

interface UserManagementLayoutProps {
  children: React.ReactNode;
}

export const UserManagementLayout: React.FC<UserManagementLayoutProps> = ({ children }) => {
  return <>{children}</>;
};