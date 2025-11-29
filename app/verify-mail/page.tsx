"use client";

import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";

const VerifyMailPage = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  // your hook
  const { fetcher, loading, error } = useFetch();
useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  if (!token) {
    setTimeout(() => {
      setStatus("error");
      setMessage("Invalid or missing token.");
    }, 0);
    return;
  }

  const verifyEmail = async () => {
    try {
      const res = await fetcher({
        url: "/auth/verify-mail",
        method: "POST",
        body: { token },
      });

      console.log(res , "res-------------------------")

      if (!res.success) {
        const data = await res.json();
        setStatus("error");
        setMessage(data.message || "Verification failed.");
      } else {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Server error. Please try again later.");
    }
  };

  verifyEmail();
}, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      {status === "loading" && (
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="text-lg mt-4">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">✔ Verified!</h2>
          <p className="mt-2 text-lg">{message}</p>

          <a href="/login" className="btn btn-success mt-5">
            Go to Login
          </a>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">
            ✖ Verification Failed
          </h2>
          <p className="mt-2 text-lg">{message}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyMailPage;
