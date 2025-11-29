import React from "react";
import Link from "next/link";

interface SidebarProps {
  role?: "ADMIN" | "USER"; // role might be undefined initially
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  if (!role) return null; // or a spinner/loading component

  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Manage Services", href: "/admin/dashboard/services" },
    { label: "Add Services", href: "/admin/dashboard/services/add-new" },

    
    { label: "Manage Users", href: "/admin/dashboard/users" },
    { label: "Reports", href: "/dashboard/reports" },
  ];

  const userLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Profile", href: "/dashboard/profile" },
    { label: "Bookings", href: "/dashboard/bookings" },
  ];

  const links = role === "ADMIN" ? adminLinks : userLinks;

  return (
    <div className="w-64 h-screen bg-base-200 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">{role} Dashboard</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block p-2 rounded hover:bg-primary hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
