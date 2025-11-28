"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Car,
  Wrench,
  Droplet,

  BatteryCharging,
  AirVent,
} from "lucide-react";

const services = [
  {
    name: "Oil Change",
    type: "Maintenance",
    icon: <Droplet className="w-8 h-8 text-yellow-500" />,
    description: "Keep your engine running smoothly with regular oil changes.",
    color: "bg-white dark:bg-gray-800",
  },
  {
    name: "Tire Replacement",
    type: "Repair",
    icon: <Car className="w-8 h-8 text-green-500" />,
    description:
      "Replace worn-out tires with high-quality ones for safety and performance.",
    color: "bg-white dark:bg-gray-800",
  },
  {
    name: "Brake Service",
    type: "Repair",
    icon: <Wrench className="w-8 h-8 text-red-500" />,
    description:
      "Ensure your brakes are in perfect condition for safe driving.",
    color: "bg-white dark:bg-gray-800",
  },
  {
    name: "Battery Check & Replacement",
    type: "Maintenance",
    icon: <BatteryCharging className="w-8 h-8 text-orange-500" />,
    description:
      "Check your battery health and replace if needed to avoid breakdowns.",
    color: "bg-white dark:bg-gray-800",
  },
  {
    name: "AC & Cooling Service",
    type: "Maintenance",
    icon: <AirVent className="w-8 h-8 text-cyan-500" />,
    description: "Keep your car cool and comfortable with AC servicing.",
    color: "bg-white dark:bg-gray-800",
  },
  {
    name: "Full Car Inspection",
    type: "Diagnostics",
    icon: <Car className="w-8 h-8 text-blue-500" />,
    description:
      "Comprehensive check-up to detect any issues early and prevent major repairs.",
    color: "bg-white dark:bg-gray-800",
  },
];

export default function HomeServices() {
  return (
    <section
      id="services"
      className="bg-muted/30 dark:bg-muted/80 py-16 md:py-24"
    >
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Our Car Services
        </h2>
        <p className="text-center mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Professional car services at your convenience. Book maintenance,
          repairs, and inspections quickly and reliably with our certified
          mechanics.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className={`${service.color} shadow-lg dark:shadow-gray-700 rounded-xl border border-gray-200 dark:border-gray-700`}
            >
              <CardHeader className="flex items-center gap-4">
                {service.icon}
                <CardTitle className="text-black dark:text-white">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
