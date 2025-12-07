"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const RegisterPage = () => {
  const router = useRouter();
  const { fetcher, loading, error } = useFetch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetcher({
        url: "/auth/register",
        method: "POST",
        body: { name, email, password },
      });

      toast.success("Registration successful! Please check mail to verify.");
      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div
      className="
        flex min-h-screen items-center justify-center
        bg-linear-to-br from-background/80 via-background to-background/90
      "
    >
      <div className="relative w-full max-w-md px-6">
        {/* Hero Image */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-80 h-44">
          <div className="rounded-full shadow-lg bg-background p-3">
            <Image
              src="https://www.carbarn.com.bd/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-v2.14801357.webp&w=480&q=50"
              alt="Car registration banner"
              width={600}
              height={200}
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        <Card className="mt-32 border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold text-foreground">
              Create Your Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            {error && (
              <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  required
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <p className="mt-4 text-center text-muted-foreground text-sm">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="cursor-pointer text-primary hover:underline font-medium"
              >
                Log in
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
