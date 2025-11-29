import Sidebar from "@/components/dashboard/Sidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  role: "ADMIN" | "USER";
}

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main content */}
      <div className="flex-1 bg-base-100 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
