"use client";

import React, { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import CreateBookingModal from "@/components/dashboard/CreateBookingModal";
import { toast } from "sonner";

interface IBooking {
  _id: string;
  customerName: string;
  carModel: string;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
  serviceId: {
    title: string;
    price: number;
    duration: string;
  };
}

const Page = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { fetcher } = useFetch();

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const { data, error } = await fetcher({
        url: "/booking/my-booking",
      });

      if (error) {
        setErrorMsg(error.message || "Failed to load bookings.");
        return;
      }

      if (data) setBookings(data);
    } catch (err) {
      setErrorMsg("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // CANCEL BOOKING
  const cancelBooking = async (id: string) => {
    try {
      const { data, error } = await fetcher({
        url: `/booking/cancel/${id}`,
        method: "PUT",
      });

      if (error) {
        setErrorMsg(error.message || "Unable to cancel booking.");
        return;
      }

      if (data?.status) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
        );
      }
    } catch (err) {
      setErrorMsg("Failed to cancel booking.");
    }
  };

 const handlePayment = async (bookingId: string) => {
   try {
     // 1️⃣ Call your payment API
     const { data, error } = await fetcher({
       url: "/pay/create-ssl-payment",
       method: "POST",
       body: { bookingId },
     });

     // 2️⃣ Handle fetcher errors
     if (error) {
      console.log(error)
       toast.error(error.message || "Payment failed. Try again.");
       return;
     }

     console.log(data )
     
    
      
     const paymentUrl = data?.paymentUrl;

     if (!paymentUrl) {
       toast.error("Payment URL missing. Try again.");
       return;
     }

     toast.success("Redirecting to payment...");
     window.location.href = paymentUrl;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (err: any) {
     toast.error("Failed to start payment.");
   }
 };



  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-xs px-2 py-1 rounded-full bg-muted cursor-pointer">
                i
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your personal car service booking history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CreateBookingModal onSuccess={fetchBookings} />

      {errorMsg && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-4 w-1/4 mb-3" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-8 w-24 mt-3" />
            </Card>
          ))}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-muted-foreground">
          You don&apos;t have any bookings yet.
          <CreateBookingModal onSuccess={fetchBookings} />
        </p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid gap-5">
          {bookings.map((b) => (
            <Card key={b._id} className="border shadow-sm">
              <CardHeader className="flex flex-row justify-between">
                <CardTitle>{b?.serviceId?.title}</CardTitle>

                <Badge
                  variant={
                    b?.status === "Pending"
                      ? "secondary"
                      : b.status === "Completed"
                      ? "default"
                      : "destructive"
                  }
                >
                  {b?.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-1 text-sm">
                <p>
                  <strong>Customer:</strong> {b?.customerName}
                </p>
                <p>
                  <strong>Car:</strong> {b?.carModel}
                </p>
                <p>
                  <strong>Date:</strong> {b?.date}
                </p>
                <p>
                  <strong>Time:</strong> {b?.time}
                </p>
                <p>
                  <strong>Price:</strong> ${b?.serviceId?.price}
                </p>

                {b?.status === "Pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => cancelBooking(b?._id)}
                      variant="destructive"
                    >
                      Cancel Booking
                    </Button>

                    <Button
                      onClick={() => handlePayment(b?._id)}
                      variant="secondary"
                    >
                      Pay Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
