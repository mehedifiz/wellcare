"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";
import Image from "next/image";

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
    <div
      className="
        flex min-h-screen items-center justify-center
        bg-gradient-to-br from-background/80 via-background to-background/90
      "
    >
      <div className="relative w-full max-w-md px-6">
        {/* Hero Logo / Image (optional) */}
        {/* <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-40 h-40">
          <div className="rounded-full bg-background shadow-md p-3">
            <Image
              src='/car-illustration.png'
              alt="Car"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div> */}

        <form
          onSubmit={handleSubmit}
          className="
            mt-20 rounded-xl border border-border 
            bg-background shadow-md p-8
          "
        >
          <h2 className="mb-6 text-3xl font-semibold text-center text-foreground">
            Welcome Back
          </h2>

          {error && (
            <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-lg border border-border
                bg-background px-4 py-2 
                focus:outline-none focus:ring-2 focus:ring-primary/40
              "
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full rounded-lg border border-border
                bg-background px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-primary/40
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg bg-primary text-primary-foreground 
              px-4 py-3 text-lg font-medium 
              hover:opacity-90 disabled:opacity-70 transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-primary font-medium cursor-pointer hover:underline"
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
