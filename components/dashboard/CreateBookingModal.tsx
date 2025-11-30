"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";

interface Service {
  _id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

export default function CreateBookingModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { fetcher } = useFetch();

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingServices, setLoadingServices] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    serviceId: "",
    customerName: "",
    carModel: "",
    date: "",
    time: "",
  });

  const getServices = async () => {
    try {
      const data = await fetcher({ url: "/service", method: "GET" });
      setServices(data);
    } catch {
      toast("Failed to load services");
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleServiceSelect = (id: string) => {
    const service = services.find((s) => s._id === id) || null;
    setSelectedService(service);
    handleChange("serviceId", id);
  };

  const handleSubmit = async () => {
    try {
      await fetcher({
        url: "/booking",
        method: "POST",
        body: form,
      });

      toast("Booking created successfully!");
      onSuccess();
       setOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e :any) {
      toast(e.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Booking</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full rounded-lg">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Service Dropdown */}
          <div className="grid gap-2">
            <Select
              onValueChange={handleServiceSelect}
              disabled={loadingServices}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>

              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service._id} value={service._id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Service Detail Box */}
            {selectedService && (
              <div className="p-3 border rounded-md bg-muted/30 text-sm space-y-1">
                <p>
                  Price: <strong>${selectedService.price}</strong>
                </p>
                <p>Duration: {selectedService.duration}</p>
                <p>Description: {selectedService.description}</p>
              </div>
            )}
          </div>

          <Input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={(e) => handleChange("customerName", e.target.value)}
          />

          <Input
            placeholder="Car Model"
            value={form.carModel}
            onChange={(e) => handleChange("carModel", e.target.value)}
          />

          <Input
            type="date"
            placeholder="Select date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />

          <Input
            type="time"
            placeholder="Select time"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          Submit Booking
        </Button>
      </DialogContent>
    </Dialog>
  );
}
