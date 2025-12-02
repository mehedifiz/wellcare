"use client";

import { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useFetch } from "@/hooks/useFetch";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { StatCard } from "@/components/dashboard/stat-card";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { UserCard } from "@/components/dashboard/usercard";

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
}

interface TopService {
  _id: string;
  title: string;
  price: number;
  duration: string;
  totalBookings: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  bookingStats: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topServices, setTopServices] = useState<TopService[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetcher } = useFetch();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetcher({ url: "/stat/admin" });
      const topServicesRes = await fetcher({ url: "/stat/top-services" });
      const usersRes = await fetcher({ url: "/user?limit=4" });

      if (statsRes?.data) setStats(statsRes.data);
      if (topServicesRes?.data) setTopServices(topServicesRes.data);
      if (usersRes?.users) setRecentUsers(usersRes.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
             ADMIN Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of your booking platform performance
            </p>
          </div>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Bookings"
            value={stats?.totalBookings ?? 0}
            icon={CalendarCheck}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending"
            value={stats?.pendingBookings ?? 0}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Completed"
            value={stats?.completedBookings ?? 0}
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Cancelled"
            value={stats?.cancelledBookings ?? 0}
            icon={XCircle}
            variant="destructive"
          />
        </div>

        {/* Top Services */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Top Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topServices.map((service, index) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                price={service.price}
                duration={service.duration}
                totalBookings={service.totalBookings}
                rank={index + 1}
              />
            ))}
          </div>
        </section>

        {/* Recent Users */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Recent Users
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentUsers.map((user) => (
              <UserCard
                key={user._id}
                name={user.name}
                email={user.email}
                role={user.role}
                bookingStats={user.bookingStats}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
