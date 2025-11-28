import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Car,
  Wrench,
  Droplet,
 
  BatteryCharging,
  AirVent,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Bookings", href: "#bookings" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { label: "Oil Change", href: "#services" },
  { label: "Tire Replacement", href: "#services" },
  { label: "Brake Service", href: "#services" },
  { label: "Battery Check", href: "#services" },
  { label: "AC & Cooling Service", href: "#services" },
  { label: "Full Car Inspection", href: "#services" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 dark:bg-muted/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">CarCare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Reliable car servicing at your convenience. Book, maintain, and
              repair your vehicle with trusted mechanics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.label} className="flex items-center gap-2">
                  {/* Optional: service icon */}
                  <span className="text-emerald-600">
                    {service.label.includes("Oil") && (
                      <Droplet className="w-4 h-4" />
                    )}
                    {service.label.includes("Tire") && (
                      <Car className="w-4 h-4" />
                    )}
                    {service.label.includes("Brake") && (
                      <Wrench className="w-4 h-4" />
                    )}
                    {service.label.includes("Battery") && (
                      <BatteryCharging className="w-4 h-4" />
                    )}
                    {service.label.includes("AC") && (
                      <AirVent className="w-4 h-4" />
                    )}
                    {service.label.includes("Inspection") && (
                      <Car className="w-4 h-4" />
                    )}
                  </span>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-muted-foreground">
                  123 Auto Lane, Motor City, MC 45678
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 987-6543
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-muted-foreground">
                  support@carcare.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CarCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
