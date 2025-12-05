"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const { fetcher, loading } = useFetch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetcher({
      url: "/message/send",
      method: "POST",
      body: formData,
    });

    if (res?.success) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error(res?.message || "Failed to send message");
    }
  };

  return (
    <section
      id="contact"
      className="bg-muted/30 dark:bg-muted/80 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
        {/* LEFT SIDE IMAGE / ICON */}
        <div className="relative w-full h-80 md:h-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://www.carbarn.com.bd/_next/static/media/contact-page-section-img.aa7ef6c8.svg"  
            alt="Contact Illustration"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <Card className="shadow-lg border border-gray-200 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Send Us a Message
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="font-semibold">Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="font-semibold">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="font-semibold">Phone Number</Label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="01700000000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label className="font-semibold">Message</Label>
                <Textarea
                  name="message"
                  rows={4}
                  placeholder="Hello, I need help with your service."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold py-3 text-lg"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
