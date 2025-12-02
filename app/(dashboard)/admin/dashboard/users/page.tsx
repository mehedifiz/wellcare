"use client";
import { UsersTable } from "@/components/dashboard/Userstable";
import { Label } from "@/components/smallCompnents";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  bookingStats?: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
}

const Page = () => {
  const { fetcher } = useFetch();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetcher({
          url: "/user",
          method: "GET",
        });

        setUsers(res.users || []);
      } catch (err) {
        toast.error("Error loading users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Open modal ---------------------------------------------
  const openMailModal = (email: string) => {
    setSelectedEmail(email);
    setShowModal(true);
  };

  // Send mail handler --------------------------------------
  // Send mail handler --------------------------------------
  const handleSendMail = async () => {
    try {
      const res = await fetcher({
        url: "/user/mail",
        method: "POST",
        body: {
          to: selectedEmail,
          subject: "Message from Admin",
          html: `<p>${message}</p>`,
        },
      });

      if (res.status) {
        toast.success("Mail sent successfully!");
        setShowModal(false);
        setMessage("");
      } else {
        toast.error(res.message || "Mail failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <>
        <Skeleton className="w-full h-6 my-2" />
        <Skeleton className="w-full h-6 my-2 " />
      </>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Users</h1>

      <UsersTable users={users} onSendMail={openMailModal} />

      {showModal && (
        <MailModal
          email={selectedEmail}
          message={message}
          setMessage={setMessage}
          onClose={() => setShowModal(false)}
          onSend={handleSendMail}
        />
      )}
    </div>
  );
};

export default Page;

 


 
const MailModal = ({
  email,
  message,
  setMessage,
  onClose,
  onSend,
}: {
  email: string;
  message: string;
  setMessage: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white dark:bg-black w-96 p-5 rounded shadow-lg relative">
        <h2 className="text-lg font-semibold mb-3">Send Mail</h2>

        <Label>To:</Label>
        <input
          type="text"
          value={email}
          readOnly
          className="w-full mb-3 p-2 border rounded "
        />

        <Label>Message:</Label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write message..."
          className="w-full h-24 p-2 border rounded"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={onSend}
            className="px-3 py-1  rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};



