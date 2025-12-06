"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { AirVent, BatteryCharging, Car, Droplet, Wrench } from "lucide-react";

export interface Service {
  _id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

const OurServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const { fetcher } = useFetch();

  const getServices = async () => {
    setLoading(true);
    try {
      const data = await fetcher({ url: "/service", method: "GET" });
      setServices(data);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // Assign icons dynamically based on title/type
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "oil change":
        return <Droplet className="w-8 h-8 text-yellow-500" />;
      case "tire replacement":
        return <Car className="w-8 h-8 text-green-500" />;
      case "brake service":
        return <Wrench className="w-8 h-8 text-red-500" />;
      case "battery check & replacement":
        return <BatteryCharging className="w-8 h-8 text-orange-500" />;
      case "ac & cooling service":
        return <AirVent className="w-8 h-8 text-cyan-500" />;
      default:
        return <Car className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>

      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service._id}
              className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <CardHeader className="flex items-center gap-4">
                {getIcon(service.title)}
                <CardTitle className="text-black dark:text-white">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  {service.description}
                </CardDescription>
                <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                  {service.duration} | ${service.price.toFixed(2)}
                </p>
                <Link href="/dashboard">
                  <Button className="mt-4 w-full" variant="default">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurServicesPage;
