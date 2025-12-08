"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { StatCard } from "@/components/dashboard/stat-card";
import { BookingCard } from "@/components/BookCard";

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

interface BookingStats {
  stats: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  pendingBookings: Booking[];
}

export default function UserDashboard() {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { fetcher } = useFetch();

  useEffect(() => {
    const loadData = async () => {
      // Fetch booking stats
      const fetchBookingStats = async () => {
        try {
          const { data, error } = await fetcher({
            url: "/stat/my/stats",
          });

          if (error) {
            setErrorMsg(error.message || "Failed to load stats.");
            return;
          }

          console.log("data", data);

          if (data) setStats(data);
        } catch {
          setErrorMsg("Something went wrong while fetching stats.");
        }
      };

      // Fetch recent bookings (limit 4)
      const fetchRecentBookings = async () => {
        try {
          const { data, error } = await fetcher({
            url: "/booking/my-booking?limit=4",
          });

          if (error) {
            setErrorMsg(error.message || "Failed to load bookings.");
            return;
          }

          if (data) setBookings(data);
        } catch {
          setErrorMsg("Something went wrong while fetching bookings.");
        }
      };

      await Promise.all([fetchBookingStats(), fetchRecentBookings()]);
      setLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={stats?.stats.total ?? 0}
          icon={CalendarCheck}
        />
        <StatCard
          title="Pending Bookings"
          value={stats?.stats.pending ?? 0}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Completed Bookings"
          value={stats?.stats.completed ?? 0}
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="Cancelled Bookings"
          value={stats?.stats.cancelled ?? 0}
          icon={XCircle}
          variant="destructive"
        />
      </div>

      {/* Recent Pending Bookings */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Pending Bookings
        </h2>
        {!stats?.pendingBookings || stats?.pendingBookings?.length === 0 ? (
          <p>No pending bookings.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.pendingBookings.map((booking: Booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Bookings */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Recent Bookings
        </h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </section>

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
    </div>
  );
}
