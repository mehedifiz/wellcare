"use client";
import React, { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  role?: "ADMIN" | "USER";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [open, setOpen] = useState(false);

  if (!role) return null;

  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Manage Services", href: "/admin/dashboard/services" },
    { label: "Add Services", href: "/admin/dashboard/services/add-new" },
    { label: "Manage Bookings", href: "/admin/dashboard/bookings" },
    { label: "Manage Users", href: "/admin/dashboard/users" },
  ];

  const userLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Profile", href: "/dashboard/profile" },
    { label: "Bookings", href: "/dashboard/my-bookings" },
  ];

  const links = role === "ADMIN" ? adminLinks : userLinks;

  return (
    <>
      {/* Mobile Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-1 bg-primary text-white fixed top-16 left-4 rounded z-50"
        >
          ☰
        </button>
      )}

      {/* Overlay Background (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50  md:hidden z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-16 left-0 h-full w-64 bg-base-200 p-4 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-6 text-right w-full"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6">{role} Dashboard</h2>

        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block p-2 rounded hover:bg-primary hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
