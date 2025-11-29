"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import UpdateServiceModal from "@/components/dashboard/UpdateServiceModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Define the service type
interface Service {
  _id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  createdAt: string;
}

const ServicesPage = () => {
  const { fetcher } = useFetch();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);


  // Fetch services
  const getServices = async () => {
    try {
      setLoading(true);
      const data = await fetcher({ url: "/service", method: "GET" });
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (service: Service) => {
    setServiceToDelete(service);
  };


  useEffect(() => {
    getServices();
  }, []);

  // Open update modal
  const handleOpenUpdate = (service: Service) => {
    setCurrentService(service);
    setOpenUpdateModal(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;

    try {
      await fetcher({
        url: `/service/${serviceToDelete._id}`,
        method: "DELETE",
      });
      toast("Service deleted successfully!");
      setServiceToDelete(null); // close modal
      getServices()
    } catch (error) {
      console.error(error);
      toast("Failed to delete service");
    }
  };


  if (loading) return <p>Loading services...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Services</h1>
        <Link href="/admin/dashboard/services/add-new">
          <Button>Add New Service</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {services.map((service) => (
            <TableRow key={service._id}>
              <TableCell>{service.title}</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                {new Date(service.createdAt).toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenUpdate(service)}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleOpenDelete(service)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Service Modal */}
      {currentService && (
        <UpdateServiceModal
          service={currentService}
          isOpen={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          onUpdate={getServices}
        />
      )}

      <AlertDialog
        open={!!serviceToDelete}
        onOpenChange={() => setServiceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              service: <strong>{serviceToDelete?.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setServiceToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesPage;
