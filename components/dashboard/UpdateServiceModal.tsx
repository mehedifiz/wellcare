"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";

interface Service {
  _id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

interface UpdateServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const { fetcher } = useFetch();

  // Initialize form state when the modal opens
  const [form, setForm] = useState({
    title: service?.title || "",
    price: service?.price || 0,
    duration: service?.duration || "",
    description: service?.description || "",
  });

  // Reset form whenever modal opens
 useEffect(() => {
   if (service && isOpen) {
     setTimeout(() => {
       setForm({
         title: service.title,
         price: service.price,
         duration: service.duration,
         description: service.description,
       });
     }, 0);
   }
 }, [service, isOpen]);


  const handleSubmit = async () => {
    if (!service) return;

    try {
      const updated = await fetcher({
        url: `/service/${service._id}`,
        method: "PUT",
        body: form,
      });

      toast("Service updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      toast("Failed to update service");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Service</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Duration</label>
            <Input
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateServiceModal;
