"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";

const AddNewServices = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
    const { fetcher , error } = useFetch();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !duration || !description) {
      toast("Please fill all fields.");
      return;
    }

    const body = { title, price, duration, description };

    try {
      setLoading(true);
      const res = await fetcher({
        url: "/service",
        method: "POST",
        body,
      });

       

      if (!res.success) throw new Error("Failed to add service");

      toast( "Service added successfully!" );

      // Reset form
      setTitle("");
      setPrice("");
      setDuration("");
      setDescription("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err)
      toast("eoor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Service</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Service Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Full Body Massage"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price ($)</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="50"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="60 minutes"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A relaxing full body massage using essential oils."
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Service"}
        </Button>
      </form>
    </div>
  );
};

export default AddNewServices;
