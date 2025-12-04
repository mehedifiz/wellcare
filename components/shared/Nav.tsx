"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();


  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
            <span className="text-lg font-bold text-white">c</span>
          </div>
          <span className="text-xl font-bold text-foreground">CarCare</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex flex-row gap-2 items-center">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Link href={"/dashboard"}>Book Services</Link>
          </Button>
          {/* theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-3 py-1 rounded-full text-sm border theme-border"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}

      {/* Actions */}
      <div className="flex items-center gap-3"></div>
      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="flex flex-col space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Link href={"/dashboard"}>Book Services</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
