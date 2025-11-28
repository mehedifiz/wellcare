"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Car, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Select Your Service",
    description:
      "Choose from Oil Change, Tire Replacement, Brake Service, AC Check and more.",
    icon: <Car className="w-8 h-8 text-emerald-600" />,
  },
  {
    title: "Choose Date & Time",
    description:
      "Pick a convenient slot for our certified mechanics to serve you.",
    icon: <Calendar className="w-8 h-8 text-emerald-600" />,
  },
  {
    title: "Make Payment",
    description:
      "Pay easily online via card, or choose cash on service completion.",
    icon: <CreditCard className="w-8 h-8 text-emerald-600" />,
  },
  {
    title: "Service Completed",
    description:
      "Our expert mechanics complete the service and ensure your car runs perfectly.",
    icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
  },
];

export default function HowToBook() {
  return (
    <section
      id="how-to-book"
      className="bg-muted/30 dark:bg-muted/80 py-16 md:py-24"
    >
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          How to Book a Service
        </h2>
        <p className="text-center mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Booking your car service is simple and quick. Follow these steps and
          get your vehicle serviced by our expert mechanics.
        </p>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, idx) => (
            <Card
              key={idx}
              className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 text-center p-6"
            >
              <CardHeader className="flex flex-col items-center gap-4">
                {step.icon}
                <CardTitle className="text-black dark:text-white">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
