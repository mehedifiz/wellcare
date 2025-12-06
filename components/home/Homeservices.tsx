"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { Car, Wrench, Droplet, BatteryCharging, AirVent } from "lucide-react";

export interface Service {
  _id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

export default function HomeServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const { fetcher } = useFetch();

  const getServices = async () => {
    setLoading(true);
    try {
      const data: Service[] = await fetcher({
        url: "/service?limit=3",
        method: "GET",
      });
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
    <section className="bg-muted/30 dark:bg-muted/80 py-16 md:py-24">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black dark:text-white">
          Our Services
        </h2>
        <p className="text-center mb-12 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Professional services at your convenience. Book maintenance, repairs,
          and inspections quickly and reliably.
        </p>

        {loading ? (
          <p className="text-center">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center">No services available.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
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

        {/* All Services Button */}
        {services.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/our-services">
              <Button variant="outline">See All Services</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
