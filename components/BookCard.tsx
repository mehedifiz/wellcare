"use client";

import React from "react";
import { Clock, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Booking {
  _id: string;
  serviceId: {
    title: string;
    price: number;
    duration: string;
  };
  customerName: string;
  carModel: string;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
}

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const statusColors: Record<string, string> = {
    Pending: "yellow",
    Completed: "green",
    Cancelled: "red",
  };

  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg">{booking.serviceId.title}</CardTitle>

        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent className="text-xs">
            Duration: {booking.serviceId.duration} <br />
            Customer: {booking.customerName} <br />
            Car: {booking.carModel}
          </TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Clock className="h-4 w-4" />
          <span>{booking.date}</span>
          <span>{booking.time}</span>
        </div>

        {/* Price & Status */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">${booking.serviceId.price}</span>
          <Badge>{booking.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
