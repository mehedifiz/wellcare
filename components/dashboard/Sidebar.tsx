"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/logout";

interface SidebarProps {
  role?: "ADMIN" | "USER";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
    { label: "Bookings", href: "/dashboard/my-bookings" },
  ];

  const links = role === "ADMIN" ? adminLinks : userLinks;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Hamburger for mobile */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 bg-primary text-white fixed top-16 left-4 rounded shadow z-50"
        >
          ☰
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64  border text-foreground hite p-6 flex flex-col justify-between
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <div>
          {/* Close button on mobile */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden mb-6 text-right w-full text-xl font-bold"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-8">{role} Dashboard</h2>

          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block p-3 rounded-lg hover:bg-white hover:text-primary transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
