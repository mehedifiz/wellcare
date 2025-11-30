"use client";

import { useFetch } from "@/hooks/useFetch";
import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Booking {
  _id: string;
  customerName: string;
  carModel: string;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
  userId: {
    name: string;
    email: string;
  };
  serviceId: {
    title: string;
    price: number;
  };
}

const AdminBookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { fetcher } = useFetch();

   const fetchBookings = async () => {
     try {
       const res = await fetcher({
         method: "GET",
         url: "/booking/get-all",
       });
       setBookings(res?.data);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (err: any) {
       setError(err.message || "Something went wrong");
     } finally {
       setLoading(false);
     }
   };
  useEffect(() => {
   
    fetchBookings();
  }, []);

  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  

  const markAsPaid = async () => {
    if (!selectedBooking) return;
    console.log(selectedBooking._id)

     try {
       const res = await fetcher({
         method: "PATCH",
         url: `/booking/paid/${selectedBooking._id}`,
       });
       if (res.success) {
         toast("Marked as paid ");
         setModalOpen(false);

         fetchBookings();
       } else {
       }
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (err: any) {
       setError(err.message || "Something went wrong");
     } finally {
       setLoading(false);
     }


    
  };

  if (loading) return <div className="p-6">Loading bookings...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">All Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Car Model</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Info</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b  transition">
                <td className="py-3 px-4">{b.customerName}</td>
                <td className="py-3 px-4">{b.carModel}</td>
                <td className="py-3 px-4">{b.serviceId.title}</td>
                <td className="py-3 px-4">{b.date}</td>
                <td className="py-3 px-4">{b.time}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    b.status === "Completed"
                      ? "text-green-600"
                      : b.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {b.status}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="flex items-center space-x-1 text-blue-600 hover:underline"
                    onClick={() => openModal(b)}
                  >
                    <Info /> <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogClose asChild></DialogClose>
          </DialogHeader>

          <DialogDescription className="space-y-2 text-sm">
            <p>
              <strong>Customer:</strong> {selectedBooking?.customerName}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking?.userId?.email}
            </p>
            <p>
              <strong>Car Model:</strong> {selectedBooking?.carModel}
            </p>
            <p>
              <strong>Service:</strong> {selectedBooking?.serviceId?.title}
            </p>
            <p>
              <strong>Price:</strong> ${selectedBooking?.serviceId?.price}
            </p>
            <p>
              <strong>Date:</strong> {selectedBooking?.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedBooking?.time}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedBooking?.status === "Completed"
                    ? "text-green-600"
                    : selectedBooking?.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {selectedBooking?.status}
              </span>
            </p>
          </DialogDescription>

          {selectedBooking?.status == "Pending"  && (
              <DialogFooter>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={markAsPaid}
                >
                  Mark as Paid
                </Button>
              </DialogFooter>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookingPage;
