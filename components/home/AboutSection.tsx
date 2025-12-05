"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="bg-muted/30 dark:bg-muted/80 py-16 md:py-24">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          About CarCare
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              CarCare is your trusted partner for professional car maintenance
              and repairs. Our certified mechanics ensure that your vehicle runs
              smoothly and safely. From routine oil changes to full inspections,
              we provide convenient, reliable, and affordable car services at
              your doorstep.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We believe in quality, transparency, and customer satisfaction.
              Booking your service is simple and hassle-free. Our team is
              dedicated to keeping your car in top condition.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  123 Auto Lane, Motor City, MC 45678
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  +1 (555) 987-6543
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  support@carcare.com
                </span>
              </div>
            </div>
          </div>

          {/* Optional Image */}
          <div className="flex justify-center">
            <Image
              width={500}
              height={500}
              src="https://www.carbarn.com.bd/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-v2.14801357.webp&w=480&q=50"
              alt="Car service"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
