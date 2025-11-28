/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Cookies from "js-cookie";

interface FetchOptions extends RequestInit {
  url: string;
  body?: any;
  skipToken?: boolean;
  headers?: HeadersInit;
}

export function useFetch<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetcher = async ({
    url,
    method = "GET",
    body,
    headers = {},
    skipToken,
  }: FetchOptions) => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");

      // Normalize headers to a simple object
      const normalizedHeaders: Record<string, string> = {};

      if (headers instanceof Headers) {
        headers.forEach((value, key) => {
          normalizedHeaders[key] = value;
        });
      } else if (Array.isArray(headers)) {
        headers.forEach(([key, value]) => {
          normalizedHeaders[key] = value;
        });
      } else {
        Object.assign(normalizedHeaders, headers);
      }

      // Add Content-Type if missing
      if (!normalizedHeaders["Content-Type"]) {
        normalizedHeaders["Content-Type"] = "application/json";
      }

      // Add Authorization token
      if (!skipToken && token) {
        normalizedHeaders["Authorization"] = `Bearer ${token}`;
      }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method,
      headers: normalizedHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });


      const result = await res.json();

      // Save token if returned
      if (result.token) {
        Cookies.set("token", result.token, { expires: 7 });
      }

      if (!res.ok) throw new Error(result.message || "API Error");

      setData(result);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
      throw err;
    }
  };

  return { data, loading, error, fetcher };
}
