"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import Image from "next/image";
import { refreshUser } from "@/app/actions/refresh";

const LoginPage = () => {
  const router = useRouter();
  const { fetcher, loading, error } = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetcher({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      });
 
      toast.success("Login successful!");
     window.location.href = "/dashboard";

    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-100 via-gray-50 to-gray-100">
      <div className="relative w-full max-w-md">
        {/* Hero Car Image */}
        {/* <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48">
          <Image

            src="/car-illustration.png"  
            alt="Car Service"
            className="w-full h-full object-contain"
          />
        </div> */}

        <form
          onSubmit={handleSubmit}
          className="mt-32 rounded-xl bg-white p-8 shadow-xl border border-gray-200"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:ring focus:ring-emerald-200 transition"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:ring focus:ring-emerald-200 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-white text-lg font-medium hover:bg-emerald-700 disabled:opacity-70 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-emerald-600 font-medium cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
